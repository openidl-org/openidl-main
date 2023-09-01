fs = require('fs');

let codeMap = require('../codes/bt_deductibleAmountCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS bt_deductible_amount_code (
    id INT,
    code VARCHAR,
    flat_ded_amount VARCHAR,
    split_ded_amount VARCHAR,
    percentage_deductible VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM bt_deductible_amount_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    let data = codeMap[code];
    let flatDedAmt = data['flatDeductibleAmounts'];
    let splitDedAmt = data['splitDeductibleAmounts'];
    let percentageDeds = data['percentageDeductibles'];
    line = `    INSERT INTO bt_deductible_amount_code VALUES(${index},'${code}','${flatDedAmt}','${splitDedAmt}','${percentageDeds}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../tables/V0.0.1.15.6__bt_deductible_amount_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

