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

function earnedPremium2(coverageCode, records, start){
	let earnedPremium = 0
    let isoStart = help.makeDate(start)
	for (let record of records){
		for (let coverage of record.Coverages[coverageCode].CoverageRecords){
			console.table(coverage)
            let accDate = help.makeDate(coverage.AccountingDate)
            let range = isoStart.getMonth() - accDate.getMonth()
            let lclEp = range*coverage.MonthlyPremiumAmount
            console.log('range: '+range+' lcl ep: '+lclEp+' total ep: '+earnedPremium)
            earnedPremium+=lclEp
		}
	}
	return earnedPremium
}

async function awaitFunction(start, end, coverageCode) {
	await manager.connect();


	
	let q2 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$lt: start}},
    {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$lte:end }},
    {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$gte:start}}]}

    let r2 = await find('policy',q2)
    console.log('records: '+records.length)
    fs.writeFileSync(
    '../../../con-data/coverage-1.json',
    JSON.stringify(records)
    );
	let ep2 = earnedPremium2(coverageCode,r2, start)
	console.log('earned premium: '+ep)

		// count = count + 1;
		// if (count == 1000) {
		// 	break;
		// }
		// console.log('\n')
	

	await manager.disconnect();
}

let start = "2020-02-01"
let end = "2021-01-01"

awaitFunction(start,end,'1')