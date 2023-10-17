const errorhandler = require('../../server/middlewares/error-handler');

let statusCode
let jsonResponse;
const response = {
    setHeader: (key, value) => { },
    statusCode,
    status: (code) => {
        statusCode = code;
        return {
            json: (payload) => {
                jsonResponse = payload;
            },
            send: (payload) => {
                //used by loggerService
                jsonResponse = payload;
            }
        };
    },
    json: (payload) => {
        // used by metrics, when called directly then set statusCode=200
        jsonResponse = payload;
    }
};

describe("Error Handlers", () => {
    it('create error ', () => {
        const req = {};
        const next = jest.fn();
        errorhandler.catchNotFound(req, response, next);
        expect(next).toHaveBeenCalled();
    });

    describe('handleError', () => {
        it('handleError with status in error ', () => {
            const req = {};
            const next = jest.fn();
            const err = { status: 404, message: 'no resource found' }
            errorhandler.handleError(err, req, response, next);
            expect(response.statusCode).toEqual(404);
        });

        it('handleError without status in error', () => {
            const req = {};
            const next = jest.fn();
            const err = { message: 'no resource found' }
            errorhandler.handleError(err, req, response, next);
            expect(response.statusCode).toEqual(500);
        });

    });


})