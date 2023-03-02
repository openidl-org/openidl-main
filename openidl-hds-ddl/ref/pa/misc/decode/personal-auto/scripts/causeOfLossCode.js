let states = require('../../state.json').states;
let codeMap = require('../complex/causeOfLossCodes.json').coverage;
//console.log(codeMap)
let lossCodes = Object.keys(codeMap);

let lossCodeId = 1
for (let coverageCode of lossCodes){
    let coverageCodes = Object.keys(codeMap[coverageCode])
    coverageCodes.pop()
    for (let lossCode of coverageCodes){
        let description = codeMap[coverageCode][lossCode]
        let coverageId = codeMap[coverageCode]['coverageId']
        console.log(`INSERT INTO pa_cause_of_loss VALUES (${lossCodeId},${coverageId},${lossCode},'${description}');`)
        lossCodeId+=1
        
    }
}

