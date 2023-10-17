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
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const session = require('express-session');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
openidlCommonLib.EnvConfig.init();

const routes = require('./routes');
const logger = log4js.getLogger('server');
logger.level = config.logLevel;
logger.info("Starting");
const app = express();
app.use(cors());

global.fetch = require('node-fetch');

app.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    } 
}));

const idpCredentials = JSON.parse(process.env.IDP_CONFIG);
const authHandler = openidlCommonLib.AuthHandler.setHandler(idpCredentials);

const passport = authHandler.getPassport();
app.use(passport.initialize());
app.use(passport.session());
authHandler.setStrategy(passport);

/**
 * Set up logging
 */
logger.debug('setting up app: registering routes, middleware...');

/**
 * Load swagger document
 */
const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, '../public', 'openapi.yaml'), 'utf8'));

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
