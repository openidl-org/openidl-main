const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const mongoDataProcessor = require('../../server/controllers/data-processor-mongo');
const processor = require('../../server/controllers/processor');
let DBManagerFactory = openidlCommonLib.DBManagerFactory;
let emailService = openidlCommonLib.Email;

jest.mock('@cloudant/cloudant');
jest.mock('../../server/config/email.json', () => {
    return {
        Config: [
            {
                servicetype: 'mailer'
            },
            {
                servicetype: 'dbDown'
            }
        ]
    };
});
const bodycontent = `<strong>TEST</strong>`;

describe('Processor', () => {
	const processorInstance = new processor();
	beforeEach(() => {
		JSON.parse = jest.fn().mockImplementationOnce(() => {
			return {};
		});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('Processor', () => {
		it('Should getProcessorInstance - mongo db', async () => {
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
			let resp = await processorInstance.getProcessorInstance(
				'dataCallId',
				'dataCallVersion',
				'carrierID',
				{},
				{},
				'reduceCollectionName'
			);
			expect(resp).toBeInstanceOf(mongoDataProcessor);
	
			expect(resp).toBeDefined();
		});
	
		it('Should getProcessorInstance - other than mongo db', async () => {
			const dbSpy = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve({
						dbName: async () => {
							return Promise.resolve('cloudant');
						},
						getUnprocessedChunks: async () => {
							return Promise.resolve([{}, {}]);
						}
					});
				});
			const localCloudantConfig = {
				url: 'https://myaccountid.cloudantnosqldb.appdomain.cloud',
				username: 'testUser',
				password: 'unitTest'
			};
	
			process.env['OFF_CHAIN_DB_CONFIG'] =
				JSON.stringify(localCloudantConfig);
	
			let resp = await processorInstance
				.getProcessorInstance(
					'dataCallId',
					'dataCallVersion',
					'carrierID',
					{},
					{},
					'reduceCollectionName'
				)
				.catch((e) => {});
		});
	});

	describe('invokeEmail', () => {
		it('should throw error', async () => {
			let err;
			let resp = await processorInstance.invokeEmail(
				'mailer',
				'patternname',
				bodycontent
			).catch((e) => {err = e});
			expect(err).toBeDefined();
		});
	});
});
