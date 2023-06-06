fs = require('fs')

let codeMap = require('../codes/ca_asciiLookupCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_ascii_lookup_code (
    id INT,
    code VARCHAR,
    digit INT,
    multiplier INT,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_ascii_lookup_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    //console.log(code)
    let data = codeMap[code];
    let digit = data['digit'];
    let multiplier = data['multiplier'];
    //console.log(digit)
    //console.log(multiplier)
    line = `    INSERT INTO ca_ascii_lookup_code VALUES(${index},'${code}',${digit},${multiplier});`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.2.33__ca_ascii_lookup_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


