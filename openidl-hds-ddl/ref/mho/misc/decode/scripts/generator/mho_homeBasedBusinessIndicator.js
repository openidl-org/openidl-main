fs = require('fs');

let codeMap = require('../../simple/mho_homeBasedBusinessIndicatorCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS mho_home_based_business_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM mho_home_based_business_indicator_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap);
let index = 1;
for (let code of codes) {
	//console.log(code)
	line = `    INSERT INTO mho_home_based_business_indicator_code VALUES(${index},'${code}','${codeMap[code]}');`;
	fileLines.push(line);
	index += 1;
}
let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream(
	'../../../../tables/V0.0.1.4.12__mho_home_based_business_indicator_code.sql'
);
file.on('error', function (err) {
	/* error handling */
});
fileLines.forEach(function (v) {
	file.write(v + '\n');
});
file.end();
