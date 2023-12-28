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
const channelConfig = require('../config/channel-config.json');
const carriersDb = "carriers_db";
const logger = log4js.getLogger('controllers - statAgent');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const DBManagerFactory = openidlCommonLib.DBManagerFactory;
const dbManagerFactoryObject = new DBManagerFactory();
logger.level = config.loglevel
/**
 * Controller object
 */
const statAgent = {};

statAgent.resetData = async (req, res) => {
    logger.info("resetData method entry -");
    let jsonRes;
    let promiseArray = [];
    try {
        logger.debug('resetData req body :');
        logger.debug('resetData submitTransaction invoke ');

        promiseArray.push(transactionFactory.getDefaultChannelTransaction().submitTransaction('ResetWorldState', ""));
        promiseArray.push(transactionFactory.getCarrierChannelTransaction().submitTransaction('ResetWorldState', ""));
        //promiseArray.push(transactionFactory.getAaisCarrier1ChannelTransaction().submitTransaction('ResetWorldState', ""));

        await Promise.all(promiseArray);
        logger.debug(' promise all resetData submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'DELETED'
        };
    } catch (err) {
        logger.error('resetData error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }

    logger.debug('resetData send response ');
    logger.info('resetData method exit ');
    util.sendResponse(res, jsonRes);

};

statAgent.listConsentsByDataCall = async (req, res) => {
    logger.info("listConsentsByDataCall method entry -");
    let jsonRes;
    let args = {
        "dataCallID": req.params['id'],
        "dataCallVersion": req.params['version'],
        "channelList": channelConfig.crossChannelQueryParam
    };
    try {
        //args.consent['datacallID'] = req.params['id'];
        //args.consent['dataCallVersion'] = req.params['version'];
        // const channelArray = [];
        // // channelArray.push(channelConfig.channels[1].channelName);
        // channelArray.push(channelConfig.channels[2].channelName);
        // args.channelIDs=channelArray;

        console.log('listConsentsByDataCall arguments : ');
        console.log(args);
        console.log('listConsentsByDataCall executeTransaction invoke ');
        let queryResponse = await transactionFactory.getCarrierChannelTransaction().executeTransaction('ListConsentsByDataCall', JSON.stringify(args));
        queryResponse = JSON.parse(queryResponse.toString('utf8'));
        console.log(queryResponse, 'queryResponse')
        let response = await getConsentOrgNames(queryResponse);
        console.log(response, 'response');
        console.log('listLikesByDataCall executeTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: response
        };
    } catch (err) {
        logger.error('listConsentsByDataCall error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    console.log('listConsentsByDataCall send response ');
    logger.info("listConsentsByDataCall method exit.");
    util.sendResponse(res, jsonRes);
};

statAgent.listLikesByDataCall = async (req, res) => {
    console.log('Entering listLikesByDataCall');
    logger.info("listLikesByDataCall method entry -");
    let jsonRes;
    let args = {
        "dataCallID": req.params['id'],
        "dataCallVersion": req.params['version'],
        "channelList": channelConfig.crossChannelQueryParam
    };
    try {
        //args.like['datacallID'] = req.params['id'];
        //args.like['dataCallVersion'] = req.params['version'];
        // const channelArray = [];
        // channelArray.push(channelConfig.channels[2].channelName);
        // args.channelIDs=channelArray;
        console.log('listLikesByDataCall arguments : ');
        console.log(args);
        console.log('listLikesByDataCall executeTransaction invoke ');
        let queryResponse = await transactionFactory.getCarrierChannelTransaction().executeTransaction('ListLikesByDataCall', JSON.stringify(args));
        //console.log(queryResponse, 'queryResponse')
        queryResponse = JSON.parse(queryResponse.toString('utf8'));
        console.log(queryResponse, 'queryResponse')
        let response = await getLikeOrgNames(queryResponse);
        console.log(response, 'response');
        console.log('listLikesByDataCall executeTransaction complete ');

        jsonRes = {
            statusCode: 200,
            success: true,
            result: response
        };
    } catch (err) {
        console.log('listLikesByDataCall error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    console.log('listLikesByDataCall send response ');
    logger.info("listLikesByDataCall method exit.");
    util.sendResponse(res, jsonRes);
};

statAgent.createReport = async (req, res) => {
    logger.info("createReport method entry -");
    let jsonRes;
    try {
        req.body['createdTs'] = new Date().toISOString();
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('createReport req body :');
        logger.debug(req.body);
        logger.debug('createReport submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('CreateReport', JSON.stringify(req.body));
        logger.debug('createReport submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('createReport error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('createReport send response ');
    logger.info('createReport method exit ');
    util.sendResponse(res, jsonRes);
};
const getConsentOrgNames = async (queryResponse) => {
    console.log("Inside getOrgNames");
    const carrierIds = queryResponse.map(response => response.consent.carrierID);
    const options = JSON.parse(process.env.OFF_CHAIN_DB_CONFIG);
    const dbManager = await dbManagerFactoryObject.getInstance(options);
    return new Promise(function (resolve, reject) {
        dbManager.fetchCarrierNames(carrierIds, carriersDb).then((data) => {
            //console.log('Retrieved document successfully for id:' + carrierIds, data);
            for (let index = 0; index < queryResponse.length; ++index) {
                let carrierID = queryResponse[index].consent.carrierID;
                queryResponse[index].carrierName = data[carrierID];
            }
            resolve(JSON.stringify(queryResponse));
        }).catch((err) => {
            logger.error("Error Retrieving record for " + carrierIds + ":" + err);
            //console.log("Error Retrieving record for " + carrierIds + ":" + err);
            reject(err);
        });
    });

};
const getLikeOrgNames = async (queryResponse) => {
    console.log("Inside getOrgNames");
    const carrierIds = queryResponse.map(response => response.like.organizationID);
    const options = JSON.parse(process.env.OFF_CHAIN_DB_CONFIG);
    const dbManager = await dbManagerFactoryObject.getInstance(options);
    console.log("carrierIds,dbManager", carrierIds, dbManager)
    console.log("carriersDb--->", carriersDb)
    return new Promise(function (resolve, reject) {
        dbManager.fetchCarrierNames(carrierIds, carriersDb).then((data) => {
            console.log("db res-->", data)
            for (let index = 0; index < queryResponse.length; ++index) {
                let carrierID = queryResponse[index].like.organizationID;
                queryResponse[index].organizationName = data[carrierID];
            }
            resolve(JSON.stringify(queryResponse));
        }).catch((err) => {
            logger.error("Error Retrieving record for " + carrierIds + ":" + err);
            reject(err);
        });
    });

};
module.exports = statAgent;