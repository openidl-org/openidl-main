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
const messageObject = require('./constant')

//vv
// const metaData = require('../config/metadata.json');
/**
 * Set up logging
 */
const logger = log4js.getLogger('helpers - util');
logger.level = config.logLevel;

/**
 * Util object
 */
const util = {};

util.apiResponse = async (statusCode, success, errorMessage, batchId = '', chunkId = '', inputRecords = 0, processedRecords = 0, unProcessedRecords = 0) => {

    return {
        "statusCode": statusCode,
        "success": success,
        "message": errorMessage,
        "batchId": batchId,
        "chunkId": chunkId,
        "inputDocuments": inputRecords,
        "processedDocuments": processedRecords,
        "unProcessedDocuments": unProcessedRecords
    }
}

util.isMongoServiceRunning = async (dbManagerFactory, collectionName, carrierIds) => {
    logger.info("Inside isMongoServiceRunning method......");
    try {
        let dbManager = dbManagerFactory.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
        logger.debug("DB Manager instantiated successfully ");
        if (dbManager) return true;
        else return false;
    } catch (error) {
        return false;
    }
};

// util.createCollection = async (dbManagerFactory, collectionName) => {
//     logger.debug("Inside createCollection method......");
//     try {
//             let carrierIds = metaData.carrierIds
//             let collections = metaData.collections;
//             if(carrierIds.length > 0) {
//             let dbManager = await dbManagerFactory.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
//             logger.debug("DB Manager instantiated successfully ");
//             if (dbManager) {
//                 carrierIds.forEach(carrierId => {
//                     let dbCollectionResult = dbManager.createCollection(collectionName + "_" + carrierId);
//                     if (dbCollectionResult) logger.info("Mogodb collection is created successfully - " + collectionName + "_" + carrierId);
//                     else logger.info("Failed to create mongodb collection or collection is already exits - " + collectionName + "_" + carrierId);

//                     collections.forEach(collection => {
//                         let dbMiscCollection = dbManager.createCollection(collectionName + "_"+ collection + "_" + carrierId);
//                         if (dbMiscCollection) logger.info("Mogodb collection is created successfully - " + collectionName + "_"+ collection + "_" + carrierId);
//                         else logger.info("Failed to create mongodb collection or collection is already exits - " + collectionName + "_"+ collection + "_" + carrierId);
//                     });

//                 });
//                 return true;
//             }
//             else {
//                 logger.debug("Failed to instantiate DB Manager ");
//                 return false
//             }
//         } else {
//             logger.debug("No carrierid is configured in metadata.json file");
//             return false
//         }
//     } catch (error) {
//         return false;
//     }
// };

// const filterCarrierData = async (carrierid) => {
//     return  metaData.carrier.filter(data => data.Id == carrierid)
//   }

// util.createIndex = async (dbManagerFactory, collectionName) => {
//     logger.debug("Inside createIndex method......");
//     try {
//         let carrierIds = metaData.carrierIds
//         let dbManager = await dbManagerFactory.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
//         logger.debug("DB Manager instantiated successfully ");
//         if (dbManager) {
//             carrierIds.forEach(carrierId => {

//                 let carrierData =  filterCarrierData(carrierId)
//                 console.log(carrierData)
//                 // let dbIndexResult = dbManager.createIndex(collectionName + "_" + carrierId);
//                 // if (dbIndexResult) logger.info("Index is created successfully on collection - " + collectionName + "_" + carrierId);
//                 // else logger.info("Failed to create index or index is already exist in the collection - " + collectionName + "_" + carrierId);
//             });
//             return true;
//         }
//         else {
//             logger.debug("Failed to instantiate DB Manager ");
//             return false
//         }
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
// };



/**
 * Send http response helper
 * res: express response object
 * msg: {statusCode (int), success (bool), message (string), etc}
 */
util.sendResponse = (res, msg) => {
    const response = msg;
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = response.statusCode;
    delete response.statusCode;
    res.json(response);
};

/**
 * Get network config file path for org
 */
util.getNetworkConfigFilePath = (org) => {
    return `${__dirname}/../../fabric-network/network-config-${org}.json`;
};

