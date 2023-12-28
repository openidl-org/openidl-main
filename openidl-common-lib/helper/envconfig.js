const log4js = require('log4js');
const fs = require("fs");
const _ = require("underscore");
const logger = log4js.getLogger('helpers - envconfig');
logger.level = process.env.LOG_LEVEL || 'debug';

/**
 * Wallet object
 */
const envconfig = {};

/**
 * init initializes environment variables from configuration files
 */
envconfig.init = (mappingsFilePath) => {
    logger.info('Inside envconfig init');

    //set log level
    process.env.LOG_LEVEL = 'debug';

    mappingsFilePath = mappingsFilePath || "/server/config";
    mappingsFilePath = process.cwd() + mappingsFilePath;

    logger.info("Initializing with", mappingsFilePath);
    let mappingsFile = `${mappingsFilePath}/mappings.json`
    if (!fs.existsSync(mappingsFile)) {
        logger.warn("File does not exist", mappingsFile);
        return;
    }

    let mappingsJson = JSON.parse(fs.readFileSync(mappingsFile, "UTF8"));
    _.each(mappingsJson, function (mapping, key) {
        if (mapping.file) {
            let envFile = `${mappingsFilePath}/${mapping.file}`;
            if (!fs.existsSync(envFile)) {
                logger.warn("File does not exist", envFile);
            }
            let envJson = JSON.parse(fs.readFileSync(envFile, "UTF8"));
            logger.debug(mapping.env, JSON.stringify(envJson));
            process.env[mapping.env] = JSON.stringify(envJson);
        } else if (mapping.value) {
            process.env[mapping.env] = mapping.value;
            logger.debug(mapping.env, mapping.value);
        }
    });
}

module.exports = envconfig;