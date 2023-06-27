const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/fp-processor").convertTextRecordsToJson;


const config = require("../config/config.json");
let testPremiumRecordsText = fs.readFileSync(config.farmProperties.inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

let save = {'records': jsonPremiumRecords}

fs.writeFileSync(config.farmProperties.outbound, JSON.stringify(save));