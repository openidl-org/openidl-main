// SPDX-License-Identifier: Apache-2.0
const log4js = require('log4js');
const config = require('config');
const logger = log4js.getLogger('Processor');
logger.level=config.logLevel;
const IBMCloudEnv = require('ibm-cloud-env');
IBMCloudEnv.init();
const mongoDataProcessor = require('./data-processor-mongo');
const dataProcessor = require('../controllers/data-processor');
const openidlCommonLib = require('openidl-common-lib');
let DBManagerFactory = openidlCommonLib.DBManagerFactory;
let dbManagerFactoryObject = new DBManagerFactory();

// Jira AAISPROD-14 changes
let emailService = openidlCommonLib.Email;
const emailkey = require('../config/default.json').send_grid_apikey;
const emailData = require('../config/email.json').Config;


class Processor {
    constructor() {
        logger.debug("In Processor");
    }
    async getProcessorInstance(dataCallId, dataCallVersion, carrierID, extractionPattern, targetChannelTransaction, reduceCollectionName) {
        logger.info('Inside getProcessorInstance');
        let dbManager = await dbManagerFactoryObject.getInstance();
        let name = await dbManager.dbName();
        logger.debug("in getProcessorInstance Database "+name);
        logger.debug("in getProcessorInstance carrierID "+carrierID);
        if (name == "mongo") {
            logger.debug("carrierID++++++++++++++++++++++++++++++++"+carrierID);
            logger.info('Inside getProcessorInstance mongo');
            let startDataProcessor = new mongoDataProcessor(dataCallId, dataCallVersion, carrierID, extractionPattern, targetChannelTransaction, reduceCollectionName);
            return startDataProcessor;
        }
        else {
            //async getProcessorInstance(dataCallId, dataCallVersion, carrierID, extractionPattern, targetChannelTransaction, viewName) {
            var viewName = "";
            logger.info('Inside getProcessorInstance cloudant');
            let startDataProcessor = new dataProcessor(dataCallId, dataCallVersion, carrierID, extractionPattern, targetChannelTransaction, viewName);
            return startDataProcessor;
        }

    }
    // Jira AAISPROD-14 changes
    async invokeEmail (servicetype,patternname, bodycontent) {
        let emailDatabyServiceType = fileterEmailData(servicetype)
        if(emailDatabyServiceType.length > 0 && emailDatabyServiceType == undefined && emailDatabyServiceType != null) {
            return new Promise(function (resolve, reject) {
                emailService.sendEmail(emailkey,emailDatabyServiceType.fromemailaddress,emailDatabyServiceType.toemailaddress,emailDatabyServiceType.emailsubject.replace("<NAME>",patternname),bodycontent).then((data)=> {
                    logger.debug("Extract pattern Email sent successfully")
                    resolve(data);
                }).catch((err) => {
                    logger.error("Fail to sent an email :" + err);
                    reject(err);
                  });
            });
        }
        else {
            logger.debug("Email.json is not configured for Extract pattern. Please contact system admin")
            return "Fail to sent an email because email.json is not configured for mapreduce function"
        }
        
    }

}
// Jira AAISPROD-14 changes
function fileterEmailData (servicetype) {
    return emailData.filter(data => data.servicetype == servicetype)
}

module.exports = Processor;