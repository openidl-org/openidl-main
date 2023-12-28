'use strict';
const log4js = require('log4js');
const schedule = require('node-schedule');

const { pollForMaturedDataCall } = require('../service/pollDataService');
const config = require('../config/default.json');

const logger = log4js.getLogger('cronJob');

logger.debug(`[ENTER] initCronJob `);
const initCronJob = () => {
	const { pollIntervalString } = config;
	logger.info('poll interval config: ', pollIntervalString);
	const job = schedule.scheduleJob(
		pollIntervalString,
		async () => await pollForMaturedDataCall()
	);
	logger.info('job scheduling done  ', job);
};

module.exports = {
	initCronJob
};
