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
function getRange2(isoStart, accountingTermExp){
    //accExp accountEx
    let month = accountingTermExp.getMonth() - isoStart.getMonth() 
    let year = (accountingTermExp.getFullYear() - isoStart.getFullYear())*12
    let range = month + year
    return range
}

function getRange3(isoEnd, accountingDate){
    //accExp accountEx
    let month = isoEnd.getMonth() - accountingDate.getMonth() 
    let year = (isoEnd.getFullYear() - accountingDate.getFullYear())*12
    let range = month + year
    return range
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

function earnedPremium2(coverageCode, records, start){
	let earnedPremium = 0
    let isoStart = help.makeDate(start)
	for (let record of records){
		for (let coverage of record.Coverages[coverageCode].CoverageRecords){
			//console.table(coverage)
            let accountingDateExp = help.makeDate(coverage.AccountingTermExpiration)
            let range = getRange2(isoStart, accountingDateExp )
            let lclEp = range*coverage.MonthlyPremiumAmount
            //console.log('range: '+range+' lcl ep: '+lclEp+' total ep: '+earnedPremium)
            earnedPremium+=lclEp
		}
	}
	return earnedPremium
}

function earnedPremium3(coverageCode, records, end){
	let earnedPremium = 0
    let isoEnd = help.makeDate(end)
	for (let record of records){
		for (let coverage of record.Coverages[coverageCode].CoverageRecords){
			//console.table(coverage)
            let accountingDate = help.makeDate(coverage.AccountingDate)
            let range = getRange3(isoEnd,accountingDate)
            let lclEp = range*coverage.MonthlyPremiumAmount
            //console.log('range: '+range+' lcl ep: '+lclEp+' total ep: '+earnedPremium)
            earnedPremium+=lclEp
		}
	}
	return earnedPremium
}

function earnedPremium4(coverageCode, records){
	let earnedPremium = 0
	for (let record of records){
		for (let coverage of record.Coverages[coverageCode].CoverageRecords){
			//console.table(coverage)
            let accountingDate = help.makeDate(coverage.AccountingDate)
            let AccountingTermExpiration = help.makeDate(coverage.AccountingTermExpiration)

            let month = AccountingTermExpiration.getMonth() - accountingDate.getMonth() 
            let year = (AccountingTermExpiration.getFullYear() - accountingDate.getFullYear())*12
            let range = month + year

            let lclEp = range*coverage.MonthlyPremiumAmount
            //console.log('range: '+range+' lcl ep: '+lclEp+' total ep: '+earnedPremium)
            earnedPremium+=lclEp
		}
	}
	return earnedPremium

}


async function earnPremium(start, end, coverageCode) {
	await manager.connect();

    //queries
	let q1 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$lt: start}},
	{"Coverages.1.CoverageRecords.AccountingTermExpiration": {$lt:end }}]}
    
	let q2 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$lt: start}},
    {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$lte:end }},
    {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$gte:start}}]}

    let q3 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$gte: start}},
	{"Coverages.1.CoverageRecords.AccountingDate": {$lte: end}},
	{"Coverages.1.CoverageRecords.AccountingTermExpiration": {$gt:end }}]}

    let q4 = {$and: [{"Coverages.1.CoverageRecords.AccountingDate": {$lte: start}},
    {"Coverages.1.CoverageRecords.AccountingTermExpiration": {$gt:end }}]}



    //records
    console.log('Find Group One')
    let r1 = await find('policy',q1)
    console.log('Find Group Two')
    let r2 = await find('policy',q2)
    console.log('Find Group Three')
    let r3 = await find('policy',q3)
    console.log('Find Group Four')
    let r4 = await find('policy',q4)

    let recordCount = r1.length+r2.length+r3.length+r4.length
    console.log(recordCount+' Total Records Found')

    //earned premiums
    let ep1 = earnedPremium1(coverageCode,r1)
    let ep2 = earnedPremium2(coverageCode,r2, start)
    let ep3 = earnedPremium3(coverageCode,r3, end)
    let ep4 = earnedPremium4(coverageCode, r4)
    let lclEarnedPremium = ep1+ep2+ep3+ ep4
    await manager.disconnect();
    console.log('earned premium: '+lclEarnedPremium.toFixed(4))
    return lclEarnedPremium
}


// let start = "2020-02-01"
// let end = "2021-01-01"

// earnPremium(start,end,'1')

module.exports = {earnPremium}