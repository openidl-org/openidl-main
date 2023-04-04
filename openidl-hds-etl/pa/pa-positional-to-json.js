const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/personal-auto-processor").convertTextRecordsToJson;


const config = require("../config/config.json");
let testPremiumRecordsText = fs.readFileSync(config.personalAuto.inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

//let save = {'records': jsonPremiumRecords.slice(0,10)}
let save = {'records': jsonPremiumRecords}

fs.writeFileSync(config.personalAuto.outbound, JSON.stringify(save));