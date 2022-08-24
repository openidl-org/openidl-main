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

function carYear1(coverageCode, records){
    //sum months covered

    group by policy
}

async function getCarYears(start, end, coverageCode){
    await manager.connect();

    let q1 = {$and: [{"Policy.AccountingDate": {$lt: start}},
	{"Policy.AccountingTermExpiration": {$lt:end }},{"Coverage.CoverageCode": coverageCode}]}
    
	// let q2 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$lt: start}},
    // {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$lte:end }},
    // {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$gte:start}}]}

    // let q3 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$gte: start}},
	// {"Coverages.1.CoverageRecords.AccountingDate": {$lte: end}},
	// {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$gt:end }}]}

    // let q4 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$lte: start}},
    // {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$gt:end }}]}


    //records
    console.log('Find Group One')
    let r1 = await find('policy',q1)
    console.log(r1.length)

    await manager.disconnect();
    return r1

}

let start = '2020-02-01';
let end = '2021-01-01';
let coverageCode = "1";  
let carYears = getCarYears(start,end,coverageCode)


module.exports = {getCarYears}