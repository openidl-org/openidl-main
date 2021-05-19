/**
 SPDX-License-Identifier: Apache-2.0
*/
const convertFlatToHDS = require('./LOBProcessor').convertFlatToHDS
const convertCSVToHDS = require('./LOBProcessor').convertCSVToHDS
const processIntoChunks = require('./ChunkProcessor').processIntoChunks
const csv = require('csvtojson')

/**
 * Process a text string with all the records in flat records delimited by line breaks.
 * @param {*} records 
 * @returns 
 */
module.exports.processTextRecords = function processRecords(records, min = 0, max = -1) {

    var linesIn = records.split("\n");

    let lines = (max > -1 ? linesIn.slice(min,max) : linesIn)

    return processIntoChunks(100, min.toString(),'9999',lines,convertFlatToHDS)

}

module.exports.processCSVRecords = async function processCSVRecords(records) {

    let results = []
    await csv()
        .fromString(records)
        .then((lines)=>{ 
            results = processIntoChunks(100,'1111','9999',lines,convertCSVToHDS)
        })
    
    return results
 
}

module.exports.countTextRecords = function countTextRecords(records) {
    var lines = records.split("\n")
    return lines.length
}

