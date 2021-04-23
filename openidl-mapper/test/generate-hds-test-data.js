/**
 SPDX-License-Identifier: Apache-2.0
*/
// const dataFileNames = ['data/BPPremData.txt','data/BPLossData.txt','data/CPLossData.txt','data/CPPremData.txt','data/IMLossData.txt','data/IMPremData.txt']
const dataFolder = 'test/data/'
const fileProcessor = require('../FileProcessor')
const fs = require('fs');
const { exit } = require('process');
const { convertRecordToFlatJson } = require('../HDSProcessor');

let allResults = []

let dataFileNames = fs.readdirSync(dataFolder)

// Load all the data from the test files
for (let dataFileName of dataFileNames) {
    // console.log(`Processing ${dataFileName}`)
    // let contents = fs.readFileSync(dataFolder + dataFileName, 'utf8');
    // let results = fileProcessor.processTextRecords(contents, 1000)
    // for (let result of results) {
    //     for (let record of result.records) {
    //         record.batchId = "1111"
    //         record.chunkId = "1111111"
    //         record.carrierId = "9999"
    //         record.policyNo = "1111111"
    //         record.errFlg = false
    //         record.errrLst = []
    //         record.SquenceNum = "0"

    //         allResults.push(record)
    //     }
    // }
}


// write the results
fs.writeFile('testCovidDataSDMA.json', JSON.stringify(allResults), (err) => {
    if (err) {
        console.log('Error writing output file')
        exit(1)
    }
})

