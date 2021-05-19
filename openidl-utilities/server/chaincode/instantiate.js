/**
 SPDX-License-Identifier: Apache-2.0
*/
const log4js = require('log4js');
const logger = log4js.getLogger('Instantiate-index');
logger.level = config.logLevel;
const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init("/config/mapping.json");
const instantiateConfig = require('./config/instantiateConfig.json');
const base64converter = require('./base64Converter/base64converter');
const transactionFactory = require('./TransactionFactory/transactionFactory');
const networkConfig = require('./config/connection-profile.json');
const collection = require('./config/collection-config.json');

transactionFactory.init(IBMCloudEnv.getDictionary('IBM-certificate-manager-credentials'), networkConfig).then(data => {
    logger.info("initialization done");
    instantiateConfig.channel.forEach(element => {
        console.log(process.argv[2]);
        if (process.argv[2] === '-i') {
            instantiate(element);
        } else if (process.argv[2] === '-u') {
            update(element);
        } else {
            logger.warn("Invalid Option please select -i for instantiate and -u for update");
        }

    });

}).catch(err => {
    logger.error('transaction factory init error' + err);
});

async function instantiate(element) {
    element.request['collections-config'] = collection;
    element.channelName.forEach(channel => {
        let adminCert = IBMCloudEnv.getDictionary(element.adminCertName);
        adminCert.private_key = base64converter.decoder(adminCert.private_key);
        adminCert.cert = base64converter.decoder(adminCert.cert);
        if (channel == "defaultchannel") {
            transactionFactory.getDefaultChannelTransaction().sendInstantiateProposal(element.request, adminCert, element.ordererName).then((results) => {
                logger.info('chaincode Instantiate successfully completed...........');
                return
            }).catch((error) => {
                logger.error('Error: ' + error);
                return
            });
        } else if (channel === "aais-carriers") {
            transactionFactory.getAaisCarrier1ChannelTransaction().sendInstantiateProposal(element.request, adminCert, element.ordererName).then((results) => {
                logger.info('chaincode Instantiate successfully completed...........');
                return
            }).catch((error) => {
                logger.error('Error: ' + error);
                return
            });
        } else if (channel === "aais-faircover") {
            transactionFactory.getCarrierChannelTransaction().sendInstantiateProposal(element.request, adminCert, element.ordererName).then((results) => {
                logger.info('chaincode Instantiate successfully completed...........');
                return
            }).catch((error) => {
                logger.error('Error: ' + error);
                return
            });
        }
    })
}

async function update(element) {
    element.request['collections-config'] = collection;
    element.channelName.forEach(channel => {
        let adminCert = IBMCloudEnv.getDictionary(element.adminCertName);
        adminCert.private_key = base64converter.decoder(adminCert.private_key);
        adminCert.cert = base64converter.decoder(adminCert.cert);
        if (channel == "defaultchannel") {
            transactionFactory.getDefaultChannelTransaction().sendUpgradeProposal(element.request, adminCert, element.ordererName).then((results) => {
                logger.info('chaincode update successfully completed...........');
                return
            }).catch((error) => {
                logger.error('Error: ' + error);
                return
            });
        } else if (channel === "aais-carriers") {
            transactionFactory.getAaisCarrier1ChannelTransaction().sendUpgradeProposal(element.request, adminCert, element.ordererName).then((results) => {
                logger.info('chaincode update successfully completed...........');
                return
            }).catch((error) => {
                logger.error('Error: ' + error);
                return
            });
        } else if (channel === "aais-faircover") {
            transactionFactory.getCarrierChannelTransaction().sendUpgradeProposal(element.request, adminCert, element.ordererName).then((results) => {
                logger.info('chaincode update successfully completed...........');
                return
            }).catch((error) => {
                logger.error('Error: ' + error);
                return
            });
        }
    })
}