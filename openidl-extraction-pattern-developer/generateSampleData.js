//
// SPDX-License-Identifier: Apache-2.0
//
const fs = require('fs')
const processTextRecords = require('openidl-mapper/FileProcessor').processTextRecords


let inputFileName = 'test/data/BPPremData1000.txt'
let outputFileName = 'testData.json'
let missingParams = false
if (process.argv[2]) {
    // we have an input file name
    inputFileName = process.argv[2]
} else {
    missingParams = true
}
if (process.argv[3]) {
    outputFileName = process.argv[3]
} else {
    missingParams = true
}

if (missingParams) {
    console.log("Usage: please provide two parameters, input file and output file")
    exit(1)
}

console.log("generate from: " + inputFileName + " to: " + outputFileName)
var contents = fs.readFileSync(inputFileName, 'utf8');
var results = processTextRecords(contents)
fs.writeFile(outputFileName, JSON.stringify(results), (err) => {
    if (err) {
        console.log(err)
    }
})
