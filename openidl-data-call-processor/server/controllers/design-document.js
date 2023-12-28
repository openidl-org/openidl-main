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
const logger = log4js.getLogger('designDocument-Update');
logger.level = config.logLevel;
const Cloudant = require('@cloudant/cloudant');

const designDocument = {};

designDocument.updateDesignDocument = async(extractionPattern,viewName,carrierId) => {
    logger.debug("In updateDesign Document carrier ID"+carrierId);
    let DBName=config.insuranceDB+"_"+carrierId;
    logger.debug("In updateDesign Document DB name"+DBName);

    const cloudant = Cloudant(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
    const insuranceDB = cloudant.db.use(DBName);

    return new Promise((resolve, reject) => {
        const designDoc = {
            _id: '_design/application',
            language: 'javascript',
            views: {}
        };
       // let exView = JSON.parse(extractionPattern.couchDBView.definition);
       let exView = extractionPattern.viewDefinition;
        const newView = {
            map: exView.map,
            reduce: exView.reduce
        }
        insuranceDB.get('_design/application', function(err, data) {
            if (err) {
                insuranceDB.insert(designDoc, function(err, result) {
                    if (err) {
                        logger.error('Error ' + err);
                        reject(err);
                    } else {
                        logger.info('designDocument successfully updated');
                        let views = {};
                        views[viewName] = newView;
                        designDoc['_rev'] = result.rev;
                        designDoc['views'] = views;
                        insuranceDB.insert(designDoc, function(err, result) {
                            if (err) { reject(err); }
                            resolve(viewName);
                        });
                    }
                });
            } else {
                logger.info('Document already exits, updating the view');
                const views = data.views;
                views[viewName] = newView;
                designDoc['_rev'] = data._rev;
                designDoc['views'] = views
                insuranceDB.insert(designDoc, function(err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(viewName);

                });
            }

        });
    })
};
module.exports = designDocument;
