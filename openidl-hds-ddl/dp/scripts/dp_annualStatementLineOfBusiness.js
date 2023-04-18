fs = require('fs');

let codeMap = require('../codes/dp_annualStatementLineOfBusinessCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_annual_statement_line_of_business_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_annual_statement_line_of_business_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap);
let index = 1;
for (let code of codes) {
	//console.log(code)
	line = `    INSERT INTO dp_annual_statement_line_of_business_code VALUES(${index},'${code}','${codeMap[code]}');`;
	fileLines.push(line);
	index += 1;
}
let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream(
	'../tables/V0.0.1.5.3__dp_annual_statement_line_of_business_code.sql'
);
file.on('error', function (err) {
	/* error handling */
});
fileLines.forEach(function (v) {
	file.write(v + '\n');
});
file.end();