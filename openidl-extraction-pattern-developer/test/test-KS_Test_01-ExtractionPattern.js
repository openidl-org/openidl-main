//
// SPDX-License-Identifier: Apache-2.0
//
"use strict";
const fs = require('fs')
const ExtractionPatternManager = require('../service/extraction-pattern-manager')
const ExtractionPatternProcessor = require('../service/extraction-pattern-processor')
const MongoDBManager = require('../service/mongo-database-manager')
const chai = require('chai');
const expect = chai.expect;
const ep = require('./extractionPatterns/KS_Test_01_ExtractionPattern')

const testData = require('./data/sampleTestData.json')
const dbName = 'ks-test-01'
const collectionName = 'ks-collection'
const reductionName = 'ks-reduction'

describe('XX KS Test 01 Extracton Pattern Tests', function() {

  var manager
  var processor
  var map
  var reduce
  var extractionPattern
  var dbManager
  before(async () => {
    manager = new ExtractionPatternManager()
    map = ep.map
    reduce = ep.reduce
    extractionPattern = manager.createExtractionPattern("KS_Test_01","KS_Test_01", "KS Test Extraction Pattern 01", "OH", "Personal Lines", map, reduce, "0.1", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "kens@aaisonline.com")
    dbManager = new MongoDBManager({url:"mongodb://localhost:27017"})
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err})
    await dbManager.dropCollection(collectionName).catch((err) => { throw err })
    await dbManager.loadData(testData, dbName, collectionName)
 
  });
  describe('Run the Extraction Pattern', () => {
    it('Create Extraction Pattern and save to output', async () => {
      const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)
      expect(extractionPattern).to.not.be.null;
      await extractionPatternProcessor.processExtractionPattern(extractionPattern)
      let records = await dbManager.getAllRecords(dbName, reductionName)
      expect(records.length).to.equal(10)
      console.log(extractionPattern)
      manager.writeExtractionPatternToFile(extractionPattern,'KS_Test_01_ExtractionPattern.json')
    });
  })
});