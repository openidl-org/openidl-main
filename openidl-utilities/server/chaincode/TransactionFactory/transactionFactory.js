/**
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';
const log4js = require('log4js');
const config = require('config');
const uuid = require('uuid/v1');
const channelConfig = require('../config/channel-config.json');

const {
    Transaction
} = require('openidl-common-lib');

const logger = log4js.getLogger('helper - transactionFactory');
logger.level = config.logLevel;
// let eventHub;
let DefaultChannelTransaction;
let CarrierChannelTransaction;
let AaisCarrier1ChannelTransaction;

const org = channelConfig.users[0].org;
const user = channelConfig.users[0].user;
const mspId = channelConfig.users[0].mspId;

const transactionFactory = {};

transactionFactory.init = async(config, networkConfig) => {
    try {
        logger.debug('transactionFactory init method entry');
        Transaction.initWallet(config);
        DefaultChannelTransaction = new Transaction(org, user, channelConfig.channels[0].channelName, channelConfig.channels[0].chaincodeName, mspId);
        DefaultChannelTransaction.init(networkConfig);

        CarrierChannelTransaction = new Transaction(org, user, channelConfig.channels[1].channelName, channelConfig.channels[1].chaincodeName, mspId)
        CarrierChannelTransaction.init(networkConfig);

        AaisCarrier1ChannelTransaction = new Transaction(org, user, channelConfig.channels[2].channelName, channelConfig.channels[2].chaincodeName, mspId)
        AaisCarrier1ChannelTransaction.init(networkConfig);

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
transactionFactory.getAaisCarrier1ChannelTransaction = () => {
    return AaisCarrier1ChannelTransaction;
};

module.exports = transactionFactory;