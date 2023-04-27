fs = require('fs');

let codeMap = require('../codes/pa_NJPipLimitsDeductibleCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_nj_pip_limits_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM pa_nj_pip_limits_deductible_code) THEN `;
fileLines.push(tableDDL);

const driverOnlyCodes = codeMap.driverOnly;
const driverSpouseCodes = codeMap.driverSpouse;
const driverRelativesCodes = codeMap.driverRelatives;
let index = 1

// loops over driverOnly codes
for (let key in driverOnlyCodes){
    console.log('key in driverOnlyCodes: ' + key);
    let driverOnlyCode = driverOnlyCodes[key];
    line = `    INSERT INTO pa_nj_pip_limits_deductible_code VALUES(${index},'${driverOnlyCode.code}','${driverOnlyCode.description}','${driverOnlyCode.type}');`
    fileLines.push(line)
    index+=1
}

// loops over driverSpouse fees
for (let key in driverSpouseCodes){
  console.log('key in driverSpouseCodes: ' + key);  
  let driverSpouseCode = driverSpouseCodes[key];
  line = `    INSERT INTO pa_nj_pip_limits_deductible_code VALUES(${index},'${driverSpouseCode.code}','${driverSpouseCode.description}','${driverSpouseCode.type}');`
  fileLines.push(line)
  index+=1
}

// loops over driverRelatives fees
for (let key in driverRelativesCodes){
    console.log('key in driverRelativesCodes: ' + key);  
    let driverRelativesCode = driverRelativesCodes[key];
    line = `    INSERT INTO pa_nj_pip_limits_deductible_code VALUES(${index},'${driverRelativesCode.code}','${driverRelativesCode.description}','${driverRelativesCode.type}');`
    fileLines.push(line)
    index+=1
  }
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../tables/V0.0.1.1.36__pa_nj_pip_limits_deductible_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

