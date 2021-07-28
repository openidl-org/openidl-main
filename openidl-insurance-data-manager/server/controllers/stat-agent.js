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

const util = require('../helpers/util');
const transactionFactory = require('../helpers/transaction-factory');
const logger = log4js.getLogger('stat-agent');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const insuranceDataHandler = require('../middlewares/insurance-data-handler');
logger.level = config.logLevel;
const messageObject = require('../config/constant')
const sortJsonArray = require('sort-json-array');


//const sizeof = require('object-sizeof');



/**
 * Controller object
 */
const statAgent = {};
let jsonRes;
let deleteIteration = 0;
let maximumIteration = 4;
let generatedHash;
let loadHash
let totalRecordstoProcess = 0;
let totalDeletedRecords = 0;
let totalPartiallyInsertedRecords = 0;

/**
 * This method is parent method to hanlde to stroe documents into HDS as well as hashvalue in blockchain
 * @param {Object} request -- To handle the body payload request
 * @param {Object} response -- Send response to client
 */
statAgent.loadInsuranceData = async (request, response) => {
    logger.debug('Inside loadInsuranceData method.....');
    logger.info("REQUEST START TIME FOR CHUNKID " + request.body.chunkId + " " + new Date().toISOString());
    const insurancePayload = request.body;
    try {
        let validationResult = await util.validatePayload(insurancePayload);
        if (validationResult.success) {
            let formattedArray  = sortJsonArray(insurancePayload.records, 'SequenceNum','asc');
            insurancePayload.records = formattedArray
            let mongoExecResult = await insuranceDataHandler.insertBulkDocuments(insurancePayload);
            logger.info("REQUEST END TIME FOR CHUNKID " + request.body.chunkId + " " + new Date().toISOString());                                       
            util.sendResponse(response, mongoExecResult);
        }

        else {
            logger.info("REQUEST END TIME FOR VALIDATION ERRORED CHUNKID " + request.body.chunkId + " " + new Date().toISOString());
            util.sendResponse(response, validationResult);
        }
    } catch (error) {
        logger.info("REQUEST END TIME FOR RUNTIME Exception CHUNKID " + request.body.chunkId + " " + new Date().toISOString());
         let errorResponse = await util.apiResponse(error.statusCode, error.success, error.message)
          util.sendResponse(response, errorResponse);
    }
}

statAgent.saveInsuranceDataHash = async (req, res) => {
    logger.debug('inside saveInsuranceDataHash');
    const payload = req.body;
    if (jsonRes.success) {

        let blockchainPayload = {};
        //TODO: condition to verify field are there
        blockchainPayload.batchId = payload.batchId;
        blockchainPayload.carrierId = payload.carrierId;
        blockchainPayload.hash = payload.hash;
        blockchainPayload.createdTs = new Date().toISOString();

        try {
            logger.info('Start Save Insurance Data Hash : = ' + 'START_TIME = ' + new Date().toISOString());
            await transactionFactory.getCarrierChannelTransaction().submitTransaction('SaveInsuranceDataHash', JSON.stringify(blockchainPayload));
            logger.info('END Save Insurance Data Hash : END_TIME = ' + new Date().toISOString());
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'OK'
            };
        } catch (err) {
            logger.error('saveInsuranceDataHash error ', err);
            jsonRes = {
                statusCode: 500,
                success: false,
                message: `FAILED: ${err}`,
            };
        }
    }
    util.sendResponse(res, jsonRes);
};



async function deleteBulkInsuranceData(batchid, chunkid) {
    let deleteResult = await insuranceDataHandler.deleteBulkInsuranceData(totalPartiallyInsertedRecords, batchid, chunkid);
    totalDeletedRecords = totalDeletedRecords + deleteResult.totalprocessedrecords;
    logger.debug('Total records deleted from HDS - ' + totalDeletedRecords);
    logger.debug('Total records yet to be deleted from HDS - ' + totalPartiallyInsertedRecords - totalDeletedRecords);
    if (totalPartiallyInsertedRecords != totalDeletedRecords) {
        deleteIteration = deleteIteration + 1;
        if (deleteIteration < maximumIteration) deleteBulkInsuranceData(batchid, chunkid);
        else return false;
    }
    else return true;
}

 
function invokeDataHash(payload) {
    try {
        generatedHash = generateHash(payload);

        logger.info('Start Save Insurance Data Hash : = ' + 'START_TIME = ' + new Date().toISOString());
        transactionFactory.getCarrierChannelTransaction().submitTransaction('SaveInsuranceDataHash', JSON.stringify(generatedHash));
        logger.info('END Save Insurance Data Hash : END_TIME = ' + new Date().toISOString());
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('saveInsuranceDataHash error ', err);

        iteration = iteration + 1;
        if (iteration < maxiteration) {
            this.invokeDataHash(payload);
        }
        else {
            jsonRes = {
                statusCode: 500,
                success: false,
                message: `FAILED: ${err}`,
            };
        }
    }
    return jsonRes;
}

