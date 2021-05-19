//
// SPDX-License-Identifier: Apache-2.0
//
"use strict";
const chai = require('chai');
const expect = chai.expect;
const testData = require('./data/testData.json')
const MongoDBManager = require('../service/mongo-database-manager')

const dbName = 'x-test'
const collectionName = 'x-collection'

describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  var dbManager

  before(async function () {
    dbManager = new MongoDBManager({url:"mongodb://localhost:27017"})
    await dbManager.connect()
    await dbManager.useDatabase(dbName)
    await dbManager.dropCollection(collectionName)
    await dbManager.loadData(testData, dbName, collectionName)

  });
  describe('Test Database', function() {
    it('Connected', function() {
      return expect(true)
    });
    it('Get Records', async function() {
      var records = await dbManager.getAllRecords(dbName,collectionName)
      expect(records.length).to.equal(50)
    })
    it('Have 25 rows with sic code 5651', async function() {
      let query = {"agrmnt.bsnssActvty.indstryCd": "5651"}
      var records = await dbManager.getRecords(dbName, collectionName, query)
      expect(records.length).to.equal(25)
    });
    it('Has 50 records after map reduce',async function() {
      let reduce = function reduce(key,value) {return value;}
      let map = function map() {emit( this.SequenceNum, {"sicCode": this.agrmnt.bsnssActvty[0].indstryCd})}
      await dbManager.mapReduce(dbName, collectionName, 'industry-codes', map, reduce)
      let records = await dbManager.getAllRecords(dbName, 'industry-codes')
      expect(records.length).to.equal(50)
    })
  });
  //After all tests are finished drop database and close connection
  after(function(){
    dbManager.disconnect()
  });
});