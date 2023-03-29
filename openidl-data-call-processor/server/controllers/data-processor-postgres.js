const log4js = require('log4js');
const config = require('../config/default.json');
const logger = log4js.getLogger('data-processor-postgres');
logger.level = config.logLevel;
const sizeof = require('object-sizeof');
const { DBManagerFactory } = require('@senofi/openidl-common-lib');

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
		let sequenceNum = 1;
		const cursor = await this.executeExtractionPatternReduceWithCursor(
			extractionPattern,
			dbManager
		);
		try {
			while (recordsCount === pageSize) {
				const records = await this.readFromCursor(cursor, pageSize);
				recordsCount = records.length;
				logger.info(`Extraction result: ${JSON.stringify(records)}`);
				sequenceNum = page;

				await this.pushToPDC(
					this.carrierId,
					records,
					page,
					sequenceNum,
					this.dataCallId,
					'v1',
					this.targetChannelTransaction,
					recordsCount
				);
				await this.submitTransaction(
					this.dataCallId,
					'v1',
					this.carrierId
				);
				page++;
			}
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
				JSON.stringify(payload)
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
		sequenceNum,
		totalRecordsCount,
		datacallid,
		versionid,
		target
	) {
		try {
			let insuranceObject = this.constructInstanceObject(
				pageNumber,
				sequenceNum,
				datacallid,
				versionid,
				carrierId,
				records,
				totalRecordsCount
			);
			logger.debug('insuranceObject ' + JSON.stringify(insuranceObject));
			if (insuranceObject.records.length === 0) {
				logger.info('Insurance Records not available in SQL Database');
			} else {
				let data = JSON.stringify(insuranceObject); // Convert transient data object to JSON string
				data = new Buffer(data).toString('base64'); // convert the JSON string to base64 encoded string
				let insurance_private = {
					'transactional-data-': data
				};
				logger.info(
					'Transaction before PDC :- Size of the payload = ' +
						sizeof(insuranceObject) +
						'START_TIME = ' +
						new Date().toISOString() +
						' Number of records : ' +
						insuranceObject.records.length +
						'Page Number' +
						pageNumber
				);
				await this.targetChannelTransaction.transientTransaction(
					'SaveInsuranceData',
					insurance_private,
					pageNumber
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

	constructInstanceObject(
		pageNumber,
		sequenceNum,
		dataCallId,
		dataCallVersion,
		carrierId,
		records,
		totalRecordsNum
	) {
		return {
			pageNumber: pageNumber,
			sequenceNum: sequenceNum,
			dataCallId: dataCallId,
			dataCallVersion: dataCallVersion,
			carrierId: carrierId,
			totalRecordsNum: totalRecordsNum,
			recordsNum: records.length,
			records: records
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
			const oneRowInstanceObject = this.constructInstanceObject(
				1,
				1,
				this.dataCallId,
				'v1',
				this.carrierId,
				oneRowResult,
				1
			);
			return Math.floor(
				this.calculateMaximumRecordsCountAccordingSizeLimit(
					JSON.stringify(oneRowInstanceObject)
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
		const sizeInBytes = sizeof(obj);
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