util.dataloadValidation = (payload) => {
    let jsonRes = Object();
    if (!payload.batchId) {
        logger.error('BatchId is missing in the Request payload');
        jsonRes = {
            statusCode: 500,
            success: false,
            message: 'FAILED: BatchId is missing in the Request payload',
        };
    }
    else if (!payload.chunckid) {
        logger.error('Chunk ID is missing in the Request payload');
        jsonRes = {
            statusCode: 500,
            success: false,
            message: 'FAILED: Chunkid is missing in the Request payload',
        };
    }
    else if (!payload.carrierId) {
        logger.error('CarrierId is missing in the Request payload');
        jsonRes = {
            statusCode: 500,
            success: false,
            message: 'FAILED: CarrierId is missing in the Request payload',
        };
    }
    else {
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'Request payload is valid',
        };

    }

    return jsonRes;
}

// /**
//  * This method is common to generate API response
//  * @param {String} statusCode 
//  * @param {String} result 
//  * @param {String} errorMessage 
//  */
// util.apiResponse = async (statusCode, result, errorMessage) => {
//     return (
//         {
//             statusCode: statusCode,
//             success: result,
//             message: errorMessage
//         }
//     )
// }

/**
 * This method is used to validate mandatory payload elements
 * @param {Jsonarray} insurancePayload  - Insurance documents payload structure from client
*/
util.validatePayload = (insurancePayload) => {
    let jsonResponse = Object();
    if (!insurancePayload.batchId || insurancePayload.batchId === null || insurancePayload.batchId === undefined || insurancePayload.batchId.trim().length === 0) {
        logger.error('BatchId is missing in the Request payload');
        return util.apiResponse(
            messageObject.Message.validationStatusCode,
            messageObject.Message.failure,
            messageObject.Message.batchIdMessage,
            insurancePayload.batchId,
            insurancePayload.chunkId,
            insurancePayload.records.length,
            0,
            insurancePayload.records.length
        )
    }
    else if (!insurancePayload.chunkId || insurancePayload.chunkId === null || insurancePayload.chunkId === undefined || insurancePayload.chunkId.trim().length === 0) {
        logger.error('ChunkID is missing in the Request payload');
        return util.apiResponse(
            messageObject.Message.validationStatusCode,
            messageObject.Message.failure,
            messageObject.Message.chunkIdMessage,
            insurancePayload.batchId,
            insurancePayload.chunkId,
            insurancePayload.records.length,
            0,
            insurancePayload.records.length
        )
    }
    else if (!insurancePayload.carrierId || insurancePayload.carrierId === null || insurancePayload.carrierId === undefined || insurancePayload.carrierId.trim().length === 0) {
        logger.error('CarrierId is missing in the Request payload');
        return util.apiResponse(
            messageObject.Message.validationStatusCode,
            messageObject.Message.failure,
            messageObject.Message.carrierIdMessage,
            insurancePayload.batchId,
            insurancePayload.chunkId,
            insurancePayload.records.length,
            0,
            insurancePayload.records.length
        )
    }
    else if (!Array.isArray(insurancePayload.records) || insurancePayload.records === undefined || insurancePayload.records === null || insurancePayload.records.length === 0) {
        logger.error('records array is blank or missing in the request payload');
        return util.apiResponse(
            messageObject.Message.validationStatusCode,
            messageObject.Message.failure,
            messageObject.Message.documentMessage,
            insurancePayload.batchId,
            insurancePayload.chunkId,
            insurancePayload.records.length,
            0,
            insurancePayload.records.length
        )
    } else {
        logger.info('Valid Insurance Data Payload');
        return util.apiResponse(
            messageObject.Message.successStatusCode,
            messageObject.Message.success,
            messageObject.Message.successValidation,
            insurancePayload.batchId,
            insurancePayload.chunkId,
            insurancePayload.records.length,
            0,
            insurancePayload.records.length
        )
    }
};

util.isValidInsuranceDataPayload = (payload) => {
    let jsonRes = Object();
    if (!payload.batch_id) {
        jsonRes = {
            statusCode: 500,
            success: false,
            message: 'FAILED: batchId is missing in the Request payload',
        };
    }
    else if (!payload.carrier_id) {
        jsonRes = {
            statusCode: 500,
            success: false,
            message: 'FAILED: carrierId is missing in the Request payload',
        };
    }
    else if (!payload.records) {
        jsonRes = {
            statusCode: 500,
            success: false,
            message: 'FAILED: Records are missing in the Request payload',
        };
    }

    else if ((payload.records.length) > (config.maxBatchArraySize)) {
        jsonRes = {
            statusCode: 500,
            success: false,
            message: 'FAILED: Maximum ' + config.maxBatchArraySize + ' records per batch allowed',
        };
    }
    return jsonRes;

};

module.exports = util;
