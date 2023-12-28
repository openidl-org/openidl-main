/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */


const log4js = require('log4js');
const {
    Gateway
} = require('fabric-network');
const { BlockDecoder } = require('fabric-common');

const walletHelper = require('./wallet');

const logger = log4js.getLogger('helper -transaction ');
logger.level = process.env.LOG_LEVEL || 'debug';

const MESSAGE_CONFIG = require('./config/ibp-messages-config.js');


class transaction {
    constructor(org, user, channelName, chaincodeName, orgMSPId) {
        this.org = org;
        this.user = user;
        this.channelName = channelName;
        this.chaincodeName = chaincodeName;
        this.orgMSPId = orgMSPId;
    }
    init(connProfilePath) {
        this.ccp = connProfilePath;
    }
    static initWallet(options) {
        walletHelper.init(options);
    }

    /**
     * Handle IBP errors
     * @param {*} err 
     * @param {*} retryCountPending 
     */
    handleError(err, retryCountPending) {
        let isMessageFound = false;
        for (let messageIndex = 0; messageIndex < MESSAGE_CONFIG.errorMessages.length; messageIndex++) {
            if (err.message != null && err.message.includes(MESSAGE_CONFIG.errorMessages[messageIndex])) {
                isMessageFound = true;
                break;
            }
        }

        if (isMessageFound) {
            if (retryCountPending == undefined) {
                retryCountPending = MESSAGE_CONFIG.retryCount;
            } else if (retryCountPending == 0) {
                throw new Error(err);
            }
            retryCountPending--;
            return retryCountPending;
        } else {
            throw new Error(err);
        }
    }

    async submitTransaction(functionName, parameters, retryCountPending) {
        logger.debug('inside transaction.submitTransaction() functionName...' + functionName);
        logger.debug('inside transaction.submitTransaction() parameters...');
        logger.debug(parameters);
        const gateway = new Gateway();
        try {
            // user enroll and import if identity not found in wallet
            const idExists = await walletHelper.identityExists(this.user);
            if (!idExists) {
                throw new Error("Invalid Identity, no certificate found in certificate store");
            }

            // gateway and contract connection
            await gateway.connect(this.ccp, {
                identity: this.user,
                wallet: walletHelper.getWallet(),
                discovery: { enabled: true, asLocalhost: false }
            });

            const network = await gateway.getNetwork(this.channelName);
            const contract = network.getContract(this.chaincodeName);

            // invoke transaction
            const invokeResponse = await contract.submitTransaction(functionName, parameters);
            logger.info("Transaction successfully submitted at " + new Date().toISOString());
            return invokeResponse;
        } catch (err) {
            logger.error('submitTransaction error ' + err);

            return this.submitTransaction(functionName, parameters, this.handleError(err, retryCountPending));
        } finally {
            gateway.disconnect();
        }
    };

