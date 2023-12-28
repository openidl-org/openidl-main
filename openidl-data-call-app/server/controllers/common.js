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
const {
    LineOfBusinessService
} = require('@openidl-org/openidl-common-lib');
const transactionFactory = require('../helpers/transaction-factory');
const logger = log4js.getLogger('controllers - common');
logger.level = config.logLevel;


/**
 * Controller object
 */
const common = {};

common.login = (req, res) => {
    logger.info("login method entry -");
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

common.logout = (req, res) => {
    let jsonRes;
    jsonRes = {
        statusCode: 200,
        success: true,
        message: "logout successful"
    };
    util.sendResponse(res, jsonRes);

}

/**
 * searchDataCalls Method is used to fetch data from ledger using wildcard string
 * Query Parameter1 (status)
 * Query Parameter2 (version)
 * Query Parameter3 (startIndex)
 * Query Parameter4 (pageSize)
 * Query Parameter5 (searchKey)
 * Returns JSON array [{}]
 */
common.searchDataCalls = async(req, res) => {
    
    logger.info("searchDataCall method entry -");
    logger.debug('searchDataCall input query : ');
    logger.debug(req.query);
    let jsonResponse;

    try {
        if (req.query.hasOwnProperty('startIndex')) {
            req.query['startIndex'] = parseInt(req.query['startIndex']);
        }
        if (req.query.hasOwnProperty('pageSize')) {
            req.query['pageSize'] = parseInt(req.query['pageSize']);
        }

        logger.debug('searchDataCall parsed query : ');
        logger.debug(req.query);

        logger.debug('searchDataCall executeTransaction invoke ');

        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('SearchDataCalls', JSON.stringify(req.query));
        logger.debug('searchDataCall executeTransaction complete ');
        
        jsonResponse = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
        
    } catch (err) {
        logger.error('searchDataCall error ', err);
        jsonResponse = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }

    logger.debug('searchDataCall send response ');
    logger.info("searchDataCall method exit.");
    util.sendResponse(res, jsonResponse);
};

common.listDataCallsByCriteria = async(req, res) => {
    logger.info("listDataCallsByCriteria method entry -");
    logger.debug('listDataCallsByCriteria input query : ');
    logger.debug(req.query);
    let jsonRes;
    try {
        if (req.query.hasOwnProperty('startIndex')) {
            req.query['startIndex'] = parseInt(req.query['startIndex']);
        }
        if (req.query.hasOwnProperty('pageSize')) {
            req.query['pageSize'] = parseInt(req.query['pageSize']);
        }
        logger.debug('listDataCallsByCriteria parsed query : ');
        logger.debug(req.query);

        logger.debug('listDataCallsByCriteria executeTransaction invoke ');

        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('ListDataCallsByCriteria', JSON.stringify(req.query));
        logger.debug('listDataCallsByCriteria executeTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('listDataCallsByCriteria error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('listDataCallsByCriteria send response ');
    logger.info("listDataCallsByCriteria method exit.");
    util.sendResponse(res, jsonRes);
};

common.getDataCallVersionsById = async(req, res) => {
    logger.info("getDataCallVersionsById method entry -");
    let jsonRes;
    try {
        logger.debug('getDataCallVersionsById id : ', req.params['id']);
        let id = req.params['id'];
        logger.debug('getDataCallVersionsById query : ');
        logger.debug(req.query);
        req.query['id'] = id;
        logger.debug('getDataCallVersionsById arguments : ');
        logger.debug(req.query);
        logger.debug('getDataCallVersionsById executeTransaction invoke ');
        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('GetDataCallVersionsById', JSON.stringify(req.query));
        logger.debug('getDataCallVersionsById executeTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('getDataCallVersionsById error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('getDataCallVersionsById send response ');
    logger.info("getDataCallVersionsById method exit.");
    util.sendResponse(res, jsonRes);
};

common.getDataCallByIdAndVersion = async(req, res) => {
    logger.info("getDataCallByIdAndVersion method entry -");
    let jsonRes;
    let args = {};
    try {
        args['id'] = req.params['id'];
        args['version'] = req.params['version'];

        logger.debug('getDataCallByIdAndVersion arguments : ');
        logger.debug(args);
        logger.debug('getDataCallByIdAndVersion executeTransaction invoke ');
        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('GetDataCallByIdAndVersion', JSON.stringify(args));
        logger.debug('getDataCallByIdAndVersion executeTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('getDataCallByIdAndVersion error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('getDataCallByIdAndVersion send response ');
    logger.info("getDataCallByIdAndVersion method exit.");
    util.sendResponse(res, jsonRes);
};

common.listLineOfBusiness = async(req, res) => {
    let jsonRes;
    logger.info("listLineOfBusiness method entry -");
    logger.debug('listLineOfBusiness executeTransaction invoke ');
    let queryResponse = JSON.stringify(LineOfBusinessService.listLineOfBusiness());
    logger.debug('listLineOfBusiness executeTransaction complete ');
    jsonRes = {
        statusCode: 200,
        success: true,
        result: queryResponse
    };
    util.sendResponse(res, jsonRes);
};


common.toggleLike = async(req, res) => {
    logger.info("toggleLike method entry -");
    let jsonRes;
    try {
        req.body['updatedTs'] = new Date().toISOString();
        logger.debug('toggleLike req body :');
        logger.debug(req.body);
        await transactionFactory.getCarrierChannelTransaction().submitTransaction('ToggleLike', JSON.stringify(req.body));

        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'OK'
        };
    } catch (err) {
        logger.error('toggleLike error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('toggleLike send response ');
    logger.info('toggleLike method exit ');
    util.sendResponse(res, jsonRes);

};


common.likeCount = async(req, res) => {
    logger.info("likeCount method entry -");
    let jsonRes;
    let args = {};
    try {
        args['datacallID'] = req.params['id'];
        args['dataCallVersion'] = req.params['version'];

        logger.debug('likeCount arguments : ');
        logger.debug(args);
        logger.debug('likeCount executeTransaction invoke ');
        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('CountLikes', JSON.stringify(args));
        logger.debug('likeCount executeTransaction complete ');

        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('likeCount error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('likeCount send response ');
    logger.info("likeCount method exit.");
    util.sendResponse(res, jsonRes);
};

common.consentCount = async(req, res) => {
    logger.info("consentCount method entry -");
    let jsonRes;
    let args = {};
    try {
        args['datacallID'] = req.params['id'];
        args['dataCallVersion'] = req.params['version'];

        logger.debug('consentCount arguments : ');
        logger.debug(args);
        logger.debug('consentCount executeTransaction invoke ');
        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('CountConsents', JSON.stringify(args));
        logger.debug('consentCount executeTransaction complete ');

        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('consentCount error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('consentCount send response ');
    logger.info("consentCount method exit.");
    util.sendResponse(res, jsonRes);
};

common.likeStatusByDataCall = async(req, res) => {
    logger.info("likeStatusByDataCall method entry -");
    let jsonRes;
    let args = {
        like: {}
    };

    try {
        args.like['datacallID'] = req.params['id'];
        args.like['dataCallVersion'] = req.params['version'];
        args.like['organizationID'] = req.params['orgId'];
        logger.debug('likeStatusByDataCall arguments : ');
        logger.debug(args);

        let queryResponse = await transactionFactory.getCarrierChannelTransaction().executeTransaction('GetLikeByDataCallAndOrganization', JSON.stringify(args));

        logger.debug('likeStatusByDataCall executeTransaction complete ');

        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('likeStatusByDataCall error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('likeStatusByDataCall send response ');
    logger.info("likeStatusByDataCall method exit.");
    util.sendResponse(res, jsonRes);
};

common.getReportsByCriteria = async(req, res) => {
    logger.info("getReportsByCriteria method entry -");
    logger.debug('getReportsByCriteria input query : ');
    logger.debug(req.query);
    let jsonRes;
    try {
        if (req.query.hasOwnProperty('startIndex')) {
            req.query['startIndex'] = parseInt(req.query['startIndex']);
        }
        if (req.query.hasOwnProperty('pageSize')) {
            req.query['pageSize'] = parseInt(req.query['pageSize']);
        }
        logger.debug('getReportsByCriteria parsed query : ');
        logger.debug(req.query);

        logger.debug('getReportsByCriteria executeTransaction invoke ');
        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('ListReportsByCriteria', JSON.stringify(req.query));
        logger.debug('getReportsByCriteria executeTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('getReportsByCriteria error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('getReportsByCriteria send response ');
    logger.info("getReportsByCriteria method exit.");
    util.sendResponse(res, jsonRes);
};

common.dataCallLog = async(req, res) => {
    logger.info("dataCallLog method entry -");
    let jsonRes;
    let args = {};
    try {
        args['datacallID'] = req.params['id'];
        args['dataCallVersion'] = req.params['version'];

        logger.debug('dataCallLog arguments : ');
        logger.debug(args);
        logger.debug('dataCallLog executeTransaction invoke ');
        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('ListDataCallTransactionHistory', JSON.stringify(args));
        logger.debug('dataCallLog executeTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('dataCallLog error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('dataCallLog send response ');
    logger.info("dataCallLog method exit.");
    util.sendResponse(res, jsonRes);
};


common.blockExplorer = async(req, res) => {
    logger.info("blockExplorer method entry -");
    let jsonRes;
    try {
        logger.debug('blockExplorer getBlockDetails invoke ');
        const blockDetailsResponse = await transactionFactory.getDefaultChannelTransaction().getBlockDetails();
        logger.debug('blockExplorer getBlockDetails complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: blockDetailsResponse
        };
    } catch (err) {
        logger.error('blockExplorer error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('blockExplorer send response ');
    logger.info("blockExplorer method exit.");
    util.sendResponse(res, jsonRes);
};

common.listExtractionPatterns = async(req, res) => {
    logger.info("listExtractionPatterns method entry -");
    let jsonRes;
    try {

        logger.debug('listExtractionPatterns executeTransaction invoke ');

        let queryResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('ListExtractionPatterns', "");
        logger.debug('listExtractionPatterns executeTransaction complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: queryResponse
        };
    } catch (err) {
        logger.error('listExtractionPatterns error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('listExtractionPatterns send response ');
    logger.info("listExtractionPatterns method exit.");
    util.sendResponse(res, jsonRes);
};

common.getExtractionPatternsById = async(req, res) => {
    logger.info("getExtractionPatternsById method entry -");
    let jsonRes;
    try {
        logger.debug('getExtractionPatternsById getBlockDetails invoke ');
        const patternResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('GetExtractionPatternByIds', JSON.stringify(req.body));
        logger.debug('getExtractionPatternsById getBlockDetails complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: patternResponse
        };
    } catch (err) {
        logger.error('getExtractionPatternsById error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('getExtractionPatternsById send response ');
    logger.info("getExtractionPatternsById method exit.");
    util.sendResponse(res, jsonRes);
};

common.getDataCallAndExtractionPattern = async (req, res) => {
    logger.info("getDataCallAndExtractionPattern method entry -");
    let reqParam = { 'dataCallID': req.body.dataCallID, 'dataCallVersion': req.body.dataCallVersion, 'dbType': req.body.dbType }
    logger.info('getDataCallAndExtractionPattern: Req param', reqParam);
    let jsonRes;
    try {
        logger.debug('getDataCallAndExtractionPattern invoke ');
        const patternResponse = await transactionFactory.getDefaultChannelTransaction().executeTransaction('GetDataCallAndExtractionPattern', JSON.stringify(reqParam));
        logger.debug('getDataCallAndExtractionPattern complete ');
        jsonRes = {
            statusCode: 200,
            success: true,
            result: patternResponse
        };
    } catch (err) {
        logger.error('getDataCallAndExtractionPattern error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: ${err}`,
        };
    }
    logger.debug('getDataCallAndExtractionPattern send response ');
    logger.info("getDataCallAndExtractionPattern method exit.");
    util.sendResponse(res, jsonRes);
};


common.updateConsentStatus = async (req, res) => {
    logger.info("updateConsentStatus method entry -");
    let jsonRes;
    let args = {
      
    };
    try {
      args['datacallID'] = req.params['id'];
      args['dataCallVersion'] = req.params['version'];
      args['carrierID'] = req.params['orgId'];
      args['status'] = req.params['status'];
      logger.debug('updateConsentStatus arguments : ');
      logger.debug(args);
      logger.debug('updateConsentStatus executeTransaction invoke ');
      let queryResponse = await transactionFactory.getCarrierChannelTransaction().executeTransaction('UpdateConsentStatus', JSON.stringify(args));
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


module.exports = common;