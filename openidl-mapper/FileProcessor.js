const convertFlatToHDS = require('./LOBProcessor').convertFlatToHDS
const convertCSVToHDS = require('./LOBProcessor').convertCSVToHDS
const processIntoChunks = require('./ChunkProcessor').processIntoChunks
const csv = require('csvtojson')

/**
 * Process a text string with all the records in flat records delimited by line breaks.
 * @param {*} records 
 * @returns 
 */
module.exports.processTextRecords = function processRecords(records) {

    var lines = records.split("\n");

    return processIntoChunks(100,'1111','9999',lines,convertFlatToHDS)

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

