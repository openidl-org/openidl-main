/**
 SPDX-License-Identifier: Apache-2.0
*/
const log4js = require('log4js');
const logger = log4js.getLogger('base64Decoder');
logger.level = config.logLevel;

const base64Converter = {};

base64Converter.decoder = (base64data) => {
    logger.info('Decoding the credentials......')
    let buff = new Buffer(base64data, 'base64');
    let data = buff.toString('ascii');
    return data;
}

module.exports = base64Converter;