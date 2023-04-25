fs = require('fs')

let codeMap = require('../codes/dp_majorPerilCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_major_peril_code (
    id INT,
    code VARCHAR,
    type VARCHAR,
    category VARCHAR,
    major_peril VARCHAR,
    major_peril_category VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_major_peril_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    let data = codeMap[code];
    let type = data['type'];
    let category = data['category'];
    let majorPeril = data['majorPeril'];
    let majorPerilCategory = data['majorPerilCategory']
    line = `    INSERT INTO dp_major_peril_code VALUES(${index},'${code}','${type}','${category}','${majorPeril}','${majorPerilCategory}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.5.14__dp_major_peril_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


