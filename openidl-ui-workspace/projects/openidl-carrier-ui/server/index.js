'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const NODE_ENV = process.env.NODE_ENV || 'qa';
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const cors = require('cors');
const log4js = require('log4js');
const noCache = require('nocache')
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
if (NODE_ENV === 'development' || NODE_ENV == "local") {
  openidlCommonLib.EnvConfig.init('/projects/openidl-carrier-ui/server/config');
} else {
  openidlCommonLib.EnvConfig.init();
};
global.fetch = require('node-fetch');

const idpCredentials = JSON.parse(process.env.IDP_CONFIG);;
const authHandler = openidlCommonLib.AuthHandler.setHandler(idpCredentials);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
/**
 * Set up logging
 */
const logger = log4js.getLogger('server');
logger.level = process.env.LOG_LEVEL;

logger.debug('setting up app: registering routes, middleware...');

/**
 * middleware for authentication
 */
const routes = require('./routes/routes');

app.use(helmet());
app.use(cookieParser());
app.use(noCache());
app.enable("trust proxy");
// TODO Undable to move passport related stuff to middleware need expert help
// TODO discuss on standard session maintaince approach from Node.js for production
const sessionCookie = {
  secure: true,
  httpOnly: true,
  sameSite: 'lax'
}
if (NODE_ENV === 'development' || NODE_ENV == "local") {
  sessionCookie.secure = false;
}

app.use(session({
  secret: "123456",
  resave: true,
  saveUninitialized: true,
  cookie: sessionCookie
}));

logger.debug('setting up app: initializing passport');
const passport = authHandler.getPassport();
app.use(passport.initialize());
app.use(passport.session());
authHandler.setStrategy(passport);


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
console.log("----------------app started");
if (NODE_ENV === 'production' || NODE_ENV === 'qa' || NODE_ENV == 'local') {
  app.use(express.static('dist/openidl-carrier-ui'));
}
// app.get('/', (req, res) => {
//   res.json({
//     'message': 'Welcome to openidl ui application.'
//   });
// });

app.use('/', routes)

var portNumber = process.env.PORT;
app.listen(portNumber, function () {
  console.log('App started listening at ', portNumber);
});
