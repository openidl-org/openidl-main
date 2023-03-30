fs = require('fs')

let codeMap = require('../codes/pa_privatePassengerDriversTrainingGoodStudentCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS pa_private_passenger_drivers_training_good_student_code (
    id INT,
    code VARCHAR,
    drivers_training VARCHAR,
    good_student_discount VARCHAR,
    effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);

IF NOT EXISTS (SELECT * FROM pa_private_passenger_drivers_training_good_student_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    //console.log(code)
    let data = codeMap[code];
    //let driversTraining = data.driversTraining;
    //let goodStudentDiscount = data.goodStudentDiscount;
    let driversTraining = data['driversTraining'];
    let goodStudentDiscount = data['goodStudentDiscount'];
    //console.log(driversTraining)
    //console.log(goodStudentDiscount)
    line = `    INSERT INTO pa_private_passenger_drivers_training_good_student_code VALUES(${index},'${code}','${driversTraining}','${goodStudentDiscount}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../tables/V0.0.1.1.20__pa_private_passenger_drivers_training_good_student_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


