'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const cors = require('cors');
const config = require('config');
const log4js = require('log4js');
const noCache = require('nocache')
const openidlCommonApp = require('../../openidl-common-ui//server/index');

const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init();

global.fetch = require('node-fetch');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
/**
 * Set up logging
 */
const logger = log4js.getLogger('server');
// logger.setLevel(config.logLevel);
logger.level = "debug";

logger.debug('setting up app: registering routes, middleware...');

logger.info('credential info');
logger.info(IBMCloudEnv.getDictionary('idp-credentials'));

const idpCredentials = IBMCloudEnv.getDictionary('idp-credentials');
const authHandler = openidlCommonLib.AuthHandler.setHandler(idpCredentials.idpType);
authHandler.init(IBMCloudEnv.getDictionary('idp-credentials'));


/**
 * middleware for authentication
 */
const routes = require('./routes/routes');

app.use(helmet());
app.use(cookieParser());
app.use(noCache());
app.enable("trust proxy");
app.use(authHandler.configureSSL);
// TODO Undable to move passport related stuff to middleware need expert help
// TODO discuss on standard session maintaince approach from Node.js for production
app.use(session({
    secret: "123456",
    resave: true,
    saveUninitialized: true
}));

logger.debug('setting up app: initializing passport');
const passport = authHandler.getPassport();
app.use(passport.initialize());
app.use(passport.session());
let webAppStrategy = userAuthHandler.getUserAuthStrategy();
passport.use(webAppStrategy);

// Passport session persistance
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

const apiPassport = apiAuthHandler.getPassport();
app.use(apiPassport.initialize());
app.use(apiPassport.session());
let apiAppStrategy = apiAuthHandler.getAPIStrategy();
apiPassport.use(apiAppStrategy);

// Passport session persistance
apiPassport.serializeUser(function (user, cb) {
    cb(null, user);
});

apiPassport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

const cognitoPassport = cognitoAuthHandler.getPassport();
app.use(cognitoPassport.initialize());
app.use(cognitoPassport.session());
const cognitoStrategy = cognitoAuthHandler.getCognitoAuthStrategy();
cognitoPassport.use(cognitoStrategy);

// Passport session persistance
cognitoPassport.serializeUser(function (user, cb) {
  cb(null, user);
});

cognitoPassport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

if (NODE_ENV === 'production') {
    app.use(function (req, res, next) {
        if (!req.secure) {
            res.redirect("https://" + req.headers.host + req.url)
        } else {
            next();
        }
    });
    app.enable('trust proxy');

}

if (NODE_ENV === 'production' || NODE_ENV === 'qa') {
    app.use(express.static('dist'));
}
// app.get('/', (req, res) => {
//   res.json({
//     'message': 'Welcome to openidl ui application.'
//   });
// });

app.use('/', routes)

var portNumber = IBMCloudEnv.getString("portnumber");
app.listen(portNumber, function () {
    console.log('App started listening at ', portNumber);
});