// Jira - AAISPROD-14 Changes 

const log4js = require('log4js');
const Email = {};
 
const logger = log4js.getLogger('Email');
const emailData = require("../config/email.json").Config;
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
let emailHander = openidlCommonLib.Email;
let emailAPIKey = require('../config/default.json').send_grid_apikey

Email.sendEmail = async (bodycontent,emailData) => {

    logger.debug('Entered into Nifi Sendemail - Controller');

  
        return new Promise(function (resolve, reject) {
            emailHander.sendEmail(emailAPIKey,emailData[0].fromemailaddress, emailData[0].toemailaddress,emailData[0].emailsubject,bodycontent).then((data) => {
                logger.debug('Email sent successfully');
                resolve(true);
              }).catch((err) => {
                logger.error("Fail to sent an email :" + err);
                reject(err);
              });
          });
    
}

module.exports = Email;
