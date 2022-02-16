'use strict';
const urlRegex = require('url-regex');
const ipRegex = require('ip-regex');
const express = require('express');
const app = express();
const request = require('request');
const log4js = require('log4js');
const openidlCommonApp = require('../../../openidl-common-ui/server/index');
const util = openidlCommonApp.Util;

const common = {};

const logger = log4js.getLogger('Common controller');
logger.level = process.env.LOG_LEVEL;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

common.ifUrlSafe  = (url) => {
    if (urlRegex().test(url)) {
        return false;
    } 
    if (ipRegex().test(url)) {
        return false
    }
    return true
}

common.getQueryString = (queryObj) => {
    var keys = Object.keys(queryObj);
    var queryString = '';
    keys.forEach(function(el) {
        queryString += '' + el + '=' + queryObj[el] + '&';
    });
    console.log('queryString: ' + queryString);
    return queryString;
}

common.getSearchDataCalls = (req, res) => {
    var queryString = common.getQueryString(req.query);
    
    var url = '/search-data-calls?' + queryString;
    logger.debug('ROLE In LIST');
    logger.debug(res.locals.role);
    if ((res.locals.role).trim().toLowerCase() == 'regulator' || (res.locals.role).trim().toLowerCase() == "stat-agent" || (res.locals.role).trim().toLowerCase() == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.handleRequest = (req, res, url) => {
    logger.debug('Inside handle request');
    if (!common.ifUrlSafe(url)) {
        logger.debug('request url did not pass safety check.');
        const jsonRes = {
            statusCode: 403,
            success: false,
            message: 'Permission denied: request did not pass safety check.'
        };
        util.sendResponse(res, jsonRes);
    } else {
        logger.debug("DATA_CALL_CARRIER_APP_URL :", process.env.DATA_CALL_APP_URL + url);
        var options = {
            url: process.env.DATA_CALL_APP_URL + url,
            method: req.method,
            headers: {
                'content-type': req.headers['content-type'],
                'authorization': 'Bearer ' + req.headers['usertoken']
            }
        };
        if (req.method == 'POST' || req.method == 'PUT') {
        options.json = req.body;
        }
        logger.debug('REQUEST OPTIONS');
        logger.debug(options);
        request(options, function(err, response, body) {
            if (response) {
                res.status(response.statusCode).send(body);
            } else {
                console.log('Error: ', err);
            }
        });
    }
}

common.handleLogInRequest = (req, res, url) => {
    logger.debug("Handling Logging Request");
    logger.debug(req.body);
    let jsonRes;
    if (res.locals && res.locals.user) {
        jsonRes = {
            statusCode: 200,
            success: true,
            result: res.locals.user
        };

    } else {
        jsonRes = {
            statusCode: 500,
            success: false,
            message: 'Authentication failed,Please contact system administrator'
        };
    }
    util.sendResponse(res, jsonRes);
}

common.handleLogOutRequest = (req, res, url) => {
    logger.debug("Handling Logging Request");
    logger.debug(req.body);
    var options = {
        url: process.env.DATA_CALL_APP_URL + url,
        method: req.method,
        headers: {
            'content-type': req.headers['content-type']
        },
        json: req.body
    };

    request(options, function(err, response, body) {
        if (response) {
            res.status(response.statusCode).send(body);
        } else {
            console.log('Error: ', err);
        }
    });
}

common.rejectRequest = (req, res, url) => {
    logger.debug('Inside reject request');
    let jsonRes;
    jsonRes = {
        statusCode: 403,
        success: false,
        message: 'Permission denied'
    };
    util.sendResponse(res, jsonRes);
}

common.login = (req, res) => {
    var url = '/login';
    logger.debug('Inside Login');
    logger.debug(req.body);
    common.handleLogInRequest(req, res, url);
}

common.logout = (req, res) => {
    var url = '/logout';
    common.handleLogOutRequest(req, res, url);
}

common.getExtrationPattern = (req, res) => {
    var url = '/list-extraction-patterns';
    common.handleRequest(req, res, url);
}

common.getDataCalls = (req, res) => {
    var queryString = common.getQueryString(req.query);
    var url = '/list-data-calls-by-criteria?' + queryString;
    logger.debug('ROLE In LIST');
    logger.debug(res.locals.role);
    if ((res.locals.role).trim().toLowerCase() == 'regulator' || (res.locals.role).trim().toLowerCase() == "stat-agent" || (res.locals.role).trim().toLowerCase() == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getIconBucketUrl = (req, res) => {
    var url = '/icon-bucket-url';

    logger.debug('Environment Icon Bucket');
    logger.debug("url :", url);
    logger.debug("ICON_BUCKET_URL: ", process.env.ICON_BUCKET_URL);

    let jsonRes = {
        statusCode: 200,
        success: true,
        result: process.env.ICON_BUCKET_URL
    };
    util.sendResponse(res, jsonRes);
}

common.getLOBs = (req, res) => {
    var url = '/lob';
    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getBlockHistory = (req, res) => {
    var url = '/block-explorer';

    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.dataCall = (req, res) => {
    var url = '/data-call';

    if (res.locals.role == 'regulator') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.dataCallVersions = (req, res) => {
    var url = '/data-call-versions/' + req.params.id;

    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getLikeStatus = (req, res) => {
    var url = '/like-status-data-call/' + req.params.id + '/' + req.params.version + '/' + req.params.orgid;

    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getConsentStatus = (req, res) => {
    var url = '/consent-status-data-call/' + req.params.id + '/' + req.params.version + '/' + req.params.orgid;

    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getConsentCount = (req, res) => {
    var url = '/consent-count/' + req.params.id + '/' + req.params.version;

    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getLikeCount = (req, res) => {
    var url = '/like-count/' + req.params.id + '/' + req.params.version;

    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getDataCallHistory = (req, res) => {
    var url = '/data-call-log/' + req.params.id + '/' + req.params.version;
    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.likeUnlikeDataCall = (req, res) => {
    var url = '/like';
    if (res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.listLikes = (req, res) => {
    var url = '/list-likes-by-data-call/' + req.params.id + '/' + req.params.version;
    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.listConsents = (req, res) => {
    var url = '/list-consents-by-data-call/' + req.params.id + '/' + req.params.version;
    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getDataCallDetails = (req, res) => {
    var url = '/data-call/' + req.params.id + '/' + req.params.version;
    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getReport = (req, res) => {
    var queryString = common.getQueryString(req.query);
    var url = '/report?' + queryString;
    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.provideConsent = (req, res) => {
    var url = '/consent';
    if (res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

common.getExtractionPatternsById = (req, res) => {
    var url = '/extraction-patterns';
    if (res.locals.role == 'regulator' || res.locals.role == 'stat-agent' || res.locals.role == 'carrier') {
        common.handleRequest(req, res, url);
    } else {
        common.rejectRequest(req, res, url);
    }
}

module.exports = common;
