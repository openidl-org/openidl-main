const idmAgent = require('../../server/controllers/idm');
const apihandler = require('../../server/middlewares/apihandler');
var Request = require("request");

let jsonResponse;
let response;

describe('idm', () => {
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
    describe('runDataLoad', () => {
        it('should throw error 1 time on runDataLoad', async ()=> {
            const postSpy = jest.spyOn(Request,'post').mockImplementation((req, cb)=>{
                cb(new Error('Some Error'), response, {});
            });
            const req = {
                headers: {
                    authorization: 'authToken'
                },
                body: {
                    payload: {},
                    noOfRuns: 1
                }
            };
            await idmAgent.runDataLoad(req,response);
            expect(postSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('REQUEST TAKEN FOR INSURANCE DATA LOAD');
        });
        it('should throw error 3 times on runDataLoad', async ()=> {
            const postSpy = jest.spyOn(Request,'post').mockImplementation((req, cb)=>{
                cb(new Error('Some Error'), response, {});
            });
            const req = {
                headers: {
                    authorization: 'authToken'
                },
                body: {
                    payload: {},
                    noOfRuns: 3
                }
            };
            await idmAgent.runDataLoad(req,response);
            expect(postSpy).toHaveBeenCalledTimes(3);
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('REQUEST TAKEN FOR INSURANCE DATA LOAD');
        });
        it('should throw validateJson error 3 times on runDataLoad', async ()=> {
            const postSpy = jest.spyOn(Request,'post').mockImplementation((req, cb)=>{
                cb(null, response, {});
            });
            const req = {
                headers: {
                    authorization: 'authToken'
                },
                body: {
                    payload: {},
                    noOfRuns: 3
                }
            };
            await idmAgent.runDataLoad(req,response);
            expect(postSpy).toHaveBeenCalledTimes(3);
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('REQUEST TAKEN FOR INSURANCE DATA LOAD');
        });
    });
    describe('runDataLoadFromFile', () => {
        it('should throw error 1 time on runDataLoadFromFile', async ()=> {
            const postSpy = jest.spyOn(Request,'post').mockImplementation((req, cb)=>{
                cb(new Error('Some Error'), response, {});
            });
            const req = {
                headers: {
                    authorization: 'authToken'
                },
                body: {
                    payload: {},
                    noOfRuns: 1,
                    noOfRecords:10
                }
            };
            await idmAgent.runDataLoadFromFile(req,response);
            expect(postSpy).toHaveBeenCalledTimes(1);
            expect(response.statusCode).toBe(200);
            expect(jsonResponse.success).toBe(true);
            expect(jsonResponse.message).toBe('REQUEST TAKEN FOR INSURANCE DATA LOAD');
        });
    });
});