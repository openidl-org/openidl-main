const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const schedular = require('../../server/controllers/schedular');
let DBManagerFactory = openidlCommonLib.DBManagerFactory;
let dbManagerFactoryObject = new DBManagerFactory();
const { Transaction } = require('@openidl-org/openidl-common-lib');
const Processor = require('../../server/controllers/processor');

describe('schedular', () => {
	it('Should syncData', async () => {
		JSON.parse = jest.fn().mockImplementationOnce(() => {
			return {};
		});
		const dbSpy = jest
			.spyOn(DBManagerFactory.prototype, 'getInstance')
			.mockImplementation(async () => {
				return Promise.resolve({
					dbName: async () => {
						return Promise.resolve('mongo');
					},
					getUnprocessedChunks: async () => {
						return Promise.resolve([{}, {}]);
					}
				});
			});
		Transaction.initWallet = jest.fn();
		let resp = await schedular.syncData();

		expect(Transaction.initWallet).toHaveBeenCalled();
	});

	it('Should syncData returns with error when processing documents', async () => {
		JSON.parse = jest.fn().mockImplementationOnce(() => {
			return {};
		});
		const dbSpy = jest
			.spyOn(DBManagerFactory.prototype, 'getInstance')
			.mockImplementation(async () => {
				return Promise.resolve({
					getUnprocessedChunks: async () => {
						return Promise.resolve([{}, {}]);
					}
				});
			});

		const processorSpy = jest
			.spyOn(Processor.prototype, 'getProcessorInstance')
			.mockImplementation(async () => {
				return Promise.resolve({
					PDCS3Buckettransfer: async () => {
						return Promise.reject('error');
					}
				});
			});
		Transaction.initWallet = jest.fn();
		let resp = await schedular.syncData();

		expect(Transaction.initWallet).toHaveBeenCalled();
	});

	it('Should syncData throw error', async () => {
		JSON.parse = jest.fn().mockImplementationOnce(() => {
			return {};
		});
		const dbSpy = jest
			.spyOn(DBManagerFactory.prototype, 'getInstance')
			.mockImplementation(async () => {
				return Promise.resolve({
					getUnprocessedChunks: async () => {
						return Promise.resolve(null);
					}
				});
				expect(dbSpy).toHaveBeenCalled();
			});

		Transaction.initWallet = jest.fn();
		let resp = await schedular.syncData().catch((err) => {
			expect(err.message).toBe('UNKNOWN ERROR');
		});

		expect(Transaction.initWallet).toHaveBeenCalled();
	});

	it('init should throw error', async () => {
		jest.spyOn(Transaction, 'initWallet').mockImplementationOnce(() => {
			throw new Error('UNKNOWN ERROR');
		});
		let resp = await schedular.syncData().catch((err) => {
			expect(err.message).toBe('UNKNOWN ERROR');
		});
	});
});
