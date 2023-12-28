/**
 * Copyright 2018 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
const dateMoment = require("moment")
const log4js = require('log4js');
const config = require('config');
const logger = log4js.getLogger('Controller - eventfunction');
const identifiers = require('../config/unique-identifiers-config.json').identifiers;
const designDocument = require('./design-document');
logger.level = config.logLevel;
const targetChannelConfig = require('../config/target-channel-config');
const networkConfig = require('../config/connection-profile.json');
const Processor = require('./processor');
const {
    Transaction
} = require('@openidl-org/openidl-common-lib');

var eventFunction = {};

eventFunction.ConsentedEvent = async function processConsentEvent(payload, blockNumber) {
    let updateConsentStatus;
    try {
        logger.info('process ConsentEvent function entry');
        if (payload) {
            logger.info("parsing db config");
            const dbconfig = JSON.parse(process.env.OFF_CHAIN_DB_CONFIG);
            logger.info("parsing payload");
            payload = JSON.parse(payload.toString('utf8'));
            logger.info(' processConsentEvent block number ==>' + blockNumber);
            let args = {
                dataCallID: payload.datacallID,
                dataCallVersion: payload.dataCallVersion,
                dbType: 'postgres'
            };
            let args2 = {
                dataCallId: payload.datacallID,
                carrierId: payload.carrierID,
                dataCallVersion: payload.dataCallVersion
            };
            let targetChannelTransaction = await eventFunction.getChannelInstance();
            let defaultChannel = await eventFunction.getDefaultChannelTransaction();

            logger.info("Before consent")

            // Fix for Jira 104 changes
            try {
                let payloadConsent = {
                    dataCallID: payload.datacallID,
                    dataCallVersion: payload.dataCallVersion,
                    carrierID: payload.carrierID,
                    status: "In-Progress"
                }

                try {
                    await targetChannelTransaction.submitTransaction('UpdateConsentStatus', JSON.stringify(payloadConsent))
                    updateConsentStatus = true;
                } catch (ex) {
                    logger.error("Error updating ")
                    updateConsentStatus = false;
                }

                if (!updateConsentStatus) {
                    logger.error("Failed to update consent status in the ledger: return false")
                    return false
                }
                else {
                    //check if insurance data already exist
                    logger.info(args);
                    let checkInsuranceData = await targetChannelTransaction.executeTransaction('CheckInsuranceDataExists', JSON.stringify(args2));
                    if (checkInsuranceData === 'false') {
                        //retrive jurisdiction and extraction pattern for the corresponding data call and replace the value of state code in extraction pattern
                        let datacallDetails = await defaultChannel.executeTransaction('GetDataCallAndExtractionPattern', JSON.stringify(args));
                        logger.info("Datacall: " + datacallDetails);
                        datacallDetails = JSON.parse(datacallDetails);

                        // Fix for Jira88
                        let dataCall
                        let jsonDatacall
                        let agr3 = {
                            ID: payload.datacallID,
                            Version: payload.dataCallVersion
                        }
                        // Fix for Jira88
                        try {
                            dataCall = await defaultChannel.executeTransaction('GetDataCallByIdAndVersion', JSON.stringify(agr3));
                            logger.info('Data call out put is ' + dataCall)
                            jsonDatacall = JSON.parse(dataCall);
                        } catch (ex) {
                            logger.error('Failed to get datacall details.');
                            return false
                        }

                        logger.info('GetDataCallAndExtractionPattern executeTransaction complete ' + datacallDetails);
                        let isSet = datacallDetails.isSet;
                        if (isSet) {
                            let extractionPattern = datacallDetails.extractionPattern;
                            logger.info(JSON.stringify(extractionPattern));
                            //pattern4 is dynamic extraction pattern that has state as parameter.
                            //if (extractionPatternID == "pattern4") {
                            let jurisdictionDesc = datacallDetails.jurisdiction;
                            logger.info("jurisdictionDesc" + jurisdictionDesc);
                            let jurisdiction = await eventFunction.fetchStateCodefromDesc(config.enumField, jurisdictionDesc);
                            logger.debug("<<<<<  In ConsentedEvent fetched State as >>>>>>" + jurisdiction);
                            extractionPattern = JSON.parse(JSON.stringify(extractionPattern).replace('#state#', jurisdiction));
                            // }
                            logger.info('Starting the dataProcessor');
                            var viewName = "";
                            let processor = new Processor();
                            logger.info("payload.carrierID: " + payload.carrierID);
                            let dataProcessor = await processor.getProcessorInstance(payload.datacallID, payload.dataCallVersion, payload.carrierID, extractionPattern, targetChannelTransaction, viewName);
                            var view = await dataProcessor.isView();
                            logger.info('payload.carrierID' + payload.carrierID);
                            if (view) {
                                let viewName = await designDocument.updateDesignDocument(extractionPattern, payload.datacallID + '_' + payload.dataCallVersion, payload.carrierID);
                                dataProcessor.processRecords(viewName);
                            } else {
                                let reduceCollectionName = payload.carrierID + '_' + payload.datacallID + '_' + payload.dataCallVersion;
                                logger.info("reduceCollectionName" + reduceCollectionName);
                                // Fix for Jira88
                                let premiumFromDate = dateMoment(jsonDatacall.premiumFromDate).format("MM/DD/YYYY")
                                let premiumToDate = dateMoment(jsonDatacall.premiumToDate).format("MM/DD/YYYY")
                                let lossFromDate = dateMoment(jsonDatacall.lossFromDate).format("MM/DD/YYYY")
                                let lossToDate = dateMoment(jsonDatacall.lossToDate).format("MM/DD/YYYY")

                                logger.info("premiumFromDate from Datacall - " + premiumFromDate)
                                logger.info("premiumToDate from Datacall - " + premiumToDate)
                                logger.info("lossFromDate from Datacall - " + lossFromDate)
                                logger.info("lossToDate  from Datacall - " + lossToDate)
                                logger.info("lineOfBusiness  from Datacall - " + jsonDatacall.lineOfBusiness)
                                logger.info("jurisdiction  from Datacall - " + jsonDatacall.jurisdiction)
                                logger.info("datacallID  from event payload - " + payload.datacallID)
                                logger.info("dataCallVersion  from event payload - " + payload.dataCallVersion)

                                dataProcessor.processRecords(reduceCollectionName, extractionPattern,
                                    premiumFromDate,
                                    premiumToDate,
                                    lossFromDate,
                                    lossToDate,
                                    jsonDatacall.lineOfBusiness,
                                    jsonDatacall.jurisdiction,
                                    payload.datacallID,
                                    payload.dataCallVersion);
                            }
                        } else {
                            logger.info('Extraction Pattern not set');
                        }
                        //}
                    }
                    else {
                        logger.info('Insurance Records is already Exist');
                    }
                }

            } catch (ex) {
                //Yet to implement email functionality
                logger.error("Error while processing request: " + ex)
            }


        }
    } catch (error) {
        logger.info('processConsentEvent submit transaction error: for block ' + blockNumber);
        logger.info(error);
        return false;
    }
    return true;
}

eventFunction.ExtractionPatternSpecified = async function processExtractionPatternSpecified(payload, blockNumber) {
    // Jira - AAISPROD-14 changes
    let processor = new Processor();
    let extractionPattern;
    try {
        logger.info('ExtractionPattern function entry');
        let targetChannelTransaction = await eventFunction.getChannelInstance();
        if (payload.toString('utf8')) {
            payload = JSON.parse(payload.toString('utf8'));
            logger.debug(' ExtractionPattern block number ==> ' + blockNumber);
            const dbconfig = JSON.parse(process.env.OFF_CHAIN_DB_CONFIG);
            let getDataCallArgs = {
                dataCallID: payload.dataCallId,
                dataCallVersion: payload.dataCallVersion,
                dbType: 'postgres'
            };
            let args = {};
            args['dataCallID'] = payload.dataCallId;
            args['dataCallVersion'] = payload.dataCallVersion;
            logger.info('args for ListConsentsByDataCall', args);
            logger.debug("payload.dataCallId" + payload.dataCallId);
            let queryResponse = await targetChannelTransaction.executeTransaction('ListConsentsByDataCall', JSON.stringify(args));
            queryResponse = JSON.parse(queryResponse);
            if (queryResponse !== null) {
                for (var i = 0; i < queryResponse.length; i++) {
                    for (var j = 0; j < identifiers.length; j++) {
                        if (identifiers[j].uniqueIdentifier === queryResponse[i].consent.carrierID) {
                            let args = {
                                dataCallId: payload.dataCallId,
                                carrierId: queryResponse[i].consent.carrierID,
                                dataCallVersion: payload.dataCallVersion
                            };
                            logger.info(args);
                            const checkInsuranceData = await targetChannelTransaction.executeTransaction('CheckInsuranceDataExists', JSON.stringify(args));
                            if (checkInsuranceData === 'false') {
                                // retrive jurisdiction for the corresponding data call and replace the value of state code in extraction pattern
                                let defaultChannel = await eventFunction.getDefaultChannelTransaction();
                                let datacallDetails = await defaultChannel.executeTransaction('GetDataCallAndExtractionPattern', JSON.stringify(getDataCallArgs));
                                datacallDetails = JSON.parse(datacallDetails);
                                logger.debug('GetDataCallAndExtractionPattern executeTransaction complete ');
                                extractionPattern = datacallDetails.extractionPattern;
                                let jurisdictionDesc = datacallDetails.jurisdiction;
                                //let jurisdictionDesc = "Virginia";
                                let jurisdiction = await eventFunction.fetchStateCodefromDesc(config.enumField, jurisdictionDesc);
                                logger.debug("<<<<<  In extraction pattern fetched State as >>>>>>" + jurisdiction);
                                extractionPattern = JSON.stringify(extractionPattern).replace('#state#', jurisdiction);
                                //}
                                logger.debug("<<<  In ExtractionPatternSpecified fetched State as >>>" + jurisdiction);
                                logger.info('Starting the dataProcessor');
                                extractionPattern = JSON.parse(extractionPattern);
                                var viewName = "";

                                logger.debug("<<<  queryResponse[i].consent.carrierID  >>>" + queryResponse[i].consent.carrierID);
                                logger.debug(payload.dataCallId);
                                let dataProcessor = await processor.getProcessorInstance(payload.dataCallId, payload.dataCallVersion, queryResponse[i].consent.carrierID, extractionPattern, targetChannelTransaction, viewName);
                                var view = await dataProcessor.isView();
                                logger.info("dataProcessor.createView" + view);
                                if (view) {
                                    let viewName = await designDocument.updateDesignDocument(extractionPattern, payload.dataCallId + '_' + payload.dataCallVersion, queryResponse[i].consent.carrierID);
                                    logger.debug("VIEW NAME" + viewName);
                                    dataProcessor.processRecords(viewName);
                                } else {
                                    let reduceCollectionName = queryResponse[i].consent.carrierID + '_' + payload.dataCallId + '_' + payload.dataCallVersion;
                                    logger.info("reduceCollectionName" + reduceCollectionName);
                                    dataProcessor.processRecords(reduceCollectionName, extractionPattern);
                                }
                            } else {
                                logger.info('Insurance Records is already Exist');
                            }
                        }
                    }
                }
            } else {
                logger.info('Datacall is not consented by the carrier');
            }
        }
    } catch (error) {
        logger.error('ExtractionPattern submit transaction error for block :  ' + blockNumber);
        logger.error(error);
    }
    return true;
}
eventFunction.getDataProcessorObject = async function getDataProcessorObject(dataCallId, dataCallVersion, carrierID, extractionPattern, targetChannelTransaction, viewName) {
    let startDataProcessor = new dataProcessor(dataCallId, dataCallVersion, carrierID, extractionPattern, targetChannelTransaction, viewName);
    return startDataProcessor;
}
eventFunction.getChannelInstance = async function getChannelInstance() {
    Transaction.initWallet(JSON.parse(process.env.KVS_CONFIG));
    let targetChannelTransaction = new Transaction(targetChannelConfig.users[0].org, targetChannelConfig.users[0].user, targetChannelConfig.targetChannels[0].channelName, targetChannelConfig.targetChannels[0].chaincodeName, targetChannelConfig.users[0].mspId);
    targetChannelTransaction.init(networkConfig);
    return targetChannelTransaction;
}

eventFunction.getDefaultChannelTransaction = async function getChannelInstance() {
    Transaction.initWallet(JSON.parse(process.env.KVS_CONFIG));
    let DefaultChannelTransaction = new Transaction(targetChannelConfig.users[0].org, targetChannelConfig.users[0].user, targetChannelConfig.targetChannels[1].channelName, targetChannelConfig.targetChannels[1].chaincodeName, targetChannelConfig.users[0].mspId);
    DefaultChannelTransaction.init(networkConfig);
    return DefaultChannelTransaction;
}

eventFunction.fetchStateCodefromDesc = async (enumList, value) => {
    logger.debug(enumList + "  " + value);
    for (var i = 0; i < enumList.length; i++) {
        if (enumList[i].desc == value) {
            return enumList[i].code;
        }
    }
}
module.exports.eventFunction = eventFunction;