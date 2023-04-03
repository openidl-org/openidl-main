fs = require('fs')

let codeMap = require('../codes/ho_escapedLiquidFuelAndLeadCoverageLiabilityCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_escaped_liquid_fuel_and_lead_coverage_liability_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_escaped_liquid_fuel_and_lead_coverage_liability_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    let data = codeMap[code];
    let name = data['name'];
    let type = data['type'];
    line = `    INSERT INTO ho_escaped_liquid_fuel_and_lead_coverage_liability_code VALUES(${index},'${code}','${name}','${type}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.3.10__ho_escaped_liquid_fuel_and_lead_coverage_liability_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


