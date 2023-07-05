fs = require('fs');

let codeMap = require('../codes/fo_poolCodes.json');
let fileLines = [];
let tableDDL = `
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS fo_pool_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_pool_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap);
let index = 1;
for (let code of codes) {
    line = `    INSERT INTO fo_pool_code VALUES(${index},'${code}','${codeMap[code]}');`;
    fileLines.push(line);
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../tables/V0.0.1.6.11__fo_pool_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

