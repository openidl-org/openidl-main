const fs = require("fs");
const convertToJson =
  require("../../openidl-etl-statplan-processor/ca-processor").convertTextRecordsToJson;


const config = require("../config/config.json");
let testPremiumRecordsText = fs.readFileSync(config.commercialAuto.inbound, "utf-8");
let jsonPremiumRecords = convertToJson(testPremiumRecordsText);
console.log(jsonPremiumRecords.length)

//let save = {'records': jsonPremiumRecords.slice(0,10)}
let save = {'records': jsonPremiumRecords}

fs.writeFileSync(config.commercialAuto.outbound, JSON.stringify(save));