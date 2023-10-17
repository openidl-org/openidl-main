const { Transaction } = require('@openidl-org/openidl-common-lib');
const networkConfig = require('../config/connection-profile.json');

const targetChannelConfig = require('../config/target-channel-config');
function createTargetChannelTransactions() {
	const { org, user, mspId } = targetChannelConfig.users[0];
	return new Map(
		targetChannelConfig.targetChannels.map(
			({ channelName, chaincodeName }) => {
				const targetChannelTransaction = new Transaction(
					org,
					user,
					channelName,
					chaincodeName,
					mspId
				);
				targetChannelTransaction.init(networkConfig);
				return [channelName, targetChannelTransaction];
			}
		)
	);
}

module.exports = createTargetChannelTransactions;
