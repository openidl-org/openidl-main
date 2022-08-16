const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
const fs = require('fs');
const util = require('util');
var help = require('../transform/helper');
const dbName = conn.dbName;

async function find(collection, query) {
	let records = await manager.getRecords(dbName, collection, query);
	//console.log('records length: ' + records.length);
	return records;
}



async function getIncurredCount(start, end, coverageCode){

    let q1 = {
		$and: [
			{ 'TransactionCode': {$in: ['2','3','6','7']} },
            { 'Coverage.CoverageCode': coverageCode },
			{ 'Claim.AccidentDate': { $gte: start } },
			{ 'Claim.AccidentDate': { $lte: end } }
		]
	};

    await manager.connect();
    let rawLoss = await find('insurance', q1)
    //console.log(rawLoss)
    console.log('rawLoss size: '+rawLoss.length)
    await manager.disconnect();

    //data object to hold unique ids
    let uniqueRecords = new Set()

    //fill set
    for (let key in rawLoss){
        let record = rawLoss[key]
        uniqueRecords.add(record.Claim.OccurrenceIdentifier)
        
    }
    const uniqueCount = uniqueRecords.size
    console.log('unique occurrences: '+uniqueCount+' start: '+start+' end: '+end)    
    return uniqueCount
}

let start = '2020-02-01';
let end = '2021-01-01';
let coverageCode = "1";  

getIncurredCount(start, end, coverageCode);

