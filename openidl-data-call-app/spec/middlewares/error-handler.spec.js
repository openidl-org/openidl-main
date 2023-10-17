const errorHandler = require('../../server/middlewares/error-handler');

describe('errorHandler', () => {
    it('should return handleError payload', ()=> {
        let jsonResponse;
        const err = {
            status: 311,
            message: 'UNAUTHORIZED'
        };
        const res = {
            statusCode:0,
            setHeader: () => {},
            json: (payload) => {
                jsonResponse = payload;
            }
        }; 
        errorHandler.handleError(err, {}, res, ()=>{});
        expect(res.statusCode).toBe(311);
        expect(jsonResponse).toEqual({success:false, message:'UNAUTHORIZED'});
    });
    it('should return 404: Page not found', ()=>{
        const nextSpy = jest.fn();
        errorHandler.catchNotFound({},{},nextSpy);
        expect(nextSpy).toHaveBeenCalledTimes(1);
    })
});