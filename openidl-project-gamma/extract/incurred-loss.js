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

async function getIncurredLoss(start, end, coverageCode) {
	await manager.connect();

	//get all paid loss within time line
	let q1 = {
		$and: [
			{ TransactionCode: '2' },
            { 'Coverage.CoverageCode': coverageCode },
			{ 'Claim.AccidentDate': { $gte: start } },
			{ 'Claim.AccidentDate': { $lte: end } }
		]
	};

	//get all outstanding loss within time limits
	let q2 = {
		$and: [
			{ TransactionCode: '3' },
            { 'Coverage.CoverageCode': coverageCode },
			{ 'Claim.AccidentDate': { $gte: start } },
			{ 'Claim.AccidentDate': { $lte: end } }
		]
	};

	let lossRecords = await find('insurance', q1);
	let outstandingRecords = await find('insurance', q2);
	await manager.disconnect();

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
    return incurredLoss
}

let start = '2020-02-01';
let end = '2021-01-01';
let coverageCode = "1";  

getIncurredLoss(start, end, coverageCode);

