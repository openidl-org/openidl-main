const carrier = require('../../server/controllers/carrier');
const transactionFactory = require('../../server/helpers/transaction-factory');
let jsonResponse;
let response;

describe('carrier', () => {
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
    describe('createConsent', () => {
        it('should throw error while createConsent', async ()=> {
            const req = {
                body: {}
            };
            await carrier.createConsent(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully createConsent', async ()=> {
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
                body: {}
            };
            await carrier.createConsent(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('CreateConsent');
            expect(value).toContain('Submitted');
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('OK');
        });        
    });
    describe('consentStatusByDataCall', () => {
        it('should throw error while consentStatusByDataCall', async ()=> {
            const req = {
                params: {
                    id: '1234',
                    version: '1.0',
                    orgId: 'openidl-org'
                }
            };
            await carrier.consentStatusByDataCall(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should return success response on consentStatusByDataCall', async ()=> {
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
                    orgId: 'openidl-org'
                }
            };
            const expectedQueryBody = {
                consent: {
                    datacallID: '1234',
                    dataCallVersion: '1.0',
                    carrierID: 'openidl-org'
                }

            }
            await carrier.consentStatusByDataCall(req,response);
            expect(execTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('GetConsentByDataCallAndOrganization');
            expect(value).toBe(JSON.stringify(expectedQueryBody));
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual([]);
        });        
    });
    describe('updateConsentStatus', () => {
        it('should throw error while updateConsentStatus', async ()=> {
            const req = {
                body: {}
            };
            await carrier.updateConsentStatus(req,response);
            expect(response.statusCode).toBe(500);
            expect(jsonResponse.success).toBe(false);
        });
        it('should successfully updateConsentStatus', async ()=> {
            let key;
            let value;
            const submitTransSpy = jest.spyOn(transactionFactory,'getCarrierChannelTransaction').mockImplementationOnce(()=>{
                return {
                    submitTransaction: (arg1,arg2) => {
                        key = arg1;
                        value = arg2;
                        return {};
                    }
                };
            });
            const req = {
                body: {}
            };
            await carrier.updateConsentStatus(req,response);
            expect(submitTransSpy).toHaveBeenCalledTimes(1);
            expect(key).toBe('UpdateConsentStatus');
            expect(value).toBe(JSON.stringify({}));
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.result).toEqual({});
        });        
    });
});