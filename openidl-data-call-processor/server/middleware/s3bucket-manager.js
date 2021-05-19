// SPDX-License-Identifier: Apache-2.0
const AWS = require('aws-sdk');
const log4js = require('log4js');
const config = require('config');
const bucketConfig = require('../config/s3-bucket-config.json');
const { json } = require('express');

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
        return new Promise(function (resolve, reject) {
            logger.debug('Inside saveTransactionalData');
            let bucket = new AWS.S3();
            logger.debug(" saveObjectParam bucket: " + bucketConfig.bucketName + " key: " + input._id)
            logger.debug("  records: " + JSON.stringify(input.records))
            let insertObjectParam = { Bucket: bucketConfig.bucketName, Key: input._id, Body: JSON.stringify(input.records) };
            bucket.putObject((insertObjectParam), (err,data) => {
                if (err) {
                    logger.error('Error inserting records:' + err);
                    reject(err);
                } else {
                    logger.debug("After  putobject " + JSON.stringify(data))
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
                logger.debug(" getObjectParam bucket=" + bucketConfig.bucketName + "  key=" + id)
                bucket.getObject((getObjectParam), (err, data) => {
                   
                   
                    if (err) {
                        logger.debug("getobject error is " + err)
                        logger.debug('No record found' + err);
                        reject('error')
                    } else {
                        logger.debug("getobject data is - JSON.stringify " + JSON.stringify(data))
                        logger.debug("getobject data is " + data)
                        logger.debug("Inside getTransactionalData, Record exist, data._rev, upadting in s3Bucket *************** " + data._rev);
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