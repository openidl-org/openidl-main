/**
 * Copyright 2021 IT People Corporation. All Rights Reserved.
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

const log4js = require('log4js');
const CognitoStrategy = require('passport-cognito');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const logger = log4js.getLogger('middleware - cognito-auth-handler');
logger.level = process.env.LOG_LEVEL || 'debug';

// Passport session persistance
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/**
 * Auth object
 */
const cognitoAuthHandler = {};

// Configure local configuration and security
let loginConfiguration;
let cognitoStrategy;

cognitoAuthHandler.setStrategy = (passport) => {
  passport.use(cognitoStrategy);
};

cognitoAuthHandler.getStrategy = () => {
  return cognitoStrategy;
};

cognitoAuthHandler.getPassport = () => {
  logger.debug('getPassport');
  return passport;
};

/**
 * verify if the user is logged in or not
 */

cognitoAuthHandler.isLoggedIn = (req, res, next) => {
  logger.debug('isLoggedIn');
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    res.status(500).json({
      message: 'access token is not provided or invalid'
    });
  } else {
    logger.debug('user is logged in');
    // set authorization header
    req.headers['authorization'] = 'Bearer ' + req.session.passport.user.accessToken;
    next();
  }
};

/**
 * Authenticate using passport
 */
cognitoAuthHandler.authenticate = (req, res, next) => {
  logger.debug('authHandler.authenticate ');
  logger.debug(req.body);
  passport.authenticate('cognito', function (err, user, info) {
    if (err || info) {
      logger.debug('if err or infor');
      logger.debug("err: ", JSON.stringify(err, null, 2));
      logger.debug("info: ", JSON.stringify(info, null, 2));
      res.status(500).json({
        message: info.message
      });
    } else {
      req.logIn(user, function (err) {
        logger.debug('req.logIn', user);
        if (err) {
          res.status(500).json({
            message: 'Error logging in. Contact admin.'
          });
        } else {
          let userResopnse = {
            name: user.name,
            username: user.email
          };
          res.locals.user = userResopnse;
          next();
        }
      });
    }
  })(req, res, next);
};

cognitoAuthHandler.validateToken = (req, res, next) => {
  try {
    logger.info('*****************************************************************************');

    logger.info('request.headers.host ' + req.headers.host);

    logger.info('request.headers.authorization ' + req.headers.authorization);
    try {
      logger.debug('request.headers ' + JSON.stringify(req.headers));
    } catch (ex) {
      logger.info('error while parsing  req.headers ' + ex);
    }

    logger.info('request.body.batchID  ' + req.body.batchId);

    logger.info('request.body.chunkID  ' + req.body.chunkId);

    logger.info('****************************************************************************');
    let whitelist = JSON.parse(process.env.IDP_CONFIG);
    logger.info('whitelist ' + JSON.stringify(whitelist));

    const accessTokenString = _getAccessToken(req, next);
    logger.info('accessTokenString  ' + accessTokenString);
    if (accessTokenString == null) {
      res.status(401).send({
        error: 'Token value is ' + accessTokenString,
        message: 'This token does not have the appropriate access rights (clientId)'
      });
    } else {
      const accessTokenPayload = jwt.decode(accessTokenString);
      logger.info('accessTokenPayload.client_id ' + accessTokenPayload.client_id);
      logger.info('jws exp', accessTokenPayload.exp);

      var isExpiredToken = false;
      var dateNow = new Date();
      if (accessTokenPayload.exp < dateNow.getTime() / 1000) {
        isExpiredToken = true;
      }

      if (isExpiredToken) {
        logger.error('token is expired ' + accessTokenPayload.exp);
        res.status(401).send({ error: 'expired token', message: 'This token is expired. ' });
      } else {
        const clientId = accessTokenPayload.client_id;
        if (clientId != undefined && clientId != null) {
          logger.info('Client Id value is ' + clientId);
          if (whitelist.clientId === clientId) {
            next();
          } else {
            logger.error('whitelist.clientId === clientId is failed ');
            res.status(401).send({
              error: 'invalid_grant',
              message: 'This token does not have the appropriate access rights (clientId)'
            });
          }
        } else {
          logger.error('Client Id value is ' + clientId);
          res.status(401).send({
            error: 'invalid_grant',
            message: 'This token does not have the appropriate access rights (clientId)'
          });
        }
      }
    }
  } catch (error) {
    logger.error('Run time error occured in cognitoAuthHandler.authenticate ' + error);
    res.status(401).send({
      error: 'invalid_grant',
      message: 'This token does not have the appropriate access rights (clientId)'
    });
  }
};

/**
 * callback handler
 */
cognitoAuthHandler.callback = (req, res, next) => {
  logger.debug('authHandler.callback');
  passport.authenticate('cognito', {
    failureRedirect: '/error',
    failureFlash: true,
    allowAnonymousLogin: false
  });
  next();
};
/**
 * Store token in cookie
 */
