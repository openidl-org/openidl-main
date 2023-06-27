const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/ho-processor").convertTextRecordsToJson;


const config = require("../config/config.json");


let inbound = '/Users/peterantley/code/olga/mock-react-data/PA_HO_50_P&C_Sanitized.txt'
let outbound = '/Users/peterantley/code/olga/mock-react-data/HO_100_P&C.json'

let testPremiumRecordsText = fs.readFileSync(inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

let save = {'records': jsonPremiumRecords}

fs.writeFileSync(outbound, JSON.stringify(save));