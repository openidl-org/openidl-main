const dataProcessor = require('../../server/controllers/data-processor-mongo');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
let DBManagerFactory = openidlCommonLib.DBManagerFactory;
const MongoDBManager = require('../../server/middleware/mongodb-manager');
const InstanceFactory = require('../../server/middleware/instance-factory');
const { Transaction } = require('@openidl-org/openidl-common-lib');
const sleep = require('sleep');
const S3BucketManager = require('../../server/middleware/s3bucket-manager');
const AWS = require('aws-sdk');

AWS.config.update = jest.fn();

// Build some mock data.
const exPattern = {
	dataCallId: 'b3e17d40-3f00-11e9-a935-8dfa2d3c2e78',
	dataCallVersion: '1',
	extractionPattern: {
		id: 'Pattern_01',
		name: 'ExtractionPattern1',
		description: 'This is the test description for ExtractionPattern1',
		Agreement: [
			'documentType',
			'document.Type',
			'document.propertyBOs',
			'document.Components'
		],
		Claim: [
			'documentType',
			'document.Type',
			'document.propertyBOs',
			'document.Components'
		]
	},
	extPatternTs: '0001-01-01T00:00:00Z'
};
const consentPayload = {
	datacallID: '6e22b4f0_467f_11e9_9c05_072a745b3221',
	dataCallVersion: '1',
	carrierID: '12345',
	createdTs: '2019-03-14T17:35:37.746Z',
	createdBy: 'mary@thehartford.com'
};
const mongoRecords = [
	{
		id: '12345-76321438-a9ed-4119-b640-cf94aa8f38de',
		key: ['12345', 'FL', 'HO3', 54],
		value: { exposure: 2992, premium: 3150 }
	},
	{
		id: '12345-76321438-a9ed-4119-b640-cf94aa8f38de',
		key: ['12345', 'FL', 'HO3', 54],
		value: { exposure: 2992, premium: 3150 }
	},
	{
		id: '12345-76321438-a9ed-4119-b640-cf94aa8f38de',
		key: ['12345', 'FL', 'HO3', 54],
		value: { exposure: 2992, premium: 3150 }
	},
	{
		id: '12345-76321438-a9ed-4119-b640-cf94aa8f38de',
		key: ['12345', 'FL', 'HO3', 54],
		value: { exposure: 2992, premium: 3150 }
	},
	{
		id: '12345-76321438-a9ed-4119-b640-cf94aa8f38de',
		key: ['12345', 'FL', 'HO3', 54],
		value: { exposure: 2992, premium: 3150 }
	},
	{
		id: '12345-76321438-a9ed-4119-b640-cf94aa8f38de',
		key: ['12345', 'FL', 'HO3', 54],
		value: { exposure: 2992, premium: 3150 }
	},
	{
		id: '12345-76321438-a9ed-4119-b640-cf94aa8f38de',
		key: ['12345', 'FL', 'HO3', 54],
		value: { exposure: 2992, premium: 3150 }
	}
];
// Mock data Done.

