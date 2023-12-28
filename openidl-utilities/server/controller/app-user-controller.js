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
const logger = log4js.getLogger('controllers - app-user-controller');
const appUserRegistration = require('../app/app-user');
logger.level = config.logLevel;

/**
 * Controller object
 */
const appRegistrationAPI = {};

appRegistrationAPI.login = async (req, res) => {
    logger.info('app user login method entry -');
    let payload;
    let jsonRes;
    payload = req.body;
    logger.info(payload)

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
    appRegistrationAPI.sendResponse(res, jsonRes);
};

appRegistrationAPI.register = async (req, res) => {

    logger.info("app user register method entry -");
    let payload;
    let jsonRes;
    payload = req.body;
    logger.info(payload)

    try {
        const idpConfig = JSON.parse(process.env.IDP_CONFIG);
        switch (idpConfig.idpType) {
            case "appid":
                await appUserRegistration.createUserInCloudDirectory(payload);
                await appUserRegistration.signInUserToAppId(payload);
                await appUserRegistration.updateUserProfileInAppId(payload);
                break;
            case "cognito":
                await appUserRegistration.createUserInCognito(payload);
                break;
            default:
                logger.error("Incorrect Usage of identity provider type. Refer README for more details");
                break;

        }

        logger.info("User created  = " + new Date().toISOString());
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'User Created'
        };

    } catch (err) {
        logger.error('User Registration error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: User registration failed.` + err,
        };
    }
    appRegistrationAPI.sendResponse(res, jsonRes);
};

appRegistrationAPI.updateUserAttributes = async (req, res) => {
    logger.info('app user attributes method entry -');
    let payload;
    let jsonRes;
    payload = req.body;
    logger.info(payload)

    try {
        const idpConfig = JSON.parse(process.env.IDP_CONFIG);
        switch (idpConfig.idpType) {
            case "appid":
                logger.warning("Update Attributes not implemented for IBM App Id");
                break;
            case "cognito":
                await appUserRegistration.updateCognitoUserAttributes(payload);
                break;
            default:
                logger.error("Incorrect Usage of identity provider type. Refer README for more details");
                break;

        }
        logger.info('User attributes updated  = ' + new Date().toISOString());
        jsonRes = {
            statusCode: 200,
            success: true,
            message: 'User attributes updated'
        };

    } catch (err) {
        logger.error('User attributes update error ', err);
        jsonRes = {
            statusCode: 500,
            success: false,
            message: `FAILED: User atrributes update failed.` + err,
        };
    }
    appRegistrationAPI.sendResponse(res, jsonRes);
};

appRegistrationAPI.sendResponse = async (res, msg) => {
    const response = msg;
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = response.statusCode;
    delete response.statusCode;
    res.json(response);
};


module.exports = appRegistrationAPI;