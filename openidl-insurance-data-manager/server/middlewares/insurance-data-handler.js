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
const insuranceManagerDB = config.targetDB;
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const DBManagerFactory = openidlCommonLib.DBManagerFactory;
const dbManagerFactoryObject = new DBManagerFactory();
const transactionFactory = require('../helpers/transaction-factory');
const util = require('../helpers/util');
const messageObject = require('../helpers/constant')
const crypto = require('crypto');
const emailHander = require('../middlewares/sendemail');
const emailData = require('../config/email.json').Config;
//const sizeof = require('object-sizeof');

/**
 * Set up logging
 */
const logger = log4js.getLogger('store insurance data');
logger.level = config.logLevel;
let mongoDBCollectionName;
let maxIteration = 4;
let currentIteration = 0;

let connectionMaxIteration = 5;
let connectionCurrentIteration = 0;


let emailDatabyServiceType;
let emailContent

const insuranceDataHandler = {};

insuranceDataHandler.invokeEmail = (emailDatabyServiceType, bodyContent, serviceType, logInfo = "", errorInfo = "", batchId = 0) => {
  if (emailDatabyServiceType.length > 0) {

    emailDatabyServiceType[0].emailsubject = emailDatabyServiceType[0].emailsubject.replace("<<BATCHID>>", batchId)
    console.log(emailDatabyServiceType)
    emailHander.sendEmail(bodyContent, emailDatabyServiceType).then((emailSent) => {
      if (emailSent) logger.info(logInfo)
      else logger.error(errorInfo)
    })
  } else {
    logger.error(`Failed====>: Email.json file is not configured for the service type is ${serviceType}`);
  }
}

const fileterEmailData = async (servicetype) => {
  return emailData.filter(data => data.service == servicetype)
}

/**
 * This method is invoking mongodb for reading
 * @param {Json} insuranceDataArray - Insurance documents payload structure
 */
insuranceDataHandler.getFilteredDocuments = async (query) => {
  let mongoExecResult;
  try {
  let connectionManager = await insuranceDataHandler.dbConnection();

  const DMVCollectionName = "" + insuranceManagerDB + "_" + query.organizationId
  logger.debug("DMV Collection name: ", DMVCollectionName); 
  if (connectionManager != null) {
    mongoExecResult = await connectionManager.getFilteredDocuments( 
      DMVCollectionName,
      query);
    return mongoExecResult;
  } else {
    throw new Error("Cannot establish connection to HDS")
  }
  } catch (error) {
    logger.error('Failed during getFilteredDocuments method in insuranceDataHandler module. Error is ' + error);
    throw error;
  }
}

/**
 * This method is invoking mongodb, blockchain layers method
 * @param {Json} insuranceDataArray - Insurance documents payload structure
 */
