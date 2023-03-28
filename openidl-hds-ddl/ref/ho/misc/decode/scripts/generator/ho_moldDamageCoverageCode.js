fs = require('fs');

let codeMap = require('../../simple/ho_moldDamageCoverageCodes.json');
let fileLines = [];
let tableDDL = `
DO $$
BEGIN
CREATE TABLE IF NOT EXISTS ho_mold_damage_coverage_code (
    id INT,
    code VARCHAR,
    property VARCHAR,
    liability VARCHAR,
    notes VARCHAR
);

IF NOT EXISTS (SELECT * FROM ho_mold_damage_coverage_code) THEN `
fileLines.push(tableDDL)

let codes = Object.keys(codeMap)
let index = 1
for (let code of codes){
    console.log('code: '+code)
    let data = codeMap[code];
    let property = data['property'];
    let liability = data['liability'];
    let notes = data['notes'];
    console.log('property: '+property);
    console.log('liability: '+liability);
    console.log('notes: '+notes);
    line = `    INSERT INTO ho_mold_damage_coverage_code VALUES(${index},'${code}','${property}','${liability}','${notes}');`
    fileLines.push(line)
    index+=1
}
let end = `END IF;
END $$;`

fileLines.push(end)

var file = fs.createWriteStream('../../../../tables/V0.0.1.3.15__ho_mold_damage_coverage_code.sql');
file.on('error', function(err) { /* error handling */ });
fileLines.forEach(function(v) { file.write(v + '\n'); });
file.end();