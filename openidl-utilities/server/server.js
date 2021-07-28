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



const bodyParser = require('body-parser');
const express = require('express');
const log4js = require('log4js');
const config = require('config');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init();
const routes = require('./routes');
const logger = log4js.getLogger('server');
logger.level = config.logLevel;
logger.info("Starting");
const app = express();



const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const apiAuthHandler = openidlCommonLib.ApiAuthHandler;
apiAuthHandler.init(IBMCloudEnv.getDictionary('appid-credentials'));




let apiAppStrategy = apiAuthHandler.getAPIStrategy();
const apiPassport = apiAuthHandler.getPassport();
app.use(apiPassport.initialize());
apiPassport.use(apiAppStrategy);

// Passport session persistance
apiPassport.serializeUser(function (user, cb) {
    cb(null, user);
});

apiPassport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

/**
 * Set up logging
 */
logger.debug('setting up app: registering routes, middleware...');

/**
 * Load swagger document
 */
const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../public', 'openapi.yaml'), 'utf8'));

/**
 * Support json parsing
 */
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json({
    limit: '50mb'
}));


logger.debug('setting up app: registering routes, middleware...');


/**
 * GET home page
 */
app.get('/', (req, res) => {
    logger.debug('GET /');
    res.redirect('/api-docs');
});
let options = {
    docExpansion: ['tags', 'operations']
}

var swaggerOptions = {
    defaultModelsExpandDepth: -1,
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, false, swaggerOptions));



/**
 * Register routes
 */

app.use('/openidl/api', routes);


/**
 * Start server
 */
const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

//const host = "localhost";
//const port = "8080";

    app.listen(port, () => {
        logger.info(`app listening on http://${host}:${port}`);
        logger.info(`Swagger UI is available at http://${host}:${port}/api-docs`);
        app.emit("listened", null);
    });
module.exports = app;
