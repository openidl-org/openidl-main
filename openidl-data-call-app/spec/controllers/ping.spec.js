const ping = require('../../server/controllers/ping');
const transactionFactory = require('../../server/helpers/transaction-factory');
let jsonResponse;
let response;

describe('ping', () => {
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
    it('should return error response invoking pingCC', ()=> {
        const req = {};
        ping.pingCC(req, response);
        expect(response.statusCode).toBe(500);
    });
    it('should return success response', async ()=> {
        const execTransSpy = jest.spyOn(transactionFactory,'getDefaultChannelTransaction').mockImplementationOnce(()=>{
            return {
                executeTransaction: () => { return 'Success from mock.' }
            };
        });
        const req = {};
        await ping.pingCC(req, response);
        expect(execTransSpy).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toBe(200);
        expect(jsonResponse.result).toBe('Success from mock.');
    });
});