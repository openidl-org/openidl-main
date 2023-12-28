const log4js = require('log4js');
const config = require('config');
const logger = log4js.getLogger('datacall-processor');
logger.level = config.logLevel;
const sleep = require('sleep');
const sizeof = require('object-sizeof');
const Cloudant = require('@cloudant/cloudant');

class DataProcessor {
    constructor(id, version, carrierID, exPattern, channel, viewName) {
        logger.debug("In DataProcessor");
        let DBname = config.insuranceDB + "_" + carrierID;

        const cloudant = Cloudant(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));
        this.insuranceDB = cloudant.db.use(DBname);

        this.dataCallId = id;
        this.dataCallVersion = version;
        this.carrierId = carrierID;
        this.extractionPattern = exPattern;
        this.skip = 0;
        this.cloudantRecords;
        this.pageNumber = 0;
        this.stopIteration = false;
        this.targetChannelTransaction = channel;
        this.viewName = viewName;
        this.start_Key = null;
        this.value = null;
        this.createView = true;

    }

    async processRecords(viewName) {
        this.viewName = viewName;
        this.processedInsuranceData(this.carrierId);
    }
    async isView() {
        return this.createView;
    }
    async saveInsuranceRecord(records, pageNumber) {
        logger.debug('In saveInsuranceRecord = ' + pageNumber);
        let insuranceObject = {
            pageNumber: pageNumber,
            dataCallId: this.dataCallId,
            dataCallVersion: this.dataCallVersion,
            carrierId: this.carrierId,
            records: records
        }

        if (insuranceObject.records.length === 0) {
            logger.info('Insurance Records not available in Cloudant Database');
        } else {
            let data = JSON.stringify(insuranceObject); // Convert transient data object to JSON string
            data = new Buffer(data).toString('base64'); // convert the JSON string to base64 encoded string
            let insurance_private = {
                "transactional-data-": data
            };
            logger.info("Transaction before PDC :- Size of the payload = " + sizeof(insuranceObject) + "START_TIME = " + new Date().toISOString() + " Number of records : " + insuranceObject.records.length + "  Page Number:- " + pageNumber);
            await this.targetChannelTransaction.transientTransaction('SaveInsuranceData', insurance_private, pageNumber);
            logger.info("Transaction after PDC :- END_TIME = " + new Date().toISOString() + "DATACALL_ID :- " + insuranceObject.dataCallId + "CARRIER_ID :- " + insuranceObject.carrierId + "  Page Number:- " + pageNumber);
        }
    }

    async getInsuranceData(key, limit) {
        logger.debug("<<<VIEW NAME >>>" + this.viewName)
        return new Promise((resolve, reject) => {
            this.insuranceDB.view('application', this.viewName, {
                startkey: key,
                limit: limit + 1,
                group_level: 10
            }).then((body) => {
                logger.debug('Total Records = ' + body.rows.length);
                if (body.rows.length === (limit + 1)) {
                    this.start_Key = (body.rows[limit].key);
                    this.value = (body.rows[limit].value)
                }
                resolve(body.rows);
            }).catch(function (error) {
                logger.error('getInsuranceData error', error.reason);
                reject(error);
            });
        });
    }

    async insuranceDataIterator(carrierID, cloudantRecords) {
        logger.debug('Inside insurance data iterator');
        this.pageNumber = this.pageNumber + 1;
        this.skip = this.skip + config.pageSize;
        logger.debug("Sending insurance to saveInsurance function");
        let index = config.pageSize;
        index = index - 1;
        cloudantRecords.splice(index, 1);
        logger.info("****** new cloudant records length ********");
        logger.info(cloudantRecords.length);
        this.saveInsuranceRecord(cloudantRecords, this.pageNumber);
        cloudantRecords = [];
        this.processedInsuranceData(carrierID);
    }

    async processedInsuranceData(carrierID) {
        logger.info("  processedInsuranceData has started  ");
        logger.info("Sleeping for .." + config.savePDCDelay + " seconds ");
        sleep.sleep(config.savePDCDelay);
        //console.log("After sleep.....");
        if (this.start_Key !== "completed") {
            if (this.start_Key === null) {
                logger.info("start key is null");
                this.start_Key = [carrierID];
                logger.info(" Setting key to Carrier id  " + this.start_Key);
            } else {
                logger.info("Key is " + this.start_Key);
                logger.info(this.value);
            } try {
                logger.info("Starting Cloudant Query TIME = " + new Date().toISOString() + " #############");
                this.cloudantRecords = await this.getInsuranceData(this.start_Key, config.pageSize);
                logger.info("Cloudant Query Completed  TIME = " + new Date().toISOString() + "###############");
                if (this.cloudantRecords.length < (config.pageSize + 1)) {
                    logger.info("startkey is completed.........");
                    this.start_Key = "completed";
                    logger.info("********************************************************");
                }
                await this.insuranceDataIterator(carrierID, this.cloudantRecords);
            } catch (err) {
                logger.info('Error Reason: ', err.reason);
                logger.info('This is called times');
                if (err.reason === 'The request could not be processed in a reasonable amount of time.') {
                    sleep.sleep(60);
                    await this.processedInsuranceData(carrierID);
                }
            }


        }
    }

}
module.exports = DataProcessor;