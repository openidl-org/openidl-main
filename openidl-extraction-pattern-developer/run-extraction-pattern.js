const fs = require('fs')
const ExtractionPatternManager = require('./service/extraction-pattern-manager')
const ExtractionPatternProcessor = require('./service/extraction-pattern-processor')
const MongoDBManager = require('./service/mongo-database-manager')
const ep = require('./test/extractionPatterns/ND_VIN_ExtractionPattern_01');
const Parser = require('json2csv')
const config = require('./config/config.json')

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
    // let dbUrl = 'mongodb://localhost:27018'
    let dbUrl = config.dbURL
    // let dbName = 'extraction-test'
    let dbName = config.dbName
    let carrierNames = ['trvi','car1','car2']
    var manager = new ExtractionPatternManager()
    var map = ep.map
    var reduce = ep.reduce
    var extractionPattern = manager.createExtractionPattern(config.extractionPattern.id, config.extractionPattern.name, config.extractionPattern.description, config.extractionPattern.jurisdiction, config.extractionPattern.insurance, map, reduce, config.extractionPattern.version, config.extractionPattern.effectiveDate, config.extractionPattern.expirationDate, config.extractionPattern.premiumFromDate, config.extractionPattern.premiumToDate, config.extractionPattern.lossFromDate, config.extractionPattern.lossToDate, config.extractionPattern.userId)
    var processor
    var dbManager = new MongoDBManager({ url: dbUrl })
    if (!dbManager) {
        throw 'No DB Manager'
    }
    
    for (carrierName of carrierNames) {

        let carrierConfig = config[carrierName]
        const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, carrierConfig.dbName, carrierConfig.collectionName, carrierConfig.reductionName)

        await dbManager.connect()
        await dbManager.useDatabase(dbName).catch((err) => { throw err })

        await extractionPatternProcessor.processExtractionPattern(extractionPattern)
    }
    manager.writeExtractionPatternToFile(extractionPattern, 'ND_VIN_ExtractionPattern_01.json')

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