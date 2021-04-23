// SPDX-License-Identifier: Apache-2.0
'use strict';
const express = require('express');
const app = express();
const openidlCommonApp = require('../../lib/server/index');
const userAuthHandler = openidlCommonApp.UserAuthHandler;
const apiAuthHandler = openidlCommonApp.ApiAuthHandler;
const commonController = require('../controllers/common');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');

app.use(bodyParser.json());

//module.exports = function(app) {
// Application Login
router.route('/login').post(userAuthHandler.authenticate, userAuthHandler.getUserAttributes, apiAuthHandler.getApiToken, commonController.login);
// /userAuthHandler.authenticate, userAuthHandler.getUserAttributes, apiAuthHandler.getApiToken, userAuthHandler.storeTokenInCookie,

// Application logout
router.route('/logout').post(userAuthHandler.logout, commonController.logout);

// Get data calls according to the params passed eg: status, page index etc
router.route('/list-data-calls-by-criteria').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getDataCalls);

/**
 * Search data call based on wildcard string
 */
router.route('/search-data-calls').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getSearchDataCalls);


// Get LOBs
router.route('/lob').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getLOBs);

// Get Block history
router.route('/block-explorer').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getBlockHistory);

// Data call related tasks such as create, update etc
router.route('/data-call').post(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.dataCall);

// Get draft version
router.route('/data-call-versions/:id').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.dataCallVersions);

// Get like status
router.route('/like-status-data-call/:id/:version/:orgid').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getLikeStatus);

// Get consent status
router.route('/consent-status-data-call/:id/:version/:orgid').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getConsentStatus);

// Get Consent Count
router.route('/consent-count/:id/:version').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getConsentCount);

// Get Like Count
router.route('/like-count/:id/:version').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getLikeCount);

// Like / Unlike a data call
router.route('/like').post(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.likeUnlikeDataCall);

// List likes
router.route('/list-likes-by-data-call/:id/:version').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.listLikes);

// List Consents
router.route('/list-consents-by-data-call/:id/:version').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.listConsents);

// Get Reports
router.route('/report').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getReport);

// Provide consent to a data call
router.route('/consent').post(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.provideConsent);

// Get data call details
router.route('/data-call/:id/:version').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getDataCallDetails);

// Get data call history
router.route('/data-call-log/:id/:version').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getDataCallHistory);

router.route('/list-extraction-patterns').get(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getExtrationPattern);

router.route('/extraction-patterns').post(userAuthHandler.isLoggedIn, userAuthHandler.getUserRole, apiAuthHandler.authenticate, commonController.getExtractionPatternsById);

module.exports = router;
//}
