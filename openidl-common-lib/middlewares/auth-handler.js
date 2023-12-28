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
const logger = log4js.getLogger('middleware - auth-handler');
const appIdAuthHandler = require("./appid-auth-handler");
const cognitoAuthHandler = require("./cognito-auth-handler");
logger.level = process.env.LOG_LEVEL || 'debug';

/**
 * Auth object
 */
const authHandler = {};

/**
* get configuration on local envrionment
*/
authHandler.setHandler = (options) => {
    logger.info('Inside authHandler setHandler');
    
    if (!options || !options.idpType) {
        logger.error('Identity provider config not found!!');
    }
    switch (options.idpType) {
        case 'appid':
            appIdAuthHandler.init(options);
            logger.info('authHandler setHandler: ', options.idpType);
            return appIdAuthHandler;
        case 'cognito':
            cognitoAuthHandler.init(options);
            logger.info('authHandler setHandler: ', options.idpType);
            return cognitoAuthHandler;
        default:
            logger.error("Incorrect Usage of identity provider type. Refer README for more details");
            break;
    }
  
}

module.exports = authHandler;