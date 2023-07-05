const premiumSchema = require("./schemas/inland_marine/inlandmarineStatPlan-policy.json");
const lossSchema = require("./schemas/inland_marine/inlandmarineStatPlan-claim.json");
// const converter = require("./converters/farmownerConverter").converter;



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
  let records = recordsText.split('\n');
  let lastElement = last(records)

  // removes last line if blank
  if (lastElement.length == 0)
      {
        records.pop()
      }
    

  for (let record of records) {
    //transform record
    lcl_result = convertTextRecordToJsonUsingSchema(record, premiumSchema,lossSchema);
    uniqueExposures.add(lcl_result.exposure)
    console.log(lcl_result);
    results.push(lcl_result);
  }
  return results;
}
// This uses the same codes as auto
function getTransactionCode(record, schema) {
  var start = schema.properties["transactionCode"].start;
  var end = start + 1;
  var transactionCode = record.substring(start, end).trim();
  return transactionCode;
}

// *** converts record to json, even a single record
function convertTextRecordToJsonUsingSchema(record, premiumSchema, lossSchema) {
  let result = {};
  var transactionCode = getTransactionCode(record, premiumSchema)
  let schema = null
  
  console.log('transaction code: '+transactionCode)

  if (transactionCode == '1' || transactionCode == '8'){
    schema = premiumSchema
    console.log('premium record found')
    console.log(record)
  }

  if (transactionCode =="2" || transactionCode =="3" || transactionCode =="6" || transactionCode =="7") {
    schema = lossSchema
    console.log('loss record found')
    console.log(record)

  }

    for (let fieldName in schema.properties) {
      let field = schema.properties[fieldName];
      var start = field.start;
      var end = start + field.length;
      var type = field.type;
      var acted = false;

      // checks to make sure the field key exists, prevents out of bounds
      // error on parsing
      if (record.length > start) {
        var value = record.substring(start, end).trim();
        if (type == "number") {
          positive = 1;
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
  }


exports.process = async function (records) {
  let resultRecords = [];

  // each record is a whole file with many actual individual text records in it.
  records.forEach((inputRecord) => {
    let record = inputRecord.body;
    //console.log("We have a new submission");
    //console.log(record)
    let jsonRecords = convertTextRecordsToJsonUsingSchema(record, premiumSchema, lossSchema);
    // for (jsonRecord of jsonRecords) {
    //   //console.log(jsonRecord);
    //   resultRecords.push(converter(jsonRecord));
    // }
  });
  return resultRecords;
};
