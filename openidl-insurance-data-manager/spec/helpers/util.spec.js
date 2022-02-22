const util = require('../../server/helpers/util');


let jsonResponse;
const response = {
    setHeader: () => { },
    json: (payload) => {
        jsonResponse = payload;
    }
};

describe('util', () => {

    it('should return sendResponse payload', () => {
        const msg = { statusCode: 200, success: true, message: 'Success Message' };
        util.sendResponse(response, msg);
        expect(jsonResponse).toEqual({ success: true, message: 'Success Message' });
    })

    it('should return apiResponse payload', async () => {
        const expectedResponse = {
            statusCode: 200, success: true, message: 'Success Message', batchId: '1', chunkId: '1', inputDocuments: 1, processedDocuments: 1, unProcessedDocuments: 1
        };
        const res = await util.apiResponse(200, true, 'Success Message', '1', '1', 1, 1, 1);
        expect(res).toEqual(expectedResponse);
    })

    describe('isMongoServiceRunning', () => {

        it('mongo not running', async () => {
            const dbManagerFactory = {
                getInstance: (collectionName) => { return true },
            };

            jest.spyOn(dbManagerFactory, 'getInstance').mockImplementationOnce(() => {
                return {};
            });
            const isMongoServiceRunning = await util.isMongoServiceRunning(dbManagerFactory, 'test', 11);
            expect(isMongoServiceRunning).toBe(false);
        });

    });

    describe('dataloadValidation', () => {

        it('FAILED: BatchId is missing in the Request payload ', async () => {

            const expectedResponse = {
                statusCode: 500,
                success: false,
                message: 'FAILED: BatchId is missing in the Request payload',
            };
            const payload = { batchId: '', chunckid: 1 }
            const res = await util.dataloadValidation(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(500);
            expect(res.success).toBe(false);

        })

        it('FAILED: Chunkid is missing in the Request payload ', async () => {

            const expectedResponse = {
                statusCode: 500,
                success: false,
                message: 'FAILED: Chunkid is missing in the Request payload',
            }
            const payload = { batchId: '1', chunckid: '' }
            const res = await util.dataloadValidation(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(500);
            expect(res.success).toBe(false);

        })

        it('FAILED: CarrierId is missing in the Request payload ', async () => {

            const expectedResponse = {
                statusCode: 500,
                success: false,
                message: 'FAILED: CarrierId is missing in the Request payload',
            }

            const payload = { batchId: '1', chunckid: 1 }
            const res = await util.dataloadValidation(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(500);
            expect(res.success).toBe(false);

        })

        it('SUCCESS: Valid Request payload ', async () => {

            const expectedResponse = {
                statusCode: 200,
                success: true,
                message: 'Request payload is valid',
            }

            const payload = { batchId: '1', chunckid: 1, carrierId: 1 }
            const res = await util.dataloadValidation(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(200);
            expect(res.success).toBe(true);

        })
    });


    describe('validatePayload', () => {

        it('FAILED: BatchId is missing in the Request payload ', async () => {

            const expectedResponse = {
                message: 'Failed: BatchId is missing in the payload request',
                statusCode: 400,
                batchId: '',
                chunkId: '',
                inputDocuments: 2,
                processedDocuments: 0,
                success: false,
                unProcessedDocuments: 2
            }

            const payload = { batchId: '', chunkId: '', records: [1, 2] }
            const res = await util.validatePayload(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(400);
            expect(res.success).toBe(false);

        })

        it('FAILED: Chunkid is missing in the Request payload ', async () => {

            const expectedResponse = {
                message: 'Failed: Chunkid is missing in the payload request',
                statusCode: 400,
                batchId: '1',
                chunkId: '',
                inputDocuments: 2,
                processedDocuments: 0,
                success: false,
                unProcessedDocuments: 2
            }


            const payload = { batchId: '1', chunkId: '', records: [1, 2] };
            const res = await util.validatePayload(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(400);
            expect(res.success).toBe(false);

        })

        it('FAILED: CarrierId is missing in the Request payload ', async () => {

            const expectedResponse =
            {
                message: 'Failed: CarrierId is missing in the payload request',
                statusCode: 400,
                batchId: '1',
                chunkId: '1',
                inputDocuments: 2,
                processedDocuments: 0,
                success: false,
                unProcessedDocuments: 2
            }

            const payload = { batchId: '1', chunkId: '1', records: [1, 2] };
            const res = await util.validatePayload(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(400);
            expect(res.success).toBe(false);
        })

        it('FAILED: missing records ', async () => {

            const expectedResponse =
            {
                message: 'Failed: No Insurance data found in the payload request',
                statusCode: 400,
                batchId: '1',
                chunkId: '1',
                inputDocuments: 0,
                processedDocuments: 0,
                success: false,
                unProcessedDocuments: 0
            }

            const payload = { batchId: '1', chunkId: '1', carrierId: '1', records: [] };
            const res = await util.validatePayload(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(400);
            expect(res.success).toBe(false);

        })

        it('SUCCESS: Valid Request payload ', async () => {

            const expectedResponse =
            {
                message: 'Success: Insurance payload structure is valid',
                statusCode: 200,
                batchId: '1',
                chunkId: '1',
                inputDocuments: 2,
                processedDocuments: 0,
                success: true,
                unProcessedDocuments: 2
            }

            const payload = { batchId: '1', chunkId: '1', carrierId: '1', records: [1, 2] };
            const res = await util.validatePayload(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(200);
            expect(res.success).toBe(true);

        })
    });


    describe('isValidInsuranceDataPayload', () => {

        it('FAILED: batchId is missing in the Request payload ', async () => {

            const expectedResponse = {
                statusCode: 500,
                success: false,
                message: 'FAILED: batchId is missing in the Request payload',
            }

            const payload = { batch_id: '', chunckid: '1', carrierId: '1', records: [1, 2] };
            const res = await util.isValidInsuranceDataPayload(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(500);
            expect(res.success).toBe(false);
        })

        it('FAILED: carrierId is missing in the Request payload ', async () => {
            const expectedResponse = {
                statusCode: 500,
                success: false,
                message: 'FAILED: carrierId is missing in the Request payload',
            }
            const payload = { batch_id: '1', chunckid: '1', carrier_id: '', records: [1, 2] };
            const res = await util.isValidInsuranceDataPayload(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(500);
            expect(res.success).toBe(false);
        })

        it('FAILED: Records are missing in the Request payload ', async () => {

            const expectedResponse = {
                statusCode: 500,
                success: false,
                message: 'FAILED: Records are missing in the Request payload',
            }
            const payload = { batch_id: '1', chunckid: '1', carrier_id: '1' };
            const res = await util.isValidInsuranceDataPayload(payload);
            expect(res).toEqual(expectedResponse);
            expect(res.statusCode).toBe(500);
            expect(res.success).toBe(false);

        })
    });

    /* it('getNetworkConfigFilePath - get network configuration file path ', () => {
        const configFilePath = util.getNetworkConfigFilePath('test-org');
       const expected= `${__dirname}/../../fabric-network/network-config-test-org'.json`
        expect(configFilePath).toEqual();
    }) */

});


