const config = require('config');
const logger = require('loglevel');
logger.setLevel(config.get('loglevel'));
const S3BucketManager = require('./aws-module.js');
class ReportProcessor {
	async readResult(params) {
		const s3b = new S3BucketManager();
		try {
			let data = await s3b.getTransactionalData(params);
			logger.info("data from s3: ", data);
			data = JSON.parse(data.Body);
			return data;
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
			if (isDmvDataExists) {
				row["isInsured"] = "yes";
			}
			reportData.push(row);
		}
		return reportData
	}

	async createReportMetadataContent(resultData, dmvData) {
		const dmvDataIds = dmvData.map(data => data.VIN);
		const dmvDataSetObject = new Set(dmvDataIds);
		let matchCount = 0;
		let nonmatchCount = 0;
		const totalCount = resultData.length;

		for (let i = 0; i < resultData.length; i = i + 1) {
			if (dmvDataSetObject.has(resultData[i]._id) ) {
				matchCount = matchCount + 1;
			}
			else {
				nonmatchCount = nonmatchCount +1;
			}
		}
		const reportMetadata = [{
			"Match With DMV: Count": matchCount,
			"Non-match With DMV: Count": nonmatchCount,
			"Match With DMV: Percentage": (100.0*matchCount/totalCount).toFixed(2),
			"Non-match With DMV: Percentage": (100.0*nonmatchCount/totalCount).toFixed(2),
			"Total DMV Records: Count": dmvData.length,
			"Total Registered Records: Count": resultData.length,
		}]
		return reportMetadata
	}

	async publishCSV(data, datacallId) {
		const s3b = new S3BucketManager();
		try {
			await s3b.uploadCSV(data, datacallId);
		} catch (err) {
			logger.error("Error in publishing CSV: ", err)
		}
	}

	async publishCSVMetadata(data, datacallId) {
		const s3b = new S3BucketManager();
		try {
			await s3b.uploadCSVMetadata(data, datacallId);
		} catch (err) {
			logger.error("Error in publishing CSV Metadata: ", err)
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
