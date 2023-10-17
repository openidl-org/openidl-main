const statAgent = require('../../server/controllers/stat-agent');
const transactionFactory = require('../../server/helpers/transaction-factory');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const DBManagerFactory = openidlCommonLib.DBManagerFactory;

let jsonResponse;
let response;

describe('stat-agent', () => {
    beforeEach(()=>{
        jsonResponse = undefined;
        response = {
            setHeader: (key, value) => { },
            statusCode: 0,
            json: (payload) => {
                jsonResponse = payload;
            }
        };
    });
    describe('resetData', () => {
        it('should throw error while resetData', async ()=> {
            const req = {
                body: {}
            };
            await statAgent.resetData(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully resetData', async ()=> {
            let key1, key2;
            let value1, value2;
            const defaultChannelSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementation(()=>{
                return {
                    submitTransaction: (arg1,arg2) => {
                        key1 = arg1;
                        value1 = arg2;
                    }
                };
            });
            const carrierChannelSpy = jest.spyOn(transactionFactory,'getCarrierChannelTransaction').mockImplementation(()=>{
                return {
                    submitTransaction: (arg1,arg2) => {
                        key2 = arg1;
                        value2 = arg2;
                    }
                };
            });
            const req = {
                body: {}
            };
            await statAgent.resetData(req,response);
            expect(defaultChannelSpy).toHaveBeenCalledTimes(1);
            expect(key1).toBe('ResetWorldState');
            expect(value1).toBe('');
            expect(carrierChannelSpy).toHaveBeenCalledTimes(1);
            expect(key2).toBe('ResetWorldState');
            expect(value2).toBe('');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('DELETED');
        });
    });
    describe('listConsentsByDataCall', () => {
        it('should throw error while listConsentsByDataCall', async ()=> {
            const req = {
                params: {
                    id: '1234',
                    version: '1.0'
                }
            };
            await statAgent.listConsentsByDataCall(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully listConsentsByDataCall', async ()=> {
            let key, value;
            const localCloudantConfig = {
                url: "https://myaccountid.cloudantnosqldb.appdomain.cloud",
                username: "testUser",
                password: "unitTest"
            };
            process.env['OFF_CHAIN_DB_CONFIG'] = JSON.stringify(localCloudantConfig);
            const dbSpy = jest.spyOn(DBManagerFactory.prototype,'getInstance').mockImplementation(async ()=>{
                return Promise.resolve({
                    fetchCarrierNames: async () => {
                        return Promise.resolve([]);
                    }
                });
            });
            const carrierChannelSpy = jest.spyOn(transactionFactory,'getCarrierChannelTransaction').mockImplementation(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return JSON.stringify([
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
                        ]);
                    }
                };
            });
            const req = {
                params: {
                    id: '1234',
                    version: '1.0'
                }
            };
            await statAgent.listConsentsByDataCall(req,response);
            expect(dbSpy).toHaveBeenCalledTimes(1);
            expect(carrierChannelSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('ListConsentsByDataCall');
            expect(value).toContain('dataCallVersion');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            // expect(jsonResponse.message).toBe('DELETED');
        });
    });
    describe('listLikesByDataCall', () => {
        it('should throw error while listLikesByDataCall', async ()=> {
            const req = {
                params: {
                    id: '1234',
                    version: '1.0'
                }
            };
            await statAgent.listLikesByDataCall(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully listLikesByDataCall', async ()=> {
            let key, value;
            const localCloudantConfig = {
                url: "https://myaccountid.cloudantnosqldb.appdomain.cloud",
                username: "testUser",
                password: "unitTest"
            };
            process.env['OFF_CHAIN_DB_CONFIG'] = JSON.stringify(localCloudantConfig);
            const dbSpy = jest.spyOn(DBManagerFactory.prototype,'getInstance').mockImplementation(async ()=>{
                return Promise.resolve({
                    fetchCarrierNames: async () => {
                        return Promise.resolve([]);
                    }
                });
            });
            const carrierChannelSpy = jest.spyOn(transactionFactory,'getCarrierChannelTransaction').mockImplementation(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return JSON.stringify([
                            {
                                like: {
                                    datacallID: '1111',
                                    dataCallVersion: '1.0',
                                    organizationID: 'openidl-org'
                                }
                
                            },
                            {
                                like: {
                                    datacallID: '2222',
                                    dataCallVersion: '1.1',
                                    organizationID: 'openidl-org'
                                }
                
                            }
                        ]);
                    }
                };
            });
            const req = {
                params: {
                    id: '1234',
                    version: '1.0'
                }
            };
            await statAgent.listLikesByDataCall(req,response);
            expect(carrierChannelSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('ListLikesByDataCall');
            expect(value).toContain('dataCallVersion');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            // expect(jsonResponse.message).toBe('DELETED');
        });
    });
    describe('createReport', () => {
        it('should throw error while createReport', async ()=> {
            const req = {
            };
            await statAgent.createReport(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully createReport', async ()=> {
            let key, value;
            const defaultChannelSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementation(()=>{
                return {
                    submitTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                    }
                };
            });
            const req = {
                body: {}
            };
            await statAgent.createReport(req,response);
            expect(defaultChannelSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('CreateReport');
            expect(value).toContain('updatedTs');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
});