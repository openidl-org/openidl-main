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
const cors = require('cors');
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const session = require('express-session');
const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init();
const routes = require('./routes');
const openidlDataCallCommonApp = require('@openidl-org/openidl-common-lib');
const transactionFactory = require('./helpers/transaction-factory');
const networkConfig = require('./config/connection-profile.json');


const logger = log4js.getLogger('server');
logger.level = config.logLevel;

const DBManagerFactory = openidlDataCallCommonApp.DBManagerFactory;
const dbManagerFactoryObject = new DBManagerFactory();
const insuranceManagerDB = config.targetDB;
//vv
//const carrerIds = config.carrierid;

const util = require('./helpers/util');

const apiAuthHandler = openidlDataCallCommonApp.ApiAuthHandler;
apiAuthHandler.init(IBMCloudEnv.getDictionary('appid-credentials'));

const errorHandler = require('./middlewares/error-handler');
const { init } = require('@openidl-org/openidl-common-lib/helper/wallet');
const { json } = require('body-parser');
const e = require('express');
const app = express();

app.use(cors());
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
 * middleware for authentication
 */

app.use(helmet());
app.use(cookieParser());
app.use(helmet.noCache());
app.enable("trust proxy");
// TODO Unable to move passport related stuff to middleware need expert help 
// TODO discuss on standard session maintainance approach from Node.js for production
app.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized: true
}));
logger.debug('setting up app: initializing passport');

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
app.enable('trust proxy');

app.use(function (req, res, next) {
    if (req.secure || process.env.BLUEMIX_REGION === undefined) {
        next();
    } else {
        console.log('redirecting to https');
        res.redirect('https://' + req.headers.host + req.url);
    }
});

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
 * Health check
 */
app.get('/health', (req, res) => {
    res.json({
        'message': 'Data call mood listener is running.'
    });
})


/**
 * Register routes
*/

app.use('/openidl/api', routes);

/**
 * Error handler
 */
app.use(errorHandler.catchNotFound);
app.use(errorHandler.handleError);

/**
 * Start server
 */
const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

let dbServiceRunning = util.isMongoServiceRunning(dbManagerFactoryObject);

if (dbServiceRunning) {
    logger.info("Mongo DB service is up and running");
    transactionFactory.init(IBMCloudEnv.getDictionary('IBM-certificate-manager-credentials'), networkConfig).then(() => {
        logger.info('transaction factory init done');
        app.listen(port, () => {
            logger.info(`app listening on http://${host}:${port}`);
            logger.info(`Swagger UI is available at http://${host}:${port}/api-docs`);
            app.emit("listened", null);
           // dbTaskInitialization();
        });
    }).catch(err => {
        logger.error('Transaction factory Init Error. Please contact system admin' + err);
    });
} else {
    logger.error("Mongo DB service is down. Please contact system administrator");
    process.exit();
}

async function dbTaskInitialization() {
    // await util.createCollection(dbManagerFactoryObject, insuranceManagerDB) ?
    //     logger.info("Collection - " + insuranceManagerDB + " is created successfully") :
    //     logger.error("Failed to creation collection or Collection is already exists - " + insuranceManagerDB)

    // await util.createIndex(dbManagerFactoryObject, insuranceManagerDB) ?
    //     logger.info("Index is created successfully") : 
    //     logger.error("Failed to create an Index or Index is already exists")
}

module.exports = app;