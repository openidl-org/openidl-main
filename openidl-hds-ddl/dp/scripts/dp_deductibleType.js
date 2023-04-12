fs = require('fs');

let codeMap = require('../codes/dp_deductibleTypeCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_deductible_type_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
	type VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_deductible_type_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    let data = codeMap[code];
    let description = data['name'];
    let type = data['type'];
    line = `    INSERT INTO dp_construction_code VALUES(${index},'${code}','${description}','${type}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream(
	'../tables/V0.0.1.5.10__dp_deductible_type_code.sql'
);
file.on('error', function (err) {
	/* error handling */
});
fileLines.forEach(function (v) {
	file.write(v + '\n');
});
file.end();
