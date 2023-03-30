fs = require('fs')

let codeMap = require('../../simple/mho_escapedLiquidFuelCoveragePropertyCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_escaped_liquid_fuel_coverage_property_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_escaped_liquid_fuel_coverage_property_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    console.log(code)
    let data = codeMap[code];
    let name = data['name'];
    let type = data['type'];
    console.log(name)
    console.log(type)
    line = `    INSERT INTO mho_escaped_liquid_fuel_coverage_property_code VALUES(${index},'${code}','${name}','${type}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../../../../tables/V0.0.1.4.10__mho_escaped_liquid_fuel_coverage_property_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


