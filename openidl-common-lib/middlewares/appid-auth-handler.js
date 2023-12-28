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
const log4js = require("log4js");
const appID = require("ibmcloud-appid");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const logger = log4js.getLogger("middleware - appid-auth-handler");
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
const appIdAuthHandler = {
    identityToken: "",
};

// Configure local configuration and security
let loginConfiguration;

appIdAuthHandler.setToken = (token) => {
    logger.debug("Inside set token");
    appIdAuthHandler.identityToken = token;
};

appIdAuthHandler.getToken = () => {
    return appIdAuthHandler.identityToken;
};

// APPID objects
const WebAppStrategy = appID.WebAppStrategy;
const APIStrategy = appID.APIStrategy; // TODO to be implemented for API-AUTH
const userProfileManager = appID.UserProfileManager;
const UnauthorizedException = appID.UnauthorizedException;

let webAppStrategy;

appIdAuthHandler.setStrategy = (passport) => {
    passport.use(webAppStrategy);
};

appIdAuthHandler.getStrategy = () => {
    return webAppStrategy;
};

appIdAuthHandler.getPassport = () => {
    logger.debug('getPassport');
    return passport;
};

// appIdAuthHandler.getUserAuthStrategy = () => {
//     return webAppStrategy;
// };
// appIdAuthHandler.getPassport = () => {
//     logger.debug("getPassport");
//     return passport;
// };
/**
 * Initialize Passport middleware
 */

appIdAuthHandler.initUserProfileManager = (req, res, next) => {
    logger.debug("initUserProfileManager");
    userProfileManager.init(loginConfiguration);
    next();
};

appIdAuthHandler.shouldAuthenticate = (req, res, next) => {
    logger.debug("Inside should authenticate");
    req.headers["authorization"] = "Bearer " + req.headers["usertoken"];
    logger.debug(req.headers);
    passport.authenticate(webAppStrategy.STRATEGY_NAME, {
        session: false,
    })(req, res, next);
};

/**
 * verify if the user is logged in or not
 */
appIdAuthHandler.isLoggedIn = (req, res, next) => {
    logger.debug("Inside isLoggedIn");
    logger.debug(req.session[WebAppStrategy.AUTH_CONTEXT]);
    if (!req.session[WebAppStrategy.AUTH_CONTEXT]) {
        res.status(401).send("Unauthorized");
    } else {
        logger.debug("user is logged in");
        req.headers["authorization"] =
            "Bearer " + req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
        next();
    }
};

/**
 * Authenticate using passport
 */
appIdAuthHandler.authenticate = (req, res, next) => {
    passport.authenticate(
        WebAppStrategy.STRATEGY_NAME,
        function (err, user, info) {
            if (err || info) {
                logger.debug("if err or infor");
                logger.debug(err);
                res.status(500).json({
                    message: info.message,
                });
            } else {
                req.logIn(user, function (err) {
                    logger.debug("req.logIn", user);
                    if (err) {
                        res.status(500).json({
                            message: "Error logging in. Contact admin.",
                        });
                    } else {
                        logger.debug("USER RESPONSE AFTER WEB STRATEGY");
                        logger.debug(user);
                        let userResopnse = {
                            name: user.name,
                            username: user.email,
                        };
                        res.locals.user = userResopnse;
                        next();
                    }
                });
            }
        }
    )(req, res, next);
};

/**
 * Authenticate API token
 */

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
                logger.info("=============================================================")

                logger.info("[authHeaderComponents.lemgth  " + authHeaderComponents.length)

                logger.info("[authHeaderComponents[0] " + authHeaderComponents[0])

                logger.info("[authHeaderComponents[1] " + authHeaderComponents[1])

                logger.info("=============================================================")
                if (authHeaderComponents.length !== 2 && authHeaderComponents.length !== 3) {
                    logger.error("Malformed authorization header other error")
                    return null;
                } else {
                    return authHeaderComponents[1];
                }
            }
        } else {
            logger.error("Payload structure deosn't have authroization element ")
            return null;
        }
    } catch (error) {
        logger.error("Payload structure deosn't have authroization token " + error)
        return null;
    }
};