insuranceDataHandler.insertBulkDocuments = async (insuranceDataArray) => {
  let mongoExecResult;
  let blockchainResult;
  let mongoDeleteResult;
  let mongoLogResult;
  let emailDatabyServiceType
  let errorEmail
  let logEmail

  try {

    mongoExecResult = await insuranceDataHandler.saveBulkDocuments(insuranceDataArray.batchId,
      insuranceDataArray.chunkId, insuranceDataArray.carrierId, insuranceDataArray, messageObject.Message.hdsAlias);

    // Status code 503 - Mongodb connection Error
    if (mongoExecResult.statusCode == messageObject.Message.dbDownStatusCode) {

      emailDatabyServiceType = await fileterEmailData(messageObject.Message.dbDown);
      emailContent = messageObject.Message.dbDownEmailMessage.replace('<<batchid>>', insuranceDataArray.batchId).replace('<<chunkid>>', insuranceDataArray.chunkId).replace('<<env>>', 'TBD')

      await insuranceDataHandler.invokeEmail(
        emailDatabyServiceType,
        emailContent,
        messageObject.Message.dbDown,
        messageObject.Message.dbDownInfolog,
        messageObject.Message.dbDownErrorlog,
        insuranceDataArray.batchId
      )
      return await util.apiResponse(
        messageObject.Message.dbDownStatusCode,
        messageObject.Message.failure,
        messageObject.Message.dbDownError,
        insuranceDataArray.batchId,
        insuranceDataArray.chunkId,
        insuranceDataArray.records.length
      );
    }
    // Status code 512 - Mongodb Execution Error 
    else if (mongoExecResult.statusCode == messageObject.Message.backEndError) {

      emailDatabyServiceType = await fileterEmailData(messageObject.Message.dbExecDown);
      emailContent = messageObject.Message.dbExecEmailMessage.replace('<<batchid>>', insuranceDataArray.batchId).replace('<<chunkid>>', insuranceDataArray.chunkId).replace('<<env>>', 'TBD')

      let logInfo = messageObject.Message.dbExecInfolog.replace('<<batchid>>', insuranceDataArray.batchId).replace('<<chunkid>>', insuranceDataArray.chunkId)
      let errorLog = messageObject.Message.dbExecErrorlog.replace('<<batchid>>', insuranceDataArray.batchId).replace('<<chunkid>>', insuranceDataArray.chunkId)

      await insuranceDataHandler.invokeEmail(
        emailDatabyServiceType,
        emailContent,
        messageObject.Message.dbExecDown,
        logInfo,
        errorLog,
        insuranceDataArray.batchId
      )
      return util.apiResponse(
        messageObject.Message.backEndError,
        messageObject.Message.failure,
        messageObject.Message.dbExecError,
        insuranceDataArray.batchId,
        insuranceDataArray.chunkId,
        insuranceDataArray.records.length
      );
    }
    // Status code is 500 (partial insert into HDS) or fail to fetch the documents
    else if (
      (mongoExecResult.statusCode == messageObject.Message.failureStatusCode) ||
      (mongoExecResult.statusCode == messageObject.Message.successStatusCode &&
        mongoExecResult.hashDocuments.length == 0)
    ) {

      mongoDeleteResult = await insuranceDataHandler.deleteBulkDocuments(insuranceDataArray.batchId, insuranceDataArray.chunkId, insuranceDataArray.carrierId, messageObject.Message.hdsAlias)
      if (mongoDeleteResult.success) {
        // 500 to nifi
        logger.info("Either document fetch failure from collection for hash or documents are inserted partially. Hence data is deleted from HDS");

        return await util.apiResponse(
          messageObject.Message.failureStatusCode,
          messageObject.Message.failure,
          "Either document fetch failure from collection for hash or documents are inserted partially. Hence data is deleted from HDS",
          insuranceDataArray.batchId,
          insuranceDataArray.chunkId,
          insuranceDataArray.records.length,
          0,
          insuranceDataArray.records.length -
            parseInt(mongoExecResult.totalProcesseddocuments) ? mongoExecResult.totalProcesseddocuments : 0
        );
        console.log("end point")
      } else {
        // 200 to nifi 
        mongoLogResult = await insuranceDataHandler.saveBulkDocuments(insuranceDataArray.batchId, insuranceDataArray.chunkId, insuranceDataArray.carrierId, insuranceDataArray, messageObject.Message.logAlias);

        if (mongoLogResult.success) emailContent = "Documents are inserted into Error log as documents have been inserted into HDS partially or fail to fetch documents for hashing for batchid " + insuranceDataArray.batchId + " chunkid " + insuranceDataArray.chunkId;
        else emailContent = "Documents are failed to insert into HDS as well on Error log collection for batchid " + insuranceDataArray.batchId + " chunkid " + insuranceDataArray.chunkId;

        let logDocument = await generateLogDocument(
          insuranceDataArray.batchId,
          insuranceDataArray.chunkId,
          insuranceDataArray.carrierId,
          insuranceDataArray.records.length,
          mongoExecResult.totalProcesseddocuments,
          "failure",
          emailContent
        );

        let logMongoResult = await insuranceDataHandler.saveLogDocument
          (
            messageObject.Message.reconLog, logDocument
          )

        if (logMongoResult.success) emailContent = emailContent + " Douments are stored into log collection. ";
        else emailContent = emailContent + " Douments are failred store into log collection as well.";

        emailDatabyServiceType = await fileterEmailData(messageObject.Message.dbExecDown);

        let logInfo = emailContent + " ";
        let errorLog = emailContent + "  ";

        await insuranceDataHandler.invokeEmail(
          emailDatabyServiceType,
          emailContent,
          messageObject.Message.dbExecDown,
          logInfo,
          errorLog,
          insuranceDataArray.batchId
        )
        return util.apiResponse(
          messageObject.Message.successStatusCode,
          messageObject.Message.success,
          emailContent,
          insuranceDataArray.batchId,
          insuranceDataArray.chunkId,
          insuranceDataArray.records.length,
          0,
          insuranceDataArray.records.length
        );
      }
    }
    // Status code is 200
    else if (mongoExecResult.statusCode == messageObject.Message.successStatusCode && mongoExecResult.hashDocuments.length > 0) {
      emailContent = ""
      blockchainResult = await insuranceDataHandler.saveInsuranceDataHash(insuranceDataArray.batchId, insuranceDataArray.chunkId, insuranceDataArray.carrierId, mongoExecResult.hashDocuments, insuranceDataArray.records);
      if (!blockchainResult.success) {
        console.log("inside if condition of blockchainResult")
        mongoDeleteResult = await insuranceDataHandler.deleteBulkDocuments(insuranceDataArray.batchId, insuranceDataArray.chunkId, insuranceDataArray.carrierId, messageObject.Message.hdsAlias)
        console.log("mongoDeleteResult.success " + mongoDeleteResult.success)
        if (mongoDeleteResult.success) {
          // 500 to nifi
          logger.info("Either document fetch failure from collection for hash or documents are inserted partially. Hence data is deleted from HDS and inserted into error log successfully.");
          return await util.apiResponse(
            messageObject.Message.failureStatusCode,
            messageObject.Message.failure,
            blockchainResult.message,
            insuranceDataArray.batchId,
            insuranceDataArray.chunkId,
            insuranceDataArray.records.length,
            0,
            insuranceDataArray.records.length -
              parseInt(mongoExecResult.totalProcesseddocuments) ? mongoExecResult.totalProcesseddocuments : 0
          );
        } else {
          // 200 to nifi 
          mongoLogResult = await insuranceDataHandler.saveBulkDocuments(insuranceDataArray.batchId, insuranceDataArray.chunkId, insuranceDataArray.carrierId, insuranceDataArray, messageObject.Message.logAlias);

          if (mongoLogResult.success) emailContent = "Blockchain hash has failed for " + insuranceDataArray.batchId + " chunkid " + insuranceDataArray.chunkId + ". Hence documents are deleted from HDS, stored into error log collection.";
          else emailContent = "Blockchain hash has failed for " + insuranceDataArray.batchId + " chunkid " + insuranceDataArray.chunkId + ". Hence documents are deleted from HDS but failed to stored into error log collection.";

          let logDocument = await generateLogDocument(
            insuranceDataArray.batchId,
            insuranceDataArray.chunkId,
            insuranceDataArray.carrierId,
            insuranceDataArray.records.length,
            mongoExecResult.totalProcesseddocuments,
            "failure",
            emailContent
          );

          let logMongoResult = await insuranceDataHandler.saveLogDocument
            (
              messageObject.Message.reconLog, logDocument
            )

          if (logMongoResult.success) emailContent = emailContent + " Douments are stored into log collection. ";
          else emailContent = emailContent + " Douments are failred store into log collection as well.";


          emailDatabyServiceType = await fileterEmailData(messageObject.Message.bcDown);

          let logInfo = emailContent + " Documents are stored into log collection";
          let errorLog = emailContent + " Document are failed to stored into log collection";

          await insuranceDataHandler.invokeEmail(
            emailDatabyServiceType,
            emailContent,
            messageObject.Message.bcDown,
            logInfo,
            errorLog,
            insuranceDataArray.batchId
          )
          return util.apiResponse(
            messageObject.Message.successStatusCode,
            messageObject.Message.success,
            emailContent,
            insuranceDataArray.batchId,
            insuranceDataArray.chunkId,
            insuranceDataArray.records.length,
            0,
            insuranceDataArray.records.length
          );
        }
      }
      else {

        let logDocument = await generateLogDocument(
          insuranceDataArray.batchId,
          insuranceDataArray.chunkId,
          insuranceDataArray.carrierId,
          insuranceDataArray.records.length,
          mongoExecResult.totalProcesseddocuments,
          "success",
          blockchainResult.message
        );

        let logMongoResult = await insuranceDataHandler.saveLogDocument
          (
            messageObject.Message.reconLog, logDocument
          )

        if (logMongoResult.success) {
          return await util.apiResponse(
            messageObject.Message.successStatusCode,
            messageObject.Message.success,
            blockchainResult.message,
            insuranceDataArray.batchId,
            insuranceDataArray.chunkId,
            insuranceDataArray.records.length,
            mongoExecResult.totalProcesseddocuments,
            insuranceDataArray.records.length -
              parseInt(mongoExecResult.totalProcesseddocuments) ? mongoExecResult.totalProcesseddocuments : 0
          );
        } else {

          emailDatabyServiceType = await fileterEmailData(messageObject.Message.dbLogFailure);

          emailContent = messageObject.Message.dbLogEmailMessage.replace('<<batchid>>', insuranceDataArray.batchId).replace('<<chunkid>>', insuranceDataArray.chunkId).replace('<<env>>', 'TBD')

          let logInfo = messageObject.Message.dbLogInfolog.replace('<<batchid>>', insuranceDataArray.batchId).replace('<<chunkid>>', insuranceDataArray.chunkId)
          let errorLog = messageObject.Message.dbLogErrorlog.replace('<<batchid>>', insuranceDataArray.batchId).replace('<<chunkid>>', insuranceDataArray.chunkId)

          await insuranceDataHandler.invokeEmail(
            emailDatabyServiceType,
            emailContent,
            messageObject.Message.dbLogFailure,
            logInfo,
            errorLog,
            insuranceDataArray.batchId
          )
          return await util.apiResponse(
            messageObject.Message.successStatusCode,
            messageObject.Message.success,
            blockchainResult.message,
            insuranceDataArray.batchId,
            insuranceDataArray.chunkId,
            insuranceDataArray.records.length,
            mongoExecResult.totalProcesseddocuments,
            insuranceDataArray.records.length -
              parseInt(mongoExecResult.totalProcesseddocuments) ? mongoExecResult.totalProcesseddocuments : 0
          );
        }
      }
    }
  } catch (error) {
    logger.error('Failed during insertBulkDocuments method in insuranceDataHandler module. Error is ' + error);
    throw error;
  }
}

