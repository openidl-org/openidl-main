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

function earnedPremiumThree(coverageCode, records, end){
	let earnedPremium = 0
    let isoEnd = help.makeDate(end)
	for (let record of records){
		for (let coverage of record.Coverages[coverageCode].CoverageRecords){
			console.table(coverage)
            let accExp = help.makeDate(coverage.AccountingTermExpiration)
            let range = accExp.getMonth() - isoEnd.getMonth() 
            let lclEp = range*coverage.MonthlyPremiumAmount
            console.log('range: '+range+' lcl ep: '+lclEp+' total ep: '+earnedPremium)
            earnedPremium+=lclEp
		}
	}
	return earnedPremium
}

async function awaitFunction(start, end, coverageCode) {
	await manager.connect();	
	let q1 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$gte: start}},
	{"Coverages.1.CoverageRecords.AccountingDate": {$lte: end}},
	{"Coverages.1.CoverageRecords.AccountingTermExpiration": {$gt:end }}]}

    records = await find('policy',q1)
    console.log('records: '+records.length)
    fs.writeFileSync(
    '../../../con-data/coverage-1.json',
    JSON.stringify(records)
    );
	let ep = earnedPremium3(coverageCode,records, end)
	console.log('earned premium: '+ep)

	await manager.disconnect();
}

let start = "2020-02-01"
let end = "2021-01-01"

awaitFunction(start,end,'1')