/// Middleware - whitelist audiences (For now this is the list of client IDs that can access this app)
/// Early next year, APIStrategy will take care of this and the expected audience will be set to http://this.component.bluemix.net (i.e. the url of this application)
appIdAuthHandler.validateToken = (req, res, next) => {
    try {

        logger.info("*****************************************************************************")

        logger.info("request.headers.host " + req.headers.host);

        logger.info("request.headers.authorization " + req.headers.authorization);
        try {
            logger.debug("request.headers " + JSON.stringify(req.headers));
        } catch (ex) {
            logger.info("error while parsing  req.headers " + ex)
        }

        logger.info("request.body.batchID  " + req.body.batchId)

        logger.info("request.body.chunkID  " + req.body.chunkId)

        logger.info("****************************************************************************")
        let whitelist = JSON.parse(process.env.IDP_CONFIG);
        logger.info("whitelist " + JSON.stringify(whitelist))

        const accessTokenString = _getAccessToken(req, next);
        logger.info("accessTokenString  " + accessTokenString)
        if (accessTokenString == null) {
            res.status(401).send({ error: 'Token value is ' + accessTokenString, message: 'This token does not have the appropriate access rights (aud)' });
        }
        else {

            const accessTokenPayload = jwt.decode(accessTokenString);
            logger.info("accessTokenPayload.aud " + accessTokenPayload.aud)
            logger.info("jws exp", accessTokenPayload.exp)

            var isExpiredToken = false;
            var dateNow = new Date();
            if (accessTokenPayload.exp < dateNow.getTime() / 1000) {
                isExpiredToken = true;
            }

            if (isExpiredToken) {
                logger.error("token is expired " + accessTokenPayload.exp);
                res.status(401).send({ error: 'expired token', message: 'This token is expired. ' });
            } else {
                const audience = accessTokenPayload.aud;
                if (audience != undefined && audience != null) {
                    logger.info("Aud value is " + audience);
                    if (whitelist.callerId === audience[0]) {
                        next();
                    } else {
                        logger.error("whitelist.callerId === audience[0] is failed ");
                        res.status(401).send({ error: 'invalid_grant', message: 'This token does not have the appropriate access rights (aud)' });
                    }
                } else {
                    logger.error("audience value is " + audience);
                    res.status(401).send({ error: 'invalid_grant', message: 'This token does not have the appropriate access rights (aud)' });
                }
            }
        }
    } catch (error) {
        logger.error("Run time error occured in apiAuthHandler.authenticate " + error);
        res.status(401).send({ error: 'invalid_grant', message: 'This token does not have the appropriate access rights (aud)' });
    }
}


/**
* callback handler
*/
appIdAuthHandler.callback = (req, res, next) => {
    logger.debug("authHandler.callback");
    passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
        failureRedirect: "/error",
        failureFlash: true,
        allowAnonymousLogin: false,
    });
    next();
};

/**
 * Get the user role
 */
appIdAuthHandler.getUserRole = async (req, res, next) => {
    logger.debug("Inside get user role");
    let accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
    let identityToken = req.session[WebAppStrategy.AUTH_CONTEXT].identityToken;
    logger.debug(accessToken);
    let attributes;
    try {
        attributes = await userProfileManager.getAllAttributes(
            accessToken,
            identityToken
        );
    } catch (e) {
        logger.error("getUserAtribute failed ", e);
        res.status(401).send("Unauthorized");
    }
    if (attributes) {
        res.locals.role = attributes.role;
        logger.debug("ROLE");
        logger.debug(res.locals.role);
        if (res.locals.role == "regulator") {
            logger.debug("Juridiction");
            logger.debug(res.locals.juridiction);
            res.locals.juridiction = attributes.stateName;
        } else {
            logger.debug("Juridiction");
            logger.debug(res.locals.juridiction);
            res.locals.juridiction = attributes.organizationId.split(" ")[0];
        }
        next();
    }
};

/**
 * configure standard security and HTTPS
 */
appIdAuthHandler.refreshToken = (req) => {
    logger.debug("refreshToken");
    return webAppStrategy.refreshTokens(req, req.cookies.refreshToken);
};


/**
 * Store token in cookie
 */
appIdAuthHandler.storeRefreshTokenInCookie = (req, res, next) => {
    logger.debug("storeRefreshTokenInCookie");
    if (
        req.session[WebAppStrategy.AUTH_CONTEXT] &&
        req.session[WebAppStrategy.AUTH_CONTEXT].refreshToken
    ) {
        const refreshToken = req.session[WebAppStrategy.AUTH_CONTEXT].refreshToken;
        logger.debug("refreshing cookie");
        /* An example of storing user's refresh-token in a cookie with expiration of a month */
        res.cookie("refreshToken", refreshToken, {
            maxAge: 15000 /* 30 days */,
        });
    }
    next();
};

