const config = require('./config/config.json');
const { Pool, Client } = require('pg');
const records =
	require('../../../con-data/Personal_Auto/pre-test-1234-json.json').records;
const credentials = {
	user: config.db.username,
	host: config.db.host,
	database: config.db.database,
	password: config.db.password,
	port: config.db.port
};

// Accounting Date Functions
function convertAccountingMonth(dateString) {
    return `${dateString.substring(0, 2)}`;
}
function convertAccountingYear(dateString) {
    return `${dateString.substring(2, 3)}`;
}

// Body Style and Body Size Functions
function convertBodyStyle(vehicleClass) {
    return `${vehicleClass.substring(0, 2)}`;
}
function convertBodySize(vehicleClass) {
    return `${vehicleClass.substring(2, 3)}`;
}

// Accident Date Functions
function convertAccidentMonth(dateString) {
    return `${dateString.substring(0, 2)}`;
}
function convertAccidentYear(dateString) {
    return `${dateString.substring(2, 4)}`;
}

function makeInsertQuery(record) {
    // console.log(record.vehicleClass)
    // console.log(`bodyStyle: ${bodyStyle}, bodySize: ${bodySize}`)

    accountingMonth = convertAccountingMonth(record.accountingDate)
    accountingYear = `202${convertAccountingYear(record.accountingDate)}`.slice(-1)  //db only has space for one character

    bodyStyle = convertBodyStyle(record.vehicleClass)
    bodySize = convertBodySize(record.vehicleClass)
}


async function insertPremium(client, record) {
	let query = makeInsertQuery(record);
	console.log(query);
	await client.query(query);
}

async function insertLoss(client, record) {
	let query = makeLossQuery(record);
	console.log(query);
	await client.query(query);
}


async function insertRecords(client, records) {
	for (let record of records) {
		console.log(record);
		if (record.transactionCode === '1' || record.transactionCode === '8') {
			console.log('premium record');
			await insertPremium(client, record);
			console.log('insertPremium');
			// try{
			// await insertPremium(client,record)
			// console.log('premium record')
			// }
			// catch (e){
			//     console.log('error record')
			//     console.log(record)
			//     console.log('error')
			//     console.log(e)

			// }
		} else {
            console.log('loss record');
			//await insertLoss(client,record);
			//console.log('loss');
		}
	}
}

async function main() {
	const client = new Client(credentials);
	await client.connect();
	await insertRecords(client, records);
	await client.end();
}

main();
// errorCheck();