cognitoAuthHandler.storeRefreshTokenInCookie = (req, res, next) => {
  logger.debug('storeRefreshTokenInCookie');
  if (req.session.passport && req.session.passport.user && req.session.passport.user.refreshToken) {
    const refreshToken = req.session.passport.user.refreshToken;
    logger.debug('refreshing cookie');
    /* An example of storing user's refresh-token in a cookie with expiration of a month */
    res.cookie('refreshToken', refreshToken, {
      maxAge: 2 * 60 * 60 * 1000 /* 30 days */
    });
  }
  next();
};

cognitoAuthHandler.storeTokenInCookie = (req, res, next) => {
  if (req.session) {
    res.cookie('accessToken', req.session.passport.user.accessToken);
  }
  next();
};

cognitoAuthHandler.getUserAttributes = async (req, res, next) => {
  logger.debug('getUserAttributes');
  let attributes = {};
  try {
    for (const [key, value] of Object.entries(req.session.passport.user)) {
      if (key.indexOf('custom:') > -1) {
        attributes[key.replace('custom:', '')] = value;
      }
    }
  } catch (e) {
    logger.error('getUserAtribute failed ' + e.message);
    return deferred.reject(e);
  }
  res.locals.user.attributes = attributes;
  res.locals.user.userToken = req.session.passport.user.accessToken;
  next();
};

/**
 * Get the user role
 */
cognitoAuthHandler.getUserRole = async (req, res, next) => {
  logger.debug('Inside get user role');
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    res.status(401).send('Unauthorized');
  }
  let attributes = {};
  try {
    for (const [key, value] of Object.entries(req.session.passport.user)) {
      if (key.indexOf('custom:') > -1) {
        attributes[key.replace('custom:', '')] = value;
      }
    }
  } catch (e) {
    logger.error('getUserAtribute failed ', e);
    res.status(401).send('Unauthorized');
  }
  if (attributes) {
    res.locals.role = attributes.role;
    logger.debug('ROLE');
    logger.debug(res.locals.role);
    if (res.locals.role == 'regulator') {
      logger.debug('Juridiction');
      logger.debug(res.locals.juridiction);
      res.locals.juridiction = attributes.stateName;
    } else {
      logger.debug('Juridiction');
      logger.debug(res.locals.juridiction);
      res.locals.juridiction = attributes.organizationId.split(' ')[0];
    }
    next();
  }
};

/**
 * get configuration on local envrionment
 */
cognitoAuthHandler.init = config => {
  logger.debug('user auth handler init');

  let loginConfig = {};
  const localConfig = config;
  logger.debug('local config :' + localConfig);
  const requiredParams = ['userPoolId', 'clientId', 'region'];
  requiredParams.forEach(function (requiredParam) {
    if (!localConfig[requiredParam]) {
      console.error(
        'When running locally, make sure to create a file *localdev-config.json* in the root directory. See config.template.json for an example of a configuration file.'
      );
      console.error(`Required parameter is missing: ${requiredParam}`);
      process.exit(1);
    }
    loginConfig[requiredParam] = localConfig[requiredParam];
  });
  loginConfiguration = loginConfig;
  logger.debug('init webstrategy initialisation start');
  cognitoStrategy = new CognitoStrategy(loginConfiguration, function (
    accessToken,
    idToken,
    refreshToken,
    user,
    cb
  ) {
    user.accessToken = accessToken;
    user.idToken = idToken;
    user.refreshToken = refreshToken;
    cb(null, user);
  });
  logger.debug('init webstrategy initialised');
};

/**
 * logout user from cognito
 */
cognitoAuthHandler.logout = (req, res, next) => {
  if (req.session && req.session.passport) {
    delete req.session.passport.user;
  }
  res.clearCookie('refreshToken');
  next();
};

// Helper method to retrieve access token from a request header
const _getAccessToken = (req, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const authHeaderComponents = authHeader.split(' ');
      if (authHeaderComponents[0].indexOf('Bearer') !== 0) {
        logger.error("Payload structure deosn't have Bearer token ");
        return null;
      } else {
        logger.info('=============================================================');

        logger.info('[authHeaderComponents.lemgth  ' + authHeaderComponents.length);

        logger.info('[authHeaderComponents[0] ' + authHeaderComponents[0]);

        logger.info('[authHeaderComponents[1] ' + authHeaderComponents[1]);

        logger.info('=============================================================');
        if (authHeaderComponents.length !== 2 && authHeaderComponents.length !== 3) {
          logger.error('Malformed authorization header other error');
          return null;
        } else {
          return authHeaderComponents[1];
        }
      }
    } else {
      logger.error("Payload structure deosn't have authroization element ");
      return null;
    }
  } catch (error) {
    logger.error("Payload structure deosn't have authroization token " + error);
    return null;
  }
};

module.exports = cognitoAuthHandler;