appIdAuthHandler.storeTokenInCookie = (req, res, next) => {
    if (req.session) {
        res.cookie(
            WebAppStrategy.AUTH_CONTEXT,
            req.session[WebAppStrategy.AUTH_CONTEXT].accessToken
        );
    }

    next();
};

appIdAuthHandler.getUserInfo = async (req, res, next) => {
    logger.debug("getUserAttributes");
    let accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
    let identityToken = req.session[WebAppStrategy.AUTH_CONTEXT].identityToken;
    let userProfile = res.locals.user;

    let userAttribute;
    try {
        userAttribute = await userProfileManager.getUserInfo(
            accessToken,
            identityToken
        );
    } catch (e) {
        logger.error("getUserAtribute failed " + e.message);
        return deferred.reject(e);
    }
    next();
};

appIdAuthHandler.getUserAttributes = async (req, res, next) => {
    logger.debug("getUserAttributes");
    logger.debug(req.session[WebAppStrategy.AUTH_CONTEXT]);
    let accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
    let identityToken = req.session[WebAppStrategy.AUTH_CONTEXT].identityToken;
    logger.debug(accessToken);
    logger.debug(identityToken);
    let attributes;
    try {
        attributes = await userProfileManager.getAllAttributes(
            accessToken,
            identityToken
        );
    } catch (e) {
        logger.error("getUserAtribute failed ", e);
        return deferred.reject(e);
    }
    res.locals.user.attributes = attributes;
    // TODO: uncomment following as its the actual user token generated by openidl ui
    res.locals.user.userToken = accessToken;
    appIdAuthHandler.setToken(identityToken);
    logger.debug("USER ATTRIBUTES");
    logger.debug(res.locals.user.attributes);
    next();
};

/**
 * Get the user role
 */
appIdAuthHandler.getUserRole = async (req, res, next) => {
    logger.debug('Inside get user role');
    let accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
    let identityToken = req.session[WebAppStrategy.AUTH_CONTEXT].identityToken;
    logger.debug(accessToken);
    let attributes;
    try {
        attributes = await userProfileManager.getAllAttributes(accessToken, identityToken);
    } catch (e) {
        logger.error("getUserAtribute failed ", e);
        res.status(401).send('Unauthorized');
    }
    if (attributes) {
        res.locals.role = attributes.role;
        logger.debug('ROLE');
        logger.debug(res.locals.role);
        if (res.locals.role == 'regulator') {
            logger.debug('Juridiction');
            logger.debug(res.locals.juridiction);
            res.locals.juridiction = (attributes.stateName);
        } else {
            logger.debug('Juridiction');
            logger.debug(res.locals.juridiction);
            res.locals.juridiction = (attributes.organizationId).split(' ')[0];
        }
        next();
    }
}

/**
 * get configuration on local envrionment
 */
appIdAuthHandler.init = (config) => {
    logger.debug("user auth handler init");
    let loginConfig = {};
    const localConfig = config;
    logger.debug("local config :" + localConfig);
    const requiredParams = [
        "clientId",
        "secret",
        "tenantId",
        "oauthServerUrl",
        "profilesUrl",
        "managementUrl",
    ];
    requiredParams.forEach(function (requiredParam) {
        if (!localConfig[requiredParam]) {
            console.error(
                "When running locally, make sure to create a file *localdev-config.json* in the root directory. See config.template.json for an example of a configuration file."
            );
            console.error(`Required parameter is missing: ${requiredParam}`);
            process.exit(1);
        }
        loginConfig[requiredParam] = localConfig[requiredParam];
    });
    loginConfig["redirectUri"] =
        "http://localhost:3000/ibm/bluemix/appid/callback";
    loginConfiguration = loginConfig;
    logger.debug("init webstrategy initialisation start");
    webAppStrategy = new WebAppStrategy(loginConfiguration);
    logger.debug("init webstrategy initialised");
    userProfileManager.init(loginConfiguration);
};

/**
 * logout user from appID
 */
appIdAuthHandler.logout = (req, res, next) => {
    WebAppStrategy.logout(req);
    res.clearCookie("refreshToken");
    next();
};

/**
 * logout user from appID
 */
appIdAuthHandler.logout = (req, res, next) => {
    WebAppStrategy.logout(req);
    next();
};

module.exports = appIdAuthHandler;
