'use strict';
const {
	getDefaultDeadlineWindow
} = require('../service/deadlineWindowService');

const log4js = require('log4js');
const { Transaction } = require('@openidl-org/openidl-common-lib');

const config = require('../config/default.json');
const matureEventHandler = require('../matureEvent/matureEvent');
const kvsConfig = require('../config/local-kvs-config.json');
const createTargetChannelTransactions = require('./channelTransactionService');

const logger = log4js.getLogger('poll-data-service');
logger.level = config.logLevel;
logger.debug(typeof kvsConfig);
logger.debug('kvs config: ', JSON.stringify(kvsConfig));

Transaction.initWallet(kvsConfig);

const ChannelTransactionMap = createTargetChannelTransactions();

const pollForMaturedDataCall = async (deadlineWindow) => {
	logger.info('Inside Cron Handler');

	logger.info('cron handler function entry');
	try {
		let queryResponse;
		let defaultChannelTransaction =
			ChannelTransactionMap.get('defaultchannel');

		logger.info(
			'** Transaction started for ListDataCallsByCriteria at : Start_Time=' +
				new Date().toISOString()
		);

		if (
			!deadlineWindow ||
			!deadlineWindow.startTime ||
			!deadlineWindow.endTime
		) {
			logger.debug('Constructing default Deadline window...');
			deadlineWindow = getDefaultDeadlineWindow();
		}
		logger.info(
			'Deadline window is ',
			JSON.stringify(deadlineWindow, null, 2)
		);
		try {
			queryResponse = await defaultChannelTransaction.executeTransaction(
				'ListMatureDataCalls',
				JSON.stringify(deadlineWindow)
			);
			queryResponse = JSON.parse(queryResponse.toString('utf8'));
		} catch (err) {
			logger.error('failed to get mature datacalls ');
			logger.error(
				'error during ListDataCallsByCriteria inside onerror ',
				err
			);
		}
		logger.debug(
			'pollForMaturedDataCall: ListDataCallsByCriteria submitTransaction complete '
		);
		logger.info(
			'** Transaction completed for listMatureDataCalls at : End_Time= ' +
				new Date().toISOString()
		);

		//iterate over the results and call mature event handler
		if (queryResponse && queryResponse.dataCallsList) {
			for (let i = 0; i < queryResponse.dataCallsList.length; i = i + 1) {
				logger.info('Found a mature data call!!!');
				matureEventHandler.handleMatureEvent(
					queryResponse.dataCallsList[i]
				);
			}
		}
	} catch (error) {
		logger.error(
			'processTransactionalDataAvailableEvent submit transaction  onerror:'
		);
		logger.error(error);
	}
	return true;
};

module.exports = {
	pollForMaturedDataCall
};
