fs = require('fs');

let codeMap =  require('../codes/fo_annualStatementLineOfBusinessCodes.json');
let fileLines = [];
let tableDDL = `
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS fo_annual_statement_line_of_business (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_annual_statement_line_of_business) THEN`;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap);
let index = 1;

for(let code of codes) {
    line = `    INSERT INTO fo_annual_statement_line_of_business VALUES(${index},'${code}', '${codeMap[code]}');`;
    fileLines.push(line);
    index += 1;
}

let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream(
    '../tables/V0.0.1.6.1__fo_annual_statement_line_of_business_code.sql'
);

file.on('error', function (err) {
    /*error handling*/
});

fileLines.forEach(function (v) {
    file.write(v + '\n');
});

file.end();