'use strict';
const express = require('express');
const app = express();
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const idpCredentials = JSON.parse(process.env.IDP_CONFIG);;
const authHandler = openidlCommonLib.AuthHandler.setHandler(idpCredentials);
const commonController = require('../controllers/common');
const router = express.Router();
const API_URL = '/api';
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//module.exports = function(app) {
// Application Login
router.route(API_URL + '/login').post(authHandler.authenticate, authHandler.getUserAttributes, commonController.login);
// /authHandler.authenticate, authHandler.getUserAttributes, authHandler.storeTokenInCookie,

// Application logout
router.route(API_URL + '/logout').post(authHandler.logout, commonController.logout);

// Get data calls according to the params passed eg: status, page index etc
router.route(API_URL + '/list-data-calls-by-criteria').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getDataCalls);

/**
 * Search data call based on wildcard string
 */
router.route(API_URL + '/search-data-calls').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getSearchDataCalls);

// Get getIconBucketUrl
router.route(API_URL + '/icon-bucket-url').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getIconBucketUrl);

// Get LOBs
router.route(API_URL + '/lob').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getLOBs);

// Get Block history
router.route(API_URL + '/block-explorer').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getBlockHistory);

// Data call related tasks such as create, update etc
router.route(API_URL + '/data-call').post(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.dataCall);

// Get draft version
router.route(API_URL + '/data-call-versions/:id').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.dataCallVersions);

// Get like status
router.route(API_URL + '/like-status-data-call/:id/:version/:orgid').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getLikeStatus);

// Get consent status
router.route(API_URL + '/consent-status-data-call/:id/:version/:orgid').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getConsentStatus);

// Get Consent Count
router.route(API_URL + '/consent-count/:id/:version').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getConsentCount);

// Get Like Count
router.route(API_URL + '/like-count/:id/:version').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getLikeCount);

// Like / Unlike a data call
router.route(API_URL + '/like').post(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.likeUnlikeDataCall);

// List likes
router.route(API_URL + '/list-likes-by-data-call/:id/:version').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.listLikes);

// List Consents
router.route(API_URL + '/list-consents-by-data-call/:id/:version').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.listConsents);

// Get Reports
router.route(API_URL + '/report').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getReport);

// Provide consent to a data call
router.route(API_URL + '/consent').post(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.provideConsent);

// Get data call details
router.route(API_URL + '/data-call/:id/:version').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getDataCallDetails);

// Get data call history
router.route(API_URL + '/data-call-log/:id/:version').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getDataCallHistory);

router.route(API_URL + '/list-extraction-patterns').get(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getExtrationPattern);

router.route(API_URL + '/extraction-patterns').post(authHandler.isLoggedIn, authHandler.getUserRole, authHandler.validateToken, commonController.getExtractionPatternsById);

module.exports = router;
//}