async function generateLogDocument(batchId, chunkId, carrierId, totalRecords,
  totalProcessedDocuments, status, errorDescription) {
  return {
    "batchId": batchId,
    "chunkId": chunkId,
    "carrierId": carrierId,
    "recevied": totalRecords,
    "processed": totalProcessedDocuments,
    "unprocessed": totalRecords - totalProcessedDocuments,
    "createdon": new Date().toISOString(),
    "status": status,
    "reason": errorDescription
  }
}

/**
 * This method is used to generate hash value
 * @param {Jsonarray} data - Insurance documents payload structure
 */
async function generateHash(data) {
  try {

    if (data.length == 0) return null;
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(data));
    return hash.digest('hex');

  } catch (ex) {
    console.log(ex)
    return null;
  }
}


/**
 * This method is used to push the hash value into blockchain
 * @param {Jsonarray} insuranceDataArray - Insurance documents payload structure
 */

insuranceDataHandler.saveInsuranceDataHash = async (batchId, chunkId, carrierId, insuranceDataArray, etlDocumentArrayObject = []) => {

  logger.debug('Inside saveInsuranceDataHash');
  const hashDocument = await generateHash(insuranceDataArray);
  logger.info("Hash from fetch " + hashDocument)
  const orginalhash = await generateHash(etlDocumentArrayObject);
  logger.info("Hash after input " + orginalhash)

  if (hashDocument != null) {
    let blockchainPayload = {};
    blockchainPayload.batchId = batchId;
    blockchainPayload.chunkId = chunkId;
    blockchainPayload.carrierId = carrierId;
    blockchainPayload.hash = hashDocument;
    blockchainPayload.createdTs = new Date().toISOString();

    try {
      logger.info('Start Save Insurance Data Hash for chunkd id: = ' + chunkId + "  " + 'START_TIME = ' + new Date().toISOString());
      await transactionFactory.getCarrierChannelTransaction().submitTransaction('SaveInsuranceDataHash', JSON.stringify(blockchainPayload));
      logger.info('END Save Insurance Data Hash : END_TIME = ' + chunkId + "  " + new Date().toISOString());
      let bcResponse = util.apiResponse(messageObject.Message.successStatusCode, messageObject.Message.success, messageObject.Message.blockchainSuccessMsg)
      return bcResponse;
    } catch (error) {
      logger.error('saveInsuranceDataHash error ', error);
      logger.info('END Save Insurance Data Hash : END_TIME = ' + chunkId + "  " + new Date().toISOString());
      return util.apiResponse(messageObject.Message.failureStatusCode, messageObject.Message.failure, `Failure: ${error}`)
    }
  } else {
    logger.error('Blockchain hash has failed');
    logger.info('END Save Insurance Data Hash : END_TIME = ' + chunkId + "  " + new Date().toISOString());
    return util.apiResponse(messageObject.Message.failureStatusCode, messageObject.Message.failure, messageObject.Message.hashFailureMsg)
  }
};

