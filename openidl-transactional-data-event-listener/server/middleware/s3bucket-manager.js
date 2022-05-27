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

    async getTransactionalData(id) {
        logger.debug("Inside getTransactionalData");
        const accessParams = await this.getAccessParams();
        logger.debug("accessparams: ", accessParams);
        let bucket = new AWS.S3(accessParams);
        let getObjectParam = { Bucket: bucketConfig.bucketName, Key: id };
            const data = await bucket.getObject(getObjectParam).promise();
            console.log("getobject data is - " + JSON.stringify(data))
            console.log("getobject body is - " + JSON.stringify(JSON.parse(data.Body), null, 2))
            return data.VersionId
    }
    async saveTransactionalData(input) {
        logger.debug('Inside saveTransactionalData');
        const accessparams = await this.getAccessParams();
        let bucket = new AWS.S3(accessparams);
        logger.debug(" saveObjectParam bucket: " + bucketConfig.bucketName + " key: " + input._id)
        logger.debug("  records: " + JSON.stringify(input.records))
        let insertObjectParam = { Bucket: bucketConfig.bucketName, Key: input._id, Body: JSON.stringify(input.records) };
        try {
            const data = await bucket.putObject(insertObjectParam).promise();
            logger.debug("After  putobject " + JSON.stringify(data))
            logger.debug('Records Inserted Successfully');
        } catch (err) {
            logger.error(err);
        }
    }
}
module.exports = S3BucketManager;
