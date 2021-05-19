/**
 SPDX-License-Identifier: Apache-2.0
*/
const log4js = require('log4js');
const logger = log4js.getLogger('installChaincode-index');
logger.level = config.logLevel;
const InstallChaincode = require('./installChaincode/installchaincode');
const base64converter = require('./base64Converter/base64converter');
const config = require('config');
const IBMCloudEnv = require('ibm-cloud-env');
const path = require('path');
IBMCloudEnv.init("/config/mapping.json");
const chainConfig = require('../chaincode/config/chainConfig.json');
chainConfig.peers.forEach(element => {
    logger.info("Installing chaincode ..................... ");
    let adminCert = IBMCloudEnv.getDictionary(element.adminCertName);
    adminCert.private_key = base64converter.decoder(adminCert.private_key);
    adminCert.cert = base64converter.decoder(adminCert.cert);
    const installChaincode = new InstallChaincode(IBMCloudEnv.getDictionary(element.networkConfigName), adminCert, element.request);
    installChaincode.init();
    logger.info("Chaincode Initializing done..................... ");
    installChaincode.install();
});