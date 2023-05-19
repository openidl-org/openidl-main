const fs = require('fs');

let codeMap = require('../codes/ho_numberOfFamiliesCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ho_number_of_families_code (
    id INT,
    policy_form_code VARCHAR,
    code VARCHAR,
    description VARCHAR,
    type VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM ho_number_of_families_code) THEN `;
fileLines.push(tableDDL);

const policyFormCodes = codeMap.policyFormCodes;
let index = 1;

// Loop over each policy form code
for (let policyFormCode in policyFormCodes) {
  let policyFormSet = policyFormCodes[policyFormCode];
  
  // Loop over the codes within each policy form code set
  for (let key in policyFormSet) {
    let codeItem = policyFormSet[key];
    line = `    INSERT INTO ho_number_of_families_code VALUES (${index}, '${policyFormCode}', '${codeItem.code}', '${codeItem.description}', '${codeItem.type}');`;
    fileLines.push(line);
    index += 1;
  }
}

let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream('../tables/V0.0.1.3.17__ho_number_of_families_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();