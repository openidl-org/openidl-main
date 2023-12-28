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
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
/**
 * Util object
 */
const util = {};


/**
 * Set up logging
 */
const logger = log4js.getLogger('helpers - util');
logger.level = config.logLevel;

/**
 * Initialize util with path of connection profile
 */
let connectionProfile;
util.init = (connProfilePath) => {
    connectionProfile = connProfilePath;
}

/**
 * Enroll given user with given org Fabric CA
 */
util.userEnroll = (enrollId, enrollSecret) => {
    logger.debug(`Enrolling user ${enrollId}`);
    return new Promise(((resolve, reject) => {
        // add network config file to fabric ca service and get orgs and CAs fields
        logger.debug("load connection profile");
        //FabricCAServices.addConfigFile(connectionProfile);
        const ccpJSON = fs.readFileSync(connectionProfile, 'utf8');
        const ccp = JSON.parse(ccpJSON);
        logger.debug("connection profile loaded");

        const clientOrg = ccp.client.organization;
        logger.debug("Client Org -> ", clientOrg);
        const org = ccp.organizations[clientOrg];
        console.log("Org -> ", org);
        const orgCAKey = org.certificateAuthorities[0];
        logger.debug("Org CA Key -> ", orgCAKey);
        const caURL = ccp.certificateAuthorities[orgCAKey].url;
        logger.debug("Org CA URL -> ", caURL);
        const caName = ccp.certificateAuthorities[orgCAKey].caName;
        logger.debug("Org CA Name -> ", caName);
        const mspId = org.mspid;
        logger.debug("MSP Id -> ", mspId);

        // enroll user with certificate authority for orgName
        const tlsOptions = {
            trustedRoots: [],
            verify: false,
        };
        //const caService = new FabricCAServices(fabricCAEndpoint, tlsOptions, fabricCAName);
        const caService = new FabricCAServices(caURL, tlsOptions, caName);
        const req = {
            enrollmentID: enrollId,
            enrollmentSecret: enrollSecret,
            maxEnrollments: -1

        };
        logger.debug("Enrollment Request...");
        logger.debug(req);
        caService.enroll(req).then(
            (enrollment) => {
                const x509Identity = {
                    credentials: {
                        certificate: enrollment.certificate,
                        privateKey: enrollment.key.toBytes()
                    },
                    mspId: mspId,
                    type: 'X.509',
                };
                return resolve(x509Identity);
            },
            (err) => {
                logger.debug(err);
                logger.debug("err " + err);
                return reject(err);
            },
        );
    }));
};

/**
 * Enroll given user with given org Fabric CA
 */
util.userRegister = async (orgName, enrollId, enrollSecret, affiliation, role, attrs, adminUser, adminSecret, adminUserInfo) => {
    logger.debug(`Registering user ${enrollId}`);
    logger.debug("adminUser" + adminUser);

    return new Promise(((resolve, reject) => {
        // add network config file to fabric ca service and get orgs and CAs fields
        logger.debug("load connection profile");
        const ccpJSON = fs.readFileSync(connectionProfile, 'utf8');
        const ccp = JSON.parse(ccpJSON);
        logger.debug("connection profile loaded");
        const clientOrg = orgName;
        logger.debug("Client Org -> ", clientOrg);
        const org = ccp.organizations[clientOrg];
        logger.debug("Org -> ", org);
        const orgCAKey = org.certificateAuthorities[0];
        logger.debug("Org CA Key -> ", orgCAKey);
        const caURL = ccp.certificateAuthorities[orgCAKey].url;
        logger.debug("Org CA URL -> ", caURL);
        const caName = ccp.certificateAuthorities[orgCAKey].caName;
        logger.debug("Org CA Name -> ", caName);
        const mspId = org.mspid;
        logger.debug("MSP Id -> ", mspId);

        const tlsOptions = {
            trustedRoots: [],
            verify: false,
        };
        const caService = new FabricCAServices(caURL, tlsOptions, caName);
        const req = {
            enrollmentID: enrollId,
            role: role,
            enrollmentSecret: enrollSecret,
            attrs: attrs,
            maxEnrollments: -1

        };
        caService.register(req, adminUserInfo).then(
            (enrollment) => {
                logger.debug("enrolling ");
                return resolve(enrollment);
            }).catch((err) => {
                logger.debug("err " + err);
                return reject(err);
            });

    }));
};

module.exports = util;