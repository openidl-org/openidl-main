'use strict';
const express = require('express');
const app = express();
const openidlCommonApp = require('../../lib/server/index');
const userAuthHandler = openidlCommonApp.UserAuthHandler;
const apiAuthHandler = openidlCommonApp.ApiAuthHandler;
const cognitoAuthHandler = openidlCommonApp.CognitoAuthHandler;
const commonController = require('../controllers/common');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');

app.use(bodyParser.json());

//module.exports = function(app) {
// Application Login
router.route('/login').post(cognitoAuthHandler.authenticate, cognitoAuthHandler.getUserAttributes, commonController.login);
// /cognitoAuthHandler.authenticate, cognitoAuthHandler.getUserAttributes, cognitoAuthHandler.storeTokenInCookie,

// Application logout
router.route('/logout').post(cognitoAuthHandler.logout, commonController.logout);

// Get data calls according to the params passed eg: status, page index etc
router.route('/list-data-calls-by-criteria').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getDataCalls);

// Get LOBs
router.route('/lob').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getLOBs);

// Get Block history
router.route('/block-explorer').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getBlockHistory);

// Data call related tasks such as create, update etc
router.route('/data-call').post(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.dataCall);

/**
 * Search data call based on wildcard string
 */
router.route('/search-data-calls').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getSearchDataCalls);

// Get draft version
router.route('/data-call-versions/:id').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.dataCallVersions);

// Get like status
router.route('/like-status-data-call/:id/:version/:orgid').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getLikeStatus);

// Get consent status
router.route('/consent-status-data-call/:id/:version/:orgid').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getConsentStatus);

// Get Consent Count
router.route('/consent-count/:id/:version').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getConsentCount);

// Get Like Count
router.route('/like-count/:id/:version').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getLikeCount);

// Save and issue a data call
router.route('/save-and-issue-data-call').post(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.saveAndIssue);

// Issue a data call
router.route('/issue-data-call').put(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.issue);

// Save new draft
router.route('/save-new-draft').post(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.saveNewDraft);

// Update data call
router.route('/data-call').put(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.dataCall);
router.route('/update-data-call').put(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.updateDataCall);

// Like / Unlike a data call
router.route('/like').post(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.likeUnlikeDataCall);

// List likes
router.route('/list-likes-by-data-call/:id/:version').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.listLikes);

// List Consents
router.route('/list-consents-by-data-call/:id/:version').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.listConsents);

// Get Reports
router.route('/report').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getReport);

// Update Report
router.route('/report').post(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.updateReport);

// Update Report
router.route('/report').put(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.updateReport);

// Provide consent to a data call
router.route('/consent').post(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.provideConsent);

// Get data call details
router.route('/data-call/:id/:version').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getDataCallDetails);

// Get data call history
router.route('/data-call-log/:id/:version').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getDataCallHistory);

router.route('/reset-data').delete(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.resetData);

router.route('/list-extraction-patterns').get(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getExtrationPattern);

router.route('/extraction-patterns').post(cognitoAuthHandler.isLoggedIn, cognitoAuthHandler.getUserRole, cognitoAuthHandler.validateToken, commonController.getExtractionPatternsById);

module.exports = router;
//}