insuranceDataHandler.saveBulkDocuments = async (batchId, chunkId, carrierId, insuranceDataArray, collectionType) => {

  logger.debug("Inside saveBulkDocuments method......");
  logger.debug("saveBulkDocuments execution START_TIME is " + chunkId + " " + new Date().toISOString());

  let connectionManager = await insuranceDataHandler.dbConnection();

  if (connectionManager != null) {

    if (collectionType == messageObject.Message.hdsAlias) mongoDBCollectionName = insuranceManagerDB + "_" + carrierId;
    else mongoDBCollectionName = insuranceManagerDB + "_" + collectionType + "_" + carrierId;

    let insertMongoResult = await insuranceDataHandler.insertDocuments(batchId, chunkId, carrierId, insuranceDataArray, collectionType, mongoDBCollectionName, connectionManager)

    connectionManager = null;
    logger.debug("saveBulkDocuments execution END_TIME is " + chunkId + " " + new Date().toISOString());
    return insertMongoResult;

  }
  else {
    logger.error("Send an email to carrier as DB connection is failure " + carrierId);
    logger.debug("saveBulkDocuments execution END_TIME is " + chunkId + " " + new Date().toISOString());
    //console.log(util.apiResponse(messageObject.Message.dbDownStatusCode, messageObject.Message.failure, messageObject.Message.dbDownError))
    return util.apiResponse(messageObject.Message.dbDownStatusCode, messageObject.Message.failure, messageObject.Message.dbDownError);
  }
};

