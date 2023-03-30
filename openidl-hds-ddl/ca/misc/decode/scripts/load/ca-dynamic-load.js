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

function ASCIItoREALInt(input){
	//console.log(`input: ${input}`)
	try {
		value = parseInt(input)
		return value }

	catch { 
	value = null
	input=`${input}`.toUpperCase()
	if (input.includes('{' )){
		value = parseInt(input.replace('{', ''))
	} else if ( input.includes('A' )){
		value = parseInt(input.replace('A', '1'))
	} else if ( input.includes('B' )){
		value = parseInt(input.replace('B', '2'))
	} else if ( input.includes('C' )){
		value = parseInt(input.replace('C', '3'))
	} else if ( input.includes('D' )){
		value = parseInt(input.replace('D', '4'))
	} else if ( input.includes('E' )){
		value = parseInt(input.replace('E', '5'))
	} else if ( input.includes('F' )){
		value = parseInt(input.replace('F', '6'))
	} else if ( input.includes('G')){
		value = parseInt(input.replace('G', '7'))
	} else if ( input.includes('H' )){
		value = parseInt(input.replace('H', '8'))
	} else if ( input.includes('I' )){
		value = parseInt(input.replace('I', '9'))
	} else if ( input.includes('}' )){
		value = parseInt(input.replace('}', '')) * -1
	} else if ( input.includes('J' )){
		value = parseInt(input.replace('J', '1')) * -1
	} else if ( input.includes('K' )){
		value = parseInt(input.replace('K', '2')) * -1
	} else if ( input.includes('L' )){
		value = parseInt(input.replace('L', '3')) * -1
	} else if ( input.includes('M' )){
		value = parseInt(input.replace('M', '4')) * -1
	} else if ( input.includes('N' )){
		value = parseInt(input.replace('N', '5')) * -1
	} else if ( input.includes('O' )){
		value = parseInt(input.replace('O', '6')) * -1
	} else if ( input.includes('P' )){
		value = parseInt(input.replace('P', '7')) * -1
	} else if ( input.includes('Q')){
		value = parseInt(input.replace('Q', '8')) * -1
	} else if ( input.includes('R')){
		value = parseInt(input.replace('R', '9')) * -1
	}
	else { 
		value = parseInt(input)
	}
	
	console.log(`ascii2_input: ${input}, output: ${value}`)
	return value

	}}

function ASCIItoREALFloat(input){
	//console.log(`input: ${input}`)
	try {
		value = parseFloat(input)
		return value }

	catch { 
	value = null
	input=`${input}`.toUpperCase()
	if (input.includes('{' )){
		value = parseFloat(input.replace('{', ''))
	} else if ( input.includes('A' )){
		value = parseFloat(input.replace('A', '1'))
	} else if ( input.includes('B' )){
		value = parseFloat(input.replace('B', '2'))
	} else if ( input.includes('C' )){
		value = parseFloat(input.replace('C', '3'))
	} else if ( input.includes('D' )){
		value = parseFloat(input.replace('D', '4'))
	} else if ( input.includes('E' )){
		value = parseFloat(input.replace('E', '5'))
	} else if ( input.includes('F' )){
		value = parseFloat(input.replace('F', '6'))
	} else if ( input.includes('G')){
		value = parseFloat(input.replace('G', '7'))
	} else if ( input.includes('H' )){
		value = parseFloat(input.replace('H', '8'))
	} else if ( input.includes('I' )){
		value = parseFloat(input.replace('I', '9'))
	} else if ( input.includes('}' )){
		value = parseFloat(input.replace('}', '')) * -1
	} else if ( input.includes('J' )){
		value = parseFloat(input.replace('J', '1')) * -1
	} else if ( input.includes('K' )){
		value = parseFloat(input.replace('K', '2')) * -1
	} else if ( input.includes('L' )){
		value = parseFloat(input.replace('L', '3')) * -1
	} else if ( input.includes('M' )){
		value = parseFloat(input.replace('M', '4')) * -1
	} else if ( input.includes('N' )){
		value = parseFloat(input.replace('N', '5')) * -1
	} else if ( input.includes('O' )){
		value = parseFloat(input.replace('O', '6')) * -1
	} else if ( input.includes('P' )){
		value = parseFloat(input.replace('P', '7')) * -1
	} else if ( input.includes('Q')){
		value = parseFloat(input.replace('Q', '8')) * -1
	} else if ( input.includes('R')){
		value = parseFloat(input.replace('R', '9')) * -1
	}
	else { 
		value = parseFloat(input)
	}
	
	console.log(`ascii2_input: ${input}, output: ${value}`)
	return value

	}}




function makeQuery(record){
  let accountingDate = record.accountingDate
  record['accountingMonth'] = accountingDate.slice(0,2)
  record['accountingYear'] = accountingDate.slice(-1)
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
	  lclValue = ASCIItoREALFloat(value.data)
	  
      query += `${lclValue}, `;
    }
	if (value.dataType == 'INT') {
		lclValue = ASCIItoREALInt(value.data)
		
		query += `${lclValue}, `;
	  }
  }
  query = query.slice(0, -2) + ');';

  console.log(query);
}

for (let record of records){
  makeQuery(record)
}