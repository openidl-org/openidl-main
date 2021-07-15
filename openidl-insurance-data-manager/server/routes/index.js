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

const express = require('express');
const log4js = require('log4js');
const config = require('config');
const openidlDataCallCommonApp = require('openidl-common-lib');

const apiAuthHandler = openidlDataCallCommonApp.ApiAuthHandler;
const cognitoAuthHandler = openidlDataCallCommonApp.CognitoAuthHandler;
const health = require('./health');
const ping = require('./ping');
const statAgentController = require('../controllers/stat-agent');
// Jira - AAISPROD-14 Changes
const emailController = require('../controllers/sendemail');

const router = express.Router();

/**
 * Set up logging
 */
const logger = log4js.getLogger('routes - index');
logger.setLevel(config.logLevel);

/**
 * Add routes
 */
router.use('/health', cognitoAuthHandler.validateToken, health);
router.use('/ping', cognitoAuthHandler.validateToken, ping);
router.use('/insurance-data', cognitoAuthHandler.validateToken, statAgentController.insuranceData);
router.use('/ins-data-hash', cognitoAuthHandler.validateToken, statAgentController.saveInsuranceDataHash);
router.use('/ins-data-hds', cognitoAuthHandler.validateToken, statAgentController.saveInsuranceDataHDS);
router.use('/ins-data-hds-err', cognitoAuthHandler.validateToken, statAgentController.saveInsuranceDataHDSError);

// Jira - AAISPROD-14 Changes
router.use('/sendemail', cognitoAuthHandler.validateToken, emailController.sendEmail);

/**
 * This API end point is invoked by Nifi to load insurance data into mongodb and store insurance
 * hash value into blockchain
 */
router.use('/load-insurance-data', cognitoAuthHandler.validateToken, statAgentController.loadInsuranceData);

module.exports = router;