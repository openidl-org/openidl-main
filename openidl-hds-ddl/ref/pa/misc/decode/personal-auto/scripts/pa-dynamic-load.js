const config = require('../../../../../../../openidl-hds/config/config.json');
const { Pool, Client } = require('pg');
const records =
	require('../../../../../../../../../con-data/pa_load_stg.json').records;
const credentials = {
	user: config.db.username,
	host: config.db.host,
	database: config.db.database,
	password: config.db.password,
	port: config.db.port
};

  
  function convertAccountingMonth(dateString) {
    return `${dateString.substring(0, 2)}`;
  }
  
  function convertAccountingYear(dateString) {
    return `${dateString.substring(2, 3)}`;
  }

function makeInsertQuery(record) {

	
    // console.log(record.lineOfInsurance)
	//console.table(record)
    
    
}


async function insertPremium(client, record) {
	let query = makeInsertQuery(record);
	console.log(`inserting record: ${record.policyIdentification}`)
	await client.query(query);
}




async function insertRecords(client, records) {
	for (let record of records) {
		//console.log(record);
		if (record.transactionCode == '1' || record.transactionCode == '8') {
			//console.log('premium record');
			await insertPremium(client, record);
            

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
