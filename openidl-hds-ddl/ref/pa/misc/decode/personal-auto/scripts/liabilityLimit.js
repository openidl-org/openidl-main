let states = require('../../state.json').states
let codeMap = require('../complex/liabilityLimitCodes.json')

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
    // console.log(states)
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
		// console.log('remove index: '+index)
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
            let item = multi[coverageCode]
            let name = item.name;
            let coverageId = item.coverageId;
            liabilityCodes = Object.keys(item)
            nameIndex = liabilityCodes.indexOf('name')
            let coverageIdIndex = liabilityCodes.indexOf('coverageId');
            //console.log(liabilityCodes)
            liabilityCodes.splice(coverageIdIndex,1)
            liabilityCodes.splice(nameIndex,1);
            
            for (let liabilityCode of liabilityCodes){
                liabilityLimit = multi[coverageCode][liabilityCode]
                console.log(`INSERT INTO pa_liability_limit_code  VALUES (${id},${coverageId},${state.id},'${name}','${liabilityCode}','${liabilityLimit}');`)
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
                let item = multi[coverageCode]
                let name = item.name;
                let coverageId = item.coverageId;
                liabilityCodes = Object.keys(item)
                nameIndex = liabilityCodes.indexOf('name')
                let coverageIdIndex = liabilityCodes.indexOf('coverageId');
                //console.log(liabilityCodes)
                liabilityCodes.splice(coverageIdIndex,1)
                liabilityCodes.splice(nameIndex,1);
                
                for (let liabilityCode of liabilityCodes){
                    liabilityLimit = multi[coverageCode][liabilityCode]
                    console.log(`INSERT INTO pa_liability_limit_code  VALUES (${id},${coverageId},${state.id},'${name}','${liabilityCode}','${liabilityLimit}');`)
                    id += 1;
                }
            }
    
        }
 
}


let specialStates = getSpecialStates();
let normalStates = getNormalStates(specialStates);
id = buildNormal(normalStates);
buildSpecial(specialStates, id);