const saveInsuranceDataHash = async (batchID, chunkID, hashData) => {

    let blockchainResult;
    logger.debug('Inside saveInsuranceDataHash method ..... ');

    let blockchainPayload = {};
    blockchainPayload.batchId = batchID;
    blockchainPayload.carrierId = chunkID;
    blockchainPayload.hash = hashData;
    blockchainPayload.createdTs = new Date().toISOString();

    try {
        logger.info('Start Save Insurance Data Hash : = ' + 'START_TIME = ' + new Date().toISOString());
        await transactionFactory.getCarrierChannelTransaction().submitTransaction('SaveInsuranceDataHash', JSON.stringify(blockchainPayload));
        logger.info('END Save Insurance Data Hash : END_TIME = ' + new Date().toISOString());
        blockchainResult = {
            statusCode: 200,
            success: true,
            message: 'Success: Hash data loaded into ledger'
        };
    } catch (err) {
        logger.error('saveInsuranceDataHash error ', err);
        blockchainResult = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    return blockchainResult;
};

statAgent.saveInsuranceDataHDS = async (req, res) => {

    logger.debug('inside saveInsuranceDataHDS');
    const payload = req.body;
    const id = payload.carrierId + "-" + payload.batchId + "-" + uuidv1();

    let cloudantPayload = payload;
    cloudantPayload._id = id;
    cloudantPayload.documentId = id;

    //save data to off-chain database first
    let documentExists = false;
    let isDataSaved = false;
    await insuranceDataHandler.saveInsuranceData(cloudantPayload).then(
        function (result) {
            isDataSaved = true;
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'OK'
            };
        },
        function (err) {

            if (((err + "").indexOf("Document update conflict")) != -1) {
                console.log('this is heref')

                documentExists = true;
            }
            else {
                logger.error("Error inserting document:" + err);
                isDataSaved = false;
                logger.error('saveInsuranceDataHDS error ', err);
                jsonRes = {
                    statusCode: 500,
                    success: false,
                    message: `FAILED: ${err}`,
                };
            }

        }
    )

    if (documentExists) {
        let revId;
        try {
            revId = await insuranceDataHandler.getInsuranceData(id);
        }
        catch (err) {
            logger.error("Error retrieving document for " + id + ":" + err);
            revId = "0";
            isDataSaved = false;
            logger.error('saveInsuranceDataHDS error ', err);
            jsonRes = {
                statusCode: 500,
                success: false,
                message: `FAILED: ${err}`,
            };
        }
        if (revId != "0") {
            cloudantPayload._rev = revId;
            await insuranceDataHandler.saveInsuranceData(cloudantPayload).then(
                function (result) {
                    logger.debug("Docuement updated successfully:" + id);
                    isDataSaved = true;
                    jsonRes = {
                        statusCode: 200,
                        success: true,
                        message: 'OK'
                    };
                },
                function (err) {
                    logger.error("Error updating document:" + err);
                    isDataSaved = false;
                    logger.error('saveInsuranceDataHDS error ', err);
                    jsonRes = {
                        statusCode: 500,
                        success: false,
                        message: `FAILED: ${err}`,
                    };
                }
            );
        }
    }

    util.sendResponse(res, jsonRes);


};

