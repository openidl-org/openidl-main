const AWS = require('aws-sdk');
const log4js = require('log4js');
const config = require('config');
const bucketConfig = require('../config/s3-bucket-config.json')

//set up logging
const logger = log4js.getLogger('s3bucket-manager');
logger.level = config.logLevel;

//configuring the AWS environment
AWS.config.update({
    accessKeyId: bucketConfig.accessKeyId,
    secretAccessKey: bucketConfig.secretAccessKey
});
class S3BucketManager {
    constructor() { }
    async getAccessParams() {
        const sts = new AWS.STS({
            //region: 'us-east-2',
            accessKeyId: bucketConfig.accessKeyId,
            secretAccessKey: bucketConfig.secretAccessKey

        });
        const params = bucketConfig.roleParams;

        const accessParamInfo = await sts.assumeRole(params).promise();
        logger.debug('Changed Credentials');

        const accessparams = {
            accessKeyId: accessParamInfo.Credentials.AccessKeyId,
            secretAccessKey: accessParamInfo.Credentials.SecretAccessKey,
            sessionToken: accessParamInfo.Credentials.SessionToken,
        };
        return accessparams;
    }

    async getTransactionalDataByDatacall(dataCallId) {
        logger.info("Inside getTransactionalDataByDataCall, datacallId is ", dataCallId);
        const accessParams = await this.getAccessParams();
        let bucket = new AWS.S3(accessParams);
        let getObjectParam = { Bucket: bucketConfig.bucketName, Prefix: dataCallId };
        try {
            const data = await bucket.listObjects(getObjectParam).promise();
            return data
        } catch (err) {
            logger.error(err)
        }
    }
    async getData(id) {
        logger.info("Inside getData, id is ", id);
        const accessParams = await this.getAccessParams();
        let bucket = new AWS.S3(accessParams);
        let getObjectParam = { Bucket: bucketConfig.bucketName, Key: id };
        try {
            const data = await bucket.getObject(getObjectParam).promise();
            return data
        } catch (err) {
            logger.error(err)
        }
    }


    async getTransactionalData(id) {
        logger.debug("Inside getTransactionalData");
        const accessParams = await this.getAccessParams();
        let bucket = new AWS.S3(accessParams);
        let getObjectParam = { Bucket: bucketConfig.bucketName, Key: id };
        try {
            const data = await bucket.getObject(getObjectParam).promise();
            return data.VersionId
        } catch (err) {
            logger.error(err)
        }
    }
    async saveTransactionalData(input) {
        logger.debug('Inside saveTransactionalData');
        const accessparams = await this.getAccessParams();
        let bucket = new AWS.S3(accessparams);
        logger.debug(" saveObjectParam bucket: " + bucketConfig.bucketName + " key: " + input._id)
        let insertObjectParam = { Bucket: bucketConfig.bucketName, Key: input._id, Body: JSON.stringify(input.records) };
        try {
            const data = await bucket.putObject(insertObjectParam).promise();
            logger.debug('Records Inserted Successfully');
        } catch (err) {
            logger.error(err);
        }
    }
}
module.exports = S3BucketManager;