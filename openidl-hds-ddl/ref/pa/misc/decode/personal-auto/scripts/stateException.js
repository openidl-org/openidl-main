let states = require('../../state.json').states
let codeMap = require('../complex/stateExceptionCodes.json').exceptionField;

function getStateDetail(stateABV) {
	for (let state of states) {
		if (stateABV == state.abv) {
			return state;
		}
	}
}


index = 1


// exception a
let exceptionA = codeMap.stateExceptionA
let statesA = Object.keys(exceptionA)
for (let stateABV of statesA){
    let exception = exceptionA[stateABV]
    //console.log(exception)
    let name = exception.hdsName;
    let stateId = getStateDetail(stateABV).id;
    let exceptionCodes = Object.keys(exception.codes);
   //console.log(exceptionCodes)
    for (let exceptionCode of exceptionCodes){
        description = exception['codes'][exceptionCode]
        console.log(`INSERT INTO pa_state_exception_code VALUES (${index},1,${stateId},'${exceptionCode}','${name}','${description}');`)
        index+=1
    }
}


//exception b
let exceptionB = codeMap.stateExceptionB
let statesB = Object.keys(exceptionB)
for (let stateABV of statesB){
    let exception = exceptionB[stateABV]
    //console.log(exception)
    let name = exception.hdsName;
    let stateId = getStateDetail(stateABV).id;
    let exceptionCodes = Object.keys(exception.codes);
   //console.log(exceptionCodes)
    for (let exceptionCode of exceptionCodes){
        description = exception['codes'][exceptionCode]
        console.log(`INSERT INTO pa_state_exception_code VALUES (${index},2,${stateId},'${exceptionCode}','${name}','${description}');`)
        index+=1
    }
}


//exception c
let exceptionC = codeMap.stateExceptionC
let statesC = Object.keys(exceptionC)
for (let stateABV of statesC){
    let exception = exceptionC[stateABV]
    // console.log(exception)
    let name = exception.hdsName;
    let stateId = getStateDetail(stateABV).id;
    let exceptionCodes = Object.keys(exception.codes);
    // console.log(exceptionCodes)
    for (let exceptionCode of exceptionCodes){
        description = exception['codes'][exceptionCode]
        console.log(`INSERT INTO pa_state_exception_code VALUES (${index},3,${stateId},'${exceptionCode}','${name}','${description}');`)
        index+=1
    }
}