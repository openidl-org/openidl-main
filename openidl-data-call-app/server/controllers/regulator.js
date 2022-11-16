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
const uuid = require('uuid/v1');
const _ = require('lodash');
const util = require('../helpers/util');
const transactionFactory = require('../helpers/transaction-factory');

const logger = log4js.getLogger('controllers - regulator');
logger.level = config.logLevel;

/**
 * Controller object
 */
const regulator = {};


regulator.createDataCall = async (req, res) => {
    logger.info("createDataCall method entry -");
    let jsonRes;
    try {
        let id = req.body['id'] = (uuid().split("-").join("_"));
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('createDataCall req body :');
        logger.debug(req.body);
        if (req.body.deadline) {
            const deadlineDate = new Date(req.body.deadline);
            deadlineDate.setUTCHours(0,0,0,0);
            logger.debug("Setting deadline to ", deadlineDate.toISOString());
            req.body.deadline = deadlineDate.toISOString();
        }
        logger.debug('createDataCall submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('CreateDataCall', JSON.stringify(req.body));
        logger.debug('createDataCall submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK',
            dataCallId: id
        };
    } catch (err) {
        logger.error('createDataCall error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('createDataCall send response ');
    logger.info('createDataCall method exit ');
    util.sendResponse(res, jsonRes);

};

regulator.updateDataCall = async (req, res) => {
    logger.info("updateDataCall method entry -");
    let jsonRes;
    try {
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('updateDataCall req body :');
        logger.debug(req.body);
        if (req.body.deadline) {
            const deadlineDate = new Date(req.body.deadline);
            deadlineDate.setUTCHours(0,0,0,0);
            logger.debug("Setting deadline to ", deadlineDate.toISOString());
            req.body.deadline = deadlineDate.toISOString();
        }
        logger.debug('updateDataCall submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('UpdateDataCall', JSON.stringify(req.body));
        logger.debug('updateDataCall submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('updateDataCall error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('updateDataCall send response ');
    logger.info('updateDataCall method exit ');
    util.sendResponse(res, jsonRes);

};


regulator.createExtractionPattern = async (req, res) => {
    logger.info("createExtractionPattern method entry -");
    let jsonRes;
    try {
        if (req.body.viewDefinition.map === '' || req.body.viewDefinition.reduce === '') {
          throw new Error('Missing required param viewDefinition')
        }
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('createExtractionPattern req body :');
        logger.debug(req.body);
        logger.debug('createExtractionPattern submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('CreateExtractionPattern', JSON.stringify(req.body));
        logger.debug('createExtractionPattern submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('createExtractionPattern error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('createExtractionPattern send response ');
    logger.info('createExtractionPattern method exit ');
    util.sendResponse(res, jsonRes);
};


regulator.updateExtractionPattern = async (req, res) => {
    logger.info("updateExtractionPattern method entry -");
    let jsonRes;
    try {
        req.body;
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('updateExtractionPattern req body :');
        logger.debug(req.body);
        logger.debug('updateExtractionPattern submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('UpdateExtractionPattern', JSON.stringify(req.body));
        logger.debug('updateExtractionPattern submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('updateExtractionPattern error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('updateExtractionPattern send response ');
    logger.info('updateExtractionPattern method exit ');
    util.sendResponse(res, jsonRes);

};


regulator.saveNewDraft = async (req, res) => {
    logger.info("saveNewDraft method entry -");
    let jsonRes;
    try {
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('saveNewDraft req body :');
        logger.debug(req.body);
        if (req.body.deadline) {
            const deadlineDate = new Date(req.body.deadline);
            deadlineDate.setUTCHours(0,0,0,0);
            logger.debug("Setting deadline to ", deadlineDate.toISOString());
            req.body.deadline = deadlineDate.toISOString();
        }
        logger.debug('saveNewDraft submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('SaveNewDraft', JSON.stringify(req.body));
        logger.debug('saveNewDraft submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('saveNewDraft error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('saveNewDraft send response ');
    logger.info('saveNewDraft method exit ');
    util.sendResponse(res, jsonRes);

};


regulator.issueDataCall = async (req, res) => {
    logger.info("issueDataCall method entry -");
    let jsonRes;
    try {
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('issueDataCall req body :');
        logger.debug(req.body);
        if (req.body.deadline) {
            const deadlineDate = new Date(req.body.deadline);
            deadlineDate.setUTCHours(0,0,0,0);
            logger.debug("Setting deadline to ", deadlineDate.toISOString());
            req.body.deadline = deadlineDate.toISOString();
        }
        logger.debug('issueDataCall submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('IssueDataCall', JSON.stringify(req.body));
        logger.debug('issueDataCall submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('issueDataCall error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('issueDataCall send response ');
    logger.info('issueDataCall method exit ');
    util.sendResponse(res, jsonRes);

};

regulator.saveAndIssueDataCall = async (req, res) => {
    logger.info("saveAndIssueDataCall method entry -");
    let jsonRes;
    try {
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('saveAndIssueDataCall req body :');
        logger.debug(req.body);
        logger.debug('saveAndIssueDataCall :SaveNewDraft submitTransaction invoke ');
        await transactionFactory.getDefaultChannelTransaction().submitTransaction('SaveNewDraft', JSON.stringify(req.body));
        logger.debug('saveAndIssueDataCall :SaveNewDraft submitTransaction complete ');
        const args = {
            id: req.body.id
        };
        logger.debug('saveAndIssueDataCall :GetDataCallVersionsById args ');
        logger.debug(args);
        logger.debug('saveAndIssueDataCall :GetDataCallVersionsById executeTransaction invoke ');
        const response = await transactionFactory.getDefaultChannelTransaction().executeTransaction('GetDataCallVersionsById', JSON.stringify(args));
        logger.debug('saveAndIssueDataCall :GetDataCallVersionsById executeTransaction complete ');
        const result = JSON.parse(response);
        const dataCall = _.filter(result, {
            isLatest: true
        });
        dataCall[0].status = "ISSUED";
        dataCall[0]['updatedTs'] = new Date().toISOString();

        logger.debug('saveAndIssueDataCall: issueDataCall submitTransaction invoke ');
        await transactionFactory.getDefaultChannelTransaction().submitTransaction('IssueDataCall', JSON.stringify(dataCall[0]));
        logger.debug('saveAndIssueDataCall: issueDataCall submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('saveAndIssueDataCall error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('saveAndIssueDataCall send response ');
    logger.info('saveAndIssueDataCall method exit ');
    util.sendResponse(res, jsonRes);

};

regulator.updateReport = async (req, res) => {
    logger.info("updateReport method entry -");
    let jsonRes;
    try {
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('updateReport req body :');
        logger.debug(req.body);
        logger.debug('updateReport submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('UpdateReport', JSON.stringify(req.body));
        logger.debug('updateReport submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('updateReport error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('updateReport send response ');
    logger.info('updateReport method exit ');
    util.sendResponse(res, jsonRes);

};

regulator.updateDataCallCount = async (req, res) => {
    logger.info("UpdateDataCallCount method entry -");
    let jsonRes;
    try {
        
        logger.debug('UpdateDataCallCount req body :');
        logger.debug(req.body);
        logger.debug('UpdateDataCallCount submitTransaction invoke ');
        const result = await transactionFactory.getDefaultChannelTransaction().submitTransaction('UpdateDataCallCount', JSON.stringify(req.body));
        logger.debug('UpdateDataCallCount submitTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('UpdateDataCallCount error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('UpdateDataCallCount send response ');
    logger.info('UpdateDataCallCount method exit ');
    util.sendResponse(res, jsonRes);

};

module.exports = regulator;