describe('DataProcessorMongo', () => {
	describe('isView', () => {
		it('Should set isView to false by default', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let viewResp = await dataProcessorInstance.isView();
			expect(viewResp).toBe(false);
		});
	});

	describe('processRecords', () => {
		it('Should processRecords', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'createMapReduceCollection')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dataProcessorInstance.dbManager.findUniqueChunkID = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				});
	
			dataProcessorInstance.dbManager.insertChunkID = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve({ status: 'success' });
				});
	
			jest.spyOn(
				dataProcessorInstance,
				'PDCS3Buckettransfer'
			).mockImplementationOnce(async () => {
				return Promise.resolve({});
			});
			let viewResp = await dataProcessorInstance.processRecords(
				'view',
				exPattern.extractionPattern,
				'premiumFromDate',
				'premiumToDate',
				'lineOfBusiness',
				'jurisdiction',
				exPattern.dataCallId,
				exPattern.dataCallVersion
			);
			expect(createMapReduceSpy).toHaveBeenCalled();
			expect(dataProcessorInstance.PDCS3Buckettransfer).toHaveBeenCalled();
			// TODO: Check when code reaches if condition line#81 should we not return true or false?
			expect(viewResp).toBeUndefined();
		});
	
		it('Should processRecords with some result status other than success', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'createMapReduceCollection')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dataProcessorInstance.dbManager.findUniqueChunkID = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				});
	
			dataProcessorInstance.dbManager.insertChunkID = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve({ status: 'test' });
				});
			jest.spyOn(
				dataProcessorInstance,
				'PDCS3Buckettransfer'
			).mockImplementationOnce(async () => {
				return Promise.resolve({});
			});
			let viewResp = await dataProcessorInstance.processRecords(
				'view',
				exPattern.extractionPattern,
				'premiumFromDate',
				'premiumToDate',
				'lineOfBusiness',
				'jurisdiction',
				exPattern.dataCallId,
				exPattern.dataCallVersion
			);
			expect(createMapReduceSpy).toHaveBeenCalledTimes(1);
			expect(
				dataProcessorInstance.PDCS3Buckettransfer
			).not.toHaveBeenCalled();
			expect(viewResp).toBe(false);
		});
	
		it('Should processRecords if uniquechunckId is empty with submit transaction', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'createMapReduceCollection')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dataProcessorInstance.dbManager.findUniqueChunkID = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([]);
				});
			jest.spyOn(
				dataProcessorInstance,
				'PDCS3Buckettransfer'
			).mockImplementationOnce(async () => {
				return Promise.resolve({});
			});
			jest.spyOn(
				dataProcessorInstance,
				'createMapReduceCollection'
			).mockImplementationOnce(async () => {
				return Promise.resolve({});
			});
			dataProcessorInstance.targetChannelTransaction = new Transaction();
	
			const transientTransactionSpy = jest
				.spyOn(
					dataProcessorInstance.targetChannelTransaction,
					'submitTransaction'
				)
				.mockImplementation(async () => {
					return Promise.resolve({});
				});
	
			let viewResp = await dataProcessorInstance.processRecords(
				'view',
				exPattern.extractionPattern,
				'premiumFromDate',
				'premiumToDate',
				'lineOfBusiness',
				'jurisdiction',
				exPattern.dataCallId,
				exPattern.dataCallVersion
			);
			expect(viewResp).toBe(true);
			expect(createMapReduceSpy).toHaveBeenCalledTimes(1);
			expect(transientTransactionSpy).toHaveBeenCalledTimes(1);
			expect(
				dataProcessorInstance.PDCS3Buckettransfer
			).not.toHaveBeenCalled();
		});
	
		it('Should processRecords if uniquechunckId is empty with submit transaction throw error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'createMapReduceCollection')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dataProcessorInstance.dbManager.findUniqueChunkID = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([]);
				});
			jest.spyOn(
				dataProcessorInstance,
				'PDCS3Buckettransfer'
			).mockImplementationOnce(async () => {
				return Promise.resolve({});
			});
			let payload = {
				dataCallID: 'dataCallID',
				dataCallVersion: 'dataCallVersion',
				carrierID: 'carrierId',
				status: 'Completed'
			};
			jest.spyOn(
				dataProcessorInstance,
				'createMapReduceCollection'
			).mockImplementationOnce(async () => {
				return Promise.resolve({});
			});
			dataProcessorInstance.targetChannelTransaction = new Transaction();
	
			const transientTransactionSpy = jest
				.spyOn(
					dataProcessorInstance.targetChannelTransaction,
					'submitTransaction'
				)
				.mockImplementation(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
	
			let viewResp = await dataProcessorInstance.processRecords(
				'view',
				exPattern.extractionPattern,
				'premiumFromDate',
				'premiumToDate',
				'lineOfBusiness',
				'jurisdiction',
				exPattern.dataCallId,
				exPattern.dataCallVersion
			);
			expect(viewResp).toBe(false);
			expect(createMapReduceSpy).toHaveBeenCalled();
			expect(transientTransactionSpy).toHaveBeenCalled();
			expect(
				dataProcessorInstance.PDCS3Buckettransfer
			).not.toHaveBeenCalled();
		});
	
		it('Should not processRecords if createMapReduceCollection throw error with email sent', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'createMapReduceCollection')
				.mockImplementationOnce(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
	
			let viewResp = await dataProcessorInstance.processRecords(
				'view',
				exPattern.extractionPattern,
				'premiumFromDate',
				'premiumToDate',
				'lineOfBusiness',
				'jurisdiction',
				exPattern.dataCallId,
				exPattern.dataCallVersion
			);
			expect(viewResp).toBeUndefined();
			expect(createMapReduceSpy).toHaveBeenCalled();
		});
	
		it('Should not processRecords if createMapReduceCollection throw error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'createMapReduceCollection')
				.mockImplementationOnce(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
	
			let invokeEmailSpy = jest
				.spyOn(dataProcessorInstance, 'invokeEmail')
				.mockImplementationOnce(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
			let viewResp = await dataProcessorInstance.processRecords(
				'view',
				exPattern.extractionPattern,
				'premiumFromDate',
				'premiumToDate',
				'lineOfBusiness',
				'jurisdiction',
				exPattern.dataCallId,
				exPattern.dataCallVersion
			);
			expect(createMapReduceSpy).toHaveBeenCalled();
			expect(invokeEmailSpy).toHaveBeenCalled();
		});
	});

	describe('PDCS3Buckettransfer', () => {
		it('Should PDCS3Buckettransfer', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dbManager.getByCarrierIdNew = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				});
			sleep.sleep = jest.fn();
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'getInsuranceDataNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let saveInsuranceRecordSpy = jest
				.spyOn(dataProcessorInstance, 'saveInsuranceRecordNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			AWS.S3 = jest.fn().mockImplementation(() => {
				return {
					putObject(params, cb) {
						result = cb(null, {
							data: 'testData'
						});
					},
					getObject(params, cb) {
						result = cb(null, {
							data: 'testData'
						});
					}
				};
			});
	
			const targetObject = new S3BucketManager();
			const actual = await targetObject
				.getTransactionalData('test')
				.catch((e) => {
					expect(e).toEqual('error');
				});
	
			const saveDataResult = await targetObject.saveTransactionalData({
				_id: 'test',
				records: []
			});
	
			const documents = {
				totalchunks: [
					{
						chunkid: 'chunkid1',
						pdcstatus: 'YettoProcess',
						s3status: 'YettoProcess',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid2',
						pdcstatus: 'Failed',
						s3status: 'Failed',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid2',
						pdcstatus: 'Completed',
						s3status: 'Failed',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid3',
						pdcstatus: 'Completed',
						s3status: 'Completed',
						pdccomments: ''
					}
				]
			};
	
			let viewResp = await dataProcessorInstance.PDCS3Buckettransfer(
				documents,
				dbManager,
				'view'
			);
	
			expect(createMapReduceSpy).toHaveBeenCalled();
			expect(saveInsuranceRecordSpy).toHaveBeenCalled();
		});
	
		it('Should PDCS3Buckettransfer - getTransactionalData throw Error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dbManager.getByCarrierIdNew = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				});
			sleep.sleep = jest.fn();
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'getInsuranceDataNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let saveInsuranceRecordSpy = jest
				.spyOn(dataProcessorInstance, 'saveInsuranceRecordNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			AWS.S3 = jest.fn().mockImplementation(() => {
				return {
					putObject(params, cb) {
						result = cb('error');
					},
					getObject(params, cb) {
						result = cb('error');
					}
				};
			});
	
			const targetObject = new S3BucketManager();
	
			const documents = {
				totalchunks: [
					{
						chunkid: 'chunkid1',
						pdcstatus: 'YettoProcess',
						s3status: 'YettoProcess',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid2',
						pdcstatus: 'Failed',
						s3status: 'Failed',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid2',
						pdcstatus: 'Completed',
						s3status: 'Failed',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid3',
						pdcstatus: 'Completed',
						s3status: 'Completed',
						pdccomments: ''
					}
				]
			};
	
			let viewResp = await dataProcessorInstance.PDCS3Buckettransfer(
				documents,
				dbManager,
				'view'
			);
			expect(createMapReduceSpy).toHaveBeenCalled();
			expect(saveInsuranceRecordSpy).toHaveBeenCalled();
		});
	
		it('Should PDCS3Buckettransfer - instanceFactory-getInstance throw Error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dbManager.getByCarrierIdNew = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				});
			sleep.sleep = jest.fn();
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'getInsuranceDataNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let saveInsuranceRecordSpy = jest
				.spyOn(dataProcessorInstance, 'saveInsuranceRecordNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let targetObjectSpy = jest
				.spyOn(InstanceFactory.prototype, 'getInstance')
				.mockImplementationOnce(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
			const documents = {
				totalchunks: [
					{
						chunkid: 'chunkid1',
						pdcstatus: 'YettoProcess',
						s3status: 'YettoProcess',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid2',
						pdcstatus: 'Failed',
						s3status: 'Failed',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid2',
						pdcstatus: 'Completed',
						s3status: 'Failed',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid3',
						pdcstatus: 'Completed',
						s3status: 'Completed',
						pdccomments: ''
					}
				]
			};
	
			let viewResp = await dataProcessorInstance.PDCS3Buckettransfer(
				documents,
				dbManager,
				'view'
			);
	
			expect(createMapReduceSpy).toHaveBeenCalled();
			expect(saveInsuranceRecordSpy).toHaveBeenCalled();
		});
	
		it('Should PDCS3Buckettransfer submit transaction', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dbManager.getByCarrierIdNew = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				});
			sleep.sleep = jest.fn();
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'getInsuranceDataNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let saveInsuranceRecordSpy = jest
				.spyOn(dataProcessorInstance, 'saveInsuranceRecordNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let targetObjectSpy = jest
				.spyOn(InstanceFactory.prototype, 'getInstance')
				.mockImplementationOnce(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
	
			dbManager.findAndUpdate = jest.fn().mockImplementationOnce(async () => {
				return Promise.resolve([{}, {}]);
			});
	
			//let transaction = new Transaction();
			const transientTransactionSpy = jest
				.spyOn(Transaction.prototype, 'submitTransaction')
				.mockImplementation(async () => {
					return Promise.resolve({});
				});
	
			const documents = {
				totalchunks: []
			};
	
			let viewResp = await dataProcessorInstance.PDCS3Buckettransfer(
				documents,
				dbManager,
				new Transaction()
			);
	
			expect(transientTransactionSpy).toHaveBeenCalled();
		});
	
		it('Should PDCS3Buckettransfer - submit transaction throw error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dbManager.getByCarrierIdNew = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				});
			sleep.sleep = jest.fn();
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'getInsuranceDataNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let saveInsuranceRecordSpy = jest
				.spyOn(dataProcessorInstance, 'saveInsuranceRecordNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let targetObjectSpy = jest
				.spyOn(InstanceFactory.prototype, 'getInstance')
				.mockImplementationOnce(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
	
			dbManager.findAndUpdate = jest.fn().mockImplementationOnce(async () => {
				return Promise.resolve([{}, {}]);
			});
	
			const transientTransactionSpy = jest
				.spyOn(Transaction.prototype, 'submitTransaction')
				.mockImplementation(async () => {
					return Promise.reject('error');
				});
			const documents = {
				totalchunks: []
			};
	
			let viewResp = await dataProcessorInstance.PDCS3Buckettransfer(
				documents,
				dbManager,
				new Transaction()
			);
			expect(transientTransactionSpy).toHaveBeenCalled();
		});
	
		it('Should not process PDCS3Buckettransfer if any error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dbManager.getByCarrierIdNew = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				});
			sleep.sleep = jest.fn();
	
			let createMapReduceSpy = jest
				.spyOn(dataProcessorInstance, 'getInsuranceDataNew')
				.mockImplementationOnce(async () => {
					return Promise.reject('error');
				});
	
			let saveInsuranceRecordSpy = jest
				.spyOn(dataProcessorInstance, 'saveInsuranceRecordNew')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let targetObjectSpy = jest
				.spyOn(InstanceFactory.prototype, 'getInstance')
				.mockImplementationOnce(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
	
			dbManager.findAndUpdate = jest.fn().mockImplementationOnce(async () => {
				return Promise.resolve([{}, {}]);
			});
	
			const transientTransactionSpy = jest
				.spyOn(Transaction.prototype, 'submitTransaction')
				.mockImplementation(async () => {
					return Promise.reject('error');
				});
	
			const documents = {
				totalchunks: [
					{
						chunkid: 'chunkid1',
						pdcstatus: 'YettoProcess',
						s3status: 'YettoProcess',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid2',
						pdcstatus: 'Failed',
						s3status: 'Failed',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid2',
						pdcstatus: 'Completed',
						s3status: 'Failed',
						pdccomments: ''
					},
					{
						chunkid: 'chunkid3',
						pdcstatus: 'Completed',
						s3status: 'Completed',
						pdccomments: ''
					}
				]
			};
	
			let viewResp = await dataProcessorInstance
				.PDCS3Buckettransfer(documents, dbManager, new Transaction())
				.catch((e) => {
					expect(e).toEqual('error');
				});
	
			expect(createMapReduceSpy).toHaveBeenCalled();
		});
	});

	describe('saveInsuranceRecordNew', () => {
		it('Should saveInsuranceRecordNew', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let viewResp = await dataProcessorInstance.saveInsuranceRecordNew(
				'carrierId',
				[],
				4,
				'datacallid',
				'versionid',
				new Transaction()
			);
		});
	
		it('Should saveInsuranceRecordNew', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let saveInsuranceRecordSpy = jest
				.spyOn(Transaction.prototype, 'transientTransaction')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let viewResp = await dataProcessorInstance.saveInsuranceRecordNew(
				'carrierId',
				[{}, {}],
				4,
				'datacallid',
				'versionid',
				new Transaction()
			);
	
			expect(saveInsuranceRecordSpy).toHaveBeenCalled();
		});		
	});

	describe('saveInsuranceRecord', () => {
		it('Should saveInsuranceRecord', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			dataProcessorInstance.targetChannelTransaction = new Transaction();
			let saveInsuranceRecordSpy = jest
				.spyOn(
					dataProcessorInstance.targetChannelTransaction,
					'transientTransaction'
				)
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let viewResp = await dataProcessorInstance.saveInsuranceRecord(
				'carrierId',
				[{}, {}],
				4
			);
		});
	
		it('Should saveInsuranceRecord with no records', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
			let viewResp = await dataProcessorInstance.saveInsuranceRecord(
				'carrierId',
				[],
				4
			);
		});
	
		it('Should not process saveInsuranceRecord if any error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			dataProcessorInstance.targetChannelTransaction = new Transaction();
			let saveInsuranceRecordSpy = jest
				.spyOn(
					dataProcessorInstance.targetChannelTransaction,
					'transientTransaction'
				)
				.mockImplementationOnce(async () => {
					return Promise.reject('error');
				});
	
			let viewResp = await dataProcessorInstance
				.saveInsuranceRecord('carrierId', [{}, {}], 4)
				.catch((e) => {
					expect(e).toEqual('error');
				});
			expect(saveInsuranceRecordSpy).toHaveBeenCalled();
		});
	});

	describe('getInsuranceDataNew', () => {
		it('Should not process getInsuranceDataNew if any error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dbManager.getByCarrierIdNew = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.reject('error');
				});
	
			let viewResp = await dataProcessorInstance
				.getInsuranceDataNew('chunkID', 'collectionName', dbManager)
				.catch((e) => {
					expect(e).toEqual('error');
				});
		});
	});

	describe('getInsuranceData', () => {
		it('Should not process getInsuranceData if any error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			dataProcessorInstance.dbManager.getByCarrierId = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.reject('error');
				});
	
			let viewResp = await dataProcessorInstance
				.getInsuranceData('skip', 10, 'collectionName')
				.catch((e) => {
					expect(e).toEqual('error');
				});
		});
	
		it('Should process getInsuranceData', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			let resp = (dataProcessorInstance.dbManager.getByCarrierId = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				}));
	
			let viewResp = await dataProcessorInstance.getInsuranceData(
				'skip',
				10,
				'collectionName'
			);
		});
	});

	describe('createMapReduceCollection', () => {
		it('Should process createMapReduceCollection', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			JSON.parse = jest.fn().mockImplementationOnce(() => {
				return {};
			});
	
			const dbSpy = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve({
						mapReduceData: async () => {
							return Promise.resolve([{}, {}]);
						},
						getViewData: async () => {
							return Promise.resolve([{}, {}]);
						}
					});
				});
	
			let viewResp = await dataProcessorInstance.createMapReduceCollection(
				'carrierId',
				'reduceCollectionName',
				'extractionPattern',
				'premiumFromDate',
				'premiumToDate',
				'lossFromDate',
				'lossToDate',
				'lineOfBusiness',
				'jurisdiction'
			);
		});
	
		it('Should not process createMapReduceCollection if any error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			JSON.parse = jest.fn().mockImplementationOnce(() => {
				return {};
			});
	
			const dbSpy = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve({
						mapReduceData: async () => {
							return Promise.resolve([{}, {}]);
						},
						getViewData: async () => {
							return Promise.reject('error');
						}
					});
				});
	
			let viewResp = await dataProcessorInstance
				.createMapReduceCollection(
					'carrierId',
					'reduceCollectionName',
					'extractionPattern',
					'premiumFromDate',
					'premiumToDate',
					'lossFromDate',
					'lossToDate',
					'lineOfBusiness',
					'jurisdiction'
				)
				.catch((e) => {
					expect(e).toEqual('error');
				});
		});
	});

	describe('insuranceDataIterator', () => {
		it('Should process insuranceDataIterator', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
	
			let saveInsuranceRecordSpy = jest
				.spyOn(dataProcessorInstance, 'saveInsuranceRecord')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let processedInsuranceDataSpy = jest
				.spyOn(dataProcessorInstance, 'processedInsuranceData')
				.mockImplementationOnce(async () => {
					return Promise.resolve({});
				});
	
			let viewResp = await dataProcessorInstance.insuranceDataIterator(
				'carrierId',
				{},
				'reduceCollectionName'
			);
		});
	
		it('Should not process createMapReduceCollection if any error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
			let saveInsuranceRecordSpy = jest
				.spyOn(dataProcessorInstance, 'saveInsuranceRecord')
				.mockImplementationOnce(async () => {
					return Promise.reject(new Error('UNKNOWN ERROR'));
				});
	
			let viewResp = await dataProcessorInstance
				.insuranceDataIterator(
					'carrierId',
					[{}, {}],
					'reduceCollectionName'
				)
				.catch((e) => {
					expect(e).toEqual('error');
				});
		});
	});
	
	describe('processedInsuranceData', () => {
		it('Should process processedInsuranceData', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
			sleep.sleep = jest.fn();
			dataProcessorInstance.mongoRecords = mongoRecords;
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			let resp = (dataProcessorInstance.dbManager.getByCarrierId = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				}));
	
			let viewResp = await dataProcessorInstance.processedInsuranceData(
				'carrierId',
				'reduceCollectionName'
			);
		});
	
		it('Should process processedInsuranceData', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
			sleep.sleep = jest.fn();
			dataProcessorInstance.mongoRecords = mongoRecords;
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			let resp = (dataProcessorInstance.dbManager.getByCarrierId = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.reject('error');
				}));
	
			let viewResp = await dataProcessorInstance
				.processedInsuranceData('carrierId', 'reduceCollectionName')
				.catch((e) => {
					expect(e).toEqual('error');
				});
		});
	});

	describe('getUnprocessedChunks', () => {
		it('Should process getUnprocessedChunks', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
			sleep.sleep = jest.fn();
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			let resp = (dataProcessorInstance.dbManager.getUnprocessedChunks = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.resolve([{}, {}]);
				}));
	
			let viewResp = await dataProcessorInstance.getUnprocessedChunks();
		});
	
		it('Should not process getUnprocessedChunks if any error', async () => {
			let dataProcessorInstance = new dataProcessor(
				exPattern.dataCallId,
				exPattern.dataCallVersion,
				consentPayload.carrierID,
				exPattern.extractionPattern,
				{},
				'view'
			);
			sleep.sleep = jest.fn();
	
			dataProcessorInstance.dbManager = jest
				.spyOn(DBManagerFactory.prototype, 'getInstance')
				.mockImplementation(async () => {
					return Promise.resolve(new MongoDBManager());
				});
	
			let resp = (dataProcessorInstance.dbManager.getUnprocessedChunks = jest
				.fn()
				.mockImplementationOnce(async () => {
					return Promise.reject('error');
				}));
	
			let viewResp = await dataProcessorInstance
				.getUnprocessedChunks()
				.catch((e) => {
					expect(e).toEqual('error');
				});
		});
	});
});
