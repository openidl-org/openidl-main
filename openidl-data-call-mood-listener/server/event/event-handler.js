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
const uuid = require('uuid/v1');
const targetChannelConfig = require('../config/target-channel-config');
const networkConfig = require('../config/connection-profile.json');
const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init();
const {
    Transaction
} = require('@openidl-org/openidl-common-lib');

const logger = log4js.getLogger('event-handler ');
logger.level = config.logLevel;

console.log(targetChannelConfig);

Transaction.initWallet(IBMCloudEnv.getDictionary('IBM-certificate-manager-credentials'));
let targetChannelTransaction = new Transaction(targetChannelConfig.users[0].org, targetChannelConfig.users[0].user, targetChannelConfig.targetChannels[0].channelName, targetChannelConfig.targetChannels[0].chaincodeName, targetChannelConfig.users[0].mspId);
targetChannelTransaction.init(networkConfig);

let eventFunction = {};
eventFunction.ConsentedEvent = async function processConsentEvent(payload, blockNumber) {
    try {
        logger.info('processConsentEvent function entry payload');
        if (payload) {
            payload = JSON.parse(payload.toString('utf8'));
            logger.debug(payload);
            logger.debug(' processConsentEvent block number ==>' + blockNumber);
            if ((!payload.datacallID) || (!payload.dataCallVersion)) {
                logger.error('processConsentEvent submit transaction error: invalid conscent payload :');
                logger.error(payload);
                return false;
            }
            const data = {
                datacallID: payload.datacallID,
                dataCallVersion: payload.dataCallVersion,
                delta: 1,
                updatedTs: new Date().toISOString()
            };
            logger.debug('CreateConsentCountEntry request data ');
            logger.debug(data);
            logger.debug('processConsentEvent: CreateConsentCountEntry submitTransaction invoke ');
            await targetChannelTransaction.submitTransaction('CreateConsentCountEntry', JSON.stringify(data));
            logger.debug('processConsentEvent: CreateConsentCountEntry submitTransaction complete for block ' + blockNumber);
            const updateConsentCountArgs = {
                dataCallID: payload.datacallID,
                dataCallVersion: payload.dataCallVersion
            }

            logger.debug('processConsentEvent: UpdateConsentCountForDataCall submitTransaction invoke', updateConsentCountArgs);
            await targetChannelTransaction.submitTransaction('UpdateConsentCountForDataCall', JSON.stringify(updateConsentCountArgs));
            logger.debug('processConsentEvent: UpdateConsentCountForDataCall submitTransaction complete for block ' + blockNumber);

            return true;

        }
    } catch (error) {
        logger.error('processConsentEvent submit transaction  onerror: for block ' + blockNumber);
        logger.error(error);

    }
};
eventFunction.ToggleLikeEvent = async function processToggleLikeEvent(payload, blockNumber) {
    try {
        logger.info('processToggleLikeEvent function entry payload:');

        if (payload) {
            payload = JSON.parse(payload.toString('utf8'));
            logger.debug(payload);
            logger.debug(' processToggleLikeEvent block number ==>' + blockNumber);

            if ((!payload.datacallID) || (!payload.dataCallVersion)) {
                logger.error('processConsentEvent submit transaction error: invalid Toggle like payload:');
                logger.error(payload);
                return false;
            }

            const data = {
                id: uuid(),
                dataCallID: payload.datacallID,
                dataCallVersion: payload.dataCallVersion,
                delta: payload.liked ? 1 : -1, //if liked =true then delta =1, if false delta= -1
                updatedTs: new Date().toISOString()
            }
            logger.debug('CreateLikeCountEntry request data ==>');
            logger.debug(data);
            logger.debug('processToggleLikeEvent : UpdateLikeCount submitTransaction invoke ');
            await targetChannelTransaction.submitTransaction('CreateLikeCountEntry', JSON.stringify(data));
            logger.debug('processToggleLikeEvent: UpdateLikeCount submitTransaction complete for block :  ' + blockNumber);
            const updateLikeCountArgs = {
                dataCallID: payload.datacallID,
                dataCallVersion: payload.dataCallVersion
            }

            logger.debug('processToggleLikeEvent: UpdateLikeCountForDataCall submitTransaction invoke', updateLikeCountArgs);
            await targetChannelTransaction.submitTransaction('UpdateLikeCountForDataCall', JSON.stringify(updateLikeCountArgs));
            logger.debug('processToggleLikeEvent: UpdateLikeCountForDataCall submitTransaction complete for block ' + blockNumber);

            return true;

        }
    } catch (error) {
        logger.error('processToggleLikeEvent submit transaction  onerror for block :  ' + blockNumber);
        logger.error(error);

    };
};

module.exports.eventFunction = eventFunction;