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


const fs = require("fs");
const lodash = require('lodash');
const log4js = require('log4js');
const path = require('path');
const fabricCAUtil = require('../../helper/util.js');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const walletHelper = openidlCommonLib.Wallet;
const logger = log4js.getLogger('fabric - fabric-enrolment.js');
const fabric_constants = require('../config/fabric-config.json')
let isPersistentStore = true;
logger.level = fabric_constants.logLevel;
var fabricEnrollment = {};
fabricEnrollment.init = async (net_config) => {
    const networkConfig = path.join(__dirname, '../config', net_config);
    fabricCAUtil.init(networkConfig);
}

fabricEnrollment.enrollAdmin = async (adminUser, adminSecret) => {
    try {
        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await fabricCAUtil.userEnroll(adminUser, adminSecret);
        logger.info('Successfully enrolled admin user');
        return enrollment
    } catch (error) {
        console.error(`Failed to enroll admin user : ${error}`);
    }
};


fabricEnrollment.registerUser = async (user) => {
    //Fetch admin details from config file
    const adminConfigPath = path.join(__dirname, '../config', fabric_constants.adminConfigFile);
    const adminList = require(adminConfigPath);
    console.log("Admin Details config file >> " + adminList.adminlist.length);
    var adminOrg = user.org;

    let admin = lodash.filter(adminList.adminlist, ["org", adminOrg]);
    let adminUser = admin[0].user;
    let adminSecret = admin[0].secret;
    console.log("adminUser" + adminUser);
    console.log("Registering User in Fabric CA...");

    if (isPersistentStore) {
        await walletHelper.init(JSON.parse(process.env.KVS_CONFIG));
    } else {
        throw new Error("PersistentStore not there!");
    }

    // Must use an admin to register a new user
    const wallet = walletHelper.getWallet();
    let adminIdentity = await wallet.get(adminUser);
    logger.info("adminidentity now: ", adminIdentity)
    if (!adminIdentity) {
        logger.info('An identity for the admin user does not exist in the wallet');
        logger.info('Enroll the admin user before retrying');
        const enrollInfo = await fabricEnrollment.enrollAdmin(adminUser, adminSecret);
        await walletHelper.importIdentity(adminUser, enrollInfo);
    }
    adminIdentity = await wallet.get(adminUser);
    logger.info("adminidentity after: ", adminIdentity)

    // build a user object for authenticating with the CA
    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUserInfo = await provider.getUserContext(adminIdentity, adminUser);

    return new Promise(((resolve, reject) => {
        fabricCAUtil.userRegister(
            user.org, user.user, user.pw, user.affiliation, user.role, user.attrs, adminUser, adminSecret, adminUserInfo)
            .then((secret) => {
                console.log("Secret....");
                console.log(secret);
                return resolve(secret);
            }).catch((err) => {
                return reject(err);
            });
    }));
}

/**
 * Enroll user in Hyperledger Fabric and store certificate in persistant store
 */
fabricEnrollment.enrollUser = async (user) => {
    logger.info("Enrolling User in Fabric CA...  new user");
    logger.info("Storing User Certificate in Persistant Store...");
    try {
        const enrollInfo = await fabricCAUtil.userEnroll(user.user, user.pw)
        let enrollJson = {
            "user": user.user,
            "org": user.org,
            "certificate": enrollInfo.certificate,
            "key": enrollInfo.key
        }
        if (isPersistentStore) {
            await walletHelper.init(JSON.parse(process.env.KVS_CONFIG));
            await walletHelper.importIdentity(user.user, enrollInfo);
        } else {
            logger.info("Storing User Certificate on File System...");
            fs.writeFile('enrollInfo.json', enrollJson, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
        return enrollInfo;
    } catch (err) {
        throw err;
    };
}
module.exports = fabricEnrollment;
