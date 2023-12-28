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
const logger = log4js.getLogger('controllers - carrier');
logger.level = config.logLevel;
/**
 * Controller object
 */
const carrier = {};

carrier.createConsent = async (req, res) => {
  logger.info("createConsent method entry -");
  let jsonRes;
  try {
    req.body['createdTs'] = new Date().toISOString();
    req.body['status'] = "Submitted";
    logger.debug('createConsent req body :');
    logger.debug(req.body);
    await transactionFactory.getCarrierChannelTransaction().submitTransaction('CreateConsent', JSON.stringify(req.body));
    jsonRes = {
      statusCode: 200,
      success: true,
      message: 'OK'
    };
  } catch (err) {
    logger.error('createConsent error ', err);
    jsonRes = {
      statusCode: 500,
      success: false,
      message: `FAILED: ${err}`,
    };
  }
  logger.debug('createConsent send response ');
  logger.info('createConsent method exit ');
  util.sendResponse(res, jsonRes);

};
carrier.createReconsent = async (req, res) => {
  logger.info("createReconsent method entry -");
  let jsonRes;
  try {
    req.body['createdTs'] = new Date().toISOString();
    req.body['status'] = "Submitted";
    logger.debug('createConsent req body :');
    logger.debug(req.body);
    await transactionFactory.getCarrierChannelTransaction().submitTransaction('CreateReconsent', JSON.stringify(req.body));
    jsonRes = {
      statusCode: 200,
      success: true,
      message: 'OK'
    };
  } catch (err) {
    logger.error('createConsent error ', err);
    jsonRes = {
      statusCode: 500,
      success: false,
      message: `FAILED: ${err}`,
    };
  }
  logger.debug('createConsent send response ');
  logger.info('createConsent method exit ');
  util.sendResponse(res, jsonRes);

};
carrier.consentStatusByDataCall = async (req, res) => {
  logger.info("consentStatusByDataCall method entry -");
  let jsonRes;
  let args = {
    consent: {}
  };
  try {
    args.consent['datacallID'] = req.params['id'];
    args.consent['dataCallVersion'] = req.params['version'];
    args.consent['carrierID'] = req.params['orgId'];
    logger.debug('consentStatusByDataCall arguments : ');
    logger.debug(args);
    logger.debug('consentStatusByDataCall executeTransaction invoke ');
    let queryResponse = await transactionFactory.getCarrierChannelTransaction().executeTransaction('GetConsentByDataCallAndOrganization', JSON.stringify(args));
    logger.debug('consentStatusByDataCall executeTransaction complete ');
    jsonRes = {
      statusCode: 200,
      success: true,
      result: queryResponse
    };
  } catch (err) {
    logger.error('consentStatusByDataCall error ', err);
    jsonRes = {
      statusCode: 500,
      success: false,
      message: `FAILED: ${err}`,
    };
  }
  logger.debug('consentStatusByDataCall send response ');
  logger.info("consentStatusByDataCall method exit.");
  util.sendResponse(res, jsonRes);
};

carrier.updateConsentStatus = async (req, res) => {
  logger.info("updateConsentStatus method entry -");
  let jsonRes;
  try {
    logger.debug('updateConsentStatus arguments : ');
    logger.debug('updateConsentStatus executeTransaction invoke ');
    let queryResponse = await await transactionFactory.getCarrierChannelTransaction().submitTransaction('UpdateConsentStatus', JSON.stringify(req.body));
    logger.debug('updateConsentStatus executeTransaction complete ');
    jsonRes = {
      statusCode: 200,
      success: true,
      result: queryResponse
    };
  } catch (err) {
    logger.error('updateConsentStatus error ', err);
    jsonRes = {
      statusCode: 500,
      success: false,
      message: `FAILED: ${err}`,
    };
  }
  logger.debug('updateConsentStatus send response ');
  logger.info("updateConsentStatus method exit.");
  util.sendResponse(res, jsonRes);
};

module.exports = carrier;