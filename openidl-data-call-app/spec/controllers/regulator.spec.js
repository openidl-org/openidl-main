const regulator = require('../../server/controllers/regulator');
const transactionFactory = require('../../server/helpers/transaction-factory');
let jsonResponse;
let response;

describe('regulator', () => {
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
    describe('createDataCall', () => {
        it('should throw error while createDataCall', async ()=> {
            const req = {
                body: {}
            };
            await regulator.createDataCall(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully createDataCall', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
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
            await regulator.createDataCall(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('CreateDataCall');
            expect(value).toContain('id');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
    describe('updateDataCall', () => {
        it('should throw error while updateDataCall', async ()=> {
            const req = {
                body: {}
            };
            await regulator.updateDataCall(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully updateDataCall', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
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
            await regulator.updateDataCall(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('UpdateDataCall');
            expect(value).toContain('updatedTs');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
    describe('createExtractionPattern', () => {
        it('should throw error while createExtractionPattern', async ()=> {
            const req = {
                body: {
                    viewDefinition: {
                        map: ''
                    }
                }
            };
            await regulator.createExtractionPattern(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
            expect(jsonResponse.message).toBe('FAILED: Error: Missing required param viewDefinition');            
        });
        it('should successfully createExtractionPattern', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                return {
                    submitTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                    }
                };
            });
            const req = {
                body: {
                    viewDefinition: {
                        map: 'mapper',
                        reduce: 'reducer'
                    }
                }
            };
            await regulator.createExtractionPattern(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('CreateExtractionPattern');
            expect(value).toContain('updatedTs');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
    describe('updateExtractionPattern', () => {
        it('should throw error while updateExtractionPattern', async ()=> {
            const req = {
                body: {}
            };
            await regulator.updateExtractionPattern(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully updateExtractionPattern', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
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
            await regulator.updateExtractionPattern(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('UpdateExtractionPattern');
            expect(value).toContain('updatedTs');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
    describe('saveNewDraft', () => {
        it('should throw error while saveNewDraft', async ()=> {
            const req = {
                body: {}
            };
            await regulator.saveNewDraft(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully saveNewDraft', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
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
            await regulator.saveNewDraft(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('SaveNewDraft');
            expect(value).toContain('updatedTs');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
    describe('issueDataCall', () => {
        it('should throw error while issueDataCall', async ()=> {
            const req = {
                body: {}
            };
            await regulator.issueDataCall(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully issueDataCall', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
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
            await regulator.issueDataCall(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('IssueDataCall');
            expect(value).toContain('updatedTs');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
    describe('saveAndIssueDataCall', () => {
        it('should throw error while saveAndIssueDataCall', async ()=> {
            const req = {
                body: {}
            };
            await regulator.saveAndIssueDataCall(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully saveAndIssueDataCall', async ()=> {
            let key1, value1, key2, value2, key3, value3;
            let firstCall=true;
            const transactionSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementation(()=>{
                return {
                    submitTransaction: (arg1,arg2) => {
                        if(firstCall) {
                            key1 = arg1;
                            value1 = arg2;
                            firstCall=false;
                        }else{
                            key3 = arg1;
                            value3 = arg2;
                        }
                    },
                    executeTransaction: (arg1,arg2) => {
                        key2 = arg1;
                        value2 = arg2;
                        return Promise.resolve(JSON.stringify([{
                            id: 'id-1',
                            isLatest: true,
                            status: 'NOT ISSUED'
                        },{
                            id: 'id-2',
                            isLatest: true,
                            status: 'NOT ISSUED'
                        },{
                            id: 'id-3',
                            isLatest: false
                        }]));
                    }
                };
            });
            const req = {
                body: {
                    id: '1234'
                }
            };
            await regulator.saveAndIssueDataCall(req,response);
            expect(transactionSpy).toHaveBeenCalledTimes(3);
            expect(key1).toBe('SaveNewDraft');
            expect(value1).toContain('updatedTs');
            expect(key2).toBe('GetDataCallVersionsById');
            expect(value2).toContain('id');
            expect(key3).toBe('IssueDataCall');
            expect(value3).toContain('id-1');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
    describe('updateReport', () => {
        it('should throw error while updateReport', async ()=> {
            const req = {
            };
            await regulator.updateReport(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully updateReport', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
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
            await regulator.updateReport(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('UpdateReport');
            expect(value).toContain('updatedTs');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
    describe('updateDataCallCount', () => {
        it('should throw error while updateDataCallCount', async ()=> {
            jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
                throw new Error('Some Error');
            });
            const req = {
                body: {}
            };
            await regulator.updateDataCallCount(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully updateDataCallCount', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
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
            await regulator.updateDataCallCount(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('UpdateDataCallCount');
            expect(value).toBe('{}');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });
    });
});