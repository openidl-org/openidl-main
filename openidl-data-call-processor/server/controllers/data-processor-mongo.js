const log4js = require('log4js');
const config = require('../config/default.json');
const logger = log4js.getLogger('data-processor-Mongo');
logger.level = config.logLevel;
const sleep = require('sleep');
const sizeof = require('object-sizeof');
const openidlCommonLib = require('@openidl-org/openidl-common-lib');

let InstanceFactory = require('../middleware/instance-factory');

let emailService = openidlCommonLib.Email;
const emailkey = require('../config/default.json').send_grid_apikey;
const emailData = require('../config/email.json').Config;

// Venkat Jira 104
let pdcFailureStatus;
let S3FailureStatus;
let transferDocuments

class DataProcessorMongo {
    constructor(id, version, carrierID, exPattern, channel, reduceCollectionName) {
        logger.debug(" In DataProcessorMongo ");
        logger.debug("carrierID  " + carrierID);
        this.dataCallId = id;
        this.dataCallVersion = version;
        this.carrierId = carrierID;
        this.extractionPattern = exPattern;
        this.skip = 0;
        this.mongoRecords;
        this.pageNumber = 0;
        this.stopIteration = false;
        this.targetChannelTransaction = channel;
        this.reduceCollectionName = reduceCollectionName;
        this.start_Key = null;
        this.value = null;
        this.dbManager = null;
        this.createView = false;
    }

    async isView() {
        return this.createView;
    }
    //1. JIRA#-104
    // Fix for Jira88 & Jira 104
    async processRecords(reduceCollectionName, extractionPattern,
        premiumFromDate,
        premiumToDate,
        lossFromDate,
        lossToDate,
        lineOfBusiness,
        jurisdiction,
        datacallID,
        dataCallVersion) {
        // Venkat fix for email
        try {
            logger.info(" In processRecord: " + extractionPattern.viewDefinition);
            this.reduceCollectionName = reduceCollectionName;
            // Fix for Jira88
            await this.createMapReduceCollection(this.carrierId, reduceCollectionName, extractionPattern,
                premiumFromDate,
                premiumToDate,
                lossFromDate,
                lossToDate,
                lineOfBusiness,
                jurisdiction);

            // Fix for Jira - 104
            let distinctChunkid = await this.dbManager.findUniqueChunkID(reduceCollectionName)
            logger.info("distinctChunkid values are " + distinctChunkid)
            if (distinctChunkid.length > 0) {
                logger.info("Length condition is passed")
                let payload = await this.constructJSON(distinctChunkid, reduceCollectionName, datacallID, dataCallVersion, this.carrierId)
                let result = await this.dbManager.insertChunkID(payload)
                if (result.status == "success") {
                    logger.info('Successfully inserted chunkIDs into extract_pattern_migration collection -  ' + distinctChunkid)
                    logger.debug("  processRecrods dbManager=" + this.dbManager)
                    await this.PDCS3Buckettransfer(payload, this.dbManager, this.targetChannelTransaction);
                    logger.info("Completed.......................................")
                } else {
                    logger.error('Failed to insert the chunkIDs into extract_pattern_migration collection -  ' + distinctChunkid)
                    return false;
                }

            } else {
                logger.info("No distinct chunkId is found")
                let payload = await this.constructJSONnoChunkId(reduceCollectionName, datacallID, dataCallVersion, this.carrierId)
                let result = await this.dbManager.insertChunkID(payload)
                if (result.status == "success") {
                    logger.info('Successfully inserted chunkIDs into extract_pattern_migration collection -  ' + distinctChunkid)
                    logger.debug("  processRecrods dbManager=" + this.dbManager)
                    await this.PDCS3Buckettransfer(payload, this.dbManager, this.targetChannelTransaction);
                    logger.info("Completed.......................................")
                } else {
                    logger.error('Failed to insert the chunkIDs into extract_pattern_migration collection -  ' + distinctChunkid)
                    return false;
                }
            }

        }
        catch (ex) {
            logger.info("********************************")
            logger.info(ex)
            logger.info("********************************")
            logger.info("processRecords method error - Error 3")
            logger.info("extractionPattern.extractionPatternName is " + extractionPattern.extractionPatternName)
            logger.info('this.carrierId  ' + this.carrierId)
            await this.invokeEmail("Mapreduce", extractionPattern.extractionPatternName, ex.toString(), this.carrierId).then((data) => {
                logger.debug('Extract Pattern Email sent status is ' + data);
                return false;
            }).catch((err) => {
                logger.debug('Extract Pattern Email sent status is ' + err.toString());
                return false;
            });;
        }
    }

