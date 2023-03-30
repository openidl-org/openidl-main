fs = require('fs');

let codeMap = require('../../simple/ho_ordinanceOrLawCoverageCodes.json');
let fileLines = [];
let tableDDL = `
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ho_ordinance_or_law_coverage_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_ordinance_or_law_coverage_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap);
let index = 1;
for (let code of codes) {
    console.log('code: '+code)
    line = `    INSERT INTO ho_ordinance_or_law_coverage_code VALUES(${index},'${code}','${codeMap[code]}');`;
    fileLines.push(line);
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../../../../tables/V0.0.1.3.19__ho_ordinance_or_law_coverage_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

