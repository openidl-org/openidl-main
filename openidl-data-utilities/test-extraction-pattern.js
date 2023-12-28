// this module tests and existing extraction pattern in it's json format
// use it to test extraction patterns downloaded from the UI

const fs = require('fs')
const ExtractionPatternManager = require('../openidl-extraction-pattern-developer/service/extraction-pattern-manager')
const ExtractionPatternProcessor = require('../openidl-extraction-pattern-developer/service/extraction-pattern-processor')
const MongoDBManager = require('../openidl-extraction-pattern-developer/service/mongo-database-manager')
// const ep = require('./extractionPatterns/PA_Statistical_Reporting_ExtractionPattern');
const Parser = require('json2csv')
const config = require('./config/config.json')

let ep = JSON.parse(fs.readFileSync(config.extractionPatternPath + config.extractonPatternName + '.json'))
let map = new Function(extractCode(ep.viewDefinition.map))
let reduce = new Function('key', 'value', extractCode(ep.viewDefinition.reduce))

function extractCode(functionString) {
    let resultString = functionString.substring(functionString.indexOf('{') + 1).trim() // remove open '{'
    return resultString.substring(0, resultString.length - 1) // remove end '}'
}

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
    let dbUrl = `mongodb://${config.carrier.mongo.user}:${config.carrier.mongo.token}@localhost:28017 /openidl-offchain-db?authSource=openidl-offchain-db`
    let dbName = config.dbName
    let collectionName = config.collectionName
    let reductionName = config.reductionName
    var manager = new ExtractionPatternManager()
    // var extractionPattern = manager.createExtractionPattern(ep.extractionPatternID, ep.extractionPatternName, ep.description, ep.jurisdiction, ep.insurance, map, reduce, ep.version, ep.effectiveStartTs, ep.effectiveEndTs, ep.premiumFromDate, ep.premiumToDate, ep.lossFromDate, ep.lossToDate, ep.updatedBy)
    var dbManager = new MongoDBManager({ url: dbUrl })
    if (!dbManager) {
        throw 'No DB Manager'
    }
    const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)

    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err })

    await extractionPatternProcessor.processExtractionPattern(ep)
    console.log(ep)
    // manager.writeExtractionPatternToFile(extractionPattern, 'Trivial01_ExtractionPattern.json')

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

// console.log(extractCode("function map() {\n    let key = this.zipCode\n    var result = {\n        \"key\": { \"zipcode\": key },\n        \"value\": {\n            \"premium\": this.premium.amount ? parseFloat(this.premium.amount) : 0,\n            \"carrierId\": this.carrierId\n        }\n    }\n    emit(\n        result.key, result.value,\n    )\n}"))