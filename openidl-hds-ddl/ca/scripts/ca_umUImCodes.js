let fs = require('fs')
let states = require('../codes/state.json').states;
let codeMap = require('../codes/ca_umUimCodes.json').state;
fileLines = []

function getSpecialStates() {
	let specialStates = Object.keys(codeMap);

	let rvSpecialStates = [];
	muIndex = specialStates.indexOf('MU');
	// console.log(specialStates)
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
	for (let state of states) {
		if (stateABV == state.abv) {
			return state;
		}
	}
}

function getNormalStates(specialStates) {
	let lclStates = states;
	indexesToRemove = [];
	position = 0;
	for (let state of states) {
		for (let special of specialStates) {
			if (state.id == special.coverageId) {
				// console.log('index found: '+position)
				indexesToRemove.push(position);
			}
		}
		position += 1;
	}
	//remove in reverse
	for (var i = indexesToRemove.length - 1; i >= 0; i--) {
		index = indexesToRemove[i];
		lclStates.splice(index, 1);
	}
	return lclStates;
}

function buildNormal(normal) {
	let id = 1;
	let multi = codeMap['MU'];
	let umUimCodes = Object.keys(multi);
	for (let state of normal) {
		for (let umUimCode of umUimCodes) {
			let description = multi[umUimCode];
			line = `	INSERT INTO ca_um_uim_motorist_code VALUES (${id},${state.id},'${umUimCode}','${description}');`;
			//console.log(line)
            fileLines.push(line)
			id += 1;
		}
	}
	return id;
}

function buildSpecial(specials, id) {
	for (let state of specials) {
		let multi = codeMap[state.abv]
		let umUimCodes = Object.keys(multi);
		for (let umUimCode of umUimCodes) {
			let description = multi[umUimCode];
			line = `	INSERT INTO ca_um_uim_motorist_code VALUES (${id},${state.id},'${umUimCode}','${description}');`;
			//console.log(line)
            fileLines.push(line)
			id += 1;
		}
	}
	return id;
}

function buildHead(){
	fileLines.push(`DO $$

BEGIN 

CREATE TABLE IF NOT EXISTS ca_um_uim_motorist_code(
	id INT,
	fk_state_id VARCHAR,
	code VARCHAR,
	description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);


IF NOT EXISTS (select * from ca_um_uim_motorist_code) THEN`)
}

function buildTail(){
	fileLines.push(`END IF;

END $$`)
}
buildHead()
let specialStates = getSpecialStates();
let normalStates = getNormalStates(specialStates);
id = buildNormal(normalStates);
buildSpecial(specialStates, id);
buildTail()

// for (let line of fileLines){
// 	console.log(line)
// }

var file = fs.createWriteStream('../tables/V0.0.1.2.11__ca_um_uim_motorist_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
