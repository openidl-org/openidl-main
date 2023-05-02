fs = require('fs');

let codeMap = require('../codes/ho_lossSettlementIndicatorCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_loss_settlement_indicator_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_loss_settlement_indicator_code) THEN `;
fileLines.push(tableDDL);

const coverageACodes = codeMap.coverageA;
const coverageCCodes = codeMap.coverageC;
const coverageAandCCodes = codeMap.coverageAandC;
let index = 1

// loops over coverageA codes
for (let key in coverageACodes){
    let coverageACode = coverageACodes[key];
    line = `    INSERT INTO ho_loss_settlement_indicator_code VALUES(${index},'${coverageACode.code}','${coverageACode.description}','${coverageACode.type}');`
    fileLines.push(line)
    index+=1
}

// loops over coverageC codes
for (let key in coverageCCodes){ 
  let coverageCCode = coverageCCodes[key];
  line = `    INSERT INTO ho_loss_settlement_indicator_code VALUES(${index},'${coverageCCode.code}','${coverageCCode.description}','${coverageCCode.type}');`
  fileLines.push(line)
  index+=1
}

// loops over coverageAandC codes
for (let key in coverageAandCCodes){ 
    let coverageAandCCode = coverageAandCCodes[key];
    line = `    INSERT INTO ho_loss_settlement_indicator_code VALUES(${index},'${coverageAandCCode.code}','${coverageAandCCode.description}','${coverageAandCCode.type}');`
    fileLines.push(line)
    index+=1
  }
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../tables/V0.0.1.3.12__ho_loss_settlement_indicator_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();

