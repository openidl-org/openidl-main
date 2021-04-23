// SPDX-License-Identifier: Apache-2.0
const log4js = require('log4js');
const config = require('config');
const lob = require("./lob.json");
const logger = log4js.getLogger('service - lob');
//logger.setLevel(config.logLevel);
logger.level = config.logLevel;

const lineOfBusinessService = {};
lineOfBusinessService.listLineOfBusiness = () => {
    return lob;
}

module.exports = lineOfBusinessService;