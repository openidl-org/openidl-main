const Email = require('../../server/controllers/sendemail');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const emailHander = require('../../server/middlewares/sendemail');
let emailAPIKey = require('../../server/config/default.json');

let jsonResponse;
let response;
let statusCode;

const reqBody = {
    body: { serviceType: 'mailer' }
};

jest.mock('../../server/config/default.json', () => ({
    get send_grid_apikey() {
        return 'SG.aaa'; // set some default value
    }
}));

jest.mock('../../server/config/email.json', () => ({
    get Config() {
        return [
            {
                fromemailaddress: 'yyy@ZZZ.com',
                toemailaddress: 'aaa@zzz.com',
                emailsubject: 'test mail',
                body_text: 'Hi {name}, This is a test for {service} service.',
                service: 'mailer'
            }]; // set some default value
    }
}));

describe('sendemail controller', () => {
    beforeEach(()=>{
        jsonResponse = undefined;
        statusCode = 0;
        response = {
            status: (code) => {
                statusCode = code;
                return {
                    json: (payload) => {
                        jsonResponse = payload;
                    }
                }
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should send error email.json not configured', async () => {
        const req = {
            body:{}
        };
        await Email.sendEmail(req, response);
        expect(statusCode).toBe(500);
        expect(jsonResponse.status).toBe('failure');
        expect(jsonResponse.reason).toContain('email.json is not configured.');
    });

    it('should send error since request body is missing.', async () => {
        const req = {};
        await Email.sendEmail(req, response);
        expect(statusCode).toEqual(500);
        expect(jsonResponse.status).toBe('failure');
    });

    it('send email with request body - unknown service type', async () => {
        const req = reqBody;
        await Email.sendEmail(req, response);
        expect(statusCode).toEqual(500);
        expect(jsonResponse.status).toBe('failure');
    });

    it('send email with request body -SG API key Invalid - API key  does not start with "SG."', async () => {
        const req = reqBody;
        await Email.sendEmail(req, response);
        expect(statusCode).toEqual(500);
        expect(jsonResponse.status).toBe('failure');
    });

    it('should return error since failed to send email - no email.json config ', async () => {
        let req = {
            body: { serviceType: 'mailer22' }
        };
        await Email.sendEmail(req, response);
        expect(statusCode).toEqual(500);
        expect(jsonResponse.status).toBe('failure');
    });


    it('should return error since, failed to send email due to service failure', async () => {
        const req = reqBody;
        const emailHanderSpy = jest.spyOn(emailHander, 'sendEmail').mockImplementationOnce((arg1, arg2, arg3, arg4, arg5) => {
            return Promise.reject();
        });
        await Email.sendEmail(req, response);
        expect(emailHanderSpy).toHaveBeenCalledTimes(1);
        expect(statusCode).toEqual(500);
        expect(jsonResponse.status).toBe('failure');
    });

    it('should return error since failed to send email due to other reasons', async () => {
        const req = reqBody;
        const emailHanderSpy = jest.spyOn(emailHander, 'sendEmail').mockImplementationOnce((arg1, arg2, arg3, arg4, arg5) => {
            return Promise.resolve(false);
        });
        await Email.sendEmail(req, response);
        expect(emailHanderSpy).toHaveBeenCalledTimes(1);
        expect(statusCode).toEqual(500);
        expect(jsonResponse.status).toBe('failure');
    });


    it('send email successfully', async () => {
        const req = reqBody;
        const emailHanderSpy = jest.spyOn(emailHander, 'sendEmail').mockImplementationOnce((arg1, arg2, arg3, arg4, arg5) => {
            return Promise.resolve(true);
        });
        await Email.sendEmail(req, response);
        expect(statusCode).toEqual(200);
        expect(emailHanderSpy).toHaveBeenCalledTimes(1);
        expect(jsonResponse.status).toBe('success');
        expect(jsonResponse.reason).toBe('Email sent successfully');
    });

});