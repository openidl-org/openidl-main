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
const ep = require('./extractionPatterns/Covid19BI_DataCall_ExtractionPattern');
const { doesNotMatch } = require('assert');
const Parser = require('json2csv')

const dbName = 'covid-report'
const collectionName = 'hds-data'
const reductionName = 'hds-report-input'

describe('Test Covid 19 Extraction Pattern against Mongo', function () {

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
    extractionPattern = manager.createExtractionPattern("COVID19BI_01", "COVID19BI_01", "COVID 19 BI Data Call Extraction Pattern", "OH", "Personal Lines", map, reduce, "0.1", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "kens@aaisonline.com")
    dbManager = new MongoDBManager({ url: "mongodb://localhost:27017" })
    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err })
  });
  describe('Run the COVID-19 Extraction Pattern', async () => {
    it('Create Extraction Pattern and save to output', async (done) => {
      const extractionPatternProcessor = new ExtractionPatternProcessor(dbManager, dbName, collectionName, reductionName)
      expect(extractionPattern).to.not.be.null;
      await extractionPatternProcessor.processExtractionPattern(extractionPattern).then(() => { console.log("Done") }).catch(done)
      console.log(extractionPattern)
      manager.writeExtractionPatternToFile(extractionPattern, 'COVID_19_BI_ExtractionPattern.json')
      done();
    });
  })
  describe('Test Export to CSV', async () => {
    it('export to csv', async () => {
      let reduced = await dbManager.getAllRecords(dbName, reductionName)
      let csv = convertToCSV(reduced)

      fs.writeFile('covid-output.csv', csv, (err) => {
        if (err) {
          console.log('Error writing csv file: ' + err)
        }
      })

      expect(reduced.length).to.equal(77644)
    })
  })
});

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