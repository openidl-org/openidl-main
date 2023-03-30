fs = require('fs')

let codeMap = require('../../simple/ca_privatePassengerDriversTrainingGoodStudentCodes.json');
let fileLines = []
let tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ca_private_passenger_drivers_training_good_student_code (
    id INT,
    code VARCHAR,
    driversTraining VARCHAR,
    goodStudentDiscount VARCHAR
);

IF NOT EXISTS (SELECT * FROM ca_private_passenger_drivers_training_good_student_code) THEN `
fileLines.push(tableDDL)
 
let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    console.log(code)
    let data = codeMap[code];
    //let driversTraining = data.driversTraining;
    //let goodStudentDiscount = data.goodStudentDiscount;
    let driversTraining = data['driversTraining'];
    let goodStudentDiscount = data['goodStudentDiscount'];
    console.log(driversTraining)
    console.log(goodStudentDiscount)
    line = `    INSERT INTO ca_private_passenger_drivers_training_good_student_code VALUES(${index},'${code}','${driversTraining}','${goodStudentDiscount}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)


var file = fs.createWriteStream('../../../../tables/V0.0.1.2.20__ca_private_passenger_drivers_training_good_student_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();


