// converts the input records found in csv format into a json file assumning the first record is a header
const fileProcessor = require('../openidl-mapper/FileProcessor')
const fileUtility = require('../openidl-mapper/file-utility')
const processIntoChunks = require('../openidl-mapper/ChunkProcessor').processIntoChunks
const fs = require('fs')
const csv = require('csvtojson')
const transform = require('./transforms/autoTransformer').transform
const transformRecords = require('./transforms/autoTransformer').transformRecords

let fileName = 'Auto 202012 Sample Scrubbed.csv'
let contents = fs.readFileSync(`./data/hig/${fileName}`, "utf8");
let chunkSize = 1000
let outputPath = './data/hig/split'
let fileExtension = 'csv'
let carrierId = '1235'
console.log(`Processing ${fileName}`);
fileUtility.splitRecords(contents, chunkSize, outputPath, fileExtension)

async function convert() {

    let results = []
    await csv()
        .fromFile(`./data/hig/split_1000.csv`)
        .then((jsonObj) => {
            let transformed = transformRecords(jsonObj)
            // for (record of transformed) {
            //     console.log(record)
            // }
            results = processIntoChunks(chunkSize, '1111', carrierId, jsonObj, transform)
            let contentsToWrite = JSON.stringify(results)
            fs.writeFileSync('./data/hig/split_1000.json', contentsToWrite)
        })

}

convert()
