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
const bodyParser = require('body-parser');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');


// Init common lib env variables (call before injecting local depencencies because they rely on the ENV variable to be injected)
openidlCommonLib.EnvConfig.init();

const { initCronJob } = require('./cron/cronJob');
const httpsRedirect = require('./express/middleware/httpsRedirect');
const { initEventListener } = require('./event/eventListener');
const expressRoutes = require('./express');

//Set up logging
const logger = log4js.getLogger('index');
logger.level = config.logLevel;
const expressLogger = log4js.getLogger('express');
expressLogger.level = 'INFO'

// Setup express
const app = express();
app.use(bodyParser.json());
app.use(httpsRedirect);
app.use(log4js.connectLogger(expressLogger, { level: log4js.levels.INFO }));
app.enable('trust proxy');

logger.debug(`[START] initCronJob()`);
expressRoutes(app);

const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

app.listen(port, () => {
	logger.info(`app listening on http://${host}:${port}`);
	app.emit('listened', null);
});
// Init cron job
initCronJob();

// Init Event listener
initEventListener();
