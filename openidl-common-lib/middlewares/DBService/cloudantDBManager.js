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
const logger = log4js.getLogger('cloudantDB-manager');
logger.level = process.env.LOG_LEVEL || 'debug';
class CloudantDBManager {

    constructor(DBService) {
        this.createView = true;
        this.name = "cloudant";
        this.CloudantManagerDB = require('@cloudant/cloudant')(DBService);
    }

    async dbName() {
        return this.name;
    }

    async isView() {
        return this.createView;
    }
    async insert(payload, dbName) {
        logger.info('Inside cloudantdb insert', payload._id);
        let blockManagementDB = this.CloudantManagerDB.db.use(dbName);
        return new Promise(function (resolve, reject) {
            blockManagementDB.insert(payload, (err, doc) => {
                if (err) {
                    logger.error('Error inserting records:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

    }


    async get(id, dbName) {
        logger.info('Inside cloudantdb get', id);
        let blockManagementDB = this.CloudantManagerDB.db.use(dbName);
        return new Promise(function (resolve, reject) {
            try {
                blockManagementDB.get((id), (err, data) => {
                    if (err) {
                        logger.error('No record found in cloudant for', id);
                        logger.error(err);
                        resolve();
                    } else {
                        resolve(data);
                    }
                });
            } catch (err) {
                reject("error");
            }
        });
    }
    // Calls a view of the specified designname from a specific DB with optional query string params. 
    //@params{
    //   startkey: key,
    //   limit: limit + 1,
    //   group_level: 10
    //}
    //@DBName - the database name 
    async getViewData(viewName, params, DBname) {
        return new Promise((resolve, reject) => {
            let insuranceDB = this.CloudantManagerDB.db.use(DBname);
            logger.debug("ViewName" + viewName);
            logger.debug(params);
            insuranceDB.view('application', viewName, params).then((body) => {
                logger.info('Total Records = ' + body.rows.length);
                resolve(body);
            }).catch(function (error) {
                logger.error(error);
                reject(error);
            });
        });
    }
    async fetchCarrierNames(ids, dbName) {
        logger.info('Inside cloudantdb get fetchCarriername', ids, dbName);
        const carriersDB = this.CloudantManagerDB.db.use(dbName);
        return new Promise(function (resolve, reject) {
            try {
                carriersDB.find(({ selector: { _id: { $in: ids } } }), (err, data) => {
                    if (err) {
                        logger.error('No record found in cloudant for', ids);
                        logger.error(err);
                        resolve();
                    } else {
                        const arrayOfObjects = data.docs;
                        const idAndName = arrayToObject(arrayOfObjects);
                        resolve(idAndName);
                    }
                });
            } catch (err) {
                logger.error('unable to fetch records', err);
                reject("error");
            }
        });
    }
}
const arrayToObject = (array) =>
    array.reduce((obj, item) => {
        obj[item._id] = item.Name
        return obj
    }, {});

module.exports = CloudantDBManager;