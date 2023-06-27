const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/gl-processor").convertTextRecordsToJson;


const config = require("../config/config.json");
let testPremiumRecordsText = fs.readFileSync(config.generalLiability.inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

let save = {'records': jsonPremiumRecords}

fs.writeFileSync(config.generalLiability.outbound, JSON.stringify(save));