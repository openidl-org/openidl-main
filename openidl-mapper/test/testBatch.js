/**
 SPDX-License-Identifier: Apache-2.0
*/
const chai = require('chai');
const expect = require('chai').expect;
const dataFileName = 'test/data/BatchDataInput.txt'
const expected = require('./data/BatchDataExpected.json')
const processTextRecords = require('../FileProcessor').processTextRecords
const deepEqual = require('deep-equal')
const jsonDiff = require('json-diff')

var fs = require('fs');

describe('Testing A Batch of Records', () => {

    it('all records should deepe equal', () => {

        var contents = fs.readFileSync(dataFileName, 'utf8');
        var chunkdedResults = processTextRecords(contents)
        let results = []
        for (let result of chunkdedResults) {
            for (let record of result.records) {
                // record.batchId = "1111"
                // record.chunkId = "1111111"
                // record.carrierId = "9999"
                // record.policyNo = "1111111"
                // record.errFlg = false
                // record.errrLst = []
                // record.SquenceNum = "0"
                delete record.coverageLevel
    
                results.push(record)
            }
        }
        fs.writeFile('outputOfCompare.json', JSON.stringify(results), (err) => {
            if (err) {
                console.log('Error writing file: ' + err)
            }
        })
        let i = 0
        let equals = deepEqual(expected, results)
        if (!equals) {
            for (let result of results) {
                console.log(jsonDiff.diff(expected[i],results[i]))
            }
            i++
        }
        expect(equals).to.be.true
    });

});

