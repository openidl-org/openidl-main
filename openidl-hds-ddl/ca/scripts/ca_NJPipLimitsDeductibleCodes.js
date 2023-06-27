fs = require('fs');

let codeMap = require('../codes/ca_NJPipLimitsDeductibleCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_nj_pip_limits_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ca_nj_pip_limits_deductible_code) THEN `;
fileLines.push(tableDDL);

const driverOnlyCodes = codeMap.driverOnly;
const driverSpouseCodes = codeMap.driverSpouse;
const driverRelativesCodes = codeMap.driverRelatives;
let index = 1

// loops over driverOnly codes
for (let key in driverOnlyCodes){
    let driverOnlyCode = driverOnlyCodes[key];
    line = `    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(${index},'${driverOnlyCode.code}','${driverOnlyCode.description}','${driverOnlyCode.type}');`
    fileLines.push(line)
    index+=1
}

// loops over driverSpouse codes
for (let key in driverSpouseCodes){ 
  let driverSpouseCode = driverSpouseCodes[key];
  line = `    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(${index},'${driverSpouseCode.code}','${driverSpouseCode.description}','${driverSpouseCode.type}');`
  fileLines.push(line)
  index+=1
}

// loops over driverRelatives codes
for (let key in driverRelativesCodes){ 
    let driverRelativesCode = driverRelativesCodes[key];
    line = `    INSERT INTO ca_nj_pip_limits_deductible_code VALUES(${index},'${driverRelativesCode.code}','${driverRelativesCode.description}','${driverRelativesCode.type}');`
    fileLines.push(line)
    index+=1
  }
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../tables/V0.0.1.2.36__ca_nj_pip_limits_deductible_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

