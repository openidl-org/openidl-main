fs = require('fs')
let states = require('../codes/state.json').states;
let codeMap = require('../codes/pa_coverageCodes.json');
let coverageCategoriesMap = require('../codes/pa_coverageCategory.json');
let fileLines = [];

function getSpecialStates() {
	let specialStates = Object.keys(codeMap);
	let rvSpecialStates = [];
	muIndex = specialStates.indexOf('MU');
	//only remove if present
	if (muIndex > -1) {
		specialStates.splice(muIndex, 1);
	}
	for (let stateABV of specialStates) {
		rvSpecialStates.push(getStateDetail(stateABV));
	}
	return rvSpecialStates;
}

function getStateDetail(stateABV) {
	let position = null;
	for (let state of states) {
		if (stateABV == state.abv) {
			return state;
		}
		position += 1;
	}
}

function getNormalStates(specialStates) {
	indexesToRemove = [];
	position = 0;
	let lclStates = states
	for (let state of states) {
		for (let special of specialStates) {
			if (state.id == special.id) {
				// console.log('index found: '+position)
				indexesToRemove.push(position);
			}
		}
		position += 1;
	}
	//remove in reverse
	for (var i = indexesToRemove.length - 1; i >= 0; i--) {
		index = indexesToRemove[i];
		// console.log('remove index: '+index)
		lclStates.splice(index, 1);
	}
	return lclStates;
}

function buildNormal(normal) {
	let id = 1;
	let multi = codeMap['MU'];
	for (let state of normal) {
		for (let item of Object.keys(multi)) {
			coverageCode = item;
			line = `	INSERT INTO pa_state_coverage_code VALUES(${id},${multi[item].id},${state.id});`;
			//console.log(line);
			fileLines.push(line);
			id += 1;
		}
	}
	return id;
}

function buildSpecial(specials, id) {
	for (let special of specials) {
		let codes = codeMap[special.abv];
		let stateId = special.id;
		codeKeys = Object.keys(codes);
		for (key of codeKeys) {
			coverageCode = key;
			line = `	INSERT INTO pa_state_coverage_code VALUES(${id},${codes[key].id},${stateId});`;
			//console.log(line);
			id += 1;
			fileLines.push(line);
		}
	}
}

function buildCoverageCategory() {
	let coverageCategories = Object.keys(coverageCategoriesMap);
	for (let category in coverageCategoriesMap) {
		let line = `	INSERT INTO pa_coverage_category (id, name) VALUES (${category},'${coverageCategoriesMap[category]}');`;
		//console.log(line)
		fileLines.push(line);
	}
}

function buildPt1() {
	fileLines.push(`
DO $$ 
BEGIN

CREATE TABLE IF NOT EXISTS pa_coverage_category (
    id INT,
    name VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);


CREATE TABLE IF NOT EXISTS pa_coverage_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    fk_coverage_category_id INT,
    fk_state_id INT 
);


CREATE TABLE IF NOT EXISTS pa_state_coverage_code (
    id INT,
    fk_coverage_code_id INT,
    fk_state_id INT
);


CREATE OR REPLACE VIEW pa_coverage_code_vw
AS
  SELECT a.code        coverage_code,
         b.name        coverage_category,
         a.name        coverage,
         a.id          coverage_id,
         a.fk_state_id state_id_specific,
         b.id          coverage_category_id
  FROM   pa_coverage_code a,
         pa_coverage_category b
  WHERE  a.fk_coverage_category_id = b.id
  ORDER  BY a.id; 

CREATE OR REPLACE VIEW pa_state_coverage_code_vw as (
    SELECT b.code coverage_code, b.id coverage_id, b.name coverage, c.abbreviation state, c.id fk_state_id
        FROM pa_state_coverage_code a, pa_coverage_code b, state_code c
        WHERE a.fk_coverage_code_id = b.id 
        AND a.fk_state_id = c.id
        ORDER BY state,coverage_code
);

IF NOT EXISTS (SELECT * FROM pa_coverage_category) THEN`);
}

function buildPt2() {
	fileLines.push(`END IF;

IF NOT EXISTS (select * from pa_coverage_code) THEN`);
}

function buildCoverageCode() {
	let mu = codeMap['MU'];
	let ar = codeMap['AR'];
	let pa = codeMap['PA'];
	id = 1;
	for (let m in mu) {
		line = `	INSERT INTO pa_coverage_code (id, code, name, fk_coverage_category_id) VALUES (${id},'${m}','${mu[m].name}',${mu[m].id});`;
		fileLines.push(line);
		//console.log(line)
		id+=1
	}
	for (let a in ar) {
		line = `	INSERT INTO pa_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (${id},'${a}','${ar[a].name}',${ar[a].id},3);`;
		fileLines.push(line);
		//console.log(line)
		id+=1
	}
	for (let p in pa) {
		line = `	INSERT INTO pa_coverage_code (id, code, name, fk_coverage_category_id,fk_state_id) VALUES (${id},'${p}','${pa[p].name}',${pa[p].id},37);`;
		fileLines.push(line);
		//console.log(line)
		id+=1
	}
}
function buildPt3(){
	fileLines.push(`END IF;

IF NOT EXISTS (SELECT * FROM pa_state_coverage_code) THEN`)
}

buildPt1();
buildCoverageCategory();
buildPt2();
buildCoverageCode();
buildPt3()
let specialStates = getSpecialStates();
let normalStates = getNormalStates(specialStates);
id = buildNormal(normalStates);
buildSpecial(specialStates, id);
fileLines.push(`END IF; 
END $$`)


for (let l of fileLines){
	//console.log(l)
}

var file = fs.createWriteStream('../tables/V0.0.1.2.8__pa_coverage_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();