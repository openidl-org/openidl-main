'use strict';
const log4js = require('log4js');
const config = require('config');

const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init();
const FabricHelperTransaction = require('../helper/fabriclistenerhelper');
const eventListenersDB = require('../server/config/default.json').targetDB;
const logger = log4js.getLogger('event - eventHandler');
logger.level = config.logLevel;

const EventListener = {};
let mainHandlerStartedMap = new Map();
let carrierChannelTransactionMap = new Map();
let registerBlockMap = new Map();

const {
    Gateway
} = require('fabric-network');


EventListener.init = async (networkConfig, listenerConfig, blockManagementDB) => {
    const method = 'init';
    logger.debug('in %s', method);
    this.listenerConfig = listenerConfig
    this.listenerChannels = listenerConfig.listenerChannels;
    this.networkConfig = networkConfig;
    this.blockManagementDB = blockManagementDB;
    this.applicationName = listenerConfig.applicationName;
    this.wallet = listenerConfig.identity.wallet;
    this.orgName = networkConfig.client.organization;
    this.user = listenerConfig.identity.user;
    this.gateway = new Gateway();
    this.orgMSPId = networkConfig.client.organization;
    this.mspid = networkConfig.organizations[this.orgName].mspid;
    this.peer = networkConfig.organizations[this.orgName].peers[0];

    for (let index = 0; index < this.listenerChannels.length; index++) {
        const channel = this.listenerChannels[index];
        logger.info("Channel is " + channel);
        const channelTransaction = new FabricHelperTransaction(this.org, this.user, channel.channelName, this.mspId, this.wallet, this.peer);
        channelTransaction.init(this.networkConfig);
        logger.info("network config is " + this.networkConfig);
        let isChannelInitalized = false;
        while (!isChannelInitalized) {
            try {
                await channelTransaction.initEventHub();
                isChannelInitalized = true;
            } catch (err) {
                logger.error('initEventHub errored out for user:' + this.user + " and channel:" + channel.channelName + " Error is " + err);
            }
        }
        carrierChannelTransactionMap.set(channel.channelName, channelTransaction);
        mainHandlerStartedMap.set(channel.channelName, false);
    }

};

EventListener.processInvoke = async () => {
    logger.info('process invoke method entry');
    try {
        for (let index = 0; index < this.listenerChannels.length; index++) {

            const channel = this.listenerChannels[index];
            logger.debug("processInvoke channel :" + channel.channelName);
            mainHandlerStartedMap.set(channel.channelName, true);
            await mainHandler(channel.channelName);
            logger.debug("AFTER MAINHANDLER()");
            let blockHeight = 0;
            logger.debug("BLOCK HEIGHT BFORE " + blockHeight );
            blockHeight = await carrierChannelTransactionMap.get(channel.channelName).getBlockHeight();
            logger.debug("BLOCK HEIGHT AFTER " + blockHeight );
            await registerBlockEventListener(channel.channelName, blockHeight - 1);
            logger.debug("processInvoke channel done:" + channel.channelName);
        }
    } catch (error) {
        logger.error('process invoke error ' + error);
        throw new Error('processInvoke error' + error);
    }
};

const mainHandler = async (channelName) => {
    
    try {
        logger.debug('eventHandler mainHandler method entry for channel ' + channelName);
        const blockInfo = await getBlockInfoFromCloudant(this.applicationName + "-" + channelName);

        logger.debug("block info from cloudant for channel " + channelName);
        logger.debug("BLOCK FROM CLOUDANT IS " + JSON.stringify(blockInfo));
        if (blockInfo && blockInfo.blockNumber) {
            let startBlock = parseInt(blockInfo.blockNumber) + 1;
            await loopHandler(startBlock, channelName);

        } else {
            await loopHandler(0, channelName);
        }
        mainHandlerStartedMap.set(channelName, false);
        logger.debug('mainHandlerStarted set false for channel ' + channelName + "***********");

    } catch (error) {
        logger.error('mainHandler error:  ' + error);
        throw new Error('mainHandler error: ' + error);
    }

};

const getBlockInfoFromCloudant = async (channelId) => {
    logger.info('getBlockInfoFromCloudant method entry for channel ' + channelId);
    logger.info("getting data" + this.blockManagementDB);
    try {
        return new Promise((resolve, reject) => {
            this.blockManagementDB.get(channelId, eventListenersDB).then((data) => {
                resolve(data);
            });
        });
    } catch (err) {
    }
};



