fs = require('fs');

let codeMap = require('../../simple/pa_vehiclePerformanceCodes.json');
let fileLines = [];
let tableDDL = `
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS pa_vehicle_performance_code (
    id INT,
    code VARCHAR,
    description VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_vehicle_performance_code) THEN `;
fileLines.push(tableDDL);

let codes = Object.keys(codeMap);
let index = 1;
for (let code of codes) {
    let description = codeMap[code]
    //console.log(description);
    line = `    INSERT INTO pa_vehicle_performance_code VALUES(${index},'${code}','${description}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$`

fileLines.push(end)

var file = fs.createWriteStream('../../../../tables/V0.0.1.1.12__pa_vehicle_performance_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();