insuranceDataHandler.dbConnection = () => {
  try {
    logger.info("Connecting to the database")
    let dbManager = dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
    if (dbManager) {
      logger.info("Database is connected successfully")
      //return null
      return dbManager
    }
    else {
      logger.error("Database connection is failure. The number of attempts is - " + connectionCurrentIteration + 1 + ", Time at - " + new Date().toISOString())
      connectionCurrentIteration = connectionCurrentIteration + 1;
      if (connectionCurrentIteration < connectionMaxIteration) insuranceDataHandler.dbConnection();
      else return null;
    }
  } catch (error) {
    logger.error("Database connection is failure. The number of attempts is - " + connectionCurrentIteration + 1 + ", Time at - " + new Date().toISOString())
    connectionCurrentIteration = connectionCurrentIteration + 1;
    if (connectionCurrentIteration < connectionMaxIteration) insuranceDataHandler.dbConnection();
    else return null;
  }
}

insuranceDataHandler.insertDocuments = async (batchId, chunkId, carrierId, insuranceDataArray, collectionType, collectionName, databaseManager) => {

  try {
    logger.debug("insertDocuments (Saveblukdocument) execution START_TIME is " + chunkId + "   " + new Date().toISOString());
    let insertMongoResult = await databaseManager.saveBulkDocuments(batchId, chunkId, carrierId, insuranceDataArray, collectionName, collectionType);
    logger.debug("insertDocuments (Saveblukdocument)  execution END_TIME is " + new Date().toISOString());
    return insertMongoResult;
  } catch (error) {
    logger.debug("insertDocuments (Saveblukdocument)  execution END_TIME is " + chunkId + "   " + new Date().toISOString());
    return await util.apiResponse(messageObject.Message.failureStatusCode, messageObject.Message.failure, error);
  }
};

