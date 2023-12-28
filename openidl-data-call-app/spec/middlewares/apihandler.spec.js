const apihandler = require('../../server/middlewares/apihandler');
let jsonResponse;
let response;

describe('apihandler', () => {
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
    it('', ()=> {
        const req = {};
        expect(response.statusCode).toBe(0);
    });
});