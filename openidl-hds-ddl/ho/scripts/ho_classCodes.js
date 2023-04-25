const fs = require('fs');

// Load the JSON file
const jsonFile = require('../codes/ho_classCodes.json');

// Set up the SQL statements
const tableName = 'ho_class_code';
const columns = Object.keys(jsonFile[Object.keys(jsonFile)[0]]).join(', ');

let insertStatements = [];

// Loop through the JSON keys and generate the SQL insert statements
for (const key in jsonFile) {
  const values = Object.values(jsonFile[key]).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');
  insertStatements.push(`INSERT INTO ${tableName} (${columns}) VALUES ('${key}', ${values});`);
}

// Write the SQL insert statements to a file
const outputFile = '../tables/V0.0.1.3.2__ho_class_code.sql';
const tableDDL = `
DO $$ 
BEGIN
CREATE TABLE IF NOT EXISTS ${tableName} (
    id VARCHAR,
    ${columns}
);

IF NOT EXISTS (SELECT * FROM ${tableName}) THEN `;

const end = `
END IF;
END $$;`;

const fileContents = tableDDL + insertStatements.join('\n') + end;

fs.writeFile(outputFile, fileContents, function (err) {
  if (err) throw err;
  console.log(`SQL insert statements written to ${outputFile}`);
});