insuranceDataHandler.saveLogDocument = async (collectionName, logPayLoad) => {

  logger.debug("Inside saveLogDocument method......");
  logger.debug("saveLogDocument execution START_TIME is " + logPayLoad.chunkId + " " + new Date().toISOString());

  let connectionManager = await insuranceDataHandler.dbConnection();

  if (connectionManager != null) {

    mongoDBCollectionName = insuranceManagerDB + "_" + collectionName + "_" + logPayLoad.carrierId;
    let insertMongoResult = await insuranceDataHandler.insertLogDocument(mongoDBCollectionName, logPayLoad, connectionManager)

    connectionManager = null;
    logger.debug("saveLogDocument execution END_TIME is " + new Date().toISOString());
    return insertMongoResult;

  }
  else {
    logger.error("Send an email to carrier as DB connection is failure " + carrierId);
    logger.debug("saveLogDocument execution END_TIME is " + new Date().toISOString());
    //console.log(util.apiResponse(messageObject.Message.dbDownStatusCode, messageObject.Message.failure, messageObject.Message.dbDownError))
    return util.apiResponse(messageObject.Message.dbDownStatusCode, messageObject.Message.failure, messageObject.Message.dbDownError);
  }
};

insuranceDataHandler.insertLogDocument = async (collectionName, logPayLoad, dbManager) => {

  return new Promise(function (resolve, reject) {
    dbManager.saveLogDocument(collectionName, logPayLoad).then((mongoResultSet) => {
      logger.debug("insertLogDocument execution END_TIME is " + new Date().toISOString());
      resolve(mongoResultSet)
    }).catch((error) => {
      logger.error(error)
      logger.error("insertLogDocument execution END_TIME is" + new Date().toISOString());
      reject(error);
    });
  });

}

/**
 *  This method invokes try to attempt three times in case of delete failure from HDS
 * @param {String} batchID - Unique identification of entire file processing
 * @param {String} chunkID -  Unique identifcation of  each chunk
 * @param {String} carrierId - unique id of customer
 */
insuranceDataHandler.deleteBulkDocuments = async (batchId, chunkId, carrierId, operationType) => {
  logger.debug("Inside deleteBulkDocuments method......");
  try {
    let execMongoResult = await insuranceDataHandler.deleteDocuments(batchId, chunkId, carrierId, operationType);
    return execMongoResult;
  } catch (error) {
    return await util.apiResponse(messageObject.Message.failureStatusCode, messageObject.Message.failure, error);
  }
};


/**
 * This method is used to delete the documents from mongodb using data layer
 * @param {String} batchId - Unique identification of entire file processing
 * @param {String} chunkId - Unique identifcation of  each chunk
 * @param {String} carrierId - unique id of customer
 */
insuranceDataHandler.deleteDocuments = async (batchId, chunkId, carrierId, collectionType) => {
  let mongoDBCollectionName;
  logger.debug("Inside deleteDocuments method......");

  return new Promise(function (resolve, reject) {
    logger.debug("deleteDocuments execution START_TIME is " + chunkId + " " + new Date().toISOString());
    dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG)).then((dbManager) => {
      let mongoDBCollectionName;
      if (collectionType == messageObject.Message.hdsAlias) mongoDBCollectionName = insuranceManagerDB + "_" + carrierId;
      else mongoDBCollectionName = insuranceManagerDB + "_" + collectionType + "_" + carrierId;

      dbManager.deleteBulkDocuments(batchId, chunkId, mongoDBCollectionName).then((mongoResultSet) => {
        logger.debug("deleteDocuments execution END_TIME is " + chunkId + " " + new Date().toISOString());
        resolve(mongoResultSet)
      }).catch((error) => {
        logger.error("deleteDocuments execution END_TIME is - Child Error" + new Date().toISOString());
        // reject(error);
        resolve(util.apiResponse(messageObject.Message.failureStatusCode, messageObject.Message.failure, error));
      });
    }).catch((error) => {
      logger.error("deleteDocuments execution END_TIME is - Parent Error " + new Date().toISOString());
      resolve(util.apiResponse(messageObject.Message.failureStatusCode, messageObject.Message.failure, error));
    });
  });




};



