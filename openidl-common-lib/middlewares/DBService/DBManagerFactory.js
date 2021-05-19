// SPDX-License-Identifier: Apache-2.0
const log4js = require('log4js');
const config = require('config');
const lodash = require('lodash');
const CloudantDBManager = require('./cloudantDBManager');
const MongoDBManager = require('./mongoDBManager');
const logger = log4js.getLogger('DBManagerFactory');
logger.level = config.logLevel;

let DBConfig;
let mongoDBName;

try {
    DBConfig = require('../../../../server/config/DBConfig.json');
    mongoDBName = DBConfig.databaseService[0].mongodb;
} catch (err) {
    logger.info('DBConfig not found!!');
}


class DBManagerFactory {
    constructor() {
        this.option = null;
        this.instance = null;
    }
    async getInstance() {
        logger.info('Inside DBManagerFactory getInstance');
        logger.info('Persistent store selected', DBConfig.persistentStore);
        try {
            this.option = DBConfig.persistentStore;
            let dbservice = lodash.filter(DBConfig.databaseService, { 'name': this.option });
            let mongoDBInstance = new MongoDBManager(dbservice);
            switch (this.option) {
                case "mongo":
                    let simpleURI = DBConfig.databaseService[0].simpleURI
                    if (simpleURI) {  // use the simple db connection
                        mongoDBInstance.initSimpleMongoDBConnection(mongoDBName, simpleURI)
                    } else {  // use the cloud db connection
                        await mongoDBInstance.initMongoDBConnection(mongoDBName);
                    }
                    return mongoDBInstance;
                case "cloudant":
                    return new CloudantDBManager(dbservice)
            }
        } catch (error) {
            throw error;
        }

    }


}
module.exports = DBManagerFactory;