    async executeTransaction(functionName, parameters, retryCountPending) {
        logger.debug('inside transaction.executeTransaction()...');
        logger.debug('inside transaction.executeTransaction() functionName...' + functionName);
        logger.debug('inside transaction.executeTransaction() parameters...');
        logger.debug(parameters);

        const gateway = new Gateway();
        try {
            // user enroll and import if identity not found in wallet
            const idExists = await walletHelper.identityExists(this.user);
            if (!idExists) {
                throw new Error("Invalid Identity, no certificate found in certificate store");
            }

            // gateway and contract connection
            await gateway.connect(this.ccp, {
                identity: this.user,
                wallet: walletHelper.getWallet(),
                discovery: { enabled: true, asLocalhost: false }
            });
            const network = await gateway.getNetwork(this.channelName);
            const contract = network.getContract(this.chaincodeName);

            // invoke transaction
            let args = parameters || "";
            const queryResponse = await contract.evaluateTransaction(functionName, args);
            logger.info("Transaction successfully evaluated at " + new Date().toISOString());
            return queryResponse.toString();
        } catch (err) {
            logger.error('executeTransaction error ' + err);
            return this.executeTransaction(functionName, parameters, this.handleError(err, retryCountPending));
        } finally {
            gateway.disconnect();
        }
    };
    async transientTransaction(functionName, parameters, pageNumber, retryCountPending) {
        logger.debug('inside transaction.transientTransaction() functionName...' + functionName);
        logger.debug('inside transaction.transientTransaction() parameters...');
        const gateway = new Gateway();
        try {
            const idExists = await walletHelper.identityExists(this.user);
            if (!idExists) {
                throw new Error("Invalid Identity, no certificate found in certificate store");
            }
            await gateway.connect(this.ccp, {
                identity: this.user,
                wallet: walletHelper.getWallet(),
                discovery: { enabled: true, asLocalhost: false }
            });
            const network = await gateway.getNetwork(this.channelName);
            const contract = network.getContract(this.chaincodeName);
            logger.info("Transaction " + functionName + "execution start at " + new Date().toISOString() + "for page " + pageNumber + "*************");
            const invokeResponse = await contract.createTransaction(functionName).setTransient(parameters).submit();
            logger.info("Transaction " + functionName + "is completed at " + new Date().toISOString() + "for page " + pageNumber + "******************");
            return invokeResponse;
        } catch (err) {
            logger.error('transientTransaction error ' + err);

            return this.transientTransaction(functionName, parameters, this.handleError(err, retryCountPending));
        } finally {
            gateway.disconnect();
        }
    };

    getChannelName() {
        return this.channelName;
    }

    async getBlockDetails(retryCountPending) {
        logger.debug('get block details');
        const gateway = new Gateway();
        try {
            // let hashArray = [];
            const idExists = await walletHelper.identityExists(this.user);
            if (!idExists) {
                throw new Error("Invalid Identity, no certificate found in certificate store");
            }
            // gateway and contract connection
            await gateway.connect(this.ccp, {
                identity: this.user,
                wallet: walletHelper.getWallet(),
                discovery: { enabled: true, asLocalhost: false }
            });
            const network = await gateway.getNetwork(this.channelName);
            const blockHeight = network.discoveryService.discoveryResults.peers_by_org[this.orgMSPId].peers[0].ledgerHeight.low;
            logger.debug('height');
            logger.debug(blockHeight);
            const contract = network.getContract('qscc');
            const promiseArray = [];
            for (let index = blockHeight - 5; index < blockHeight; index++) {
                promiseArray.push(contract.evaluateTransaction(
                    'GetBlockByNumber',
                    this.channelName,
                    String(index)
                ));
            }
            const blockData = await Promise.all(promiseArray);
            return blockData.map(block => 
                { 
                    const blockData = BlockDecoder.decode(block);
                    return blockData.header.data_hash.toString('hex') 
                });
        } catch (err) {
            logger.error('getBlockDetails error ' + err);
            return this.getBlockDetails(this.handleError(err, retryCountPending));
        } finally {
            gateway.disconnect();
        }
    };

    async getBlockHeight(retryCountPending) {
        logger.debug('get block height');
        const gateway = new Gateway();
        try {
            const idExists = await walletHelper.identityExists(this.user);
            if (!idExists) {
                throw new Error("Invalid Identity, no certificate found in certificate store");
            }
            // gateway and contract connection
            await gateway.connect(this.ccp, {
                identity: this.user,
                wallet: walletHelper.getWallet(),
                discovery: { enabled: true, asLocalhost: false }
            });
            const network = await gateway.getNetwork(this.channelName);
            const height = network.discoveryService.discoveryResults.peers_by_org[this.orgMSPId].peers[0].ledgerHeight.low;
            logger.debug('height');
            logger.debug(height);
            return height;
        } catch (err) {
            logger.error('getBlockHeight error ' + err);
            return this.getBlockHeight(this.handleError(err, retryCountPending));
        } finally {
            gateway.disconnect();
        }
    }

