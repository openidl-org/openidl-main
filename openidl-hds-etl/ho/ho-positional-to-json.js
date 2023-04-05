const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/ho-processor").convertTextRecordsToJson;


const config = require("../config/config.json");
let testPremiumRecordsText = fs.readFileSync(config.homeowners.inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

let save = {'records': jsonPremiumRecords}

fs.writeFileSync(config.homeowners.outbound, JSON.stringify(save));