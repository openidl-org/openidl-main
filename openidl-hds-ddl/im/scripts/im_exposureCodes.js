fs = require('fs');

const { verify } = require('crypto');
let codeMap = require('../codes/im_exposureCodes.json');
let fileLines = [];
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS im_exposure_code (
    id INT,
    code VARCHAR,
    vehicleLim VARCHAR,
    grossRecipients VARCHAR,
    limitInsurance VARCHAR,
    other VARCHAR,
    effective_date DATE NOT NULL DEFAULT '1900-01-01',
    expiration_date DATE NOT NULL DEFAULT '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM im_exposure_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap);
let index = 1;
for (let code of codes) {
    let data = codeMap[code];
    let vehicleLim = data['vehiclePerLimit'];
    let grossRecipients = data['grossRecipients'];
    let limitInsurance = data['Limit Of Insurance'];
    let other = data['Other'];
	line = `    INSERT INTO im_exposure_code VALUES(${index}, '${code}', '${vehicleLim}', '${grossRecipients}', '${limitInsurance}', '${other}');`;
	fileLines.push(line);
	index += 1;
}
let end = `END IF;
END $$;`;

fileLines.push(end);

var file = fs.createWriteStream(
	'../tables/V0.0.1.8.8__im_exposure_code.sql'
);
file.on('error', function (err) {
	/* error handling */
});
fileLines.forEach(function (v) {
	file.write(v + '\n');
});
file.end();
