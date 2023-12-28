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
const logger = log4js.getLogger('server - cloudant');
const fs = require('fs');
const cred = require("../cloudant/config/local-cloudant-config.json")
const cloudant = require('@cloudant/cloudant')(cred);
const const_DB = require('../cloudant/config/constant');
const insuranceDB = cloudant.db.use(const_DB.DB_NAME);
async function main() {
    try {
        const selectedOption = process.argv[2];
        console.log(selectedOption);
        if (selectedOption == "View_Count") {
            extractionPatternViewCount();
        } else {
            logger.info("Starting Cloudant script to recreate database with organization " + selectedOption);
            var org = selectedOption;
            var dbcount = Object.keys(DBConfig[org].databases).length;
            var count = 0;
            while (count < dbcount) {

                let _name = DBConfig[org].databases[count].name;
                logger.info("Start Script >>> database %s", _name);
                logger.info("Fetched database name %s from config file", DBConfig[org].databases[count].name);
                //deleting DB using nodejs APIs
                var check = await deleteDB(_name);
                if (check) {
                    logger.info("Database %s deleted successfully", _name);
                }
                //creating DB using nodejs APIs
                var check = await createDB(_name);
                if (check) {
                    logger.info("Database %s created successfully", _name);
                }
                //to create a design document
                /*if(typeof _designDoc != 'undefined')
                    var checkDocUpload=await uploadDesignDocument(_name,_designDoc);
                else {logger.info("No design document in config for uploading");}*/
                count++;
                logger.info("End Script >>> database %s", _name);
            }
        }



    } catch (err) {
        console.log(err);
    }
    logger.info("Script completed successfully");
}


function createDB(_name) {
    return new Promise(function (resolve, reject) {
        logger.debug("Database name " + _name);
        cloudant.db.get(_name, function (err) {
            // Check for error
            if (err) {
                // Database doesn't exist
                if (err.error == 'not_found') {
                    logger.debug('No %s found, creating %s', _name, _name);
                    cloudant.db.create(_name, function (err) {
                        if (err) {
                            return reject(new Error('Failed to create %s database due to error: %s', _name, err.stack ? err.stack : err));
                        }
                        logger.debug('Created %s database', _name);
                        // Specify it as the database to use
                        //let _database = cloudant.use(_name);
                        resolve(true);
                    });
                } else {
                    // Other error
                    return reject(new Error('Error creating %s database to store membership data: %s', _name, err.stack ? err.stack : err));
                }
            } else {
                // Database exists
                logger.debug('%s already exists', _name);
                // Specify it as the database to use
                //_database = cloudant.use(_name);
                resolve(true);
            }
        });
    });
}

async function deleteDB(_name) {
    return new Promise(function (resolve, reject) {
        cloudant.db.get(_name, function (err) {
            // Check for error
            if (err) {
                // Database doesn't exist
                if (err.error == 'not_found') {
                    logger.debug('No %s found, creating %s', _name, _name);
                    //return reject(new Error('Error deleting %s database , database doesnot exists', _name));
                    resolve(true);
                }
            } else {
                // Database exists
                logger.debug('Deleting database %s', _name);
                cloudant.db.destroy(_name, function (err) {
                    if (err) {
                        return reject(new Error('Failed to delete %s database due to error: %s', _name, err.stack ? err.stack : err));
                    }
                    logger.debug('Deleted %s database', _name);
                    resolve(true);
                });
            }
        });
    });
}

async function uploadDesignDocument(_name, designDoc) {
    return new Promise(function (resolve, reject) {
        if (typeof designDoc != 'undefined') {
            var _database = cloudant.use(_name);
            logger.debug('/server/cloudant/config/' + designDoc);
            fs.readFile('./server/cloudant/config/' + designDoc, function (err, data) {
                if (!err) {
                    let document = JSON.parse(data);
                    let views = document.views;
                    logger.debug("Document id for upload " + document._id);
                    _database.insert({
                            _id: document._id,
                            views
                        },
                        function (err, body) {
                            if (!err) {
                                logger.debug("Document inserted successfully");
                                resolve("true");
                            } else {
                                logger.debug(err);
                                reject("false");
                            }
                        });

                } else {
                    logger.debug(err);
                    reject("false");
                }
            });
        }
    });

}

async function extractionPatternViewCount() {
    console.log("In extraction pattern view count");
    const viewName = const_DB.VIEW_NAME;
    console.log("option>>" + viewName);
    //var demo_view= "89f1d090_0c4e_11ea_bcb4_a5b46ad5c76c_1";
    //var devurl = "2900e400_110e_11ea_bcb4_a5b46ad5c76c_1";
    //let carrier_name="54321"
    const _database = cloudant.db.use(const_DB.DB_NAME);
    console.log("insurance db view record ");
    //console.log(_database);
    _database.view('application', viewName, {
        // startkey: carrier_name[1],
        group_level: 10
    }).then((body) => {
        console.log('Total Records = ' + body.rows.length);

    }).catch(function (error) {
        console.log(error);

    });

}


main();