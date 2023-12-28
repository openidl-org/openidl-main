'use strict';

/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


const log4js = require('log4js');
const config = require('config');
const Cloudant = require('@cloudant/cloudant');

// set up logging
const logger = log4js.getLogger('cloudant-manager');
logger.level = config.logLevel;

class CloudantManager {
    constructor() { }

    async saveTransactionalData(input) {
        const cloudant = Cloudant(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
        const transactionalDataManagerDB = cloudant.db.use(config.transactionalDataManagerDB);
        logger.debug('Inside saveTransactionalData')
        return new Promise(function (resolve, reject) {
            transactionalDataManagerDB.insert((input), (err) => {
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
        logger.debug("inside getTransactionalData");
        const cloudant = Cloudant(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
        const transactionalDataManagerDB = cloudant.db.use(config.transactionalDataManagerDB);
        return new Promise(function (resolve, reject) {
            try {
                transactionalDataManagerDB.get((id), (err, data) => {
                    if (err) {
                        logger.debug('No record found' + err);
                        reject('error')
                    } else {
                        logger.debug("inside getTransactionalData Record exist, upadting in cloudant");
                        resolve(data._rev);
                    }
                });
            } catch (err) {
                logger.err("error retrieving document:" + err);
                reject("error");
            }
        });
    }

}
module.exports = CloudantManager;

