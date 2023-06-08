fs = require('fs')
let codeMap = require('../codes/ca_causeOfLossCodes.json').coverage;
fileLines = []
//console.log(codeMap)

fileLines.push(`
DO $$
BEGIN 
CREATE TABLE IF NOT EXISTS ca_cause_of_loss_code (
    id INT,
    fk_coverage_code_id INT,
    loss_code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (select * from ca_cause_of_loss_code) THEN`)

let lossCodes = Object.keys(codeMap);

let lossCodeId = 1
for (let coverageCode of lossCodes){
    let coverageCodes = Object.keys(codeMap[coverageCode])
    coverageCodes.pop()
    for (let lossCode of coverageCodes){
        let description = codeMap[coverageCode][lossCode]
        let coverageId = codeMap[coverageCode]['coverageId']
        let statement = (`  INSERT INTO ca_cause_of_loss_code VALUES (${lossCodeId},${coverageId},${lossCode},'${description}');`)
        fileLines.push(statement)
        lossCodeId+=1
        
    }
}

fileLines.push(`END IF;
END $$;`)

var file = fs.createWriteStream('../tables/V0.0.1.2.9__ca_cause_of_loss_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
