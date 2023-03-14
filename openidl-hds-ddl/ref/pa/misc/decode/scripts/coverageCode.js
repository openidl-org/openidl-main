let states = require('./state.json').states;
let codeMap = require('../complex/coverageCodes.json');

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
            coverageCode = item
			line = `INSERT INTO pa_state_coverage_code VALUES(${id},${multi[item].id},${state.id});`;
			console.log(line);
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
			line = `INSERT INTO pa_state_coverage_code VALUES(${id},${codes[key].id},${stateId});`;
			console.log(line);
			id += 1;
		}
	}
}

fileLines = [``]

let specialStates = getSpecialStates();
let normalStates = getNormalStates(specialStates);
id = buildNormal(normalStates);
buildSpecial(specialStates, id);
