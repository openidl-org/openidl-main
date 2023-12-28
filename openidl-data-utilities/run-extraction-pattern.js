const fs = require('fs')
const ExtractionPatternManager = require('../openidl-extraction-pattern-developer/service/extraction-pattern-manager')
const ExtractionPatternProcessor = require('../openidl-extraction-pattern-developer/service/extraction-pattern-processor')
const MongoDBManager = require('../openidl-extraction-pattern-developer/service/mongo-database-manager')
const config = require('./config/config.json')
const dcConfig1 = config.dataCalls.personalAutoStatsAlabama;
const dcConfig2 = config.dataCalls.allPremiumsAlabama;
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

async function processExtractionPattern(dcConfig) {

    const ep = require('./extractionPatterns/' + dcConfig.extractionPatternName);
    // let dbName = 'openidl-offchain-db'
    // let collectionName = 'insurance_trx_db_HIG'
    // let reductionName = collectionName + '_' + 'covid_19' + '_1'
    let local = true
    let dbUrl = `mongodb://${config.carrier.mongo.user}:${config.carrier.mongo.token}@localhost:28017 /openidl-offchain-db?authSource=openidl-offchain-db`
    let dbName = config.dbName
    let collectionName = config.collectionName
    let reductionName = dcConfig.reductionName
    var manager = new ExtractionPatternManager()
    var processor
    var map = ep.map
    var reduce = ep.reduce
    let metadata = ep.metadata
    var extractionPattern = manager.createExtractionPattern(metadata.id, metadata.name, metadata.description, metadata.jurisdiction, metadata.insurance, map, reduce, metadata.version, metadata.effectiveDate, metadata.expirationDate, metadata.premiumFromDate, metadata.premiumToDate, metadata.lossFromDate, metadata.lossToDate, metadata.userId)
    manager.writeExtractionPatternToFile(extractionPattern, config.extractionPatternPath + dcConfig.extractionPatternName + '.json')
    var dbManager = new MongoDBManager({ url: dbUrl })
    if (!dbManager) {
        throw 'No DB Manager'
    }
    const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)

    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err })

    await extractionPatternProcessor.processExtractionPattern(extractionPattern)
    console.log(extractionPattern)

}

let startTime, endTime;
startTime = new Date();
let commandArgs = process.argv.slice(2)

let dcConfig = config.dataCalls[commandArgs[0]]

processExtractionPattern(dcConfig).then(() => {
    console.log('Done...')
    endTime = new Date();
    let timeDiff = endTime - startTime;
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff)
    console.log(`Elapsed time: ${seconds} seconds`)
    process.exit(0)
})