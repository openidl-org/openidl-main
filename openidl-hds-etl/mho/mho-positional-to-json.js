const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/mho-processor").convertTextRecordsToJson;


const config = require("../config/config.json");
let testPremiumRecordsText = fs.readFileSync(config.mobileHomeowners.inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

let save = {'records': jsonPremiumRecords}

fs.writeFileSync(config.mobileHomeowners.outbound, JSON.stringify(save));