fs = require('fs');

let codeMap = require('../../simple/ho_policyFormCodes.json');
let fileLines = [];
let tableDDL = `
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ho_policy_form_code (
    id INT,
    code VARCHAR,
    type VARCHAR,
    category VARCHAR,
    reporting_form VARCHAR,
    reporting_category VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_policy_form_code) THEN `
fileLines.push(tableDDL)

let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    console.log('code: '+code)
    let data = codeMap[code];
    let type = data['type'];
    let category = data['category'];
    let reportingForm = data['reportingForm'];
    let reportingCategory = data['reportingCategory'];
    console.log('type: '+type);
    console.log('category: '+category);
    console.log('reportingForm: '+reportingForm);
    console.log('reportingCategory: '+reportingCategory);
    line = `    INSERT INTO ho_policy_form_code VALUES(${index},'${code}','${type}','${category}','${reportingForm}','${reportingCategory}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../../../../tables/V0.0.1.3.20__ho_policy_form_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();