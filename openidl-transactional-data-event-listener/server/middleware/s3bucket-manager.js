/**
 SPDX-License-Identifier: Apache-2.0
*/
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
    async saveTransactionalData(input) {
        logger.debug('Inside saveTransactionalData');
        return new Promise(function (resolve, reject) {
            let bucket = new AWS.S3();
            let insertObjectParam = { Bucket: bucketConfig.bucketName, Key: input._id, Body: JSON.stringify(input.records) };
            bucket.putObject((insertObjectParam), (err) => {
                if (err) {
                    logger.error('Error inserting records:' + err);
                    reject(err);
                } else {
                    logger.debug('Records Inserted Successfully');
                    resolve('Records Inserted Successfully');
                }
            });

        });
    }

    async getTransactionalData(id) {
        logger.debug("Inside getTransactionalData");
        return new Promise(function (resolve, reject) {
            let bucket = new AWS.S3();
            let getObjectParam = { Bucket: bucketConfig.bucketName, Key: id };

            try {
                bucket.getObject((getObjectParam), (err, data) => {
                    if (err) {
                        logger.debug('No record found' + err);
                        reject('error')
                    } else {
                        logger.debug("Inside getTransactionalData, Record exist, upadting in s3Bucket");
                        resolve(data._rev);
                    }
                });
            } catch (err) {
                logger.err("error retrieving document:" + err);
                reject("error");
            }

        })
    }
}
module.exports = S3BucketManager;
