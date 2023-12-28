const log4js = require('log4js');
const config = require('config');

/**
 * Set up logging
 */
const logger = log4js.getLogger('helpers - util');
// logger.setLevel(config.logLevel);
logger.level = config.logLevel;

/**
 * Util object
 */
const util = {};

/**
 * Send http response helper
 * res: express response object
 * msg: {statusCode (int), success (bool), message (string), etc}
 */
util.sendResponse = (res, msg) => {
  const response = msg;
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = response.statusCode;
  delete response.statusCode;
  logger.debug('SEND RESPONSE');
  logger.debug(response);
  res.json(response);
};

module.exports = util;
