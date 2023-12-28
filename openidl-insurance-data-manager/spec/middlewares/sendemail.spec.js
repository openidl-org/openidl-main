const Email = require('../../server/middlewares/sendemail');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
let emailHander = openidlCommonLib.Email;




const bodycontent = `<strong>TEST</strong>`;
const emailData = [
    {
        fromemailaddress: 'yyy@ZZZ.com',
        toemailaddress: 'aaa@zzz.com', emailsubject: 'test mail',
        body_text: 'Hi {name}, This is a test for {service} service.',
        service: 'mailer'
    }];
const emailAPIKey = 'SG.aaa';


describe('send Email', () => {

    it('send email - failure to send email', async () => {

        try {
            await Email.sendEmail(bodycontent, emailData);
            // Fail test if above expression doesn't throw anything.
            expect(true).toBe(false);
        } catch (ex) {
            expect(ex.message).toBe('Unauthorized');
        }
    });


    it('send email - sent mail successfully email', async () => {

        try {
            let isSent = false;
            const emailHanderSpy = jest.spyOn(emailHander, 'sendEmail').mockImplementationOnce((arg1, arg2, arg3, arg4, arg5) => {
                isSent = true;
                return new Promise((resolve, reject) => resolve('data'));
            });
            await Email.sendEmail(bodycontent, emailData);
            expect(emailHanderSpy).toHaveBeenCalledTimes(1);
            // Fail test if above expression doesn't throw anything.
            expect(isSent).toBe(true);
        } catch (ex) {
            expect(ex.message).toBe('Unauthorized');
        }
    });
});