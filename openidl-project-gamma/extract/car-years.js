const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');

const fs = require('fs');
const util = require('util');
var help = require('../transform/helper');
const dbName = conn.dbName;

async function find(collection, query,manager) {
	let records = await manager.getRecords(dbName, collection, query);
	//console.log('records length: ' + records.length);
	return records;
}

function getCarYears1(records){
    //sum months covered

    let years = 0 
    for (let record of records){
        //console.table(record)
        //console.table(record.Coverage)
         years+=(record.Coverage.Exposure * record.Coverage.MonthsCovered)/12 
    }

    return years
   
}

function getCarYears2(records, start){
    let years = 0
    let isoStart = help.makeDate(start)
    for (let record of records){
        let accountingTermExp = help.makeDate(record.Policy.AccountingTermExpiration) 
        let month = accountingTermExp.getMonth() - isoStart.getMonth() 
        let year = (accountingTermExp.getFullYear() - isoStart.getFullYear())*12
        let range = month + year
        years+=(range*record.Coverage.Exposure)/12
    }
    return years

}
function getCarYears3(records, end){
    let years = 0
    let isoEnd = help.makeDate(end)
    for (let record of records){
        let accountingDate = help.makeDate(record.Policy.AccountingDate) 
        let month = isoEnd.getMonth() - accountingDate.getMonth() 
        let year = (isoEnd.getFullYear() - accountingDate.getFullYear())*12
        let range = month + year
        years+=(range*record.Coverage.Exposure)/12
    }
    return years

}

function getCarYears4(records,start,end){
    let years = 0
    let isoStart = help.makeDate(start)
    let isoEnd = help.makeDate(end)
    let month = isoEnd.getMonth() - isoStart.getMonth()
    let year = (isoEnd.getFullYear() - isoStart.getFullYear())*12
    let range = month+year
    console.log('isoStart: '+isoStart+' isoEnd: '+isoEnd+
    ' month: '+month+' year: '+year+' range: '+range)
    for (let record of records){
        years+= (record.Coverage.Exposure * range) /12
    }
    return years
}

async function getCarYears(start, end, coverageCode, manager){
    //await manager.connect();

    let transactionCode = "1"

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

    console.log('Find Group One')
    let r1 = await find('insurance',q1, manager)
    console.log('r1 length: '+r1.length)
    let r2 = await find('insurance', q2, manager)
    console.log('r2 length: '+r2.length)
    let r3 = await find('insurance', q3, manager)
    console.log('r3 length: '+r3.length)
    let r4 = await find('insurance', q4, manager)
    console.log('r4 length: '+r4.length)
    //await manager.disconnect();
    
    let y1 = getCarYears1(r1)
    let y2 = getCarYears2(r2,start)
    let y3 = getCarYears3(r3,end)
    let y4 = getCarYears4(r4,start, end)
    let total = (y1+y2+y3+y4).toFixed(2)
    console.log('finished getting group1: '+y1)
    console.log('finished getting group2: '+y2)
    console.log('finished getting group3: '+y3)
    console.log('finished getting group4: '+y4)
    console.log('Total: '+total)
    return total

}


async function main(start,end,covCode){
    var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
    await manager.connect();
    await getCarYears(start, end, covCode, manager)
    await manager.disconnect();
    //console.log('disconnected')
}


// let start = "2020-02-01"
// let end = "2021-01-01"
// let coverageCode = "1";  
//let carYears = main(start,end,coverageCode)
//console.log('car years: '+carYears)



module.exports = {getCarYears}