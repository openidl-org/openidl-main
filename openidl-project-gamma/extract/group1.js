const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');
const { syncBuiltinESMExports } = require('module');
var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
const fs = require('fs');
const util = require('util');
var help = require('../transform/helper');
const { json } = require('stream/consumers');

const dbName = conn.dbName;
//const filterPolicy = "A131 779" //big
const filterPolicy = 'A135 261'; //small
const collection = 'insurance';

async function find(collection, query) {
	let records = await manager.getRecords(dbName, collection, query);
	//console.log('records length: ' + records.length);
	return records;
}

function earnedPremium1(coverageCode, records){
	let earnedPremium = 0
	for (let record of records){
		for (let coverage of record.Coverages[coverageCode].CoverageRecords){
			//console.table(coverage)
			earnedPremium+=coverage.PremiumAmount
		}
	}
	return earnedPremium
}

async function awaitFunction(start, end, coverageCode) {
	await manager.connect();


	
	let q1 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$lt: start}},
	{"Coverages.1.CoverageRecords.AccountingTermExpiration": {$lt:end }}]}

    r1 = await find('policy',q1)
    console.log('records: '+records.length)
    fs.writeFileSync(
    '../../../con-data/coverage-1.json',
    JSON.stringify(records)
    );
	let ep1 = earnedPremium1(coverageCode,r1)
	console.log('earned premium: '+ep)

		// count = count + 1;
		// if (count == 1000) {
		// 	break;
		// }
		// console.log('\n')
	

	await manager.disconnect();
}

let start = "2020-01-15"
let end = "2020-03-01"

awaitFunction(start,end,'1')