const loopHandler = async (blockNumber, channelName) => {
    try {
        logger.info('loop handler started ' + blockNumber);
        let blockData = {};
        //get the block height from network
        let blockHeight = await carrierChannelTransactionMap.get(channelName).getBlockHeight();
        console.log("THE BLOCK HEIGHT FROM NETWORK IN LOOPHANDLER IS ", blockHeight);
        while (blockNumber <  blockHeight) {
                blockData = await carrierChannelTransactionMap.get(channelName).getBlockDataByBlockNumber(blockNumber);
                if(blockData !== null){
                    await eventVerificationHandler(blockData);
                    blockNumber++;
                }
        }

    } catch (error) {
        const errorMessage = error.toString();
        const errString = "error Entry not found in index"
        if (errorMessage.indexOf(errString) !== -1) {
            logger.error('blockdata does not exist for block ' + blockNumber);
            return;
        }
        logger.error('loop handler error :' + error);
    }


};
const registerBlockEventListener = async (channelName, blockNumber) => {
    logger.debug('registerBlockEventListener :start block ' + blockNumber);
    logger.debug('registerBlockEventListener :channelName ' + channelName);
    let options = {
        startBlock: blockNumber,
        unregister: false,
        disconnect: false
    };
    registerBlockMap.set(channelName, carrierChannelTransactionMap.get(channelName).eventHub.registerBlockEvent(processInvokeHandler, errorBlockEventHandler, options));
    logger.debug('registerBlockEventListener :registerBlockMap ' + channelName);
    await carrierChannelTransactionMap.get(channelName).eventHub.connect(true);
    logger.debug('registerBlockEventListener :connect ' + channelName);

};

const processInvokeHandler = async (block) => {
    logger.info('event received--> process invoke handler method entry ' + block.header.number);
    const channelName = block.data.data[0].payload.header.channel_header.channel_id;
    if (mainHandlerStartedMap.get(channelName)) {
        return;
    } else {
        mainHandlerStartedMap.set(channelName, true);
        await mainHandler(channelName);
    }
};

const eventVerificationHandler = async (block) => {
    try {
        logger.info('Successfully received the block event:' + block.header.number);
        const channel_id = block.data.data[0].payload.header.channel_header.channel_id;
        logger.info("Block payload iteration starts");
        for (let index = 0; index < block.data.data.length; index++) {
            if (block.data.data[index].payload.data.actions) {
                const action = block.data.data[index].payload.data.actions[0].payload.action;
                if (action.proposal_response_payload && action.proposal_response_payload.extension && action.proposal_response_payload.extension.events) {
                    const input = action.proposal_response_payload.extension.events;
                    for (let channelIndex = 0; channelIndex < this.listenerChannels.length; channelIndex++) {
                        if (channel_id == this.listenerChannels[channelIndex].channelName) {
                            for (let eventIndex = 0; eventIndex < this.listenerChannels[channelIndex].events.length; eventIndex++) {
                                let event = this.listenerChannels[channelIndex].events[eventIndex];
                                logger.info("Event Recieved from block " + block.header.number + "=== " + input.event_name);
                                if (input.event_name == Object.keys(event)[0]) {
                                    logger.debug("Block event mathched " + Object.keys(event)[0]);
                                    await event[Object.keys(event)[0]](input.payload, block.header.number); // TO DO
                                }
                            }
                        }
                    }

                }
            }
        }

        logger.debug('update block number in db start ' + block.header.number + " channel " + channel_id);
        await updateBlockNumberInDatabase(block.header.number, this.applicationName + '-' + channel_id);
        logger.debug('update block number in db done');
    } catch (error) {
        logger.error('eventVerificationHandler error for block: ' + block.header.number + ' ' + error);
    }

};
const errorBlockEventHandler = async (err) => {
    logger.error('Error Block Event Handling:' + err);
    for (let index = 0; index < this.listenerChannels.length; index++) {
        let channel = this.listenerChannels[index];
        let channelName = channel.channelName;
        logger.debug("setting up channel:" + channelName);
        carrierChannelTransactionMap.get(channelName).eventHub.unregisterBlockEvent(registerBlockMap.get(channelName));
        await carrierChannelTransactionMap.get(channelName).eventHub.disconnect();
        logger.debug("setting up channel done:" + channelName);
    }
    //Reinitialse and invoke process
    await EventListener.init(this.networkConfig, this.listenerConfig, this.blockManagementDB);
    await EventListener.processInvoke();



};


const updateBlockNumberInDatabase = async (blockNumber, id) => {
    return new Promise((resolve, reject) => {
        logger.info('updateBlockNumberInDatabase function entry ' + blockNumber, id);
        this.blockManagementDB.get(id, eventListenersDB).then((blockInfo) => {
            if (!blockInfo) {
                blockInfo = {};
                blockInfo._id = id;
            }
            blockInfo.blockNumber = blockNumber;
            this.blockManagementDB.insert(blockInfo, eventListenersDB).then((data) => {
                logger.info('block number update to db done ' + blockNumber);
                resolve();
            }).catch((err) => {
                reject('block number update to db failed ' + err);
            });
        }).catch((err) => {
            reject('error while getting blockInfo', err);

        });
    });

};



//function returning map of channel-Instance (aais-carriers, aais-carrier1, aais-carrier2....)
EventListener.getCarriersInstance = async (channelName) => {
    logger.info('getCarriersInstanceMap method entry');
    return carrierChannelTransactionMap.get(channelName);

};

module.exports = EventListener;