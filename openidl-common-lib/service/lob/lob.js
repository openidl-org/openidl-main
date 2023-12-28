const log4js = require('log4js');
const lob = require("./lob.json");
const logger = log4js.getLogger('service - lob');
logger.level = process.env.LOG_LEVEL || 'debug';

const lineOfBusinessService = {};
lineOfBusinessService.listLineOfBusiness = () => {
    return lob;
}

module.exports = lineOfBusinessService;