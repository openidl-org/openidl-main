const dataProcessor = require('../../server/controllers/data-processor');
const exPattern = require('../../test/data/extractionPatternPayload.json');
const consentPayload = require('../../test/data/processConsentPayload.json');
const listConsent = require('../../test/data/listConsentByDataCallPayload.json');
const extractionPatternPayload = require('../../test/data/checkExtractionPatternPayload.json');
const Cloudant = require('@cloudant/cloudant');
const { Transaction } = require('@openidl-org/openidl-common-lib');
const { json } = require('express');
const sleep = require('sleep');
const config = require('config');

describe('DataProcessor', () => {
	it('Should set isView to true by default with constructor call', async () => {
		const localCloudantConfig = {
			url: 'https://myaccountid.cloudantnosqldb.appdomain.cloud',
			username: 'testUser',
			password: 'unitTest'
		};

		process.env['OFF_CHAIN_DB_CONFIG'] =
			JSON.stringify(localCloudantConfig);

		let dataProcessorInstance = await new dataProcessor(
			exPattern.dataCallId,
			exPattern.dataCallVersion,
			consentPayload.carrierID,
			exPattern.extractionPattern,
			{},
			'view'
		);

		expect(dataProcessorInstance.createView).toBe(true);
	});

	it('Should set isView to true by default', async () => {
		dataProcessor.prototype.createView = true;
		let viewResp = await dataProcessor.prototype.isView();
		expect(viewResp).toBe(true);
	});

	it('Should processRecords', async () => {
		let dataProcessorInstance = await new dataProcessor(
			exPattern.dataCallId,
			exPattern.dataCallVersion,
			consentPayload.carrierID,
			exPattern.extractionPattern,
			{},
			'view'
		);
		const processorSpy = jest
			.spyOn(dataProcessorInstance, 'processedInsuranceData')
			.mockImplementation(async () => {
				return Promise.resolve({});
			});
		let viewResp = await dataProcessorInstance.processRecords();
		expect(dataProcessorInstance.processedInsuranceData).toHaveBeenCalled();
	});

	it('Should not saveInsuranceRecord if no records', async () => {
		let dataProcessorInstance = await new dataProcessor(
			exPattern.dataCallId,
			exPattern.dataCallVersion,
			consentPayload.carrierID,
			exPattern.extractionPattern,
			{},
			'view'
		);
		const processorSpy = jest
			.spyOn(dataProcessorInstance, 'processedInsuranceData')
			.mockImplementation(async () => {
				return Promise.resolve({});
			});
		let viewResp = await dataProcessorInstance.saveInsuranceRecord([], 2);

		expect(processorSpy).not.toHaveBeenCalled();
	});

	it('Should saveInsuranceRecord', async () => {
		let transaction = new Transaction();
		const transientTransactionSpy = jest
			.spyOn(transaction, 'transientTransaction')
			.mockImplementation(async () => {
				return Promise.resolve({});
			});
		let dataProcessorInstance = await new dataProcessor(
			exPattern.dataCallId,
			exPattern.dataCallVersion,
			consentPayload.carrierID,
			exPattern.extractionPattern,
			transaction,
			'view'
		);
		const processorSpy = jest
			.spyOn(dataProcessorInstance, 'processedInsuranceData')
			.mockImplementation(async () => {
				return Promise.resolve({});
			});
		let viewResp = await dataProcessorInstance.saveInsuranceRecord(
			[{}, {}],
			2
		);
		expect(processorSpy).not.toHaveBeenCalled();

		expect(transientTransactionSpy).toHaveBeenCalled();
	});

	it('Should getInsuranceData', async () => {
		let dataProcessorInstance = await new dataProcessor(
			exPattern.dataCallId,
			exPattern.dataCallVersion,
			consentPayload.carrierID,
			exPattern.extractionPattern,
			new Transaction(),
			'view'
		);

		const dbQuerySpy = jest
			.spyOn(dataProcessorInstance.insuranceDB, 'view')
			.mockResolvedValueOnce({
				rows: [
					{ key: 'key1', value: 'val1' },
					{ key: 'key2', value: 'val2' }
				]
			});

		let viewResp = await dataProcessorInstance.getInsuranceData('key', 1);
		expect(dbQuerySpy).toHaveBeenCalled();
	});

	it('Should not process getInsuranceData when there is any error', async () => {
		let dataProcessorInstance = await new dataProcessor(
			exPattern.dataCallId,
			exPattern.dataCallVersion,
			consentPayload.carrierID,
			exPattern.extractionPattern,
			new Transaction(),
			'view'
		);

		const dbQuerySpy = jest
			.spyOn(dataProcessorInstance.insuranceDB, 'view')
			.mockRejectedValue('error');
		let viewResp = await dataProcessorInstance
			.getInsuranceData('key', 1)
			.catch((e) => {
				expect(e).toEqual('error');
			});
		expect(dbQuerySpy).toHaveBeenCalled();
	});
	it('Should insuranceDataIterator', async () => {
		let transaction = new Transaction();

		let dataProcessorInstance = await new dataProcessor(
			exPattern.dataCallId,
			exPattern.dataCallVersion,
			consentPayload.carrierID,
			exPattern.extractionPattern,
			transaction,
			'view'
		);
		const processorSpy = jest
			.spyOn(dataProcessorInstance, 'processedInsuranceData')
			.mockImplementation(async () => {
				return Promise.resolve({});
			});
		let viewResp = await dataProcessorInstance.insuranceDataIterator(
			'test',
			[{}, {}]
		);
		expect(processorSpy).toHaveBeenCalled();
	});

	it('Should processedInsuranceData', async () => {
		let transaction = new Transaction();

		let dataProcessorInstance = await new dataProcessor(
			exPattern.dataCallId,
			exPattern.dataCallVersion,
			consentPayload.carrierID,
			exPattern.extractionPattern,
			transaction,
			'view'
		);

		sleep.sleep = jest.fn();
		const getInsuranceDataSpy = jest
			.spyOn(dataProcessorInstance, 'getInsuranceData')
			.mockImplementation(async () => {
				return Promise.resolve([{}, {}]);
			});

		const processorSpy = jest
			.spyOn(dataProcessorInstance, 'insuranceDataIterator')
			.mockImplementation(async () => {
				return Promise.resolve({});
			});
		let viewResp = await dataProcessorInstance.processedInsuranceData(
			'test',
			[{}, {}]
		);
		expect(processorSpy).toHaveBeenCalled();
	});

	it('Should processedInsuranceData with start_key completed', async () => {
		config.pageSize = 1;

		sleep.sleep = jest.fn();
		const getInsuranceDataSpy = jest
			.spyOn(dataProcessor.prototype, 'getInsuranceData')
			.mockImplementation(async () => {
				return Promise.resolve([]);
			});

		dataProcessor.prototype.start_Key = 'someVal';

		const processorSpy = jest
			.spyOn(dataProcessor.prototype, 'insuranceDataIterator')
			.mockImplementation(async () => {
				return Promise.resolve({});
			});
		let viewResp = await dataProcessor.prototype.processedInsuranceData(
			'test',
			[{}, {}]
		);
		expect(processorSpy).toHaveBeenCalled();
	});

	it('Should processedInsuranceData with some error', async () => {
		config.pageSize = 1;

		sleep.sleep = jest.fn();
		const getInsuranceDataSpy = jest
			.spyOn(dataProcessor.prototype, 'getInsuranceData')
			.mockImplementation(async () => {
				return Promise.reject(new Error('UNKNOWN ERROR'));
			});

		dataProcessor.prototype.start_Key = 'someVal';

		const processorSpy = jest
			.spyOn(dataProcessor.prototype, 'insuranceDataIterator')
			.mockImplementation(async () => {
				return Promise.resolve({});
			});
		let viewResp = await dataProcessor.prototype.processedInsuranceData(
			'test',
			[{}, {}]
		);
		expect(getInsuranceDataSpy).toHaveBeenCalled();
	});
});
