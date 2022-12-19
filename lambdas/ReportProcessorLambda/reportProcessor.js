const config = require('config');
const logger = require('loglevel');
logger.setLevel(config.get('loglevel'));
const S3BucketManager = require('./aws-module.js');
class ReportProcessor {
	async readResult(params) {
		const s3b = new S3BucketManager();
		let data;
		try {
			var resArray = []
			data = await s3b.getTransactionalData(params);
			data = JSON.parse(data.Body);
			for (var i = 0; i < data.length; i = i + 1) {
				const buff = Buffer.from(data[i].data);
				const dataString = buff.toString();
				const dataJson = JSON.parse(dataString)
				resArray = resArray.concat(dataJson)
			}
			return resArray;
		} catch (err) {
			logger.error("Error in reading result: ", err)
		}
	}

	async deleteResult(params) {
		const s3b = new S3BucketManager();
		try {
			await s3b.deleteObject(params);
		} catch (err) {
			logger.error("Error in deleting result: ", err)
		}
	}
	async deleteConsentFiles(params, datacallId) {
		const s3b = new S3BucketManager();
		let data = {};
		try {
			data = await s3b.getAllObjectsWithPrefix(params, datacallId);
		} catch (err) {
			throw new Error("Error in getting all consent files. ", err)
		}
		if (!data.Contents || data.Contents.length < 1) {
			throw new Error("No Consent file to delete!")
		}
		const resKeys = [];
		for (var i = 0; i < data.Contents.length; i = i + 1) {
			const resItem = { Key: data.Contents[i].Key }
			resKeys.push(resItem)
		}
		logger.info("Object keys to be deleted: ", resKeys)
		try {
			await s3b.deleteObjects(params, resKeys);
		} catch (err) {
			logger.error("Error in deleting Consent files. ", err)
		}

	}

	async createReportContent(resultData, dmvData) {
		const reportData = [];
		const resultDataIds = resultData.map(data => data._id);
		const resultDataSetObject = new Set(resultDataIds);
		for (let i = 0; i < dmvData.length; i = i + 1) {
			const row = { "vin": dmvData[i].VIN, "isInsured": "no" };
			const isDmvDataExists = resultDataSetObject.has(dmvData[i].VINHash);
			if(isDmvDataExists){
				row["isInsured"] = "yes";
			}
			reportData.push(row);
		}
		return reportData
	}

	async publishCSV(data, datacallId) {
		const s3b = new S3BucketManager();
		try {
			await s3b.uploadCSV(data, datacallId);
		} catch (err) {
			logger.error("Error in publishing CSV: ", err)
		}
	}

	async getCSV(id) {
		const s3b = new S3BucketManager();
		try {
			await s3b.getCSV(id);
		} catch (err) {
			logger.error("Error in getting CSV: ", err)
		}
	}
}

module.exports = ReportProcessor;
