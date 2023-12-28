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

const idpCredentials = JSON.parse(process.env.IDP_CONFIG);
const authHandler = openidlCommonLib.AuthHandler.setHandler(idpCredentials);

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
router.use('/ping', authHandler.validateToken, ping);
router.route('/login').post(authHandler.authenticate, authHandler.getUserAttributes, authHandler.storeTokenInCookie, commonController.login);
router.route('/logout').post(authHandler.logout, commonController.logout);
router.route('/lob').get(authHandler.validateToken, commonController.listLineOfBusiness);


//--- data call retreival & Search Data Call
router.route('/search-data-calls').get(authHandler.validateToken, commonController.searchDataCalls);
router.route('/list-data-calls-by-criteria').get(authHandler.validateToken, commonController.listDataCallsByCriteria);
router.route('/data-call/:id/:version').get(authHandler.validateToken, commonController.getDataCallByIdAndVersion);
router.route('/data-call-versions/:id').get(authHandler.validateToken, commonController.getDataCallVersionsById);
router.route('/data-call-log/:id/:version').get(authHandler.validateToken, commonController.dataCallLog);

//--- like and consent
router.route('/like').post(authHandler.validateToken, commonController.toggleLike);
router.route('/consent').post(authHandler.validateToken, carrierController.createConsent);
router.route('/reconsent').post(authHandler.validateToken, carrierController.createReconsent);
router.route('/like-status-data-call/:id/:version/:orgId').get(authHandler.validateToken, commonController.likeStatusByDataCall);
router.route('/consent-status-data-call/:id/:version/:orgId').get(authHandler.validateToken, carrierController.consentStatusByDataCall);
router.route('/like-count/:id/:version').get(authHandler.validateToken, commonController.likeCount);
router.route('/consent-count/:id/:version').get(authHandler.validateToken, commonController.consentCount);
router.route('/update-consent-status').post(authHandler.validateToken, carrierController.updateConsentStatus);


//----extraction-pattern 
router.route('/list-extraction-patterns').get(authHandler.validateToken, commonController.listExtractionPatterns);
// router.route('/extraction-patterns').post(authHandler.validateToken, commonController.getExtractionPatternsById);
router.route('/create-extraction-pattern').post(authHandler.validateToken, regulatorController.createExtractionPattern);
router.route('/update-extraction-pattern').put(authHandler.validateToken, regulatorController.updateExtractionPattern);
router.route('/get-data-call-and-extraction-pattern').post(authHandler.validateToken, commonController.getDataCallAndExtractionPattern);

//----data call modification
router.route('/data-call').post(authHandler.validateToken, regulatorController.createDataCall)
    .put(authHandler.validateToken, regulatorController.updateDataCall);
router.route('/save-new-draft').post(authHandler.validateToken, regulatorController.saveNewDraft);
router.route('/issue-data-call').put(authHandler.validateToken, regulatorController.issueDataCall);
router.route('/save-and-issue-data-call').post(authHandler.validateToken, regulatorController.saveAndIssueDataCall);
router.route('/updatedatacallcount').post(authHandler.validateToken, regulatorController.updateDataCallCount);


//----stat-agent like/consent
router.route('/list-likes-by-data-call/:id/:version').get(authHandler.validateToken, statAgentController.listLikesByDataCall);
router.route('/list-consents-by-data-call/:id/:version').get(authHandler.validateToken, statAgentController.listConsentsByDataCall);

//---report
router.route('/report').get(authHandler.validateToken, commonController.getReportsByCriteria)
    .post(authHandler.validateToken, statAgentController.createReport)
    .put(authHandler.validateToken, regulatorController.updateReport);


router.route('/reset-data').delete(authHandler.validateToken, statAgentController.resetData);
router.route('/block-explorer').get(authHandler.validateToken, commonController.blockExplorer);

//temp testing idmController
router.route('/runDataLoad').post(idmController.runDataLoad);
router.route('/runDataLoadFromFile').post(idmController.runDataLoadFromFile);

module.exports = router;