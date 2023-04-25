fs = require('fs');

let codeMap = require('../codes/ho_windstormOrHailDeductibleCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_windstorm_or_hail_deductible_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_windstorm_or_hail_deductible_code) THEN `;
fileLines.push(tableDDL);

const flatCodes = codeMap.flat;
const percentageCodes = codeMap.percentage;
let index = 1

// loops over flat fees
for (let key in flatCodes){
    let flatCode = flatCodes[key];
    line = `    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(${index},'${flatCode.code}','${flatCode.description}','${flatCode.type}');`
    fileLines.push(line)
    index+=1
}

// loops over percentage fees
for (let key in percentageCodes){
  let percentageCode = percentageCodes[key];
  line = `    INSERT INTO ho_windstorm_or_hail_deductible_code VALUES(${index},'${percentageCode.code}','${percentageCode.description}','${percentageCode.type}');`
  fileLines.push(line)
  index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../tables/V0.0.1.3.26__ho_windstorm_or_hail_deductible_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

