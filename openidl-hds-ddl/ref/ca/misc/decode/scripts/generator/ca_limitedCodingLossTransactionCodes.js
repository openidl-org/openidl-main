fs = require('fs')

let codeMap = require('../../simple/ca_limitedCodingLossTransactionCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_limited_coding_loss_transaction_code (
    id INT,
    code VARCHAR,
    description VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_limited_coding_loss_transaction_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    console.log(code)
    line = `    INSERT INTO ca_limited_coding_loss_transaction_code VALUES(${index},'${code}','${codeMap[code]}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../../../../tables/V0.0.1.2.27__ca_limited_coding_loss_transaction_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
