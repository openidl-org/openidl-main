//
// SPDX-License-Identifier: Apache-2.0
//
const fs = require('fs')
const ExtractionPatternManager = require('./service/extraction-pattern-manager')
const ExtractionPatternProcessor = require('./service/extraction-pattern-processor')
const MongoDBManager = require('./service/mongo-database-manager')

const testData = require('./test/data/BPTestData.json')
const { emit, exit } = require('process')
const dbName = 'bp-data'
const collectionName = 'bp-collection'
const reductionName = 'bp-reduction'

async function processData() {
    var manager
    var processor
    // var map = () => {emit({"companyCode":this.policy.Company.Code}, this.policy)}
    var map = () => {emit({"name":"a"}, 1)}
    var reduce = (key,values) => { return Array.sum(values)}
    var extractionPattern
    var dbManager
    manager = new ExtractionPatternManager()
    extractionPattern = manager.createExtractionPattern("KS_Test_01","KS_Test_01", "KS Test Extraction Pattern 01", "OH", "Personal Lines", map, reduce, "0.1", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "kens@aaisonline.com")
    dbManager = new MongoDBManager({url:"mongodb://localhost:27017"})
    const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err})
    // await dbManager.dropCollection(collectionName).catch((err) => { console.log(err) })
    // await dbManager.loadDataFromInsuranceDataManagerPayload(testData, dbName, collectionName)
  
    await extractionPatternProcessor.processExtractionPattern(extractionPattern)
    // let resultRecords = await dbManager.getAllRecords(dbName, reductionName)
    // console.log(resultRecords)
}
processData().then (() => {
    exit(0)
})
