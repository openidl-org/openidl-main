// SPDX-License-Identifier: Apache-2.0
const sgMail = require('@sendgrid/mail');

exports.sendEmail = async (apikey, fromaddress, toaddress, emailsubject, bodycontent) => {

    sgMail.setApiKey(apikey);
    let emailMessage = {
        to: toaddress,
        from: fromaddress,
        subject: emailsubject,
        html: bodycontent,
    };

    return sgMail
    .send(emailMessage);
}