    // Fix for Jira - 104  --- Venkatfix
    async PDCS3Buckettransfer(jsonDocument, dbManager, target) {
        try {
            logger.debug("processedInsuranceDataNew has started with " + jsonDocument.carrierid);
            logger.debug("Sleeping for  " + config.savePDCDelay + " seconds");
            sleep.sleep(config.savePDCDelay);
            logger.debug("After sleep.....");
            let index = 0;
            pdcFailureStatus = false;
            S3FailureStatus = false;
            for (const item of jsonDocument.totalchunks) {
                transferDocuments = [];
                logger.debug("item.pdcstatus        " + item.pdcstatus)
                logger.debug("jsonDocument.collectionname        " + jsonDocument.collectionname)

                // PDC Update
                if (item.pdcstatus === "YettoProcess" || item.pdcstatus === "Failed") {
                    index++;
                    logger.info("Current Process is PDC Bucket update of Chunkid is " + item.chunkid)
                    logger.debug(" PDCS3 dbManager=" + dbManager)
                    transferDocuments = await this.getInsuranceDataNew(item.chunkid, jsonDocument.collectionname, dbManager);
                    try {
                        // PDC Service 
                        await this.saveInsuranceRecordNew(jsonDocument.carrierid, transferDocuments, index, jsonDocument.datacallid, jsonDocument.versionid, target)
                        item.pdcstatus = "Completed"
                        item.pdccomments = item.pdccomments + " Executed at - " + new Date().toISOString() + " | ";
                    } catch (ex) {
                        pdcFailureStatus = true;
                        item.pdcstatus = "Failed"
                        item.pdccomments = item.pdccomments + " Failed at  - " + new Date().toISOString() + " | ";

                        logger.error(ex)
                        logger.error("Failed to insert PDC for chunkid " + item.chunkid)
                    }
                } else {
                    logger.info("PDC transfer of ChunkID " + item.chunkid + " is already processed ")
                }



                // Update S3 Bucket
                if (item.s3status === "YettoProcess" || item.s3status === "Failed") {
                    if (item.pdcstatus === "Completed") {
                        index++;
                        logger.info("Current Process is S3 Bucket update of Chunkid is " + item.chunkid)
                        if (transferDocuments.length == 0) transferDocuments = await this.getInsuranceDataNew(item.chunkid, jsonDocument.collectionname, dbManager);
                        logger.info("this.mongorecords " + JSON.stringify(transferDocuments))
                        try {
                            // PDC Service 
                            let factoryObject = new InstanceFactory();
                            let targetObject = await factoryObject.getInstance(config.insuranceDataStorageEnv);

                            var insuranceData = new Object();
                            let id = jsonDocument.carrierid + '-' + jsonDocument.datacallid + '-' + jsonDocument.versionid + '-' + item.chunkid
                            //check whether record already exist with this '_id'
                            //then get '_rev '
                            try {
                                let revId = await targetObject.getTransactionalData(id);
                                if (revId != "error") {
                                    logger.debug('revId' + revId)
                                    insuranceData._rev = revId;
                                }
                            } catch (err) {
                                logger.debug('error during getTransactionalData onerror ' + err)
                            }
                            insuranceData._id = id;
                            insuranceData.records = transferDocuments;

                            try {
                                await targetObject.saveTransactionalData(insuranceData);
                                item.s3status = "Completed"
                                item.s3comments = item.s3comments + " Executed at - " + new Date().toISOString() + " | ";
                                logger.debug('transactional data saved for id', insuranceData._id)
                            } catch (err) {
                                S3FailureStatus = true;
                                item.s3status = "Failed"
                                item.s3comments = item.s3comments + " Failed at - " + new Date().toISOString() + " | ";
                                logger.error('failed to save transactional data for', insuranceData._id)
                                logger.error('error during saveTransactionalData onerror ' + err)
                            }

                            insuranceData = null
                            factoryObject = null

                        } catch (ex) {

                            S3FailureStatus = true;
                            item.s3status = "Failed"

                            item.s3comments = item.s3comments + " Failed at - " + new Date().toISOString() + " | ";
                            logger.error(ex)
                            logger.error("Failed to insert PDC for chunkid " + item.chunkid)
                        }
                    } else {
                        logger.debug("PDC transaction has to be taken care first before exection of S3 bucket")
                        S3FailureStatus = true;
                    }

                } else {
                    logger.info("PDC transfer of ChunkID " + item.chunkid + " is already processed ")
                }

                logger.debug("*****   PDC & S3 Status Update of Chunk -- Start *****************")
                logger.debug("Chunk ID Value    : " + item.chunkid)
                logger.debug("PDC Status        : " + item.pdcstatus)
                logger.debug("S3 Bucket Status  : " + item.s3status)
                logger.debug("*****   PDC & S3 Status Update of Chunk-- End *******************")

            }

            if ((!pdcFailureStatus) && (!S3FailureStatus)) {
                jsonDocument.overallStatus = "Completed"
            }
            else {
                jsonDocument.overallStatus = "Inprogress"
            }

            try {
                await dbManager.findAndUpdate(jsonDocument)
            } catch (ex) {
                logger.error("Failed to update PDC & S3 update into extract_pattern_migration collection failed " + ex)
            }

            //  Update Consent status into Blockchain
            if (jsonDocument.overallStatus === "Completed") {
                let payload = {
                    dataCallID: jsonDocument.datacallid,
                    dataCallVersion: jsonDocument.versionid,
                    carrierID: jsonDocument.carrierid,
                    status: "Completed"
                }
                try {
                    await target.submitTransaction('UpdateConsentStatus', JSON.stringify(payload));
                } catch (ex) {
                    logger.error("Failed to update blockchain consent status as Completed")
                    return false
                }
            }

            return true
        }
        catch (error) {
            logger.error("processRecords method error - " + error)
            throw error
        }
    }


