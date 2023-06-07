fs = require('fs')

let codeMap = require('../codes/ca_vehicleUseCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_vehicle_use_code (
    id INT,
    code VARCHAR,
    use VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_vehicle_use_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    //console.log(code)
    let data = codeMap[code];
    let use = data['use'];
    let description = data['description'];
    //console.log(use)
    //console.log(description)
    line = `    INSERT INTO ca_vehicle_use_code VALUES(${index},'${code}','${use}','${description}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.2.14__ca_vehicle_use_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


