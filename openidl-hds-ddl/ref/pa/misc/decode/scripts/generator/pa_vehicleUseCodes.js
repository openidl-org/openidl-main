fs = require('fs')

let codeMap = require('../../simple/pa_vehicleUseCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_vehicle_use_code (
    id INT,
    code VARCHAR,
    use VARCHAR,
    commute_distance VARCHAR,
    annual_distance VARCHAR,
    operator VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_vehicle_use_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    //console.log(code)
    let data = codeMap[code];
    //let use = data.use;
    //let commuteDistance = data.commuteDistance;
    let use = data['use'];
    let commuteDistance = data['commuteDistance'];
    let annualDistance = data['annualDistance'];
    let operator = data['operator'];
    //console.log('use:');
    //console.log(use);
    //console.log('commuteDistance:');
    //console.log(commuteDistance);
    //console.log('annualDistance:');
    //console.log(annualDistance);
    //console.log('operator');
    //console.log(operator);
    line = `    INSERT INTO pa_vehicle_use_code VALUES(${index},'${code}','${use}','${commuteDistance}','${annualDistance}','${operator}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../../../../tables/V0.0.1.1.14__pa_vehicle_use_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
