//
// SPDX-License-Identifier: Apache-2.0
//
"use strict";
const chai = require('chai');
const expect = chai.expect;
const testData = require('./data/testData.json')
const simpleTestData = require('./data/simpleTestData.json')
const simpleExtractionPattern = require('./extractionPatterns/simpleExtractionPattern.json')
const MongoDBManager = require('../service/mongo-database-manager')
const ExtractionPatternProcessor = require('../service/extraction-pattern-processor')

const dbName = 'ks-test'
const collectionName = 'ks-collection'
const reductionName = 'ks-reduction'

describe('Extraction Pattern Tests', function() {
  var dbManager

  before(async function () {
    dbManager = new MongoDBManager({url:"mongodb://localhost:27017"})
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err})
    await dbManager.dropCollection(collectionName).catch((err) => { throw err })
    await dbManager.loadData(testData, dbName, collectionName)

  });
  // Test to run extraction pattern against sample data.
  describe('Test Extraction Pattern', function() {
    it('Connected', function() {
      return expect(true)
    });
    it('Has 50 records after map reduce',async function() {
      const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)
      let extractionPattern = {}
      let reduce = function reduce(key,value) {return value;}
      let map = function map() {emit( this.SequenceNum, {"sicCode": this.agrmnt.bsnssActvty[0].indstryCd})}
      extractionPattern.viewDefinition = {map: map.toString(), reduce: reduce.toString()}
      await extractionPatternProcessor.processExtractionPattern(extractionPattern)
      let records = await dbManager.getAllRecords(dbName, reductionName)
      expect(records.length).to.equal(50)
    })
  });
  //After all tests are finished drop database and close connection
  after(function(){
    dbManager.disconnect()
  });
});

describe('Simple Extraction Pattern Tests', function() {
  var dbManager

  const dbName = 'simple-db-test'
  const collectionName = 'data'
  const reductionName = 'reduced-data'
  beforeEach(async function () {
    dbManager = new MongoDBManager({url:"mongodb://localhost:27017"})
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err})
    await dbManager.dropCollection(collectionName).catch((err) => { throw err })
    await dbManager.loadData(simpleTestData, dbName, collectionName)

  });
  describe('Test Simple Extraction Pattern', function() {
    it('Connected', function() {
      return expect(true)
    });
    it('Has 3 records after map reduce',async function() {
      const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)
      let extractionPattern = {}
      let reduce = function reduce(key,values) {
        var totals = {"premium":0,"limit":0}
        for (value of values) {
          totals.premium += value.premium
          totals.limit += value.limit
        }
        return totals;
      }
      let map = function map() {
        emit( this.policy.policyNumber, {"premium": this.policy.premium, "limit":this.policy.limit})
      }
      extractionPattern.viewDefinition = {map: map.toString(), reduce: reduce.toString()}
      console.log (map.toString())
      console.log (reduce.toString())
      await extractionPatternProcessor.processExtractionPattern(extractionPattern)
      let records = await dbManager.getAllRecords(dbName, reductionName)
      expect(records.length).to.equal(3)
    })
  });
  //After all tests are finished drop database and close connection
  afterEach(function(){
    dbManager.disconnect()
  });
});

describe('Simple Extraction Pattern From JSON Tests', function() {
  var dbManager

  const dbName = 'jsonep-db-test'
  const collectionName = 'data'
  const reductionName = 'reduced-data'
  beforeEach(async function () {
    dbManager = new MongoDBManager({url:"mongodb://localhost:27017"})
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err})
    await dbManager.dropCollection(collectionName).catch((err) => { throw err })
    await dbManager.loadData(simpleTestData, dbName, collectionName)

  });
  describe('Test Simple Extraction Pattern', function() {
    it('Connected', function() {
      return expect(true)
    });
    it('Simple extraction pattern from json map reduce creates three records',async function() {
      const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)
      let extractionPattern = simpleExtractionPattern
      extractionPattern.viewDefinition = {map: extractionPattern.viewDefinition.map, reduce: extractionPattern.viewDefinition.reduce}
      await extractionPatternProcessor.processExtractionPattern(extractionPattern)
      let records = await dbManager.getAllRecords(dbName, reductionName)
      expect(records.length).to.equal(3)
    })
  });
  //After all tests are finished drop database and close connection
  afterEach(function(){
    dbManager.disconnect()
  });
});