    async constructJSONnoChunkId(collectionName, datacallid, versionid, carrierId) {
        let chunkRecords = {}
        let chunkDocuments = [];
        let extractionChunks;
        try {
                chunkRecords["chunkid"] = ""
                chunkRecords["pdcstatus"] = "YettoProcess"
                chunkRecords["pdccomments"] = ""
                chunkRecords["s3status"] = "YettoProcess"
                chunkRecords["s3comments"] = ""
                chunkDocuments.push(chunkRecords)

            extractionChunks = {
                "collectionname": collectionName,
                "datacallid": datacallid,
                "versionid": versionid,
                "carrierid": carrierId,
                "overallStatus": "Inprogress",
                "totalchunks": chunkDocuments
            }

            logger.info("extractionChunks is ************************" + JSON.stringify(extractionChunks))
        } catch (ex) {
            logger.info("constructJSON is failed " + ex)
        }

        return extractionChunks
    }


    // Fix for Jira - 104   -- Venkat fix
    async constructJSON(chunkID, collectionName, datacallid, versionid, carrierId) {
        let chunkRecords = {}
        let chunkDocuments = [];
        let extractionChunks;
        try {
            chunkID.forEach((record) => {
                logger.info("record is " + record)
                chunkRecords["chunkid"] = record
                chunkRecords["pdcstatus"] = "YettoProcess"
                chunkRecords["pdccomments"] = ""
                chunkRecords["s3status"] = "YettoProcess"
                chunkRecords["s3comments"] = ""
                chunkDocuments.push(chunkRecords)
                chunkRecords = {}
            })

            extractionChunks = {
                "collectionname": collectionName,
                "datacallid": datacallid,
                "versionid": versionid,
                "carrierid": carrierId,
                "overallStatus": "Inprogress",
                "totalchunks": chunkDocuments
            }

            logger.info("extractionChunks is ************************" + JSON.stringify(extractionChunks))
        } catch (ex) {
            logger.info("constructJSON is failed " + ex)
        }

        return extractionChunks
    }
    // Fix for Jira - 104  -- Venkat fix
    async saveInsuranceRecordNew(carrierId, records, pageNumber, datacallid, versionid, target) {
        try {
            let insuranceObject = {
                pageNumber: pageNumber,
                dataCallId: datacallid,
                dataCallVersion: versionid,
                carrierId: carrierId,
                records: records
            }
            if (insuranceObject.records.length === 0) {
                logger.info('Insurance Records not available in Mongo Database');
            } else {
                let data = JSON.stringify(insuranceObject); // Convert transient data object to JSON string
                data = new Buffer(data).toString('base64'); // convert the JSON string to base64 encoded string
                let insurance_private = {
                    "transactional-data-": data
                };
                logger.info("Transaction before PDC :- Size of the payload = " + sizeof(insuranceObject) + "START_TIME = " + new Date().toISOString() + " Number of records : " + insuranceObject.records.length + "Page Number" + pageNumber);
                await target.transientTransaction('SaveInsuranceData', insurance_private, pageNumber);
                logger.info("Transaction after PDC :- END_TIME = " + new Date().toISOString() + "DATACALL_ID :- " + insuranceObject.dataCallId + "CARRIER_ID :- " + insuranceObject.carrierId + "Page Number" + pageNumber);
            }
        } catch (ex) {
            throw ex
        }

    }


