fs = require('fs')

let codeMap = require('../../simple/stateCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS state_code (
    id INT,
    abbreviation VARCHAR,
    code VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM state_code) THEN `
fileLines.push(tableDDL)

let abbreviations = codeMap.abbreviations;
// let codes = codeMap.codes;
//console.log(abbreviations);
let index = 1
for (let abbreviation in abbreviations){
    //console.log(`abbr ${abbreviation}`);
    let code = abbreviations[abbreviation]
    //console.log(`code ${code}`);
    line = `    INSERT INTO state_code VALUES(${index},'${abbreviation}','${code}');`
    fileLines.push(line)
    index+=1
}

let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../../../../tables/V0.0.1.1.0__state_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
