fs = require('fs')

let codeMap = require('../../simple/ho_occupancyCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_occupancy_codes_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_occupancy_codes_code) THEN `
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
    line = `    INSERT INTO ho_occupancy_codes_code VALUES(${index},'${code}','${name}','${type}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../../../../tables/V0.0.1.3.18__ho_occupancy_codes_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


