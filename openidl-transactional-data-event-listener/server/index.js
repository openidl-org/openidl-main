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

 
const express = require('express');
const log4js = require('log4js');
const config = require('config');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const EventListener = openidlCommonLib.EventListener;
const walletHelper = openidlCommonLib.Wallet;
const IBMCloudEnv = require('ibm-cloud-env');
const channelConfig = require('./config/listener-channel-config.json');
const networkConfig = require('./config/connection-profile.json');
const mainEvent = require('./event/event-handler');
let DBManagerFactory = openidlCommonLib.DBManagerFactory;
let dbManagerFactoryObject = new DBManagerFactory();

const app = express();
//Set up logging
const logger = log4js.getLogger('index');
logger.level = config.logLevel;
app.enable('trust proxy');

app.use(function (req, res, next) {
    if (req.secure || process.env.BLUEMIX_REGION === undefined) {
        next();
    } else {
        logger.info('redirecting to https');
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.get('/health', (req, res) => {
    res.json({
        'message': 'Data call trasactional event listener is alive.'
    });
})

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

app.listen(port, () => {
    logger.info(`app listening on http://${host}:${port}`);
    app.emit("listened", null);
});

async function init() {
    let dbManager = await dbManagerFactoryObject.getInstance();
    let listenerConfig = {};
    let listernerChannels = new Array();
    for (let index = 0; index < channelConfig.listenerChannels.length; index++) {
        let channelName = channelConfig.listenerChannels[index].channelName;
        let listenerChannel = {};
        logger.debug("channelName" + channelName);
        listenerChannel["channelName"] = channelName;

        let events = [];
        for (let index1 = 0; index1 < channelConfig.listenerChannels[index].events.length; index1++) {
            let eventName = channelConfig.listenerChannels[index].events[index1];
            logger.debug("EVENT NAME " + Object.keys(eventName));
            // const eventFun = mainEvent.eventFunction[Object.keys(eventName)];
            let event = {};
            event[Object.keys(eventName)] = mainEvent.eventFunction[Object.keys(eventName)];
            events.push(event)
        }
        listenerChannel["events"] = events;
        logger.debug("listenerChannel" + listenerChannel);
        listernerChannels.push(listenerChannel);

    }
    listenerConfig['listenerChannels'] = listernerChannels;
    walletHelper.init(IBMCloudEnv.getDictionary('IBM-certificate-manager-credentials'));
    let idExists = await walletHelper.identityExists(channelConfig.identity.user);
    if (!idExists) {
        throw new Error("Invalid Identity, no certificate found in certificate store");
    }
    const wallet = walletHelper.getWallet();
    let identity = {};
    logger.debug(channelConfig.identity.user);
    identity['user'] = channelConfig.identity.user;
    identity['wallet'] = wallet;
    let applicationName = channelConfig.applicationName;
    listenerConfig["applicationName"] = applicationName;
    listenerConfig['identity'] = identity;


    try {
        await EventListener.init(networkConfig, listenerConfig, dbManager);
        await EventListener.processInvoke();
    } catch (err) {
        logger.error('eventHandler init error' + err);
    }
}
init();