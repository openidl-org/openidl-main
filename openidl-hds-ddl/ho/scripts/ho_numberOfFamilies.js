fs = require('fs');

let codeMap = require('../codes/ho_numberOfFamiliesCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_number_of_families_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_number_of_families_code) THEN `;
fileLines.push(tableDDL);

const setACodes = codeMap.setA;
const setBCodes = codeMap.setB;
let index = 1

// loops over setA codes
for (let key in setACodes){
    let setACode = setACodes[key];
    line = `    INSERT INTO ho_number_of_families_code VALUES(${index},'${setACode.code}','${setACode.description}','${setACode.type}','${setACode.category}');`
    fileLines.push(line)
    index+=1
}

// loops over setB codes
for (let key in setBCodes){
  let setBCode = setBCodes[key];
  line = `    INSERT INTO ho_number_of_families_code VALUES(${index},'${setBCode.code}','${setBCode.description}','${setBCode.type}','${setBCode.category}');`
  fileLines.push(line)
  index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../tables/V0.0.1.3.17__ho_number_of_families_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

