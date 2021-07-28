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
const IBMCloudEnv = require('ibm-cloud-env');
const path = require('path');
const fabricCAUtil = require('../../helper/util.js');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const walletHelper = openidlCommonLib.Wallet;
const logger = log4js.getLogger('fabric - fabric-enrolment.js');
const cert = require('../fabric/config/local-certmanager-config.json');
const fabric_constants = require('../fabric/config/fabric-config.json')
let isPersistentStore = true;
logger.level = fabric_constants.logLevel;
var fabricEnrollment = {};
fabricEnrollment.init = async (net_config) => {
    const networkConfig = path.join(__dirname, './config', net_config);
    fabricCAUtil.init(networkConfig);
}
fabricEnrollment.registerUser = async (user) => {
    //Fetch admin details from config file

    const adminConfigPath = path.join(__dirname, './config', fabric_constants.adminConfigFile);
    const adminList = require(adminConfigPath);
    console.log("Admin Details config file >> " + adminList.adminlist.length);
    var adminMsp = user.org;

    let admin = lodash.filter(adminList.adminlist, ["mspid", adminMsp]);
    let adminUser = admin[0].user;
    let adminSecret = admin[0].secret;
    console.log("adminUser" + adminUser);
    console.log("Registering User in Fabric CA...");
    return new Promise(((resolve, reject) => {
        fabricCAUtil.userRegister(user.org, user.user, user.pw, user.affiliation, user.role, user.attrs, adminUser, adminSecret).then((secret) => {
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
fabricEnrollment.enrollUser = async (user, persistent) => {
    console.log("Enrolling User in Fabric CA...  new user");
    console.log("Storing User Certificate in Persistant Store...");
    return new Promise(((resolve, reject) => {
        fabricCAUtil.userEnroll(user.org, user.user, user.pw).then((enrollInfo) => {
            let enrollJson = {
                "user": user.user,
                "org": user.org,
                "certificate": enrollInfo.certificate,
                "key": enrollInfo.key
            }
            if (isPersistentStore) {
                if (typeof (persistent) !== 'undefined' && persistent === "cloudant") {
                    walletHelper.initCloudant(IBMCloudEnv.getDictionary('db-credentials'));
                    console.log("wallet initialised with Cloudant");
                } else if (typeof (persistent) === 'undefined' || persistent === "certificate-manager") {
                    console.log(cert);
                    walletHelper.init(cert);
                    console.log("wallet initialised with Certificate manager");
                } else {
                    console.log("Incorrect Usage of script. Refer README for more details");
                    return;
                }
                walletHelper.importIdentity(user.user, user.org, enrollInfo.certificate, enrollInfo.key);
            } else {
                console.log("Storing User Certificate on File System...");
                fs.writeFile('enrollInfo.json', enrollJson, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
            }
            return resolve(enrollInfo);
        }).catch((err) => {
            return reject(err);
        });
        return;
    }));
}
module.exports = fabricEnrollment;