fs = require('fs');

let codeMap = require('../codes/ho_deductibleTypeCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
	type VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_deductible_type_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    let data = codeMap[code];
    let description = data['name'];
    let type = data['type'];
    line = `    INSERT INTO ho_deductible_type_code VALUES(${index},'${code}','${description}','${type}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream(
	'../tables/V0.0.1.3.9__ho_deductible_type_code.sql'
);
file.on('error', function (err) {
	/* error handling */
});
fileLines.forEach(function (v) {
	file.write(v + '\n');
});
file.end();
