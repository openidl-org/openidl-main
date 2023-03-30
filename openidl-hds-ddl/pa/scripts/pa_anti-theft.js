fs = require('fs')

let states = require('../codes/state.json').states
let codeMap = require('../codes/pa_antiTheftDeviceDiscountCodes.json').state;



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
    //console.table(states)
	for (let state of states) {
		if (stateABV == state.abv) {
			return state;
		}
		position += 1;
	}
}

function getNormalStates(specialStates) {
	let lclStates = states;
	indexesToRemove = [];
	position = 0;
    //console.log(states)
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
    //console.table(multi)
    
	for (let state of normal) {
        //console.log(`state: ${state.abv}`)
        codes = Object.keys(multi)
        //console.log(codes)
        
		for (let code of Object.keys(multi)) {
            let description = codeMap['MU'][code]
			line = `    INSERT INTO pa_anti_theft_device_discount_code VALUES(${id},${state.id},'${code}','${description}');`;
			tableLines.push(line)
            //console.log(line);
			id += 1;
            
		}
	}
	return id;
}

function buildSpecial(specials, id) {
	for (let special of specials) {
		let codes = codeMap[special.abv];
		//console.table(codes)
		codeKeys = Object.keys(codes);
		for (let code of codeKeys) {
            let description = codeMap[special.abv][code]
            //console.log(description)
			line = `    INSERT INTO pa_anti_theft_device_discount_code VALUES(${id},${special.id},'${code}','${description}');`;
			//console.log(line);
			tableLines.push(line)
            id += 1;
		}
	}
}

let tableLines = []
tableLines.push(`DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_anti_theft_device_discount_code (
    id INT,
    fk_state_id INT,
    code VARCHAR,
    description VARCHAR,
	effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);
IF NOT EXISTS (SELECT * FROM pa_anti_theft_device_discount_code) THEN
`)

let specialStates = getSpecialStates();
let normalStates = getNormalStates(specialStates);
id = buildNormal(normalStates);
buildSpecial(specialStates, id);

tableLines.push(`
END IF;

END $$
`)

// for (let line of tableLines){
//     console.log(line)
// }

var file = fs.createWriteStream('../tables/V0.0.1.1.4__pa_anti_theft_device_discount_code.sql');
file.on('error', function(err) { /* error handling */ });
tableLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

