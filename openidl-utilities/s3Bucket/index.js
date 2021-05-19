/**
 SPDX-License-Identifier: Apache-2.0
*/
const AWS = require('aws-sdk');
const bucketConfig = require('./config/s3Bucket-config.json')

/*
//set up logging
const logger = log4js.getLogger('s3Bucket-utility');
logger.level = "DEBUG";

*/

//configuring the AWS environment
AWS.config.update({
    accessKeyId: bucketConfig.accessKeyId,
    secretAccessKey: bucketConfig.secretAccessKey
});

let bucket = new AWS.S3();
// Prefix= CarrierId-DataCallID
let listParam = { Bucket: bucketConfig.bucketName,Prefix:bucketConfig.prefix };

bucket.listObjectsV2(listParam, function (err, data) {
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {
        console.log(data);
    }         // successful response

});