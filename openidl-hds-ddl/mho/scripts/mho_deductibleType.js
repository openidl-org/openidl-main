fs = require('fs');

let codeMap = require('../codes/mho_deductibleTypeCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
	type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM mho_deductible_type_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    let data = codeMap[code];
    let description = data['name'];
    let type = data['type'];
    line = `    INSERT INTO mho_deductible_type_code VALUES(${index},'${code}','${description}','${type}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream(
	'../tables/V0.0.1.4.8__mho_deductible_type_code.sql'
);
file.on('error', function (err) {
	/* error handling */
});
fileLines.forEach(function (v) {
	file.write(v + '\n');
});
file.end();