insuranceDataHandler.saveBulkInsuranceErrorData = async (insuranceDataArray) => {
  logger.debug("Inside saveBulkInsuranceErrorData method......");
  return new Promise(function (resolve, reject) {
    logger.debug("saveBulkInsuranceErrorData execution START_TIME is " + new Date().toISOString());
    dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG)).then((dbManager) => {
      let mongoDBCollectionName = insuranceManagerDB + "_" + "err_" + payload._id.split("-")[0]; // I think carrierid
      dbManager.bulkDataInsert(insuranceDataArray, mongoDBCollectionName).then((mongoResultSet) => {
        logger.debug("saveBulkInsuranceErrorData execution END_TIME is " + new Date().toISOString());
        resolve(mongoResultSet)
      }).catch((error) => {
        logger.error("saveBulkInsuranceErrorData execution END_TIME is " + new Date().toISOString());
        reject(error);
      });
    })
  });
};

insuranceDataHandler.deleteBulkInsuranceData = async (totalDeleteRecords, batchID, chunkID) => {
  logger.debug("Inside deleteBulkInsuranceData method......");
  return new Promise(function (resolve, reject) {
    logger.debug("deleteBulkInsuranceData execution START_TIME is " + new Date().toISOString());
    dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG)).then((dbManager) => {
      let mongoDBCollectionName = insuranceManagerDB + "_" + payload._id.split("-")[0];
      dbManager.bulkDataDelete(totalDeleteRecords, batchID, chunkID, mongoDBCollectionName).then((mongoResultSet) => {
        logger.debug("deleteBulkInsuranceData execution END_TIME is " + new Date().toISOString());
        resolve(mongoResultSet)
      }).catch((error) => {
        logger.error("deleteBulkInsuranceData execution END_TIME is " + new Date().toISOString());
        reject(error);
      });
    })
  });
};


insuranceDataHandler.saveInsuranceData = async (payload) => {
  logger.debug("Inside save insurance data");
  //logger.info("Start Save Insurance Data :- for carrier id-batch id" + payload._id + " Size of the payload = " + sizeof(payload) + "START_TIME = " + new Date().toISOString());
  return new Promise(function (resolve, reject) {
    dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG)).then((dbManager) => {
      let carrierInsuranceManagerDB = insuranceManagerDB + "_" + payload._id.split("-")[0];
      dbManager.insert(payload, carrierInsuranceManagerDB).then((data) => {
        logger.debug('Document saved successfully');
        logger.info("Save Insurance Data succesful for carrier id-batch id " + payload._id + " with END_TIME = " + new Date().toISOString());
        resolve("Document saved successfully'");
      }).catch((err) => {
        logger.error("Error inserting records:" + err);
        logger.info("Save Insurance Data Errored with END_TIME = " + new Date().toISOString());
        reject(err);
      });
    })
  });
};
insuranceDataHandler.getInsuranceData = async (id) => {
  logger.debug("inside get insurance data");
  const dbManager = await dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
  let carrierInsuranceManagerDB = insuranceManagerDB + "_" + id.split("-")[0];
  return new Promise(function (resolve, reject) {
    dbManager.get(id, carrierInsuranceManagerDB).then((data) => {
      logger.debug('Retrieved document successfully for id:' + id);
      resolve(data._rev);
    }).catch((err) => {
      logger.error("Error Retrieving record for " + id + ":" + err);
      reject(err);
    });
  })
};




module.exports = insuranceDataHandler;
