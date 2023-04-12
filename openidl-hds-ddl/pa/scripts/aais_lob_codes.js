fs = require('fs')
let codeMap = require('../codes/openidl_lob_code.json')




function buildAuto() {
	let id = 1;
	let multi = codeMap['56'];
    //console.table(multi)
    
	
        
	for (let code of multi){
			//console.log(code)
			line = `    INSERT INTO openidl_lob_code(id,name,aais_code,aais_subline) VALUES(${id},'${code.name}','56','${code.sublineCode}');`;
			tableLines.push(line)
            //console.log(line);
			id += 1;
            
		
	}
	return id;
}
let tableLines = []
tableLines.push(`DO $$

BEGIN

CREATE TABLE IF NOT EXISTS openidl_lob_code (
    id INT,
    name VARCHAR,
    code VARCHAR,
    description VARCHAR,
	aais_code varchar,
	aais_subline varchar,
	effective_date date not null default '1900-01-01',
    expiration_date date not null default '9999-12-31'
);
IF NOT EXISTS (SELECT * FROM openidl_lob_code) THEN`)

buildAuto()

tableLines.push(`END IF;

END $$
`)

// for (let line of tableLines){
//     console.log(line)
// }

var file = fs.createWriteStream('../tables/V0.0.1.1.1__openidl_lob_code.sql');
file.on('error', function(err) { /* error handling */ });
tableLines.forEach(function(v) { file.write(v + '\n'); });
file.end();
