let states = require('../../state.json').states;
let codeMap = require('../coverageCodes.json');

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
	let statePosition = 0;
	for (let state of states) {
		if (stateABV == state.abv) {
			statePosition = position;
			return state;
		}
		position += 1;
	}
}

function getNormalStates(specialStates) {
	let lclStates = states;
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
			line = `insert into pa_coverage_code values(${id},'${coverageCode}',${state.id},'${multi[item].name}','${multi[item].category}');`;
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
			line = `insert into pa_coverage_code values(${id},'${coverageCode}',${stateId},'${codes[key].name}','${codes[key].category}');`;
			console.log(line);
			id += 1;
		}
		break;
		// for (let code of Object.keys(codes)){
		//     console.log(code)
		// }
	}
}

let specialStates = getSpecialStates();
let normalStates = getNormalStates(specialStates);
id = buildNormal(normalStates);
buildSpecial(specialStates, id);
