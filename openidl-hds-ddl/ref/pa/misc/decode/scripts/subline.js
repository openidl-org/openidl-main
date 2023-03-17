fs = require('fs')

let codeMap = require('../simple/sublineCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_subline_code (
    id INT,
    code VARCHAR,
    name VARCHAR,
    category VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_subline_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    console.log(code)
    let data = codeMap[code];
    let name = data['name'];
    let category = data['category'];
    console.log(name)
    console.log(category)
    line = `    INSERT INTO pa_subline_code VALUES(${index},'${code}','${name}','${category}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../../../tables/V0.0.1.10__pa_subline_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