    async saveInsuranceRecord(carrierId, records, pageNumber) {
        try {
            logger.debug("Instance for extraction pattern process started for  " + carrierId + " and page number" + pageNumber);
            let insuranceObject = {
                pageNumber: pageNumber,
                dataCallId: this.dataCallId,
                dataCallVersion: this.dataCallVersion,
                carrierId: carrierId,
                records: records
            }

            if (insuranceObject.records.length === 0) {
                logger.info('Insurance Records not available in Mongo Database');
            } else {
                let data = JSON.stringify(insuranceObject); // Convert transient data object to JSON string
                data = new Buffer(data).toString('base64'); // convert the JSON string to base64 encoded string
                let insurance_private = {
                    "transactional-data-": data
                };
                logger.info("Transaction before PDC :- Size of the payload = " + sizeof(insuranceObject) + "START_TIME = " + new Date().toISOString() + " Number of records : " + insuranceObject.records.length + "Page Number" + pageNumber);
                await this.targetChannelTransaction.transientTransaction('SaveInsuranceData', insurance_private, pageNumber);
                logger.info("Transaction after PDC :- END_TIME = " + new Date().toISOString() + "DATACALL_ID :- " + insuranceObject.dataCallId + "CARRIER_ID :- " + insuranceObject.carrierId + "Page Number" + pageNumber);
            }
        } catch (ex) {
            throw ex
        }

    }

    // Fix for Jira - 104  --- Venkatfix
    async getInsuranceDataNew(chunkID, collectionName, dbManager) {
        try {
            logger.debug("In getInsuranceData");
            logger.debug(" dbManager is " + dbManager)
            let records = await dbManager.getByCarrierIdNew(chunkID, collectionName);
            return records;
        }
        catch (ex) {
            logger.info(ex)
            throw ex
        }

    }

