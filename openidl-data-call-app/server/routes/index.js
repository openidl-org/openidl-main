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
const openidlCommonLib = require('openidl-common-lib');
const userAuthHandler = openidlCommonLib.UserAuthHandler;
const apiAuthHandler = openidlCommonLib.ApiAuthHandler;
const cognitoAuthHandler = openidlCommonLib.CognitoAuthHandler;
const health = require('./health');
const ping = require('./ping');
const commonController = require('../controllers/common');
const carrierController = require('../controllers/carrier');
const regulatorController = require('../controllers/regulator');
const statAgentController = require('../controllers/stat-agent');
const idmController = require('../controllers/idm'); //temp testing
const router = express.Router();

/**
 * Set up logging
 */
const logger = log4js.getLogger('routes - index');
logger.level = config.logLevel;

/**
 * Add routes
 */
router.use('/health', health);
router.use('/ping', cognitoAuthHandler.validateToken, ping);
router.route('/login').post(cognitoAuthHandler.authenticate, cognitoAuthHandler.getUserAttributes, cognitoAuthHandler.storeTokenInCookie, commonController.login);
router.route('/logout').post(cognitoAuthHandler.logout, commonController.logout);
router.route('/lob').get(cognitoAuthHandler.validateToken, commonController.listLineOfBusiness);


//--- data call retreival & Search Data Call
router.route('/search-data-calls').get(cognitoAuthHandler.validateToken, commonController.searchDataCalls);
router.route('/list-data-calls-by-criteria').get(cognitoAuthHandler.validateToken, commonController.listDataCallsByCriteria);
router.route('/data-call/:id/:version').get(cognitoAuthHandler.validateToken, commonController.getDataCallByIdAndVersion);
router.route('/data-call-versions/:id').get(cognitoAuthHandler.validateToken, commonController.getDataCallVersionsById);
router.route('/data-call-log/:id/:version').get(cognitoAuthHandler.validateToken, commonController.dataCallLog);

//--- like and consent
router.route('/like').post(cognitoAuthHandler.validateToken, commonController.toggleLike);
router.route('/consent').post(cognitoAuthHandler.validateToken, carrierController.createConsent);
router.route('/like-status-data-call/:id/:version/:orgId').get(cognitoAuthHandler.validateToken, commonController.likeStatusByDataCall);
router.route('/consent-status-data-call/:id/:version/:orgId').get(cognitoAuthHandler.validateToken, carrierController.consentStatusByDataCall);
router.route('/like-count/:id/:version').get(cognitoAuthHandler.validateToken, commonController.likeCount);
router.route('/consent-count/:id/:version').get(cognitoAuthHandler.validateToken, commonController.consentCount);
router.route('/update-consent-status').post(cognitoAuthHandler.validateToken, carrierController.updateConsentStatus);


//----extraction-pattern 
router.route('/list-extraction-patterns').get(cognitoAuthHandler.validateToken, commonController.listExtractionPatterns);
// router.route('/extraction-patterns').post(cognitoAuthHandler.validateToken, commonController.getExtractionPatternsById);
router.route('/create-extraction-pattern').post(cognitoAuthHandler.validateToken, regulatorController.createExtractionPattern);
router.route('/update-extraction-pattern').put(cognitoAuthHandler.validateToken, regulatorController.updateExtractionPattern);
router.route('/get-data-call-and-extraction-pattern').post(cognitoAuthHandler.validateToken, commonController.getDataCallAndExtractionPattern);

//----data call modification
router.route('/data-call').post(cognitoAuthHandler.validateToken, regulatorController.createDataCall)
    .put(cognitoAuthHandler.validateToken, regulatorController.updateDataCall);
router.route('/save-new-draft').post(cognitoAuthHandler.validateToken, regulatorController.saveNewDraft);
router.route('/issue-data-call').put(cognitoAuthHandler.validateToken, regulatorController.issueDataCall);
router.route('/save-and-issue-data-call').post(cognitoAuthHandler.validateToken, regulatorController.saveAndIssueDataCall);
router.route('/updatedatacallcount').post(cognitoAuthHandler.validateToken, regulatorController.updateDataCallCount);


//----stat-agent like/consent
router.route('/list-likes-by-data-call/:id/:version').get(cognitoAuthHandler.validateToken, statAgentController.listLikesByDataCall);
router.route('/list-consents-by-data-call/:id/:version').get(cognitoAuthHandler.validateToken, statAgentController.listConsentsByDataCall);

//---report
router.route('/report').get(cognitoAuthHandler.validateToken, commonController.getReportsByCriteria)
    .post(cognitoAuthHandler.validateToken, statAgentController.createReport)
    .put(cognitoAuthHandler.validateToken, regulatorController.updateReport);


router.route('/reset-data').delete(cognitoAuthHandler.validateToken, statAgentController.resetData);
router.route('/block-explorer').get(cognitoAuthHandler.validateToken, commonController.blockExplorer);

//temp testing idmController
router.route('/runDataLoad').post(idmController.runDataLoad);
router.route('/runDataLoadFromFile').post(idmController.runDataLoadFromFile);

module.exports = router;