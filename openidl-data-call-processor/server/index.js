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
openidlCommonLib.EnvConfig.init();

const EventListener = openidlCommonLib.EventListener;
const walletHelper = openidlCommonLib.Wallet;
const channelConfig = require('./config/listener-channel-config.json');
const networkConfig = require('./config/connection-profile.json');
const mainEvent = require('./controllers/event-function');
let DBManagerFactory = openidlCommonLib.DBManagerFactory;
let dbManagerFactoryObject = new DBManagerFactory();

const configdata = require('./config/metadata.json');
const scheduler = require('./controllers/schedular')
const CronJob = require('cron').CronJob;

/***
 * Set up logging
 */
const app = express();
const logger = log4js.getLogger('index');
logger.level = config.logLevel;
app.enable('trust proxy');
app.use(function (req, res, next) {
  if (req.secure || process.env.BLUEMIX_REGION === undefined) {
    next();
  } else {
    console.log('redirecting to https');
    res.redirect('https://' + req.headers.host + req.url);
  }
});

app.get('/health', (req, res) => {
  res.json({
    'message': 'DataCall Processor is alive.'
  });
})

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

app.listen(port, () => {
  logger.info(`app listening on http://${host}:${port}`);
  app.emit("listened", null);
});

async function init() {

  try {
    let dbManager = await dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
    logger.debug("<<<DB manager instance >>> " + dbManager);
    let listenerConfig = {};
    let listernerChannels = new Array();
    for (let index = 0; index < channelConfig.listenerChannels.length; index++) {
      let channelName = channelConfig.listenerChannels[index].channelName;
      let listenerChannel = {};
      listenerChannel["channelName"] = channelName;
      let events = [];
      for (let index1 = 0; index1 < channelConfig.listenerChannels[index].events.length; index1++) {
        let eventName = channelConfig.listenerChannels[index].events[index1];
        logger.debug("Event Name " + Object.keys(eventName));
        let event = {};
        event[Object.keys(eventName)] = mainEvent.eventFunction[Object.keys(eventName)];
        events.push(event)
      }
      listenerChannel["events"] = events;
      logger.debug("listenerChannel" + listenerChannel);
      listernerChannels.push(listenerChannel);
    }
    listenerConfig['listenerChannels'] = listernerChannels;
    await walletHelper.init(JSON.parse(process.env.KVS_CONFIG));

    var idExists = await walletHelper.identityExists(channelConfig.identity.user);
    if (!idExists) {
      throw new Error("Invalid Identity, no certificate found in certificate store");
    }
    const wallet = await walletHelper.getWallet();
    let identity = {};
    logger.debug(channelConfig.identity.user);
    identity['user'] = channelConfig.identity.user;
    identity['wallet'] = wallet;
    let applicationName = channelConfig.applicationName;
    listenerConfig["applicationName"] = applicationName;
    listenerConfig['identity'] = identity;
    logger.debug(listenerConfig);
    await EventListener.init(networkConfig, listenerConfig, dbManager, config.targetDB);
    await EventListener.processInvoke();

    await schedulerInit();

  } catch (err) {
    logger.error('eventHandler init error', err);
  }
};

async function schedulerInit() {
  logger.info(
    'Scheduler is Starting '
  );
  try {
    var job = new CronJob({
      cronTime: configdata.jobexecutiontime,
      onTick: function () {
        scheduler.syncData().then(() => {
          logger.info(
            'Scheduler is completed successfully '
          );
        });
      },
      start: true,
    });
  } catch (ex) {
    logger.info('Scheduler job is having issue - ', ex);
  }
}

init();