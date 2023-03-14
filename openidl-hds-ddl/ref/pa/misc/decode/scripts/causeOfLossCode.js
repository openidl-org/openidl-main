fs = require('fs')
let codeMap = require('../complex/causeOfLossCodes.json').coverage;
fileLines = []
//console.log(codeMap)

fileLines.push(`DO $$
BEGIN 

CREATE TABLE IF NOT EXISTS pa_cause_of_loss_code (
    id INT,
    fk_coverage_code_id INT,
    loss_code VARCHAR,
    description varchar
);

IF NOT EXISTS (select * from pa_cause_of_loss_code) THEN`)

let lossCodes = Object.keys(codeMap);

let lossCodeId = 1
for (let coverageCode of lossCodes){
    let coverageCodes = Object.keys(codeMap[coverageCode])
    coverageCodes.pop()
    for (let lossCode of coverageCodes){
        let description = codeMap[coverageCode][lossCode]
        let coverageId = codeMap[coverageCode]['coverageId']
        let statement = (`INSERT INTO pa_cause_of_loss_code VALUES (${lossCodeId},${coverageId},${lossCode},'${description}');`)
        fileLines.push(statement)
        lossCodeId+=1
        
    }
}

fileLines.push(`END IF;
END $$
`)

var file = fs.createWriteStream('../../../tables/V0.0.1.9__pa_cause_of_loss_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