statAgent.saveInsuranceDataHDSError = async (req, res) => {
    logger.debug('inside saveInsuranceDataHDSError');
    const payload = req.body;
    const id = "err_" + payload.carrierId + "-" + payload.batchId + "-" + uuidv1();

    let cloudantPayload = payload;
    cloudantPayload._id = id;
    cloudantPayload.documentId = id;

    //save data to off-chain database first
    let documentExists = false;
    let isDataSaved = false;
    await insuranceDataHandler.saveInsuranceData(cloudantPayload).then(
        function (result) {
            isDataSaved = true;
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'OK'
            };
        },
        function (err) {

            if (((err + "").indexOf("Document update conflict")) != -1) {
                console.log('this is heref')

                documentExists = true;
            }
            else {
                logger.error("Error inserting document:" + err);
                isDataSaved = false;
                logger.error('saveInsuranceDataHDS error ', err);
                jsonRes = {
                    statusCode: 500,
                    success: false,
                    message: `FAILED: ${err}`,
                };
            }

        }
    )

    if (documentExists) {
        let revId;
        try {
            revId = await insuranceDataHandler.getInsuranceData(id);
        }
        catch (err) {
            logger.error("Error retrieving document for " + id + ":" + err);
            revId = "0";
            isDataSaved = false;
            logger.error('saveInsuranceDataHDSError error ', err);
            jsonRes = {
                statusCode: 500,
                success: false,
                message: `FAILED: ${err}`,
            };
        }
        if (revId != "0") {
            cloudantPayload._rev = revId;
            await insuranceDataHandler.saveInsuranceData(cloudantPayload).then(
                function (result) {
                    logger.debug("Docuement updated successfully:" + id);
                    isDataSaved = true;
                    jsonRes = {
                        statusCode: 200,
                        success: true,
                        message: 'OK'
                    };
                },
                function (err) {
                    logger.error("Error updating document:" + err);
                    isDataSaved = false;
                    logger.error('saveInsuranceDataHDSError error ', err);
                    jsonRes = {
                        statusCode: 500,
                        success: false,
                        message: `FAILED: ${err}`,
                    };
                }
            );
        }
    }

    util.sendResponse(res, jsonRes);


};
statAgent.insuranceData = async (req, res) => {

    logger.info("insuranceData method entry -");
    let payload;
    payload = req.body;

    jsonRes = util.isValidInsuranceDataPayload(payload);

    if (!jsonRes.statusCode) {
        let currentTimeStamp = (new Date()).toISOString();

        let id = payload.carrier_id + "-" + payload.batch_id;

        let cloudantPayload = new Object();
        cloudantPayload._id = id;
        cloudantPayload.createdTs = currentTimeStamp;
        cloudantPayload.records = payload.records;
        cloudantPayload.documentId = id;

        //save data to off-chain database first
        let documentExists = false;
        let isDataSaved = false;
        await insuranceDataHandler.saveInsuranceData(cloudantPayload).then(
            function (result) {
                isDataSaved = true;

            },
            function (err) {

                if (((err + "").indexOf("Document update conflict")) != -1) {
                    console.log('this is heref')

                    documentExists = true;
                }
                else {
                    logger.error("Error inserting document:" + err);
                    isDataSaved = false;
                }

            }
        )

        if (documentExists) {
            let revId;
            try {
                revId = await insuranceDataHandler.getInsuranceData(id);
            }
            catch (err) {
                logger.error("Error retrieving document for " + id + ":" + err);
                revId = "0";
                isDataSaved = false;
            }
            if (revId != "0") {
                cloudantPayload._rev = revId;
                await insuranceDataHandler.saveInsuranceData(cloudantPayload).then(
                    function (result) {
                        logger.debug("Docuement updated successfully:" + id);
                        isDataSaved = true;
                    },
                    function (err) {
                        logger.error("Error updating document:" + err);
                        isDataSaved = false;
                    }
                );
            }
        }

        if (isDataSaved) {
            //save data hash to blockchain ledger only if save to off-chain database is successful.
            //create a test case for hash computation
            const payloadHash = crypto.createHash('sha256')
                .update(JSON.stringify(cloudantPayload.records))
                .digest('hex');

            let blockchainPayload = new Object();
            blockchainPayload['batchId'] = payload.batch_id;
            blockchainPayload['carrierId'] = payload.carrier_id;
            blockchainPayload['hash'] = payloadHash;
            blockchainPayload['createdTs'] = currentTimeStamp;

            try {
                //logger.info("Start Save Insurance Data Hash : Size of the payload = " + sizeof(blockchainPayload) + "START_TIME = " + new Date().toISOString());  
                await transactionFactory.getCarrierChannelTransaction().submitTransaction('SaveInsuranceDataHash', JSON.stringify(blockchainPayload));
                logger.info("END Save Insurance Data hash END_TIME = " + new Date().toISOString());
                jsonRes = {
                    statusCode: 200,
                    success: true,
                    message: 'OK'
                };
            } catch (err) {
                logger.error('saveInsuranceDataHash error ', err);
                jsonRes = {
                    statusCode: 500,
                    success: false,
                    message: `FAILED: ${err}`,
                };
            }
        }
        else {
            logger.error('error storing insurance data in off-chain database.');
            jsonRes = {
                statusCode: 500,
                success: false,
                message: `FAILED: error storing insurance data in off-chain database.`,
            };
        }

    }
    util.sendResponse(res, jsonRes);
};

//ensure insurance data payload is as per specifications.
module.exports = statAgent;