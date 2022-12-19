const aws = require('aws-sdk');
const config = require('config');
const logger = require('loglevel');
logger.setLevel(config.get('loglevel'));
const datacallConfig = require('./config/datacall-config.json');
const s3Config = require('./config/s3-bucket-config.json');
const ReportProcessor = require('./reportProcessor');
const getDataCall = require('./dataCallCRUD').getDatacall;
const postReport = require('./dataCallCRUD').postReport;
const getDMVData = require('./dataCallCRUD').getDMVData;

exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    };
    try {
        logger.debug("bucket name: ", bucket)
        logger.debug("key name: ", key)
        const datacallId = key.substring(key.indexOf("-")+1, key.length);
        logger.debug("Datacall Id: ", datacallId);
        const getDatacallResult = await getDataCall(datacallId);
        const datacalls = JSON.parse(getDatacallResult.result);
        const datacall = datacalls[0];
        const transactionMonth = datacall.transactionMonth;
        logger.debug("Datacall fetched from Blockchain with id: ", datacallId)
        logger.debug("datacall is: ", JSON.stringify(datacall, null, 2))
        const rp = new ReportProcessor;
        const resultData = await rp.readResult(params);
        logger.debug("Result data length is: ", (resultData.length))
        if (!resultData) {
            throw new Error("Result dataset Empty!");
        }
        const dmvData = await getDMVData(config.get("DMVOrganizationId"), transactionMonth);
        if (!dmvData || !dmvData.result || dmvData.result.length === 0) {
            throw new Error("DMV Dataset Empty!");
        }
        logger.debug("Data reading Done from DMV data and result")
        const reportContent = await rp.createReportContent(resultData, JSON.parse(JSON.stringify (dmvData.result)));
        logger.debug("Publishing report")
        await rp.publishCSV(reportContent, datacallId);
        await rp.getCSV("report-" + datacallId + ".csv");
        const reportUrl = "" + s3Config.urlPrefix + s3Config.bucketName + "/report-" + datacallId + ".csv";
        logger.debug("reportUrl is: ", JSON.stringify(reportUrl, null, 2))
        const report = {
            "datacallID": datacallId,
            "dataCallVersion": datacall.version,
            "hash": "examplehash123",
            "url": reportUrl,
            "createdTs": new Date().toISOString(),
            "createdBy": datacallConfig.username
            }; 
        await postReport(JSON.stringify(report));
        logger.info("Report published in CSV and Blockchain updated")
        // Delete result and extraction-pattern-result data
        await rp.deleteResult(params);
        await rp.deleteConsentFiles(params, datacallId);
        return ;
    } catch (err) {
        logger.error("Error in report processor!", err)
        throw new Error(err);
    }
};
