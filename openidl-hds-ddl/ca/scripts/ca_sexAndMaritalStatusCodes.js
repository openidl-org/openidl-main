fs = require('fs')

let codeMap = require('../codes/ca_sexAndMaritalStatusCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_sex_and_marital_status_code (
    id INT,
    code VARCHAR,
    marital_status VARCHAR,
    gender VARCHAR,
    principal_secondary VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_sex_and_marital_status_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    //console.log(code)
    let data = codeMap[code];
    let maritalStatus = data['maritalStatus'];
    let gender = data['gender'];
    let principalSecondary = data['principalSecondary']
    //console.log(maritalStatus)
    //console.log(gender)
    //console.log(principalSecondary);
    line = `    INSERT INTO ca_sex_and_marital_status_code VALUES(${index},'${code}','${maritalStatus}','${gender}','${principalSecondary}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.2.19__ca_sex_and_marital_status_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


