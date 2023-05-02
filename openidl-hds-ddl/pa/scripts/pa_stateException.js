let fs = require('fs')
let states = require('../codes/state.json').states;
let codeMap = require('../codes/pa_stateExceptionCodes.json').exceptionField;

fileLines = [];
index = 1;

function getStateDetail(stateABV) {
	for (let state of states) {
		if (stateABV == state.abv) {
			return state;
		}
	}
}

function exceptionA() {
	// exception a
	let exceptionA = codeMap.stateExceptionA;
	let statesA = Object.keys(exceptionA);
	for (let stateABV of statesA) {
		let exception = exceptionA[stateABV];
		//console.log(exception)
		let name = exception.hdsName;
		let stateId = getStateDetail(stateABV).id;
		let exceptionCodes = Object.keys(exception.codes);
		//console.log(exceptionCodes)
		for (let exceptionCode of exceptionCodes) {
			description = exception['codes'][exceptionCode];
			let line = `   INSERT INTO pa_state_exception_code VALUES (${index},1,${stateId},'${exceptionCode}','${name}','${description}');`;
			//console.log(line)
			fileLines.push(line);
			index += 1;
		}
	}
}

function exceptionB() {
	//exception b
	let exceptionB = codeMap.stateExceptionB;
	let statesB = Object.keys(exceptionB);
	for (let stateABV of statesB) {
		let exception = exceptionB[stateABV];
		//console.log(exception)
		let name = exception.hdsName;
		let stateId = getStateDetail(stateABV).id;
		let exceptionCodes = Object.keys(exception.codes);
		//console.log(exceptionCodes)
		for (let exceptionCode of exceptionCodes) {
			description = exception['codes'][exceptionCode];
			let line = `   INSERT INTO pa_state_exception_code VALUES (${index},2,${stateId},'${exceptionCode}','${name}','${description}');`;
			fileLines.push(line);
			index += 1;
		}
	}
}

//exception c
function exceptionC() {
	let exceptionC = codeMap.stateExceptionC;
	let statesC = Object.keys(exceptionC);
	for (let stateABV of statesC) {
		let exception = exceptionC[stateABV];
		// console.log(exception)
		let name = exception.hdsName;
		let stateId = getStateDetail(stateABV).id;
		let exceptionCodes = Object.keys(exception.codes);
		// console.log(exceptionCodes)
		for (let exceptionCode of exceptionCodes) {
			description = exception['codes'][exceptionCode];
			line = `   INSERT INTO pa_state_exception_code VALUES (${index},3,${stateId},'${exceptionCode}','${name}','${description}');`;
			fileLines.push(line);
			index += 1;
		}
	}
}

function exceptionCategory() {
	let lclId = 1;
	let exceptions = Object.keys(codeMap);

	for (let exception of exceptions) {
		line = `   INSERT INTO pa_state_exception_category_code (id, name) values (${lclId},'${exception}');`;
		//console.log(line)
		fileLines.push(line);
        lclId+=1
	}
}

function buildPt1() {
	fileLines.push(`DO $$
BEGIN 

CREATE TABLE IF NOT EXISTS pa_state_exception_category_code (
    id int,
    name VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);
    
CREATE TABLE IF NOT EXISTS pa_state_exception_code (
    id INT,
    fk_state_exception_category_id INT,
    fk_state_id INT,
    code VARCHAR,
    name VARCHAR, 
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
    );
    
IF NOT EXISTS (SELECT * FROM pa_state_exception_category_code) THEN`);
}

function buildPT2() {
	fileLines.push(`END IF;

IF NOT EXISTS (SELECT * FROM pa_state_exception_code) THEN`);
}

function buildEnd() {
	fileLines.push(`END IF; 

END $$`);
}

buildPt1();
exceptionCategory();
buildPT2();
exceptionA();
exceptionB();
exceptionC();
buildEnd();

for (line of fileLines) {
	//console.log(line);
}

var file = fs.createWriteStream('../tables/V0.0.1.1.17__pa_state_exception_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();