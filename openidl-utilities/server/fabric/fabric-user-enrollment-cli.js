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
const path = require('path');
const fabric_constants = require('../config/fabric-config.json')
const logger = log4js.getLogger('fabric-user-Enrollment-cli');
logger.level = fabric_constants.logLevel;
const fabricUserEnrollment = require('./fabric-enrollment');
async function main() {
    logger.info("Starting..");
    let net_config = process.argv[3];
    if (typeof (net_config) === 'undefined')
        net_config = "connection-profile.json";
    let user_config = process.argv[4];
    if (typeof (user_config) === 'undefined')
        user_config = "users-sample.json";
    const usersConfigPath = path.join(__dirname, './config', user_config);
    const userList = require(usersConfigPath);
    logger.info("User Details config file >> " + userList);
    let selectedOption = process.argv[2];
    if (typeof (selectedOption) === 'undefined')
        selectedOption = 'a';
    logger.info("Selected Option >> " + selectedOption);
    let persistent = process.argv[5];
    if (typeof (persistent) === 'undefined')
        persistent = "certificate-manager"
    logger.info("persistent >> " + persistent);

    fabricUserEnrollment.init(net_config);
    //fabricCAUtil.init(networkConfig);
    logger.debug(userList.users.length);

    if (selectedOption === "-r") {
        for (var i = 0; i < userList.users.length; i++) {
            fabricUserEnrollment.registerUser(userList.users[i]);
        }
    } else if (selectedOption === "-e") {
        for (var i = 0; i < userList.users.length; i++) {
            // await enrollUser(userList.users[i],defaultConfig);
            fabricUserEnrollment.enrollUser(userList.users[i], persistent);
        }
    } else {
        logger.error("Invalid Options Selected! Valid options are -r for registration and -e for enrollment.");
        return;
    }
}

main();
