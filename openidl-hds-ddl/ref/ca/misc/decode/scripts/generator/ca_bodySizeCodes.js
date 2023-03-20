fs = require('fs')

let codeMap = require('../../simple/ca_vehicleClassCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_body_size_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_body_size_code) THEN `
fileLines.push(tableDDL)

let codes = codeMap.bodySize;
console.log(codes);
let index = 1
for (let code in codes){
    console.log(`body size:  ${code}`);
    let description = codes[code]
    console.log(`description: ${description}`);
    line = `    INSERT INTO ca_body_size_code VALUES(${index},'${code}','${description}');`
    fileLines.push(line)
    index+=1
}

let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../../../../tables/V0.0.1.2.22__ca_body_size_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
