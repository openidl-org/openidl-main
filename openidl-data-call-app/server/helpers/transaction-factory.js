'use strict';
const log4js = require('log4js');
const config = require('config');
const channelConfig = require('../config/channel-config.json');

const {
    Transaction
} = require('@openidl-org/openidl-common-lib');

const logger = log4js.getLogger('helper - transactionFactory');
logger.level = config.logLevel;
// let eventHub;
let DefaultChannelTransaction;
let CarrierChannelTransaction;
const org = channelConfig.users[0].org;
const user = channelConfig.users[0].user;
const mspId = channelConfig.users[0].mspId;

const transactionFactory = {};

transactionFactory.init = async (config, networkConfig) => {
    try {
        logger.debug('transactionFactory init method entry');
        Transaction.initWallet(config);
        DefaultChannelTransaction = new Transaction(org, user, channelConfig.channels[0].channelName, channelConfig.channels[0].chaincodeName, mspId);
        DefaultChannelTransaction.init(networkConfig);

        CarrierChannelTransaction = new Transaction(org, user, channelConfig.channels[1].channelName, channelConfig.channels[1].chaincodeName, mspId)
        CarrierChannelTransaction.init(networkConfig);

    } catch (error) {
        logger.error('transaction factory init error:  ' + error);
        throw new Error('transaction factory init error: ' + error);
    }

};

transactionFactory.getDefaultChannelTransaction = () => {
    return DefaultChannelTransaction;
};
transactionFactory.getCarrierChannelTransaction = () => {
    return CarrierChannelTransaction;
};



module.exports = transactionFactory;