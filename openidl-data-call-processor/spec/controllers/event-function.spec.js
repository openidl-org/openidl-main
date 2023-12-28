const eventFunction =
	require('../../server/controllers/event-function').eventFunction;
const { Transaction } = require('@openidl-org/openidl-common-lib');
const Processor = require('../../server/controllers/processor');

jest.mock('../../server/controllers/processor');
jest.mock('config',()=>{
	return {
		logLevel: 'debug',
		enumField: [{desc:'State1', code:'101'},{desc:'State2', code:'202'},{desc:'State3', code:'303'}]
	}
});
jest.mock('../../server/config/unique-identifiers-config.json', () => {
	return {
		identifiers: [{uniqueIdentifier: 'openidl-org'	}]
	}
});
const consentPayload = {
	datacallID: '6e22b4f0_467f_11e9_9c05_072a745b3221',
	dataCallVersion: '1',
	carrierID: '12345',
	createdTs: '2019-03-14T17:35:37.746Z',
	createdBy: 'mary@thehartford.com'
};
let consentPL = JSON.stringify(consentPayload);

describe('eventFunction', () => {
	beforeAll(() => {
		const localCloudantConfig = {
			url: 'https://myaccountid.cloudantnosqldb.appdomain.cloud',
			username: 'testUser',
			password: 'unitTest'
		};
		process.env['OFF_CHAIN_DB_CONFIG'] =
			JSON.stringify(localCloudantConfig);
		Transaction.initWallet = jest.fn();
	});
	describe('ConsentedEvent', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		it('should  processConsentEvent - UpdateConsentStatus if Insurancedoc exists', async () => {
			payload = consentPL.toString('utf8');

			const targetChannelTransactionSpy = jest
				.spyOn(eventFunction, 'getChannelInstance')
				.mockImplementationOnce(() => {
					return {
						submitTransaction: async () => {
							return Promise.resolve({});
						},
						executeTransaction: async (arg1, arg2) => {
							if(arg1 === 'CheckInsuranceDataExists')
								return Promise.resolve(false);
							else
								return Promise.resolve(JSON.stringify([
									{
										consent: {
											datacallID: '1111',
											dataCallVersion: '1.0',
											carrierID: 'openidl-org'
										}
						
									},
									{
										consent: {
											datacallID: '2222',
											dataCallVersion: '1.1',
											carrierID: 'openidl-org'
										}
						
									}
								]));
						}
					};
				});

			const defaultChannelTransactionSpy = jest
				.spyOn(eventFunction, 'getDefaultChannelTransaction')
				.mockImplementationOnce(() => {
					return {
						executeTransaction: async () => {
							return Promise.resolve({extractionPattern:'extractionPattern', jurisdiction:'State2'});
						}
					};
				});

			let response = eventFunction.ConsentedEvent(consentPL, '50001');
			expect(targetChannelTransactionSpy).toHaveBeenCalled();
		});
		it('should  processConsentEvent - submitTransaction error', async () => {
			payload = consentPL.toString('utf8');

			const targetChannelTransactionSpy = jest
				.spyOn(eventFunction, 'getChannelInstance')
				.mockImplementationOnce(() => {
					return {
						submitTransaction: async () => {
							return Promise.reject('error');
						},
						executeTransaction: async () => {
							return Promise.resolve({});
						}
					};
				});

			const defaultChannelTransactionSpy = jest
				.spyOn(eventFunction, 'getDefaultChannelTransaction')
				.mockImplementationOnce(() => {
					return {
						executeTransaction: async () => {
							return Promise.resolve({});
						}
					};
				});

			let response = eventFunction.ConsentedEvent(consentPL, '50001');
			expect(targetChannelTransactionSpy).toHaveBeenCalled();
		});

		it('should  processConsentEvent - UpdateConsentStatus  if Insurancedoc not exists', async () => {
			payload = consentPL.toString('utf8');

			const targetChannelTransactionSpy = jest
				.spyOn(eventFunction, 'getChannelInstance')
				.mockImplementationOnce(() => {
					return {
						submitTransaction: async () => {
							return Promise.resolve({});
						},
						executeTransaction: async () => {
							return Promise.resolve('false');
						}
					};
				});
			checkInsuranceData = 'false';
			const defaultChannelTransactionSpy = jest
				.spyOn(eventFunction, 'getDefaultChannelTransaction')
				.mockImplementationOnce(() => {
					return {
						executeTransaction: async () => {
							return Promise.resolve(
								JSON.stringify({
									isSet: 'test',
									extractionPattern: {
										test: 'extractionPattern'
									},
									jurisdiction: 'jurisdiction'
								})
							);
						}
					};
				});
			const fetchStateCodefromDescSpy = jest
				.spyOn(eventFunction, 'fetchStateCodefromDesc')
				.mockImplementationOnce(() => {
					return Promise.resolve({});
				});

			let response = eventFunction
				.ConsentedEvent(consentPL, '50001')
				.catch((err) => {
					expect(err.message).toBe('UNKNOWN ERROR');
				});
			expect(targetChannelTransactionSpy).toHaveBeenCalled();
		});

	});

	describe('getChannelInstance ', () => {
		it('should getChannelInstance ', async () => {
			const targetChannelTransaction = eventFunction.getChannelInstance();
			expect(targetChannelTransaction).toBeDefined();
		});		
	});

	describe('getDefaultChannelTransaction ', () => {
		it('should getDefaultChannelTransaction ', async () => {
			const defaultChannelTransaction = eventFunction.getDefaultChannelTransaction();
			expect(defaultChannelTransaction).toBeDefined();
		});		
	});

	describe('fetchStateCodefromDesc ', () => {
		it('should fetchStateCodefromDesc ', async () => {
			const response = await eventFunction.fetchStateCodefromDesc(
				[{desc:'State1', code:'101'},{desc:'State2', code:'202'},{desc:'State3', code:'303'}], 'State2');
			expect(response).toBe('202');
		});		
	});

	describe('ExtractionPatternSpecified', () => {
		afterEach(()=>{
			jest.clearAllMocks();
		});
		it('should  ExtractionPatternSpecified ', async () => {
			Transaction.initWallet = jest.fn();
			payload = consentPL.toString('utf8');

			queryResponse = jest
				.spyOn(eventFunction, 'getChannelInstance')
				.mockImplementation(() => {
					return {
						executeTransaction: async (arg1, arg2) => {
							if(arg1 === 'CheckInsuranceDataExists')
								return Promise.resolve('false');
							else
								return Promise.resolve(JSON.stringify([
									{
										consent: {
											datacallID: '1111',
											dataCallVersion: '1.0',
											carrierID: 'openidl-org'
										}
						
									},
									{
										consent: {
											datacallID: '2222',
											dataCallVersion: '1.1',
											carrierID: 'openidl-org'
										}
						
									}
								]));
						}					};
				});
				const defaultChannelTransactionSpy = jest
				.spyOn(eventFunction, 'getDefaultChannelTransaction')
				.mockImplementation(() => {
					return {
						executeTransaction: async () => {
							return Promise.resolve(JSON.stringify({extractionPattern:{state:'#state#'}, jurisdiction:'State2'}));
						}
					};
				});
			let response = eventFunction.ExtractionPatternSpecified(
				consentPL,
				'50001'
			);
			expect(eventFunction.getChannelInstance).toHaveBeenCalled();
		});
	});

	describe('getDataProcessorObject ', () => {
		it('should getDataProcessorObject ', async () => {
			const startDataProcessor = eventFunction.getDataProcessorObject(
				consentPayload.datacallID,
				consentPayload.dataCallVersion,
				consentPayload.carrierID,
				consentPayload.extractionPattern,
				consentPayload.targetChannelTransactionSpy,
				'mockView'
			);
			expect(startDataProcessor).toBeDefined();
		});		
	});

});
