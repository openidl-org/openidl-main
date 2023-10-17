/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */


 const log4js = require('log4js');
 const { BlockDecoder } = require('fabric-common');
 const {
     Gateway
 } = require('fabric-network');
 
 const logger = log4js.getLogger('helper -fabriclistenerhelper ');
 logger.level = process.env.LOG_LEVEL || 'debug';
 
 const MESSAGE_CONFIG = require('./config/ibp-messages-config.js');
 
 
 class FabricListenerHelper {
     constructor(org, user, channelName, orgMSPId, wallet, peer) {
         this.org = org;
         this.user = user;
         this.channelName = channelName;
         this.orgMSPId = orgMSPId;
         this.eventGateway = new Gateway();
         this.wallet = wallet;
         this.peer = peer;
     }
     init(connProfilePath) {
         this.ccp = connProfilePath;
     }
 
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
 
     getChannelName() {
         return this.channelName;
     }
 
 
     async getBlockDetails(retryCountPending) {
         logger.debug('get block details');
         const gateway = new Gateway();
         try{
             await gateway.connect(this.ccp, {
                 identity: this.user,
                 wallet: this.wallet,
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
         try{
             // gateway and contract connection
             await gateway.connect(this.ccp, {
                 identity: this.user,
                 wallet: this.wallet,
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
         try{
             // gateway and contract connection
             await gateway.connect(this.ccp, {
                 identity: this.user,
                 wallet: this.wallet,
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
 
 
     async registerBlockEventListener(channelName, listener, options) {
         logger.debug('registerBlockEventListener method entry');
         try{
             // gateway and contract connection
             await this.eventGateway.connect(this.ccp, {
                 identity: this.user,
                 wallet: this.wallet,
                 discovery: { enabled: true, asLocalhost: false }
             });
             const network = await this.eventGateway.getNetwork(channelName);
             await network.addBlockListener(listener, options);
         } catch (err) {
             logger.error('registerBlockEventListener error ' + err);
         }
     }
 
     async removeBlockEventListener(channelName, listener) {
         logger.debug('removeBlockEventListener method entry');
         const gateway = new Gateway();
         try{
             // gateway and contract connection
             await gateway.connect(this.ccp, {
                 identity: this.user,
                 wallet: this.wallet,
                 discovery: { enabled: true, asLocalhost: false }
             });
             const network = await gateway.getNetwork(channelName);
             await network.removeBlockListener(listener);
         } catch (err) {
             logger.error('removeBlockEventListener error ' + err);
         } finally {
             gateway.disconnect();
         }
     }
 };
 
 
 module.exports = FabricListenerHelper;