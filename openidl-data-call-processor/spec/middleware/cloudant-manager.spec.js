const CloudantManager = require('../../server/middleware/cloudant-manager');
const Cloudant = require('@cloudant/cloudant');
const config = require('config');

describe('CloudantManager', () => {
	it('Should savetransactionalData', async () => {
		const localCloudantConfig = {
			url: 'https://myaccountid.cloudantnosqldb.appdomain.cloud',
			username: 'testUser',
			password: 'unitTest'
		};

		process.env['OFF_CHAIN_DB_CONFIG'] =
			JSON.stringify(localCloudantConfig);
		let resp = await CloudantManager.prototype
			.saveTransactionalData({})
			.catch((e) => {});
	});

	it('Should getTransactionalData', async () => {
		const localCloudantConfig = {
			url: 'https://myaccountid.cloudantnosqldb.appdomain.cloud',
			username: 'testUser',
			password: 'unitTest'
		};

		process.env['OFF_CHAIN_DB_CONFIG'] =
			JSON.stringify(localCloudantConfig);
		let resp = await CloudantManager.prototype
			.getTransactionalData({})
			.catch((e) => {});
	});
});
