const health = require('../../server/controllers/health');
let jsonResponse;
let response;

describe('health', () => {
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
    it('should return success response invoking getHealth()', ()=> {
        const req = {};
        health.getHealth(req, response);
        expect(response.statusCode).toBe(200);
        expect(jsonResponse.message).toBe('Server is up!');
        expect(jsonResponse.status).toBe('UP');
    });
});