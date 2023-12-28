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
const fabric_config = require('../config/fabric-config');
const logger = log4js.getLogger('controllers - fabric-user-controller');
const fabricUserEnrollment = require('../fabric/fabric-enrollment');
const fabricEnrollmentAPI = {};
logger.level = fabric_config.logLevel;

/**
 * Controller object
 */

let jsonRes;

fabricEnrollmentAPI.enroll = async (req, res) => {

    logger.debug("fabric enroll method entry");

    //read from swagger
    let payload;
    payload = req.body;
    logger.info(payload);
    logger.info("user payload" + payload.users[0]);
    fabricUserEnrollment.init(fabric_config.connectionProfile);

    //invoke apis
    if (payload.options == 'register') {
        try {
            logger.debug("payload.users[0]" + payload.users[0]);
            await fabricUserEnrollment.registerUser(payload.users[0]);
            logger.info("Fabric user registered  = " + new Date().toISOString());
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'Fabric user registered'
            };
        }
        catch (err) {
            logger.error('User enrollment error ', err);
            jsonRes = {
                statusCode: 500,
                success: false,
                message: `FAILED: Fabric User Register failed`,
            };
        }
    }
    else if (payload.options == 'enroll') {
        try {
            logger.debug("payload.users[0]" + payload.users[0]);
            await fabricUserEnrollment.enrollUser(payload.users[0]);
            logger.info("Fabric user enrolled  = " + new Date().toISOString());
            jsonRes = {
                statusCode: 200,
                success: true,
                message: 'Fabric user enrolled'
            };
        }
        catch (err) {
            logger.error(' Users enrollment error ', err);
            //logger.error(' code ', err.Error.code);
            jsonRes = {
                statusCode: 500,
                success: false,
                message: `FAILED: Fabric User Enrollment failed  ` + err,
            };

        }
    }
    fabricEnrollmentAPI.sendResponse(res, jsonRes);
};

fabricEnrollmentAPI.sendResponse = async (res, msg) => {
    const response = msg;
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = response.statusCode;
    delete response.statusCode;
    res.json(response);
};

module.exports = fabricEnrollmentAPI;
