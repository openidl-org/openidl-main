const log4js = require('log4js');
const config = require('config');
const logger = log4js.getLogger('schedular');
logger.level = config.logLevel;

const openidlCommonLib = require('@openidl-org/openidl-common-lib');
let DBManagerFactory = openidlCommonLib.DBManagerFactory;
let dbManagerFactoryObject = new DBManagerFactory();
const networkConfig = require('../config/connection-profile.json');
const Processor = require('../controllers/processor')
const targetChannelConfig = require('../config/target-channel-config.json');
const {
    Transaction
} = require('@openidl-org/openidl-common-lib');


async function getChannelInstance() {
    Transaction.initWallet(JSON.parse(process.env.KVS_CONFIG));
    let targetChannelTransaction = new Transaction(targetChannelConfig.users[0].org, targetChannelConfig.users[0].user, targetChannelConfig.targetChannels[0].channelName, targetChannelConfig.targetChannels[0].chaincodeName, targetChannelConfig.users[0].mspId);
    targetChannelTransaction.init(networkConfig);
    return targetChannelTransaction;
}






exports.syncData = async () => {

    let dbManager = await dbManagerFactoryObject.getInstance(JSON.parse(process.env.OFF_CHAIN_DB_CONFIG));

    let documents = await dbManager.getUnprocessedChunks();
    let processor = new Processor();
    let dataProcessor = await processor.getProcessorInstance(
        null,
        null,
        null,
        null,
        null,
        null
    );

    let targetChannel = await getChannelInstance();


    if (documents != null) {
        documents.forEach(async function (element) {
            await dataProcessor.PDCS3Buckettransfer(element, dbManager, targetChannel).then(() => {

            }).catch(() => {
                logger.info("Schedular job is failed")
            })
        });




    } else {
        logger.info("No documents are pending")
    }

}