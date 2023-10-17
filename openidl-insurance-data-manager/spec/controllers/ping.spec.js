const ping = require('../../server/controllers/ping');
const transactionFactory = require('../../server/helpers/transaction-factory');
let jsonResponse;
let response;

describe('ping route', () => {
    beforeEach(() => {
        jsonResponse = undefined;
        response = {
            setHeader: (key, value) => { },
            statusCode: 0,
            json: (payload) => {
                jsonResponse = payload;
            }
        };
    });

    it('should throw error on ping', () => {
        const req = {};
        ping.pingCC(req, response);
        expect(response.statusCode).toBe(500);
        expect(jsonResponse.success).toBe(false);
    });

    it('should successfully ping', async () => {
        let key;
        const executeTransSpy = jest.spyOn(transactionFactory, 'getCarrierChannelTransaction').mockImplementationOnce(() => {
            return {
                executeTransaction: (arg1) => {
                    key = arg1;
                    return 'OK';
                }
            };
        });
        const req = {
            body: {}
        };
        await ping.pingCC(req, response);
        expect(executeTransSpy).toHaveBeenCalledTimes(1);
        expect(key).toBe('Ping');
        expect(response.statusCode).toBe(200);
        expect(jsonResponse.success).toBe(true);
        expect(jsonResponse.result).toBe('OK');
    });
});