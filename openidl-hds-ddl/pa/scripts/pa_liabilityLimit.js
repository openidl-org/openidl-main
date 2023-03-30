fs = require('fs')
let states = require('../codes/state.json').states;
let codeMap = require('../codes/pa_liabilityLimitCodes.json');

function getSpecialStates() {
	let specialStates = Object.keys(codeMap.state);

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
	let multi = codeMap['state']['MU']['coverage'];
	let coverageCodes = Object.keys(multi);
	for (let state of normal) {
		for (let coverageCode of coverageCodes) {
			let item = multi[coverageCode];
			let name = item.name;
			let coverageId = item.coverageId;
			liabilityCodes = Object.keys(item);
			nameIndex = liabilityCodes.indexOf('name');
			let coverageIdIndex = liabilityCodes.indexOf('coverageId');
			//console.log(liabilityCodes)
			liabilityCodes.splice(coverageIdIndex, 1);
			liabilityCodes.splice(nameIndex, 1);

			for (let liabilityCode of liabilityCodes) {
				liabilityLimit = multi[coverageCode][liabilityCode];
				
				fileLines.push(`	INSERT INTO pa_liability_limit_code  VALUES (${id},${coverageId},${state.id},'${name}','${liabilityCode}','${liabilityLimit}');`)
				
				id += 1;
			}
		}
	}
	return id;
}

function buildSpecial(specials, id) {
	for (let state of specials) {
		let multi = codeMap['state'][state.abv]['coverage'];
		let coverageCodes = Object.keys(multi);
		for (let coverageCode of coverageCodes) {
			let item = multi[coverageCode];
			let name = item.name;
			let coverageId = item.coverageId;
			liabilityCodes = Object.keys(item);
			nameIndex = liabilityCodes.indexOf('name');
			let coverageIdIndex = liabilityCodes.indexOf('coverageId');
			//console.log(liabilityCodes)
			liabilityCodes.splice(coverageIdIndex, 1);
			liabilityCodes.splice(nameIndex, 1);

			for (let liabilityCode of liabilityCodes) {
				liabilityLimit = multi[coverageCode][liabilityCode];
				
				fileLines.push(`		INSERT INTO pa_liability_limit_code  VALUES (${id},${coverageId},${state.id},'${name}','${liabilityCode}','${liabilityLimit}');`)
				id += 1;
			}
		}
	}

}


let fileLines = []



let head = `DO $$
BEGIN 

CREATE TABLE IF NOT EXISTS pa_liability_limit_code (
    id INT,
    fk_coverage_id int,
    fk_state_id int,
    name varchar,
    code varchar,
    limitt varchar,
	effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);
IF NOT EXISTS (SELECT * FROM pa_liability_limit_code) THEN
`;
fileLines.push(head)

let specialStates = getSpecialStates();
let normalStates = getNormalStates(specialStates);
id = buildNormal(normalStates);
id =1 
buildSpecial(specialStates, id);

let end = `END IF;
END $$`

fileLines.push(end)

// for (let line of fileLines){
// 	console.log(line)
// }

var file = fs.createWriteStream('../tables/V0.0.1.1.13__pa_liability_limit_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();