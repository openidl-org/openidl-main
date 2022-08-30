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

function earnedPremium1(records){
	let earnedPremium = 0
	for (let record of records){
        //console.log('earnedPremium: '+earnedPremium+' lcl: '+record.Policy.PremiumAmount)
		earnedPremium+=record.Policy.PremiumAmount
	}
	return earnedPremium
}

function earnedPremium2(records, start){
	let earnedPremium = 0
    let isoStart = help.makeDate(start)
	for (let record of records){
			//console.table(coverage)
        //console.log('ep2')
        //console.table(record.Coverage)
        let accountingTermExp = help.makeDate(record.Policy.AccountingTermExpiration)
        let month = accountingTermExp.getMonth() - isoStart.getMonth() 
        let year = (accountingTermExp.getFullYear() - isoStart.getFullYear())*12
        let range = month + year
        let lclEp = range*record.Coverage.MonthlyPremiumAmount
        //console.log('range: '+range+' lcl ep: '+lclEp+' total ep: '+earnedPremium)
        earnedPremium+=lclEp
		}
	return earnedPremium
}


function earnedPremium3(records, end){
	let earnedPremium = 0
    let isoEnd = help.makeDate(end)
	for (let record of records){
					
        let accountingDate = help.makeDate(record.Policy.AccountingDate)
        let month = isoEnd.getMonth() - accountingDate.getMonth() 
        let year = (isoEnd.getFullYear() - accountingDate.getFullYear())*12
        let range = month + year
        let lclEp = range*record.Coverage.MonthlyPremiumAmount
        //console.log('range: '+range+' lcl ep: '+lclEp+' total ep: '+earnedPremium)
        earnedPremium+=lclEp
		
	}
	return earnedPremium
}

function earnedPremium4(records,start,end){
	let earnedPremium = 0
    let isoStart = help.makeDate(start)
    let isoEnd = help.makeDate(end)
    let month = isoEnd.getMonth() - isoStart.getMonth()
    let year = (isoEnd.getFullYear() - isoStart.getFullYear())*12
    let range = month+year
	for (let record of records){
            earnedPremium+=range*record.Coverage.MonthlyPremiumAmount
		}

	return earnedPremium
    
}
async function earnPremium(start, end, coverageCode) {
	await manager.connect();

    let transactionCode = '1'
    //queries  //needs review again, 8/24/22
	let q1 = {$and: [{"Policy.AccountingDate": {$gte: start}},
	{"Policy.AccountingTermExpiration": {$lte:end }}
    ,{"Coverage.CoverageCode": coverageCode}
    ,{"TransactionCode": transactionCode}]}
    
    let q2 = {$and: [{"Policy.AccountingDate": {$lt: start}},
	{"Policy.AccountingTermExpiration": {$lte:end }},
    {"Policy.AccountingTermExpiration": {$gt:start }}
    ,{"Coverage.CoverageCode": coverageCode}
    ,{"TransactionCode": transactionCode}]}

    let q3 = {$and: [{"Policy.AccountingDate": {$gte: start}},
	{"Policy.AccountingDate": {$lte:end }},
    {"Policy.AccountingTermExpiration": {$gt:end }}
    ,{"Coverage.CoverageCode": coverageCode}
    ,{"TransactionCode": transactionCode}]}

    let q4 = {$and: [{"Policy.AccountingDate": {$lte: start}},
    {"Policy.AccountingTermExpiration": {$gt:end }}
    ,{"Coverage.CoverageCode": coverageCode}
    ,{"TransactionCode": transactionCode}]}



    //records
    console.log('Find Group One')
    let r1 = await find('insurance',q1)
    console.log('r1 length: '+r1.length)
    console.log('Find Group Two')
    let r2 = await find('insurance',q2)
    console.log('r2 length: '+r2.length)
    console.log('Find Group Three')
    let r3 = await find('insurance',q3)
    console.log('r3 length: '+r3.length)
    console.log('Find Group Four')
    let r4 = await find('insurance',q4)
    console.log('r4 length: '+r4.length)

    let recordCount = r1.length+r2.length+r3.length+r4.length
    console.log(recordCount+' Total Records Found')

    //earned premiums
    let ep1 = earnedPremium1(r1)
    let ep2 = earnedPremium2(r2, start)
    let ep3 = earnedPremium3(r3, end)
    let ep4 = earnedPremium4(r4,start,end)
    console.log('ep:1: '+ep1+'\nep2: '+ep2+'\nep3: '+ep3+'\nep4: '+ep4)
    let lclEarnedPremium = (ep1+ep2+ep3+ ep4)
    await manager.disconnect();
    console.log('earned premium: '+lclEarnedPremium.toFixed(4))
    return lclEarnedPremium
}



let start = "2020-02-01"
let end = "2021-01-01"

earnPremium(start,end,'1')

module.exports = {earnPremium}