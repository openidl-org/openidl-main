const statAgent = require('../../server/controllers/stat-agent');
const util = require('../../server/helpers/util');
const insuranceDataHandler = require('../../server/middlewares/insurance-data-handler');
const transactionFactory = require('../../server/helpers/transaction-factory');
let statusCode;
let jsonResponse;
let response;

const validInsuranceDataReq = { body: { batch_id: '11', chunkId: '11', carrier_id: '11', records: [1, 2] } };
const validSaveInsuranceDataReq = { 
    body: { 
        batchId: '11',
        chunkId: '11',
        carrierId: '11',
        records: [1, 2] 
    } 
};

describe('statAgent controller', () => {
    beforeEach(() => {
        response = {
            setHeader: (key, value) => { },
            statusCode,
            status: (code) => {
                statusCode = code;
                return {
                    json: (payload) => {
                        jsonResponse = payload;
                    },
                    send: (payload) => {
                        jsonResponse = payload;
                    }
                };
            },
            json: (payload) => {
                jsonResponse = payload;
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('loadInsuranceData', () => {

        it('should return error, BatchId is missing in the Request payload', async () => {
            const req = { body: { batchId: '', chunkId: '11', records: [] } };
            await statAgent.loadInsuranceData(req, response);
            expect(response.statusCode).toEqual(400);
            expect(jsonResponse.success).toBe(false);
        });

        it('should throws exception while inserting bulkDocuments', async () => {
            const req = { body: { batchId: '11', chunkId: '11', carrierId: '11', records: [1, 2] } };

            const insuranceDataHandlerSpy = jest.spyOn(insuranceDataHandler, 'insertBulkDocuments').mockImplementationOnce(() => {
                throw new Error('connection failure to mongodb');
            });

            await statAgent.loadInsuranceData(req, response);
            expect(insuranceDataHandlerSpy).toHaveBeenCalledTimes(1);
            expect(jsonResponse.success).toBe(undefined);
            expect(response.statusCode).toBe(undefined);
        });

        it('should successfully load Insurance Data', async () => {
            const req = { body: { batchId: '11', chunkId: '11', carrierId: '11', records: [1, 2] } };
            const insuranceDataHandlerSpy = jest.spyOn(insuranceDataHandler, 'insertBulkDocuments').mockImplementationOnce(() => {
                return {
                    message: 'Success: Insurance payload structure is valid',
                    statusCode: 200,
                    batchId: '11',
                    chunkId: '11',
                    inputDocuments: 2,
                    processedDocuments: 0,
                    success: true,
                    unProcessedDocuments: 2
                }
            });

            await statAgent.loadInsuranceData(req, response);
            expect(jsonResponse.success).toBe(true);
            expect(response.statusCode).toEqual(200);
        });
    });

    describe('saveInsuranceDataHDS ', () => {

        it('should return error while InsuranceDataHDS.', async () => {
            const req = validSaveInsuranceDataReq;
            await statAgent.saveInsuranceDataHDS(req, response);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);

        });

        it('should successfully Save HDS document in off-chain database', async () => {
            const req = validSaveInsuranceDataReq;
            const insuranceDataHandlerSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementationOnce(() => {
                return Promise.resolve(true);

            });
            await statAgent.saveInsuranceDataHDS(req, response);
            expect(insuranceDataHandlerSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);
        });

        it('should throw error if HDS document in off-chain database exists ,getInsuranceData failure', async () => {
            const req = validSaveInsuranceDataReq;
            const getInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'getInsuranceData').mockImplementationOnce(() => {
                return Promise.reject();
            });

            const saveInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementationOnce(() => {
                return Promise.reject(new Error('Document update conflict'));
            });

            await statAgent.saveInsuranceDataHDS(req, response);
            expect(getInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(saveInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);
            jest.clearAllMocks();
        });

        it('should successfully save HDS document in off-chain database exists, and to blockchain', async () => {
            const req = validSaveInsuranceDataReq;
            let firstSaveInsuranceDataSpy = true;
            const saveInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementation(() => {
                if(firstSaveInsuranceDataSpy){
                    firstSaveInsuranceDataSpy = false;
                    return Promise.reject(new Error('Document update conflict'));
                }else{
                    return Promise.resolve(true);
                }
            });
            const getInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'getInsuranceData').mockImplementationOnce(async () => {
                return Promise.resolve('1111');
            });

            await statAgent.saveInsuranceDataHDS(req, response);
            expect(saveInsuranceDataSpy).toHaveBeenCalledTimes(2);
            expect(getInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
            jest.clearAllMocks();
        });

        it('should return error while save HDS document in off-chain database exists, and to blockchain', async () => {
            jest.clearAllMocks();
            const req = validSaveInsuranceDataReq;
            const saveInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementation(() => {
                return Promise.reject(new Error('Document update conflict'));
            });
            const getInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'getInsuranceData').mockImplementationOnce(async () => {
                return Promise.resolve('1111');
            });

            await statAgent.saveInsuranceDataHDS(req, response);
            expect(saveInsuranceDataSpy).toHaveBeenCalledTimes(2);
            expect(getInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);
            jest.clearAllMocks();
        });

    });


    describe('saveInsuranceDataHDSError', () => {

        it('saveInsuranceDataHDS error.', async () => {
            jest.clearAllMocks();
            const req = validSaveInsuranceDataReq;
            await statAgent.saveInsuranceDataHDSError(req, response);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);

        });

        it('should successfully save HDSError document in off-chain database.', async () => {
            const req = validSaveInsuranceDataReq;
            const insuranceDataHandlerSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementationOnce(async () => {
                return Promise.resolve(true);
            });
            await statAgent.saveInsuranceDataHDSError(req, response);
            expect(insuranceDataHandlerSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);
        });

        it('should through HDS error document in off-chain database exists ,getInsuranceData failure', async () => {
            jest.clearAllMocks();
            const req = validSaveInsuranceDataReq;

            const saveInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementation(async () => {
                return Promise.reject(new Error('Some Error.'));
            });

            await statAgent.saveInsuranceDataHDSError(req, response);
            expect(saveInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);
        });

        it('should return HDS error document in off-chain database exists , update to be and to blockchain', async () => {
            jest.clearAllMocks();
            const req = validSaveInsuranceDataReq;

            const getInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'getInsuranceData').mockImplementationOnce(async (id) => {
                return Promise.resolve('1111');
            });
            const saveInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementation(async (payload) => {
                return Promise.reject(new Error('Document update conflict'));
            });

            await statAgent.saveInsuranceDataHDSError(req, response);
            expect(saveInsuranceDataSpy).toHaveBeenCalledTimes(2);
            expect(getInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);
        });

        it('should successfully save HDS document in off-chain database exists , update to be and to blockchain', async () => {
            jest.clearAllMocks();
            const req = validSaveInsuranceDataReq;
            let firstSaveInsuranceDataSpy = true;
            const saveInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementation(async () => {
                if(firstSaveInsuranceDataSpy){
                    firstSaveInsuranceDataSpy = false;
                    return Promise.reject(new Error('Document update conflict'));
                }else{
                    return Promise.resolve(true);
                }
            });

            const getInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'getInsuranceData').mockImplementationOnce(async (id) => {
                return Promise.resolve('1111');
            });

            await statAgent.saveInsuranceDataHDSError(req, response);
            expect(saveInsuranceDataSpy).toHaveBeenCalledTimes(2);
            expect(getInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);
        });

    });

    describe('insuranceData ', () => {

        it('should return FAILED: error storing insurance data in off-chain database.', async () => {
            const req = validInsuranceDataReq;
            await statAgent.insuranceData(req, response);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);
        });

        it('save document off-chain database is successful and to blockchain', async () => {
            const req = validInsuranceDataReq;

            const insuranceDataHandlerSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementationOnce(() => {
                return Promise.resolve(true);

            });

            const submitTransSpy = jest.spyOn(transactionFactory, 'getCarrierChannelTransaction').mockImplementationOnce(() => {
                return {
                    submitTransaction: (arg1, arg2) => {
                        key = arg1;
                        value = arg2;
                    }
                };
            });

            await statAgent.insuranceData(req, response);
            console.log(`11 response ${JSON.stringify(response)} jsonResponse : ${JSON.stringify(jsonResponse)}`)
            expect(insuranceDataHandlerSpy).toHaveBeenCalledTimes(1);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);

        });

        it('saveInsuranceDataHash error', async () => {
            const req = validInsuranceDataReq;

            const saveInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementationOnce(() => {
                return Promise.resolve(true);

            });

            const submitTransSpy = jest.spyOn(transactionFactory, 'getCarrierChannelTransaction').mockImplementationOnce(() => {
                return {
                    submitTransaction: (arg1, arg2) => {
                        throw 'saveInsuranceDataHash error';
                    }
                };
            });

            await statAgent.insuranceData(req, response);
            console.log(`12 response ${JSON.stringify(response)} jsonResponse : ${JSON.stringify(jsonResponse)}`)
            expect(saveInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);

        });

        it('document in off-chain database exists , update to be and to blockchain', async () => {
            const req = validInsuranceDataReq;

            const getInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'getInsuranceData').mockImplementationOnce(async () => {
                return Promise.resolve('1111');
            });

            const saveInsuranceDataSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementationOnce(async () => {
                return Promise.reject(new Error('Document update conflict'));
            });

            const submitTransSpy = jest.spyOn(transactionFactory, 'getCarrierChannelTransaction').mockImplementationOnce(() => {
                return {
                    submitTransaction: (arg1, arg2) => {
                        key = arg1;
                        value = arg2;
                    }
                };
            });

            await statAgent.insuranceData(req, response);
            expect(saveInsuranceDataSpy).toHaveBeenCalledTimes(2);
            expect(getInsuranceDataSpy).toHaveBeenCalledTimes(1);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);

        });

    });

    describe('saveInsuranceDataHash ', () => {

        it('should return error while submit transaction.', async () => {

            const req = validSaveInsuranceDataReq;
            const insuranceDataHandlerSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementationOnce(() => {
                return Promise.resolve(true);

            });
            await statAgent.saveInsuranceDataHDS(req, response);
            console.log(`5 response ${JSON.stringify(response)} jsonResponse : ${JSON.stringify(jsonResponse)}`)
            expect(insuranceDataHandlerSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);

            jsonResponse = null;
            response.statusCode = 0;

            req.body['hash'] = 'hashvalue';
            await statAgent.saveInsuranceDataHash(req,response);
            expect(response.statusCode).toEqual(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully saveInsuranceDataHash', async () => {
            const req = validSaveInsuranceDataReq;
            const insuranceDataHandlerSpy = jest.spyOn(insuranceDataHandler, 'saveInsuranceData').mockImplementationOnce(() => {
                return Promise.resolve(true);

            });
            await statAgent.saveInsuranceDataHDS(req, response);
            console.log(`5 response ${JSON.stringify(response)} jsonResponse : ${JSON.stringify(jsonResponse)}`)
            expect(insuranceDataHandlerSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);

            jsonResponse = null;
            response.statusCode = 0;

            let key, value;
            const carrierChannelSpy = jest.spyOn(transactionFactory,'getCarrierChannelTransaction').mockImplementation(()=>{
                return {
                    submitTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                    }
                };
            });
            req.body['hash'] = 'hashvalue';

            await statAgent.saveInsuranceDataHash(req,response);
            expect(carrierChannelSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('SaveInsuranceDataHash');
            expect(value).toContain('hashvalue');
            expect(response.statusCode).toEqual(200);
            expect(jsonResponse.success).toBe(true);
        });
    });

});