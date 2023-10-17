const mainEvent = require('./eventHandler');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const channelConfig = require('../config/listener-channel-config.json');
const log4js = require('log4js');
const walletHelper = openidlCommonLib.Wallet;
const logger = log4js.getLogger('index');

async function createListenerConfig() {
	const listenerConfig = {};
	listenerConfig.listenerChannels = channelConfig.listenerChannels.map(
		(listenerChannel) => {
			const { channelName, events } = listenerChannel;
			logger.debug(`channelName: ${channelName}`);

			const mappedEvents = events.map((eventName) => {
				logger.debug(`EVENT NAME: ${Object.keys(eventName)}`);
				return {
					[Object.keys(eventName)]:
						mainEvent.eventFunction[Object.keys(eventName)]
				};
			});
			logger.debug(`listenerChannel: ${listenerChannel}`);
			return { channelName, events: mappedEvents };
		}
	);
	await walletHelper.init(JSON.parse(process.env.KVS_CONFIG));
	const idExists = await walletHelper.identityExists(
		channelConfig.identity.user
	);
	if (!idExists) {
		throw new Error(
			'Invalid Identity, no certificate found in certificate store'
		);
	}
	const wallet = walletHelper.getWallet();
	const identity = {
		user: channelConfig.identity.user,
		wallet
	};
	listenerConfig.applicationName = channelConfig.applicationName;
	listenerConfig.identity = identity;

	return listenerConfig;
}

module.exports = { createListenerConfig };
