const fs = require('fs')
const ExtractionPatternManager = require('./service/extraction-pattern-manager')
const ExtractionPatternProcessor = require('./service/extraction-pattern-processor')
const MongoDBManager = require('./service/mongo-database-manager')
const ep = require('./test/extractionPatterns/Covid19BI_DataCall_ExtractionPattern');
const Parser = require('json2csv')

function convertToCSV(json) {
    let rows = []
    for (let item of json) {
        let row = {}
        for (let field in item['_id']) {
            row[field] = item['_id'][field]
        }
        for (let field in item.value) {
            row[field] = item.value[field]
        }
        rows.push(row)
    }
    const fields = Object.keys(rows[0])
    const opts = { fields }

    let csv = null
    try {
        const parser = new Parser.Parser(opts)
        csv = parser.parse(rows)
    } catch (err) {
        console.error(err);
    }
    return csv
}

async function processExtractionPattern() {

    // let dbName = 'openidl-offchain-db'
    // let collectionName = 'insurance_trx_db_HIG'
    // let reductionName = collectionName + '_' + 'covid_19' + '_1'
    let local = true
    let dbUrl = local ? 'mongodb://localhost:27017' : 'mongodb://ibm_cloud_1fa04e1e_2f84_4dd1_80f7_799e0c8ab459:1a79f07de823b50b3ce44f6b543fa0b4f28f9bf9caba3e184acf36d9e29de2c6@f8225b83-0a41-4d73-bb9f-0b471ce6a3cb-0.btdkfu0w0p0vutjk0r9g.databases.appdomain.cloud:31377,f8225b83-0a41-4d73-bb9f-0b471ce6a3cb-1.btdkfu0w0p0vutjk0r9g.databases.appdomain.cloud:31377,f8225b83-0a41-4d73-bb9f-0b471ce6a3cb-2.btdkfu0w0p0vutjk0r9g.databases.appdomain.cloud:31377/ibmclouddb?authSource=admin&replicaSet=replset'
    let dbName = 'openidl-offchain-db-ppp-any-nr'
    let collectionName = 'insurance_trx_db_ANY'
    let reductionName = 'any_covid_data_all'
    var manager = new ExtractionPatternManager()
    var processor
    var map = ep.map
    var reduce = ep.reduce
    var extractionPattern = manager.createExtractionPattern("COVID19BI_06", "COVID19BI_06", "COVID 19 BI Data Call Extraction Pattern", "AL", "Commercial Lines", map, reduce, "0.1", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "kens@aaisonline.com")
    var dbManager = new MongoDBManager({ url: dbUrl })
    if (!dbManager) {
        throw 'No DB Manager'
    }
    console.log(typeof dbManager)
    const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)

    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err })

    await extractionPatternProcessor.processExtractionPattern(extractionPattern)
    console.log(extractionPattern)
    manager.writeExtractionPatternToFile(extractionPattern, 'COVID_19_BI_ExtractionPattern_06.json')

}

let startTime, endTime;
startTime = new Date();

processExtractionPattern().then(() => {
    console.log('Done...')
    endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff)
    console.log(`Elapsed time: ${seconds} seconds`)
    process.exit(0)
})