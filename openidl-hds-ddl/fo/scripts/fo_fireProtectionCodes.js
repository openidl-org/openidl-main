fs = require('fs')

let codeMap = require('../codes/fo_fireProtectionCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fo_fire_protection_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_fire_protection_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    let data = codeMap[code];
    let name = data['name'];
    let type = data['type'];
    let category = data['category']
    line = `    INSERT INTO fo_fire_protection_code VALUES(${index},'${code}','${name}','${type}','${category}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.6.7__fo_fire_protection_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


