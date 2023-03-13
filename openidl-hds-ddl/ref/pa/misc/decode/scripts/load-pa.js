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

// const sample = require("./sample.json")
const mapping = require('./mapping.json');

function makeQuery(record){
  totalColumns = Object.keys(record);

  availableColumns = {};

  for (let column of totalColumns) {
    let data = record[column];
    let length = `${data}`.length;
    // console.log(`column ${column}, data: ${data}, length: ${length}`)
    if (length > 0) {
      availableColumns[column] = { data: data, length: length };
    }
  }
  // console.log(mapping)

  goodColumns = [];
  for (let map in mapping) {
    inbound = mapping[map].inboundName;
    stageName = mapping[map].stageName;
    dataType = mapping[map].dataType;
    // console.log(map)
    // console.log(inbound)
    if (inbound in availableColumns) {
      data = availableColumns[inbound];
      let attribute = {
        inbound: inbound,
        stageName: stageName,
        dataType: dataType,
        data: data.data,
        length: data.length
      };
      goodColumns.push(attribute);
    }
  }

  let query = 'INSERT INTO pa_stat_stg (';

  for (let column of goodColumns) {
    //console.log(column);
    query += column.stageName + ', ';
  }
  query = query.slice(0, -2) + ') values( ';
  for (let value of goodColumns) {
    if (value.dataType == 'VARCHAR') {
      query += `'${value.data}', `;
    }
    if (value.dataType == 'NUMERIC') {
      query += `${value.data}, `;
    }
  }
  query = query.slice(0, -2) + ');';

  console.log(query);
}

for (let record of records){
  makeQuery(record)
}