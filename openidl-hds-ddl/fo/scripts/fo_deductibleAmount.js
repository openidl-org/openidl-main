fs = require('fs');

let codeMap = require('../codes/fo_deductibleAmountCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS fo_deductible_amount_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM fo_deductible_amount_code) THEN `;
fileLines.push(tableDDL);

const flatCodes = codeMap.flat;
const percentageCodes = codeMap.percentage;
let index = 1

// loops over flat fees
for (let key in flatCodes){
    let flatCode = flatCodes[key];
    line = `    INSERT INTO fo_deductible_amount_code VALUES(${index},'${flatCode.code}','${flatCode.description}','${flatCode.type}');`
    fileLines.push(line)
    index+=1
}

// loops over percentage fees
for (let key in percentageCodes){
  let percentageCode = percentageCodes[key];
  line = `    INSERT INTO fo_deductible_amount_code VALUES(${index},'${percentageCode.code}','${percentageCode.description}','${percentageCode.type}');`
  fileLines.push(line)
  index+=1
}

let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream(
	'../tables/V0.0.1.6.5__fo_deductible_amount_code.sql'
);
file.on('error', function (err) {
	/* error handling */
});
fileLines.forEach(function (v) {
	file.write(v + '\n');
});
file.end();


