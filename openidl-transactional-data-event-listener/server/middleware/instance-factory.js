/**
 SPDX-License-Identifier: Apache-2.0
*/
const log4js = require('log4js');
const config = require('config');
const S3BucketManager = require('./s3bucket-manager');
const CloudantManager = require('./cloudant-manager');
const MongoDBManager = require('./mongodb-manager');

// set up logging
const logger = log4js.getLogger('InstanceFactory');
logger.level = config.logLevel;
class InstanceFactory {
    constructor() {
        this.option = null;
        this.instance = null;
    }
    async getInstance(option) {
        logger.info('Inside InstanceFactory');
        this.option = option;
        logger.info('TransactionalDataManagerDB option selected', this.option);
        switch (this.option) {
            case "s3Bucket":
                this.instance = new S3BucketManager();
                break;
            case "cloudant":
                this.instance = new CloudantManager();
                break;
            case "mongo":
                await MongoDBManager.initMongoDBConnection();
                this.instance = new MongoDBManager();
        }
        return (this.instance);
    }
}
module.exports = InstanceFactory;
