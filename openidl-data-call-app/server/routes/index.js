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
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const userAuthHandler = openidlCommonLib.UserAuthHandler;
const apiAuthHandler = openidlCommonLib.ApiAuthHandler;
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
router.use('/ping', apiAuthHandler.authenticate, ping);
router.route('/login').post(userAuthHandler.authenticate, userAuthHandler.getUserAttributes, apiAuthHandler.getApiToken, userAuthHandler.storeTokenInCookie, commonController.login);
router.route('/logout').post(userAuthHandler.logout, commonController.logout);
router.route('/lob').get(apiAuthHandler.authenticate, commonController.listLineOfBusiness);


//--- data call retreival & Search Data Call
router.route('/search-data-calls').get(apiAuthHandler.authenticate, commonController.searchDataCalls);
router.route('/list-data-calls-by-criteria').get(apiAuthHandler.authenticate, commonController.listDataCallsByCriteria);
router.route('/data-call/:id/:version').get(apiAuthHandler.authenticate, commonController.getDataCallByIdAndVersion);
router.route('/data-call-versions/:id').get(apiAuthHandler.authenticate, commonController.getDataCallVersionsById);
router.route('/data-call-log/:id/:version').get(apiAuthHandler.authenticate, commonController.dataCallLog);

//--- like and consent
router.route('/like').post(apiAuthHandler.authenticate, commonController.toggleLike);
router.route('/consent').post(apiAuthHandler.authenticate, carrierController.createConsent);
router.route('/like-status-data-call/:id/:version/:orgId').get(apiAuthHandler.authenticate, commonController.likeStatusByDataCall);
router.route('/consent-status-data-call/:id/:version/:orgId').get(apiAuthHandler.authenticate, carrierController.consentStatusByDataCall);
router.route('/like-count/:id/:version').get(apiAuthHandler.authenticate, commonController.likeCount);
router.route('/consent-count/:id/:version').get(apiAuthHandler.authenticate, commonController.consentCount);
router.route('/update-consent-status').post(apiAuthHandler.authenticate, carrierController.updateConsentStatus);


//----extraction-pattern 
router.route('/list-extraction-patterns').get(apiAuthHandler.authenticate, commonController.listExtractionPatterns);
// router.route('/extraction-patterns').post(apiAuthHandler.authenticate, commonController.getExtractionPatternsById);
router.route('/create-extraction-pattern').post(apiAuthHandler.authenticate, regulatorController.createExtractionPattern);
router.route('/update-extraction-pattern').put(apiAuthHandler.authenticate, regulatorController.updateExtractionPattern);
router.route('/get-data-call-and-extraction-pattern').post(apiAuthHandler.authenticate, commonController.getDataCallAndExtractionPattern);

//----data call modification
router.route('/data-call').post(apiAuthHandler.authenticate, regulatorController.createDataCall)
    .put(apiAuthHandler.authenticate, regulatorController.updateDataCall);
router.route('/save-new-draft').post(apiAuthHandler.authenticate, regulatorController.saveNewDraft);
router.route('/issue-data-call').put(apiAuthHandler.authenticate, regulatorController.issueDataCall);
router.route('/save-and-issue-data-call').post(apiAuthHandler.authenticate, regulatorController.saveAndIssueDataCall);
router.route('/updatedatacallcount').post(apiAuthHandler.authenticate, regulatorController.updateDataCallCount);


//----stat-agent like/consent
router.route('/list-likes-by-data-call/:id/:version').get(apiAuthHandler.authenticate, statAgentController.listLikesByDataCall);
router.route('/list-consents-by-data-call/:id/:version').get(apiAuthHandler.authenticate, statAgentController.listConsentsByDataCall);

//---report
router.route('/report').get(apiAuthHandler.authenticate, commonController.getReportsByCriteria)
    .post(apiAuthHandler.authenticate, statAgentController.createReport)
    .put(apiAuthHandler.authenticate, regulatorController.updateReport);


router.route('/reset-data').delete(apiAuthHandler.authenticate, statAgentController.resetData);
router.route('/block-explorer').get(apiAuthHandler.authenticate, commonController.blockExplorer);

//temp testing idmController
router.route('/runDataLoad').post(idmController.runDataLoad);
router.route('/runDataLoadFromFile').post(idmController.runDataLoadFromFile);

module.exports = router;