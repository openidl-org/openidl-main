fs = require('fs');

let codeMap = require('../../simple/ca_umuimStackingCodes.json');
let fileLines = [];
let tableDDL = `
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ca_um_uim_stacking_code (
    id INT
    code VARCHAR
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_um_uim_stacking_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap);
let index = 1;
for (let code of codes) {
    let description = codeMap[code]
    //console.log(description);
    line = `    INSERT INTO ca_um_uim_stacking_code VALUES(${index},'${code}','${description}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$`

fileLines.push(end)

var file = fs.createWriteStream('../../../../tables/V0.0.1.2.15__ca_um_uim_stacking_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();