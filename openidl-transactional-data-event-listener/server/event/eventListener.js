const { targetDB } = require('config');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');

const networkConfig = require('../config/connection-profile.json');
const { createListenerConfig } = require('./listenerConfig');
const log4js = require("log4js");

let DBManagerFactory = openidlCommonLib.DBManagerFactory;
let dbManagerFactoryObject = new DBManagerFactory();
const logger = log4js.getLogger('event -eventListener ');
const EventListener = openidlCommonLib.EventListener;
logger.debug(`[ENTER] initEventListener = ${networkConfig}`);
const initEventListener = async () => {
	const options = JSON.parse(process.env.OFF_CHAIN_DB_CONFIG);
	const dbManager = await dbManagerFactoryObject.getInstance(
		options,
		options.defaultDbType
	);
	const listenerConfig = await createListenerConfig();
	logger.debug(`[PARAMS] networkConfig = ${networkConfig}`);
	logger.debug(`[PARAMS] listenerConfig = ${listenerConfig}`);
	logger.debug(`[PARAMS] dbManager = ${dbManager}`);
	logger.debug(`[PARAMS] targetDB = ${targetDB}`);
	try {
		await EventListener.init(
			networkConfig,
			listenerConfig,
			dbManager,
			targetDB
		);
		await EventListener.processInvoke();
	} catch (err) {
		logger.error('eventHandler init error' + err);
	}
};

module.exports = {
	initEventListener
};
