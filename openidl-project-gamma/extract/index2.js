const MongoDBManager = require('../../openidl-extraction-pattern-developer/service/mongo-database-manager');
const conn = require('../../openidl-extraction-pattern-developer/connection.json');

// const fs = require('fs');
// const util = require('util');
var help = require('../transform/helper');
const dbName = conn.dbName;


async function find(collection, query, manager) {
    // console.log('find query [find]')
    // const q1s = JSON.stringify(query)
    // console.table(query)
    // console.log("\n"+q1s+"\n")


	let records = await manager.getRecords(dbName, collection, query);
	console.log('records length: ' + records.length);
    console.log('after find')
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
async function earnPremium(start, end, coverageCode, manager) {
	// console.log('earnPremium, coverageCodes ')
    // console.table(coverageCode)


    let transactionCode = '1'
	let q1 = {$and: [{"Policy.AccountingDate": {$gte: start}},
	{"Policy.AccountingTermExpiration": {$lte:end }}
    ,{"Coverage.CoverageCode": {$in: coverageCode}}
    ,{"TransactionCode": transactionCode}]}
    // console.log('Cov COde')
    // console.table(q1['$and'][2]['Coverage.CoverageCode'])
    // const q1s = JSON.stringify(q1)
    // console.log(q1s)
    
    let q2 = {$and: [{"Policy.AccountingDate": {$lt: start}},
	{"Policy.AccountingTermExpiration": {$lte:end }},
    {"Policy.AccountingTermExpiration": {$gt:start }}
    ,{"Coverage.CoverageCode": {$in: coverageCode}}
    ,{"TransactionCode": transactionCode}]}

    let q3 = {$and: [{"Policy.AccountingDate": {$gte: start}},
	{"Policy.AccountingDate": {$lte:end }},
    {"Policy.AccountingTermExpiration": {$gt:end }}
    ,{"Coverage.CoverageCode": {$in: coverageCode}}
    ,{"TransactionCode": transactionCode}]}

    let q4 = {$and: [{"Policy.AccountingDate": {$lte: start}},
    {"Policy.AccountingTermExpiration": {$gt:end }}
    ,{"Coverage.CoverageCode": {$in: coverageCode}}
    ,{"TransactionCode": transactionCode}]}



    //records
    console.log('Find Group One')
    
    let r1 = await find('insurance',q1, manager)
    console.log('r1 length: '+r1.length)
    console.log('Find Group Two')
    let r2 = await find('insurance',q2, manager)
    console.log('r2 length: '+r2.length)
    console.log('Find Group Three')
    let r3 = await find('insurance',q3, manager)
    console.log('r3 length: '+r3.length)
    console.log('Find Group Four')
    let r4 = await find('insurance',q4, manager)
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
    //await manager.disconnect();
    console.log('earned premium: '+lclEarnedPremium.toFixed(4))
    return parseFloat(lclEarnedPremium.toFixed(3))

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
    ,{"Coverage.CoverageCode": {$in: coverageCode}}
    ,{"TransactionCode": transactionCode}]}
    
    let q2 = {$and: [{"Policy.AccountingDate": {$lt: start}},
	{"Policy.AccountingTermExpiration": {$lte:end }},
    {"Policy.AccountingTermExpiration": {$gt:start }}
    ,{"Coverage.CoverageCode": {$in: coverageCode}}
    ,{"TransactionCode": transactionCode}]}

    let q3 = {$and: [{"Policy.AccountingDate": {$gte: start}},
	{"Policy.AccountingDate": {$lte:end }},
    {"Policy.AccountingTermExpiration": {$gt:end }}
    ,{"Coverage.CoverageCode": {$in: coverageCode}}
    ,{"TransactionCode": transactionCode}]}

    let q4 = {$and: [{"Policy.AccountingDate": {$lte: start}},
    {"Policy.AccountingTermExpiration": {$gt:end }}
    ,{"Coverage.CoverageCode": {$in: coverageCode}}
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
    let total = parseFloat((y1+y2+y3+y4).toFixed(2))
    console.log('finished getting group1: '+y1)
    console.log('finished getting group2: '+y2)
    console.log('finished getting group3: '+y3)
    console.log('finished getting group4: '+y4)
    console.log('Total: '+total)
    return total

}

async function getIncurredCount(start, end, coverageCode, manager){

    let q1 = {
		$and: [
			{ 'TransactionCode': {$in: ['2','3','6','7']} },
            { 'Coverage.CoverageCode': {$in: coverageCode} },
			{ 'Claim.AccidentDate': { $gte: start } },
			{ 'Claim.AccidentDate': { $lte: end } }
		]
        

	};
    let rawLoss = await find('insurance', q1, manager)
    //console.log(rawLoss)
    console.log('rawLoss size: '+rawLoss.length)
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

function sumPaidLoss(records) {
	let loss = 0;
	//sum up all records
	for (let record of records) {
		loss += record.Claim.LossAmount;
	}
	loss.toFixed(2);
	return loss;
}

function sumOutstanding(records) {
	console.log('sum outstand: ' + records.length);

	//object to hold the records
	resultSet = {};
	for (let record of records) {
		//console.log('identifier: '+record.Claim.OccurrenceIdentifier)

		//check if OccurrenceIdentifier already exists in result set
		let present = null;
		if (record.Claim.OccurrenceIdentifier in resultSet) {
			//console.log('True')
			present = true;
		} else {
			// console.log('False')
			present = false;
		}

		if (!present) {
			//new OccurrenceIdentifier, add to result set
			resultSet[record.Claim.OccurrenceIdentifier] = {
				accountingDate: record.Policy.AccountingDate,
				loss: record.Claim.LossAmount
			};
		} else {
			//OccurrenceIdentifier already exists, check to make sure we have the most recent version
			if (
				record.Policy.AccountingDate >
				resultSet[record.Claim.OccurrenceIdentifier]
			) {
				resultSet[record.Claim.OccurrenceIdentifier] = {
					accountingDate: record.Policy.AccountingDate,
					loss: record.Claim.LossAmount
				};
			}
		}
	}
	let total = 0;

	//sum the most recent loss records
	for (let result in resultSet) {
		let localLoss = resultSet[result].loss;
		total += localLoss;
	}
	return total;
}

async function getIncurredLoss(start, end, coverageCode,manager) {
	

	//get all paid loss within time line
	let q1 = {
		$and: [
			{ TransactionCode: '2' },
            { 'Coverage.CoverageCode': {$in: coverageCode} },
			{ 'Claim.AccidentDate': { $gte: start } },
			{ 'Claim.AccidentDate': { $lte: end } }
		]
	};

	//get all outstanding loss within time limits
	let q2 = {
		$and: [
			{ TransactionCode: '3' },
            { 'Coverage.CoverageCode': {$in: coverageCode} },
			{ 'Claim.AccidentDate': { $gte: start } },
			{ 'Claim.AccidentDate': { $lte: end } }
		]
	};

	let lossRecords = await find('insurance', q1, manager);
	let outstandingRecords = await find('insurance', q2, manager);
	

	let paidLoss = sumPaidLoss(lossRecords);
	let outstandLoss = sumOutstanding(outstandingRecords);
	let incurredLoss = paidLoss + outstandLoss;

	console.log(
		'\n\n\n\n   Paid Loss: ' +
			paidLoss +
			'\n   Outstanding Loss: ' +
			outstandLoss +
			'\n   Incurred Loss: ' +
			incurredLoss
	);
    return parseFloat(incurredLoss.toFixed(3))
}


async function getBodilyInjury(start,end,manager){
    let covCode = ["1","9"]
    let earnedPremium = await earnPremium(start,end,covCode, manager)
    //console.log('ep: '+earnedPremium)
    carYears = await getCarYears(start,end,covCode,manager)
    //console.log("cy: "+carYears)
    incurredCount = await getIncurredCount(start,end,covCode,manager)
    //console.log("incurred count: "+incurredCount)
    incurredLoss = await getIncurredLoss(start,end,covCode,manager)
    //console.log('incurred loss: '+incurredLoss)
    let row = {"Row": "Bodily Injury", "Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row
    
}

async function getPropertyDamage(start,end,manager){
    const covCode = ["2"]
    earnedPremium = await earnPremium(start,end,covCode, manager)
    carYears = await getCarYears(start,end,covCode,manager)
    incurredCount = await getIncurredCount(start,end,covCode,manager)
    incurredLoss = await getIncurredLoss(start,end,covCode,manager)
    let row = {"Row": "Property Damage","Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row
    
}

async function getSingleBIPDLimit(start,end, manager){
    const covCode = ["3"]
    earnedPremium = await earnPremium(start,end,covCode, manager)
    carYears = await getCarYears(start,end,covCode,manager)
    incurredCount = await getIncurredCount(start,end,covCode,manager)
    incurredLoss = await getIncurredLoss(start,end,covCode,manager)
    let row = {"Row":"Single BI/PD Limit", "Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row  
}

async function getMedicalPayments(start,end, manager){
    const covCode = ["5"]
    earnedPremium = await earnPremium(start,end,covCode, manager)
    carYears = await getCarYears(start,end,covCode,manager)
    incurredCount = await getIncurredCount(start,end,covCode,manager)
    incurredLoss = await getIncurredLoss(start,end,covCode,manager)
    let row = {"Row": "Medical Payments","Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row  
}

async function getUninsuredUnderinsured(start,end, manager){
    const covCode = ["6","X","Y"]
    earnedPremium = await earnPremium(start,end,covCode, manager)
    carYears = await getCarYears(start,end,covCode,manager)
    incurredCount = await getIncurredCount(start,end,covCode,manager)
    incurredLoss = await getIncurredLoss(start,end,covCode,manager)
    let row = {"Row": "Underinsured Motorist", "Earned Premium": earnedPremium, "Car Years": carYears, "Incurred Count": incurredCount, "Incurred Loss": incurredLoss}
    return row  
}


async function main(start,end){
    var manager = new MongoDBManager({ url: 'mongodb://localhost:27017' });
    await manager.connect();
    rows = []
    let bodilyInjury = await getBodilyInjury(start,end,manager)
    rows.push(bodilyInjury)
    let propertyDamage = await getPropertyDamage(start,end,manager)
    rows.push(propertyDamage)
    let singleBIPDLimit = await getSingleBIPDLimit(start,end, manager)
    rows.push(singleBIPDLimit)
    let medicalPayments = await getMedicalPayments(start,end,manager)
    rows.push(medicalPayments)
    let uninsuredUnderinsured = await getUninsuredUnderinsured(start,end,manager)
    rows.push(uninsuredUnderinsured)

    await manager.disconnect();
    // console.log("Bodily Injury")
    // console.table(bodilyInjury)
    // console.log("Property Damage")
    // console.table(propertyDamage)
    // console.log('Single BI/PD Limit')
    // console.table(singleBIPDLimit)
    // console.log('Medical Payments')
    // console.table(medicalPayments)
    // console.log("Uninsured/Underinsured")
    // console.table(uninsuredUnderinsured)
    console.table(rows)
}

let covCode = ["1","9"]
let start = "2020-02-01"
let end = "2021-01-01"


main(start,end)

module.exports = {earnPremium}