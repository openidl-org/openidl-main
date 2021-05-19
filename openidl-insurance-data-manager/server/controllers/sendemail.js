/**
 SPDX-License-Identifier: Apache-2.0
*/
// Jira - AAISPROD-14 Changes 

const log4js = require('log4js');
const Email = {};
const emailHander = require('../middlewares/sendemail');
const logger = log4js.getLogger('Email');
const emailData = require('../config/email.json').Config;

Email.sendEmail = async (req, res) => {

    logger.debug('Entered into Nifi Sendemail - Controller');

    try {
        let emailDatabyServiceType = await fileterEmailData(req.body.serviceType)
        if (emailDatabyServiceType.length > 0 && emailDatabyServiceType != null && emailDatabyServiceType != undefined) {
            await emailHander.sendEmail(req.body.bodycontent, emailDatabyServiceType).then((emailSent) => {
                if (emailSent) {
                    logger.debug('Email sent successfully');
                    res.status(200).json({ "status": "success", "reason": "Email sent successfully" });
                } else {
                    logger.debug('Fail to sent email');
                    res.status(500).json({ "status": "failure", "reason": "Fail to sent an email" });
                }
            }).catch((error) => {
                logger.error(error);
                res.status(500).json({ "status": "failure", "reason": error });
            })
        }
        else {
            logger.error("email.json is not configured. Please contact system admin");
            res.status(500).json({ "status": "failure", "reason": "email.json is not configured. Please contact system admin" });
        }
    } catch (err) {
        logger.error(err);
        res.status(500).json({ "status": "failure", "reason": err });
    }
}


function fileterEmailData(servicetype) {
    return emailData.filter(data => data.service == servicetype)
}

module.exports = Email;