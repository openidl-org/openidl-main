const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/cr-processor").convertTextRecordsToJson;


const config = require("../config/config.json");
let testPremiumRecordsText = fs.readFileSync(config.crime.inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

let save = {'records': jsonPremiumRecords}

fs.writeFileSync(config.crime.outbound, JSON.stringify(save));