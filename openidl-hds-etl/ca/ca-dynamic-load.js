const config = require('../config/config.json');
const { Pool, Client } = require('pg');
const credentials = {
	user: config.db.username,
	host: config.db.host,
	database: config.db.database,
	password: config.db.password,
	port: config.db.port
};

const fs = require('fs');

async function main() {
	const client = new Client(credentials);
	await client.connect();
	batches = [];
	batch = [];
	const allFileContents = fs.readFileSync(
		'../../../../con-data/Commercial_Auto/ca-insert.sql',
		'utf-8'
	);
	allFileContents.split(/\r?\n/).forEach((line) => {
		//console.log(`Line from file: ${line}`);
		batch.push(line);
		if (batch.length > 25) {
			let statement = batch.join(' ');
			batches.push(statement);
			batch = [];
		}
	});
	if (batch.length > 0) {
		let statement = batch.join(' ');
		batches.push(statement);
	}
	count = 0;
	for (let b of batches) {
		await client.query(b);
		count += 1;
		console.log('batch: ' + count);
	}
	

	const used = process.memoryUsage().heapUsed / 1024 / 1024;
	console.log(
		`The script uses approximately ${Math.round(used * 100) / 100} MB`
	);

	await client.end();
}

main();
