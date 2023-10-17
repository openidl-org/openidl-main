const log4js = require('log4js');
const config = require('../config/default.json');
const logger = log4js.getLogger('data-processor-postgres');
logger.level = config.logLevel;
const sizeof = require('object-sizeof');
const { DBManagerFactory } = require('@openidl-org/openidl-common-lib');

let InstanceFactory = require('../middleware/instance-factory');

class DataProcessorPostgres {
	constructor(
		id,
		version,
		carrierID,
		exPattern,
		channel,
		reduceCollectionName
	) {
		logger.debug('In DataProcessorPostgres - carrierID: {} ', carrierID);
		this.dataCallId = id;
		this.dataCallVersion = version;
		this.carrierId = carrierID;
		this.extractionPattern = exPattern;
		this.skip = 0;
		this.pageNumber = 0;
		this.targetChannelTransaction = channel;
		this.reduceCollectionName = reduceCollectionName;
		this.value = null;
		this.dbManager = null;
		this.createView = false;
	}

	async isView() {
		return this.createView;
	}

	async processRecords(
		reduceCollectionName,
		extractionPattern,
		premiumFromDate,
		premiumToDate,
		lossFromDate,
		lossToDate,
		lineOfBusiness,
		jurisdiction,
		datacallID,
		dataCallVersion
	) {
		logger.info('Process records (postgres)');
		const options = JSON.parse(process.env.OFF_CHAIN_DB_CONFIG);

		const dbManager = await new DBManagerFactory().getInstance(
			options,
			extractionPattern.dbType
		);
		logger.info('Db manager:', dbManager);

		await this.executeExtractionPatternMap(extractionPattern, dbManager);

		const pageSize = await this.getPageSize(extractionPattern, dbManager);
		let recordsCount = pageSize;
		let page = 1;
		const cursor = await this.executeExtractionPatternReduceWithCursor(
			extractionPattern,
			dbManager
		);
		try {
			while (recordsCount === pageSize) {
				const records = await this.readFromCursor(cursor, pageSize);
				recordsCount = records.length;
				// logger.info(`Extraction result: ${JSON.stringify(records)}`);

				await this.pushToPDC(
					this.carrierId,
					records,
					page,
					recordsCount,
					this.dataCallId,
					dataCallVersion
				);
				page++;
			}
			await this.submitTransaction(
				this.dataCallId,
				dataCallVersion,
				this.carrierId
			);
		} catch (err) {
			logger.error('Error while saving data to PDC', err);
		} finally {
			cursor.close();
		}
	}

	async submitTransaction(datacallId, versionId, carrierId) {
		//  Update Consent status into Blockchain
		let payload = {
			dataCallID: datacallId,
			dataCallVersion: versionId,
			carrierID: carrierId,
			status: 'Completed'
		};
		try {
			await this.targetChannelTransaction.submitTransaction(
				'UpdateConsentStatus',
				JSON.stringify(payload),
				3
			);
		} catch (ex) {
			logger.error(
				'Failed to update blockchain consent status as Completed'
			);
		}
	}

	async pushToPDC(
		carrierId,
		records,
		pageNumber,
		totalRecordsCount,
		datacallid,
		versionid
	) {
		try {
			let insuranceObject = this.constructInsuranceObject(
				pageNumber,
				datacallid,
				versionid,
				carrierId,
				records,
				totalRecordsCount
			);
			if (insuranceObject.records.length === 0) {
				logger.info('Insurance Records not available in SQL Database');
			} else {
				let insurance_private = this.createInsurancePrivateObject(insuranceObject);
				logger.info(
					'Transaction before PDC :- Size of the payload = ' +
						sizeof(insuranceObject) +
						'START_TIME = ' +
						new Date().toISOString() +
						' Number of records : ' +
						insuranceObject.records.length +
						' Page Number: ' +
						pageNumber
				);
				await this.targetChannelTransaction.transientTransaction(
					'SaveInsuranceData',
					insurance_private,
					pageNumber,
					3
				);
				logger.info(
					'Transaction after PDC :- END_TIME = ' +
						new Date().toISOString() +
						'DATACALL_ID :- ' +
						insuranceObject.dataCallId +
						'CARRIER_ID :- ' +
						insuranceObject.carrierId +
						'Page Number' +
						pageNumber
				);
			}
		} catch (ex) {
			logger.error("Error processing push to PDC: ", ex)
			throw ex;
		}
	}

	async executeExtractionPatternMap(extractionPattern, dbManager) {
		if (extractionPattern.viewDefinition.map) {
			const mapScript = await this.decodeToAscii(
				extractionPattern.viewDefinition.map
			);
			logger.debug('Map script:' + typeof mapScript);
			const mapResult = await dbManager.executeSql(
				mapScript.replace(/@org/g, this.carrierId)
			);
			logger.info('Map result: ' + mapResult);
			if (!mapResult) {
				logger.warn('Map did not execute successfully');
			}
		}
	}

	async executeExtractionPatternReduceWithCursor(
		extractionPattern,
		dbManager
	) {
		if (extractionPattern.viewDefinition.reduce) {
			const reduceScript = await this.decodeToAscii(
				extractionPattern.viewDefinition.reduce
			);
			const cursor = await dbManager.executeSqlWithCursor(
				reduceScript.replace(/@org/g, this.carrierId)
			);

			return cursor;
		}
	}

	async decodeToAscii(base64String) {
		if (base64String) {
			const buff = Buffer.from(base64String, 'base64');
			return buff.toString('ascii');
		}
		return '';
	}

	constructInsuranceObject(
		pageNumber,
		dataCallId,
		dataCallVersion,
		carrierId,
		records,
		totalRecordsNum
	) {
		return {
			pageNumber: pageNumber,
			sequenceNum: pageNumber,
			dataCallId: dataCallId,
			dataCallVersion: dataCallVersion,
			carrierId: carrierId,
			totalRecordsNum: totalRecordsNum,
			recordsNum: records.length,
			records: records
		};
	}

    createInsurancePrivateObject(insuranceObject) {
        let insuranceObjectJson = JSON.stringify(insuranceObject); // Convert transient data object to JSON string
        const encodedInsuranceObject = Buffer.from(insuranceObjectJson).toString('base64') // convert the JSON string to base64 encoded string
        return {
            'transactional-data-': encodedInsuranceObject
        };
    }

	async getPageSize(extractionPattern, dbManager) {
        let cursor;
		try {
			cursor = await this.executeExtractionPatternReduceWithCursor(
				extractionPattern,
				dbManager
			);
			const oneRowResult = await this.readFromCursor(cursor, 1);
			return Math.floor(
				this.calculateMaximumRecordsCountAccordingSizeLimit(
					oneRowResult
				)
			);
		} catch (err) {
			logger.error(
				'Error while fetching one record to calculate page size',
				err
			);
		} finally {
            if (cursor) {
                cursor.close();
            }
		}
	}

	calculateMaximumRecordsCountAccordingSizeLimit(obj) {
		const sizeInBytes = Buffer.from(JSON.stringify(obj)).toString('base64').length;
        const maximumBatchSize = process.env['MAXIMUM_BATCH_SIZE_IN_BYTES'] || 5242880
		return maximumBatchSize / sizeInBytes;
	}

	async readFromCursor(cursor, rowsCount) {
		return new Promise((resolve, reject) => {
			cursor.read(rowsCount, (err, rows) => {
				if (err) {
					reject(err);
				}
				resolve(rows);
			});
		});
	}
}

module.exports = DataProcessorPostgres;
