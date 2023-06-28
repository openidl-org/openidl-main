const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/cp-processor").convertTextRecordsToJson;


const config = require("../config/config.json");
let testPremiumRecordsText = fs.readFileSync(config.commercialProperties.inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

let save = {'records': jsonPremiumRecords}

fs.writeFileSync(config.commercialProperties.outbound, JSON.stringify(save));