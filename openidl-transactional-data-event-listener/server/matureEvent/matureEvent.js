const InstanceFactory = require('../middleware/instance-factory');
const log4js = require('log4js');
const config = require('config');
const logger = log4js.getLogger('event -eventHandler ');
const Stream = require('stream');

const MatureEvent = {};

MatureEvent.handleMatureEvent = async (data) => {
	try {
		logger.info("in handleMatureEvent", data);

		const factoryObject = new InstanceFactory();
		const targetObject = await factoryObject.getInstance(config.insuranceDataStorageEnv);

		logger.debug("config storage env ", config.insuranceDataStorageEnv);
		logger.debug("targetObject: ", typeof targetObject);

		logger.info("Gathering all results");
		const allInsuranceData = await targetObject.getTransactionalDataByDatacall(data.dataCalls.id);
		logger.info("all insurance data fetched.");

		if (allInsuranceData.Contents.length === 0) {
			logger.error("Mature data call has no consent!");
			return;
		}

		const stream = new Stream.PassThrough();
		let totalRecords = 0;
		const promises = allInsuranceData.Contents.map(async ({ Key }) => {
			const data = await targetObject.getData(Key);
			const { records, recordsNum } = JSON.parse(data.Body);
			totalRecords += recordsNum;
			return records;
		});
		const records = await Promise.all(promises);
		const combinedRecords = records.flat().map(JSON.stringify).join(",");
		stream.write(`[${combinedRecords}]`);
		stream.end();

		const id = `result-${data.dataCalls.id}`;
		await targetObject.uploadStreamToS3(id, stream);
		logger.debug(`result data saved for id ${id}`);

		if (totalRecords !== records.flat().length) {
			throw new Error(`Error occurred while combining data chunks for data call with id: ${data.dataCalls.id}`);
		}

	} catch (error) {
		logger.error(error);
	}
};

module.exports = MatureEvent;
