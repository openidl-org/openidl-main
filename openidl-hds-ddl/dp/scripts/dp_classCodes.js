fs = require('fs')

let codeMap = require('../codes/dp_classCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS dp_class_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    type VARCHAR,
    category_code VARCHAR
);

IF NOT EXISTS (SELECT * FROM dp_class_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    let data = codeMap[code];
    let name = data['name'];
    let type = data['type'];
    let categoryCode = data['code']
    line = `    INSERT INTO dp_class_code VALUES(${index},'${code}','${name}','${type}','${categoryCode}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.5.6__dp_class_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


