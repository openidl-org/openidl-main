fs = require('fs')

let codeMap = require('../codes/state.json').states;
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


let index = 1
for (let row of codeMap){
    //console.log(`abv ${row.abv}`);
    line = `    INSERT INTO state_code VALUES(${index},'${row.abv}','${row.code}');`
    fileLines.push(line)
    index+=1
}

let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.4.0__state_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
