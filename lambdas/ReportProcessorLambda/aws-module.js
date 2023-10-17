const AWS = require('aws-sdk');
const csvjson = require('csvjson');
const csvtojson = require('csvtojson');
const logger = require('loglevel');
const config = require('config');
const bucketConfig = require('./config/s3-bucket-config.json');
logger.setLevel(config.get('loglevel'));

//configuring the AWS environment
AWS.config.update({
    region: process.env.REGION
});
class S3BucketManager {
    constructor() { }
    async saveTransactionalData(input) {
        logger.debug('Inside saveTransactionalData');
        let bucket = new AWS.S3();
        logger.debug(" saveObjectParam bucket: " + bucketConfig.bucketName + " key: " + input._id)
        let insertObjectParam = { Bucket: bucketConfig.bucketName, Key: input._id, Body: JSON.stringify(input.records) };
        try {
            const data = await bucket.putObject(insertObjectParam).promise();
            logger.debug('Records Inserted Successfully');
        } catch (err) {
            logger.error(err);
        }
    }

    async getTransactionalData(getObjectParam) {
        logger.debug("Inside getTransactionalData");
        let bucket = new AWS.S3();
        logger.info("Params: ", getObjectParam)
        try {
            const data = await bucket.getObject(getObjectParam).promise();
            return data
        } catch (err) {
            logger.error(err);
        }
    }
    async getAllObjectsWithPrefix(params, prefix) {
        logger.debug("Inside getAllObjectsWithPrefix, prefix: ", prefix);
        logger.debug("Inside getAllObjectsWithPrefix, param: ", params);
        let bucket = new AWS.S3();
        let listParam = { Bucket: params.Bucket, Prefix:prefix };
        try {
          const data = await bucket.listObjectsV2(listParam).promise();
          logger.debug("Inside getAllObjectsWithPrefix, result data ", data);
          return data;
        } catch (err) {
            logger.error(err);
        }
    }
    async deleteObject(deleteObjectParam) {
        logger.debug('Inside deleteObject');
        logger.info("Params: ", deleteObjectParam)
        let bucket = new AWS.S3();
        try {
            const data = await bucket.deleteObject(deleteObjectParam).promise();
            logger.debug("deleteobject result: " + JSON.stringify(data))
            logger.debug('Object Deleted Successfully');
        } catch (err) {
            logger.error(err);
        }
    }

    async deleteObjects(params, keys) {
        logger.debug('Inside deleteObjects');
        const deleteObjectsParam = { Bucket:  params.Bucket, Delete: {Objects: keys} };
        logger.info("Params: ", deleteObjectsParam)
        let bucket = new AWS.S3();
        try {
            const data = await bucket.deleteObjects(deleteObjectsParam).promise();
            logger.debug("deleteobjects result: " + JSON.stringify(data))
            logger.debug('Objects Deleted Successfully');
        } catch (err) {
            logger.error(err);
        }
    }

    async getCSV(id) {
        logger.debug("Inside getCSV");
        let bucket = new AWS.S3();
        let getObjectParam = { Bucket: bucketConfig.bucketName, Key: id };
        try {
            const data = bucket.getObject(getObjectParam).createReadStream();
            const json = await csvtojson().fromStream(data);
            return json;
        } catch (err) {
            logger.error(err);
        }
    }
    async uploadCSV(data, datacallId) {
        try {
            const csvData = csvjson.toCSV(data, { headers: 'key' });
            logger.debug("Inside uploadCSV");
            let bucket = new AWS.S3();
            const params = {
                Bucket: bucketConfig.bucketName, // your bucket name
                Key: "report-" + datacallId + ".csv",
                Body: csvData,
                ContentType: 'text/csv',
            };
            await bucket.upload(params).promise();
        } catch (err) {
            logger.error(err);
        }
    }
}
module.exports = S3BucketManager;