const premiumSchema = require("./schemas/personal_auto/personalAutoStatPlan-policy.json");
const lossSchema = require("./schemas/personal_auto/personalAutoStatPlan-claim.json");
const converter = require("./converters/personalAutoConverter").converter;



module.exports.convertTextRecordsToJson = function (recordsText) {
  return convertTextRecordsToJsonUsingSchema(recordsText, premiumSchema, lossSchema);
};

function last(anArray) {
      return anArray [anArray.length - 1];
    }
// iterates through the list of records and converts it to JSON
function convertTextRecordsToJsonUsingSchema(recordsText, premiumSchema, lossSchema) {
  let results = [];
  let uniqueExposures = new Set();
  // let records = recordsText.split('\n').slice(0,10000); //restrict for testing
  let records = recordsText.split('\n')  //oem
  let lastElement = last(records)

  // removes last line if blank
  if (lastElement.length == 0)
      {
        records.pop()
      }
    

  for (let record of records) {
    //transform record
    lcl_result = convertTextRecordToJsonUsingSchema(record, premiumSchema,lossSchema);
    if (lcl_result) {
    uniqueExposures.add(lcl_result.exposure)
    console.log(lcl_result);
    results.push(lcl_result);
  }}
  return results;
}

function getTransactionCode(record, schema) {
  var start = schema.properties["transactionCode"].start;
  var end = start + 1;
  var transactionCode = record.substring(start, end).trim();
  return transactionCode;
}

function getLineOfInsurance(record, schema) {
  var start = schema.properties["lineOfInsurance"].start;
  var end = start + 2;
  var lineOfInsurance = record.substring(start, end).trim();
  return lineOfInsurance;
}
function getSublineCode(record, schema) {
  var start = schema.properties["subline"].start;
  var end = start + 1;
  var subline = record.substring(start, end).trim();
  return subline;
}

function convertTextRecordToJsonUsingSchema(record, premiumSchema, lossSchema) {
  let result = {};
  var transactionCode = getTransactionCode(record, premiumSchema)
  var lineOfInsurance = getLineOfInsurance(record, premiumSchema)
  var subline = getSublineCode(record, premiumSchema)
  let schema = null
  
  // console.log('transaction code: '+transactionCode)
  // console.log('lineOfInsurance code: '+lineOfInsurance)
  // console.log('subline code: '+subline)

  // IF LOI = 56 && subline = 1, use personal auto
  // IF LOI = 56 && subline = 2, use commercial auto
  //let count = 0
  if (lineOfInsurance == '56') {
        if (subline == '1') {
          //count++
          // console.log('PERSONAL AUTO RECORD FOUND!!!')
        
      

  if (transactionCode == '1' || transactionCode == '8'){
    schema = premiumSchema
    // console.log('premium record found')
  }

  if (transactionCode == "2" || transactionCode == "3" || transactionCode == "6" || transactionCode == "7") {
    schema = lossSchema
    // console.log('loss record found')
    
  }
    console.log(record)
    for (let fieldName in schema.properties) {
      let field = schema.properties[fieldName];
      var start = field.start;
      var end = start + field.length;
      var type = field.type;
      var acted = false;

      // checks to make sure the field key exists, prevents out of bounds
      // error on parsing
     
        var value = record.substring(start, end).trim();
        if (value.length > 0){
        if (type == "number") {
          positive = 1;
          console.log(value)
          if (value.charAt(value.length - 1) == "}") {
            value = value.slice(0, -1);
            positive = positive * -1; 
          }
          if (value.charAt(value.length - 1) == "{") {
            value = value.slice(0, -1);
          }

          result[field.name] = Number(value) * positive;
          acted = true;
        }
        if (type == "string") {
          result[field.name] = value;
          acted = true;

        }
        if (type == "date") {
          result[field.name] = value;
          acted = true;
        }
        if (!acted) {
          result[field.name] = "Unhandled Data Type in processor.js";
          result["error"] = true;
        }
      }
    }
  
    return result
  }}}


exports.process = async function (records) {
  let resultRecords = [];

  // each record is a whole file with many actual individual text records in it.
  records.forEach((inputRecord) => {
    let record = inputRecord.body;
    //console.log("We have a new submission");
    //console.log(record)
    let jsonRecords = convertTextRecordsToJsonUsingSchema(record, premiumSchema, lossSchema);
    for (let jsonRecord of jsonRecords) {
      //console.log(jsonRecord);
      resultRecords.push(converter(jsonRecord));
      
    }
  });
  return resultRecords;
};