    async getBlockDataByBlockNumber(blockNumber, retryCountPending) {
        logger.debug('getBlockDataByBlockNumber method entry');
        const gateway = new Gateway();
        try {
            const idExists = await walletHelper.identityExists(this.user);
            if (!idExists) {
                throw new Error("Invalid Identity, no certificate found in certificate store");
            }
            // gateway and contract connection
            await gateway.connect(this.ccp, {
                identity: this.user,
                wallet: walletHelper.getWallet(),
                discovery: { enabled: true, asLocalhost: false }
            });
            const network = await gateway.getNetwork(this.channelName);
            const contract = network.getContract('qscc');
            const resultByte = await contract.evaluateTransaction(
                'GetBlockByNumber',
                this.channelName,
                String(blockNumber)
            );
            const blockData = BlockDecoder.decode(resultByte);
            logger.debug('getBlockDataByBlockNumber method exit');
            return blockData;
        } catch (err) {
            logger.error('getBlockDataByBlockNumber error ' + err);
            return this.getBlockDataByBlockNumber(blockNumber, this.handleError(err, retryCountPending));
        } finally {
            gateway.disconnect();
        }
    }



    async sendUpgradeProposal(requestObj, adminCert, ordererName) {
        logger.info('Inside transaction.sendUpgradeProposal()...');
        const gateway = new Gateway();
        try {
            const idExists = await walletHelper.identityExists(this.user);
            if (!idExists) {
                throw new Error("Invalid Identity, no certificate found in certificate store");
            }
            await gateway.connect(this.ccp, {
                identity: this.user,
                wallet: walletHelper.getWallet(),
                discovery: { enabled: true, asLocalhost: false }
            });
            await gateway.getNetwork(this.channelName);
            const client = await gateway.getClient(this.channelName);
            client.setAdminSigningIdentity(adminCert.private_key, adminCert.cert, adminCert.mspid);
            requestObj.txId = client.newTransactionID(true);
            const channel = client.getChannel(this.channelName);
            await channel.initialize();
            logger.info("Upgrading your chaincode please wait ..........");
            let instantiateResponse = await channel.sendUpgradeProposal(requestObj, 600000);
            let transactResponse = {
                proposalResponses: instantiateResponse[0],
                proposal: instantiateResponse[1],
                txId: client.newTransactionID(true),
                orderer: ordererName
            }
            let responseResult = await channel.sendTransaction(transactResponse, 600000);
            logger.info("Chaincode successfully upgraded......");
            logger.debug(responseResult);
        } catch (err) {
            logger.info("Error while upgrading chaincode.......");
            throw new Error(err);
        } finally {
            gateway.disconnect();
        }

    };

    async sendInstantiateProposal(requestObj, adminCert, ordererName) {
        logger.debug('Inside transaction.sendInstantiateProposal()...');
        const gateway = new Gateway();
        try {
            const idExists = await walletHelper.identityExists(this.user);
            if (!idExists) {
                throw new Error("Invalid Identity, no certificate found in certificate store");
            }
            await gateway.connect(this.ccp, {
                identity: this.user,
                wallet: walletHelper.getWallet(),
                discovery: { enabled: true, asLocalhost: false }
            });
            await gateway.getNetwork(this.channelName);
            const client = await gateway.getClient(this.channelName);
            client.setAdminSigningIdentity(adminCert.private_key, adminCert.cert, adminCert.mspid);
            requestObj.txId = client.newTransactionID(true);
            const channel = client.getChannel(this.channelName);
            await channel.initialize();
            logger.info("Instantiating your chaincode please wait ..........");
            let instantiateResponse = await channel.sendInstantiateProposal(requestObj, 600000);
            let transactResponse = {
                proposalResponses: instantiateResponse[0],
                proposal: instantiateResponse[1],
                txId: client.newTransactionID(true),
                orderer: ordererName
            }
            let responseResult = await channel.sendTransaction(transactResponse, 600000);
            logger.info("Chaincode successfully Instantiated......");
            logger.debug(responseResult);
        } catch (err) {
            logger.info("Error while Instantiating chaincode.......");
            throw new Error(err);
        } finally {
            gateway.disconnect();
        }

    };

};


module.exports = transaction;