    async getInsuranceData(skip, limit, reduceCollectionName) {
        try {
            logger.debug("In getInsuranceData");
            let records = await this.dbManager.getByCarrierId(this.carrierId, reduceCollectionName, skip, limit);
            return records;
        }
        catch (ex) {
            throw ex
        }

    }
    // Fix for Jira88
    async createMapReduceCollection(carrierId, reduceCollectionName, extractionPattern,
        premiumFromDate,
        premiumToDate,
        lossFromDate,
        lossToDate,
        lineOfBusiness,
        jurisdiction) {
        // Venkat fix for email
        try {
            logger.info("In  MapReduceCollection   " + carrierId + " START_TIME = " + new Date().toISOString());
            let DBManagerFactory = openidlCommonLib.DBManagerFactory;
            let dbManagerFactoryObject = new DBManagerFactory();
            this.dbManager = await dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
            let DBName = config.insuranceDB + "_" + carrierId;
            logger.debug("DBName>>>> " + DBName);
            // Fix for Jira88
            await this.dbManager.getViewData(carrierId, DBName, reduceCollectionName, extractionPattern,
                premiumFromDate,
                premiumToDate,
                lossFromDate,
                lossToDate,
                lineOfBusiness,
                jurisdiction);



            logger.info("Completed   MapReduceCollection   " + carrierId + " END_TIME = " + new Date().toISOString());
        } catch (error) {
            logger.info("createMapReduceCollection method error - Error 3a")
            throw error
        }

    }


    async insuranceDataIterator(carrierId, mongoRecords, reduceCollectionName) {
        // Venkat fix for email
        try {
            logger.debug('Inside insurance data iterator');
            this.pageNumber = this.pageNumber + 1;
            this.skip = this.skip + config.pageSize;
            logger.info("Sending insurance to saveInsurance function");
            this.saveInsuranceRecord(carrierId, mongoRecords, this.pageNumber);
            this.processedInsuranceData(carrierId, reduceCollectionName);
        } catch (ex) {
            throw ex
        }

    }

    async processedInsuranceData(carrierId, reduceCollectionName) {
        // Venkat Fix for email
        try {
            logger.debug("processedInsuranceData has started with " + carrierId);
            logger.debug("Sleeping for  " + config.savePDCDelay + " seconds");
            sleep.sleep(config.savePDCDelay);
            logger.debug("After sleep.....");
            if (!this.stopIteration) {
                this.mongoRecords = await this.getInsuranceData(this.skip, config.pageSize, reduceCollectionName);

                if (this.mongoRecords.length < config.pageSize) {
                    logger.info("###############      ALL RECORDS FETCHED FROM VIEW  ##########################" + this.mongoRecords.length);
                    this.stopIteration = true;
                }
                logger.debug("DB Records Fetched = " + this.mongoRecords.length + " for skip = " + this.skip + " and page size = " + config.pageSize + " **********");
                await this.insuranceDataIterator(carrierId, this.mongoRecords, reduceCollectionName);
            }
        }
        catch (error) {

            logger.info("processRecords method error - Error 3b")
            throw error
        }

    }

    async invokeEmail(servicetype, patternname, bodycontent, carrieridvalue) {
        let emailDatabyServiceType = fileterEmailData(servicetype)
        if (emailDatabyServiceType.length > 0 && emailDatabyServiceType != undefined && emailDatabyServiceType != null) {
            return new Promise(function (resolve, reject) {
                let emailSubject = emailDatabyServiceType[0].emailsubject.toString().replace("<NAME>", patternname) + " for CarrierID - " + carrieridvalue;
                emailService.sendEmail(emailkey, emailDatabyServiceType[0].fromemailaddress, emailDatabyServiceType[0].toemailaddress, emailSubject, bodycontent).then((data) => {
                    logger.debug("Extract pattern Email sent successfully")
                    logger.debug("data is " + data)
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

    async getUnprocessedChunks() {
        try {
            logger.debug("In getUnprocessedChunks");
            let records = await this.dbManager.getUnprocessedChunks();
            return records;
        }
        catch (ex) {
            throw ex
        }

    }


};

// Jira AAISPROD-14 changes
function fileterEmailData(servicetype) {
    return emailData.filter(data => data.service == servicetype)
}




module.exports = DataProcessorMongo;
