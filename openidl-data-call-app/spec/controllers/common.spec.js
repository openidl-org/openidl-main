const common = require('../../server/controllers/common');
const transactionFactory = require('../../server/helpers/transaction-factory');
let jsonResponse;
let response;

describe('common', () => {
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
    describe('login', () => {
        it('should return error while login', ()=> {
            const req = {
                body: {}
            };
            common.login(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
            expect(jsonResponse.message).toBe('Authentication failed,Please contact system administrator');
        });
        it('should successfully login', async ()=> {
            const res = {
                setHeader: (key, value) => { },
                json: (payload) => {
                    jsonResponse = payload;
                },
                locals: {
                    user: 'testUser'
                }
            };
            common.login({},res);
            expect(res.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toBe('testUser');
        });
    });
    describe('logout', () => {
        it('should successfully logout', async ()=> {
            common.logout({},response);
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('logout successful');
        });
    });
    describe('searchDataCalls', () => {
        it('should throw error while searchDataCalls', async ()=> {
            const req = {
                query: {
                }
            };
            await common.searchDataCalls(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on searchDataCalls', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                query: {
                    startIndex: '5',
                    pageSize: '10'
                }
            };
            const expectedQueryBody = {
                startIndex: 5,
                pageSize: 10
            }
            await common.searchDataCalls(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('SearchDataCalls');
            expect(value).toBe(JSON.stringify(expectedQueryBody));
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('listDataCallsByCriteria', () => {
        it('should throw error while listDataCallsByCriteria', async ()=> {
            const req = {
                query: {
                }
            };
            await common.listDataCallsByCriteria(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on listDataCallsByCriteria', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                query: {
                    startIndex: '5',
                    pageSize: '10'
                }
            };
            const expectedQueryBody = {
                startIndex: 5,
                pageSize: 10
            }
            await common.listDataCallsByCriteria(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('ListDataCallsByCriteria');
            expect(value).toBe(JSON.stringify(expectedQueryBody));
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('getDataCallVersionsById', () => {
        it('should throw error while getDataCallVersionsById', async ()=> {
            const req = {
                params: {
                },
                query: {
                }
            };
            await common.getDataCallVersionsById(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on getDataCallVersionsById', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                params: {
                    id: '1234'
                },
                query: {
                }
            };
            await common.getDataCallVersionsById(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('GetDataCallVersionsById');
            expect(value).toContain('1234');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('getDataCallByIdAndVersion', () => {
        it('should throw error while getDataCallByIdAndVersion', async ()=> {
            const req = {
                params: {
                }
            };
            await common.getDataCallByIdAndVersion(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on getDataCallByIdAndVersion', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                params: {
                    id: '1234',
                    version: '1.0'
                }
            };
            await common.getDataCallByIdAndVersion(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('GetDataCallByIdAndVersion');
            expect(value).toContain('1.0');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('listLineOfBusiness', () => {
        it('should successfully get the listLineOfBusiness', async ()=> {
            await common.listLineOfBusiness({},response);
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toBeDefined();
        });
    });
    describe('toggleLike', () => {
        it('should throw error while toggleLike', async ()=> {
            const req = {
                params: {
                }
            };
            await common.toggleLike(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on toggleLike', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getCarrierChannelTransaction').mockImplementationOnce(()=>{
                return {
                    submitTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                    }
                };
            });
            const req = {
                body: {
                    id: '1234',
                    version: '1.0'
                }
            };
            await common.toggleLike(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('ToggleLike');
            expect(value).toContain('updatedTs');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });        
    });
    describe('likeCount', () => {
        it('should throw error while likeCount', async ()=> {
            const req = {
                params: {
                }
            };
            await common.likeCount(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on likeCount', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                params: {
                    id: '1234',
                    version: '1.0'
                }
            };
            await common.likeCount(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('CountLikes');
            expect(value).toContain('dataCallVersion');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('consentCount', () => {
        it('should throw error while consentCount', async ()=> {
            const req = {
                params: {
                }
            };
            await common.consentCount(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on consentCount', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                params: {
                    id: '1234',
                    version: '1.0'
                }
            };
            await common.consentCount(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('CountConsents');
            expect(value).toContain('dataCallVersion');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('likeStatusByDataCall', () => {
        it('should throw error while likeStatusByDataCall', async ()=> {
            const req = {
                params: {
                }
            };
            await common.likeStatusByDataCall(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on likeStatusByDataCall', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getCarrierChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                params: {
                    id: '1234',
                    version: '1.0',
                    orgId: 'openidl-arg'
                }
            };
            await common.likeStatusByDataCall(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('GetLikeByDataCallAndOrganization');
            expect(value).toContain('organizationID');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('getReportsByCriteria', () => {
        it('should throw error while getReportsByCriteria', async ()=> {
            const req = {
                params: {
                }
            };
            await common.getReportsByCriteria(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on getReportsByCriteria', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                query: {
                    startIndex: '10',
                    pageSize: '10'                }
            };
            await common.getReportsByCriteria(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('ListReportsByCriteria');
            expect(value).toContain('startIndex');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('dataCallLog', () => {
        it('should throw error while dataCallLog', async ()=> {
            const req = {
                params: {
                }
            };
            await common.dataCallLog(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on dataCallLog', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                params: {
                    id: '1234',
                    version: '1.0'                }
            };
            await common.dataCallLog(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('ListDataCallTransactionHistory');
            expect(value).toContain('dataCallVersion');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('blockExplorer', () => {
        it('should throw error while blockExplorer', async ()=> {
            await common.blockExplorer({},response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on blockExplorer', async ()=> {
            const getBlockDetailsSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    getBlockDetails: () => {
                        return [];
                    }
                };
            });
            await common.blockExplorer({},response);
            expect(getBlockDetailsSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('listExtractionPatterns', () => {
        it('should throw error while listExtractionPatterns', async ()=> {
            await common.listExtractionPatterns({},response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on listExtractionPatterns', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            await common.listExtractionPatterns({},response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('ListExtractionPatterns');
            expect(value).toBe('');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('getExtractionPatternsById', () => {
        it('should throw error while getExtractionPatternsById', async ()=> {
            const req = {
                params: {
                }
            };
            await common.getExtractionPatternsById(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on getExtractionPatternsById', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                body: {
                    id: '1234'
                }
            };
            await common.getExtractionPatternsById(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('GetExtractionPatternByIds');
            expect(value).toContain('1234');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('getDataCallAndExtractionPattern', () => {
        it('should throw error while getDataCallAndExtractionPattern', async ()=> {
            const req = {
                body: {
                }
            };
            await common.getDataCallAndExtractionPattern(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on getDataCallAndExtractionPattern', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                body: {
                    dataCallID: '1234',
                    dataCallVersion: '1.0',
                    dbType: 'couchDB'
                }
            };
            await common.getDataCallAndExtractionPattern(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('GetDataCallAndExtractionPattern');
            expect(value).toContain('dbType');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('updateConsentStatus', () => {
        it('should throw error while updateConsentStatus', async ()=> {
            const req = {
                params: {
                }
            };
            await common.updateConsentStatus(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on updateConsentStatus', async ()=> {
            let key;
            let value;
            const execTransSpy = jest.spyOn(transactionFactory,'getCarrierChannelTransaction').mockImplementationOnce(()=>{
                return {
                    executeTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return [];
                    }
                };
            });
            const req = {
                params: {
                    id: '1234',
                    version: '1.0',
                    orgId: 'openidl-org',
                    status: 'Active'
                }
            };
            await common.updateConsentStatus(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('UpdateConsentStatus');
            expect(value).toContain('dataCallVersion');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
});