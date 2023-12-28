const AWS = require('aws-sdk');
const bucketConfig = require('./config/s3Bucket-config.json')

/*
//set up logging
const logger = log4js.getLogger('s3Bucket-utility');
logger.level = "DEBUG";

*/

//configuring the AWS environment
const getAllObjects = async () => {
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
    let bucket = new AWS.S3(accessparams);

    let listParam = { Bucket: bucketConfig.bucketName, Prefix: bucketConfig.prefix };

    try {
        const data = bucket.listObjectsV2(listParam).promise();
        console.log(err)
    } catch (err) {
        console.log(err)
    }
}
getAllObjects();