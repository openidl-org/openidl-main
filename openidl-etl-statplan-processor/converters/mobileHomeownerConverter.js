const crypto = require("crypto");
const stateCodes = require("./reference/mobile-homeowners/stateCodes.json");
const areaIndicator = require("./reference/mobile-homeowners/areaIndicator.json");
const transactionCodes = require("./reference/mobile-homeowners/transactionCodes.json");
const annualStatementLineOfBusiness = require("./reference/mobile-homeowners/annualStatementLineOfBusiness.json");
const programCodes = require("./reference/mobile-homeowners/programCodes.json");
const policyFormCode = require("./reference/mobile-homeowners/policyFormCode.json");
const deductibleType = require("./reference/mobile-homeowners/deductibleType.json");
const deductibleAmount = require("./reference/mobile-homeowners/deductibleAmount.json");
const windstormOrHailCoverageDeductibleAmount = require("./reference/mobile-homeowners/windstormOrHailDeductible.json");
const classCodes = require("./reference/mobile-homeowners/classCodes.json");
const fireCodes = require("./reference/mobile-homeowners/fireProtectionCodes.json");
const escapedLiquidFuelCoverageProperty = require("./reference/mobile-homeowners/escapedLiquidFuelCoverageProperty.json");
const escapedLiquidFuelAndLeadCoverageLiability = require("./reference/mobile-homeowners/escapedLiquidFuelAndLeadCoverageLiability.json");
const occupancyCodes = require("./reference/mobile-homeowners/occupancyCodes.json");
const hbbIndicator = require("./reference/mobile-homeowners/homeBasedBusinessIndicator.json");
const ordinanceOrLawCoverage = require("./reference/mobile-homeowners/ordinanceOrLawCoverage.json");
const theftDeductibleAmount = require("./reference/mobile-homeowners/theftDeductibleAmount.json");
const moldDamageCoverageCode = require("./reference/mobile-homeowners/moldDamageCoverage.json");
const poolCode = require("./reference/mobile-homeowners/poolCode.json");
const causeOfLoss = require("./reference/mobile-homeowners/causeOfLoss.json");
const tieDown = require("./reference/mobile-homeowners/tieDown.json");
const lossSettlementIndicator = require("./reference/mobile-homeowners/lossSettlementIndicator.json")
const { get } = require("http");

//Go Back and Adjust This!!!!
const stateExceptionCodes = require("./reference/mobile-homeowners/stateExceptionCodes.json")



const NOT_PROVIDED = "Not Provided";

function hashString(text) {
  let shasum = crypto.createHash("sha1");
  shasum.update(text);
  return shasum.digest("hex");
}

function convertAccountingDate(dateString) {
  //return `202${dateString.substring(2, 3)}-${dateString.substring(0, 2)}-15`; //correct
  return `200${dateString.substring(2, 3)}-${dateString.substring(0, 2)}-15`; //for old export
}

console.log('Hello World')

function convertAccidentDate(dateString) {
  let year = parseInt(dateString.substring(4, 6)) + 2000;
  
  let thisYear = new Date().getFullYear();
  let century = thisYear < year ? "19" : "20";
  return `${century}${dateString.substring(4, 6)}-${dateString.substring(0, 2)}-${dateString.substring(2, 4)}`;
}


function convertDate(dateString) {
  if (!dateString) return "";
  return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6)}`;
}

convertStringToFloat = (numberString) => {
  let num = numberString.toString().trim();

  if (num.length === 0) {
    return 0;
  } else if (num.includes(".")) {
    return parseFloat(num);
  }
  let code = num[num.length - 1];
  let base = num.substring(0, num.length - 1);
  newLastDigit = numberTypeCodes[code].digit;
  let multiplier = numberTypeCodes[code].multiplier;
  return (multiplier * parseFloat(base + newLastDigit)) / 100;
};

function decodeStateException(outputObject, inputRecord, exceptionName, state) {
  let stateExceptionObject = stateExceptionCodes[exceptionName];
  if (!stateExceptionObject) return;
  let stateException = stateExceptionObject[state];
  if (!stateException) return;
  if (stateException.type === "code")
    object[stateException.hdsName] =
      stateException.codes[inputRecord[stateException.statPlanName]];
  if (stateException.type === "copy")
    object[stateException.hdsName] = inputRecord[stateException.statPlanName];
}

function addMonths(date, months) {
  //var d = date.getDate();
  date.setMonth(date.getMonth() + months);
  date.setDate(date.getDay() - 2);
  return date;
}

function makeDate(datestr) {
  let date_array = datestr.split("-");
  let year = parseInt(date_array[0]);
  let month = parseInt(date_array[1]) - 1; //make date is zero indexed
  let day = parseInt(date_array[2]);
  let date = new Date(year, month, day);
  return date;
}

function addTerm(accountingDate, term) {
  let accountingArray = accountingDate.split("-");
  let month = parseInt(accountingArray[1]);
  let newMonth = month + term;
  let newYear = parseInt(accountingArray[0]);
  if (newMonth > 12) {
    newMonth -= 12;
    newYear += 1;
  }
  let newDate = `${newYear}-${newMonth}-15`;

  return newDate;
}

// ******************************************************************
// ******************************************************************
// Function to eliminate the 'undefined' values if they do not apply
// ******************************************************************
// ******************************************************************
// function getValueFromJson(jsonRecord, key) {
//   if (jsonRecord.hasOwnProperty(key)) {
//     return jsonRecord[key]
//   }
// }


module.exports.converter = function (jsonRecord) {
  let convertedRecord = {
    Policy: {},
    Claim: {},
    Coverage: {},
    Dwelling: {},
  };

  let policy = convertedRecord.Policy;
  let claim = convertedRecord.Claim;
  let coverage = convertedRecord.Coverage;
  let dwelling = convertedRecord.Dwelling;

  convertedRecord.createdTime = new Date().toISOString();
  // Line of Insurance
  policy.LineOfInsurance = "Mobile Homeowners";
  policy.LineOfInsuranceCode = jsonRecord.lineOfInsurance;

  // Accounting Date
  policy.AccountingDate = convertAccountingDate(jsonRecord.accountingDate);

  // Company Code
  policy.CompanyCode = jsonRecord.companyCode;
  policy.CompanyID = jsonRecord.companyCode;

  // State Code
  policy.State = stateCodes.codes[jsonRecord.stateCode];

  // County Code
  policy.CountyCode = jsonRecord.countyCode;

  // Area Indicator
  policy.AreaIndicator = jsonRecord.areaIndicator.trim()
    ? areaIndicator[jsonRecord.areaIndicator]
    : NOT_PROVIDED

  // Territory Code
  policy.Territory = jsonRecord.territory;

  // Transaction Code
  convertedRecord.RecordType = jsonRecord.transactionCode.trim()
    ? transactionCodes[jsonRecord.transactionCode].type
    : NOT_PROVIDED;
  convertedRecord.TransactionType = jsonRecord.transactionCode.trim()
    ? transactionCodes[jsonRecord.transactionCode].name
    : NOT_PROVIDED;
  convertedRecord.TransactionCode = jsonRecord.transactionCode;

  // Premium Amount / Loss Amount
  // added for earned premium
  if (jsonRecord.transactionCode.trim()) {
    if (convertedRecord.RecordType === "Premium") {
      policy.PremiumAmount = convertStringToFloat(jsonRecord.premiumAmount);
      coverage.MonthlyPremiumAmount = parseFloat(
        (policy.PremiumAmount / jsonRecord.monthsCovered).toFixed(4)
      );
    } else {
      claim.LossAmount = convertStringToFloat(jsonRecord.lossAmount);
    }
  }

  // ***figure out exposure/claim count and how to write those codes in json or if we even need to
  coverage.Exposure = jsonRecord.exposure;
  claim.ClaimCount = parseInt(jsonRecord.claimCount);
  
  // Annual Statement Line of Business
  policy.AnnualStatementLineOfBusiness = jsonRecord.annualStatementLineOfBusiness.trim()
  ? annualStatementLineOfBusiness[jsonRecord.annualStatementLineOfBusiness]
  : NOT_PROVIDED;

  // Program Code
  policy.Program = jsonRecord.programCode.trim()
    ? programCodes[jsonRecord.programCode]
    : NOT_PROVIDED;

  // Policy Form
  policy.PolicyFormCode = jsonRecord.policyForm;
  policy.PolicyCategory = jsonRecord.policyForm.trim()
    ? policyFormCode[jsonRecord.policyForm].category
    : NOT_PROVIDED;
  policy.PolicyType = jsonRecord.policyForm.trim()
    ? policyFormCode[jsonRecord.policyForm].type
    : NOT_PROVIDED;
  policy.ReportingForm = jsonRecord.policyForm.trim()
    ? policyFormCode[jsonRecord.policyForm].reportingForm
    : NOT_PROVIDED
    policy.ReportingCategory = jsonRecord.policyForm.trim()
    ? policyFormCode[jsonRecord.policyForm].reportingCategory
    : NOT_PROVIDED

  // Loss Settlement Indicator 
  convertedRecord.LossSettlementIndicator = jsonRecord.lossSettlementIndicator;
  convertedRecord.LossSettlementIndicatorDescription = jsonRecord.lossSettlementIndicator.trim()
    ? lossSettlementIndicator[jsonRecord.lossSettlementIndicator]
    : NOT_PROVIDED


  // Primary Property Amount of Insurance
  convertedRecord.PrimaryPropertyAmountOfInsurance = jsonRecord.primaryPropertyAmountOfInsurance.trim();
  
  // Deductible Type
  policy.DeductibleType = jsonRecord.deductibleType.trim()
    ? deductibleType[jsonRecord.deductibleType]
    : NOT_PROVIDED;

  // Deductible Amount
  let dedAmt = deductibleAmount.deductibleAmount[policy.deductibleAmount];
  if (!dedAmt) {
    dedAmt = deductibleAmount.deductibleAmount["flat"];
  }
  policy.DeductibleAmount = dedAmt[jsonRecord.deductibleAmount];

  // Effective Date / Expiration Date
  // added for earned premium
  policy.EffectiveDate = convertDate(jsonRecord.effectiveDate);
  policy.ExpirationDate = convertDate(jsonRecord.expirationDate);

  // Months Covered / Policy Number / Accounting Term Expiration 
  if (convertedRecord.RecordType === "Premium") {
    coverage.MonthsCovered = parseInt(jsonRecord.monthsCovered);
    policy.PolicyNumber = jsonRecord.policyNumber.trim();
    policy.AccountingTermExpiration = addTerm(
      policy.AccountingDate,
      coverage.MonthsCovered
    );
  }

  // Claim Number / Claim Identifier
  if (jsonRecord.claimIdentifier) {
    claim.ClaimNumber = jsonRecord.claimNumber
    claim.ClaimIdentifier = jsonRecord.claimIdentifier
  }

  // Windstorm or Hail Coverage / Deductible
  policy.WindHailDeductible = jsonRecord.windstormOrHailCoverageDeductibleAmount.trim()
    ? windstormOrHailCoverageDeductibleAmount[jsonRecord.windstormOrHailCoverageDeductibleAmount]
    : NOT_PROVIDED;

  // ******************************************************************
  // ******************************************************************
  //                          Class Code
  // figure out how to get it to only display watercraft if applicable
  // ******************************************************************
  // ******************************************************************

  // for (const[key, value] of Object.entries(jsonRecord)) {
  //   let name = getValueFromJson(value, "name")
  //   let type = getValueFromJson(value, "type")
  //   let category = getValueFromJson(value, "category")
  //   let subcategory = getValueFromJson(value, "subcategory")
  //   let watercraftSize = getValueFromJson(value, "watercraftSize")
  //   let engine = getValueFromJson(value, "engine")
  //   if(name) {
  //     policy.ClassCodeName = classCodes[key]
  //     ? classCodes[key].name.trim()
  //     : NOT_PROVIDED
  //     // policy.ClassCodeName = jsonRecord.classCode.trim()
  //     // ? classCodes[jsonRecord.classCode].name
  //     // : NOT_PROVIDED
  //   }
  //   if(type) {
  //     policy.ClassCodeType = jsonRecord.classCode.trim()
  //     ? classCodes[jsonRecord.classCode].type
  //     : NOT_PROVIDED
  //   }
  //   if(category) {
  //     policy.ClassCodeCategory = jsonRecord.classCode.trim()
  //     ? classCodes[jsonRecord.classCode].category
  //     : NOT_PROVIDED
  //   }
  //   if(subcategory) {
  //     dwelling.Subcategory = jsonRecord.classCode.trim()
  //     ? classCodes[jsonRecord.classCode].subcategory
  //     : NOT_PROVIDED
  //   }
  //   if(watercraftSize) {
  //     dwelling.WatercraftSize = jsonRecord.classCode.trim()
  //     ? classCodes[jsonRecord.classCode].watercraftSize
  //     : NOT_PROVIDED
  //   }
  //   if(engine) {
  //     dwelling.EngineSize = jsonRecord.classCode.trim()
  //     ? classCodes[jsonRecord.classCode].engine
  //     : NOT_PROVIDED
  //   }
  // console.log(`Name for key ${key}: ${name}`)
  // console.log(`Category for key ${key}: ${category}`);
  // console.log(`Engine for key ${key}: ${engine}`);
  
  // Class Code
  policy.ClassCode = jsonRecord.classCode
  policy.ClassCodeName = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].name
    : NOT_PROVIDED;
  policy.ClassCodeType = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].type
    : NOT_PROVIDED;
  policy.ClassCodeCategory = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].category
    : NOT_PROVIDED;
  dwelling.Subcategory = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].subcategory
    : NOT_PROVIDED
  dwelling.WatercraftSize = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].watercraftSize
    : NOT_PROVIDED;
  dwelling.EngineSize = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].engine
    : NOT_PROVIDED
  // console.log(classCodes[jsonRecord.classCode].name)
  // console.log(classCodes[jsonRecord.classCode].category)
  // console.log(classCodes[jsonRecord.classCode].engine)
  

  // Fire Protection Code
  policy.FireCode = jsonRecord.fireProtectionCode
  policy.FireCodeName = jsonRecord.fireProtectionCode.trim()
    ? fireCodes[jsonRecord.fireProtectionCode].name
    : NOT_PROVIDED;
  policy.FireCodeType = jsonRecord.fireProtectionCode.trim()
    ? fireCodes[jsonRecord.fireProtectionCode].type
    : NOT_PROVIDED;
  policy.FireCodeCategory = jsonRecord.fireProtectionCode.trim()
    ? fireCodes[jsonRecord.fireProtectionCode].category
    : NOT_PROVIDED;

  // Year of Manufacture
  dwelling.YearOfManufacture = jsonRecord.yearOfManufacture;

  // Liability Limit
  convertedRecord.LiabilityLimit = jsonRecord.liabilityLimit;
  
  // Medical Payments Limit
  coverage.MedicalPayments = jsonRecord.medicalPayments;

  // Escaped Liquid Fuel Coverage - Property
  convertedRecord.EsLiqFuelProperty = jsonRecord.escapedLiquidFuelCoverageProperty
  convertedRecord.EsLiqFuelPropertyName = jsonRecord.escapedLiquidFuelCoverageProperty.trim()
    ? escapedLiquidFuelCoverageProperty[jsonRecord.escapedLiquidFuelCoverageProperty].name
    : NOT_PROVIDED;
  convertedRecord.EsLiqFuelPropertyType = jsonRecord.escapedLiquidFuelCoverageProperty.trim()
    ? escapedLiquidFuelCoverageProperty[jsonRecord.escapedLiquidFuelCoverageProperty].type
    : NOT_PROVIDED;

  // Escaped Liquid Fuel and Lead Coverage Liability
  convertedRecord.EsLiqFuelLiability = jsonRecord.escapedLiquidFuelAndLeadCoverageLiability
  convertedRecord.EsLiqFuelLiabilityName = jsonRecord.escapedLiquidFuelAndLeadCoverageLiability.trim()
    ? escapedLiquidFuelAndLeadCoverageLiability[jsonRecord.escapedLiquidFuelAndLeadCoverageLiability].name
    : NOT_PROVIDED;
  convertedRecord.EsLiqFuelLiabilityType = jsonRecord.escapedLiquidFuelAndLeadCoverageLiability.trim()
    ? escapedLiquidFuelAndLeadCoverageLiability[jsonRecord.escapedLiquidFuelAndLeadCoverageLiability].type
    : NOT_PROVIDED;


  // Occupancy Code
  convertedRecord.OccupancyCode = jsonRecord.occupancyCode
  convertedRecord.OccupancyCodeName = jsonRecord.occupancyCode.trim()
    ? occupancyCodes[jsonRecord.occupancyCode].name
    : NOT_PROVIDED;
  convertedRecord.OccupancyCodeType = jsonRecord.occupancyCode.trim()
    ? occupancyCodes[jsonRecord.occupancyCode].type
    : NOT_PROVIDED;

  // Home Based Business Indicator
  dwelling.HomeBasedBusinessIndicator = jsonRecord.homeBasedBusinessIndicator
  dwelling.HBBIndicatorDescription = jsonRecord.homeBasedBusinessIndicator.trim()
    ? hbbIndicator[jsonRecord.homeBasedBusinessIndicator]
    : NOT_PROVIDED
  
  // Tie Down
  coverage.TieDownCode = jsonRecord.tieDown
  coverage.TieDown = jsonRecord.tieDown.trim()
    ? tieDown[jsonRecord.tieDown]
    : NOT_PROVIDED

  // Ordinance or Law Coverage
  coverage.OrdinanceOrLawCoverage = jsonRecord.ordinanceOrLawCoverage.trim()
    ? ordinanceOrLawCoverage[jsonRecord.ordinanceOrLawCoverage]
    : NOT_PROVIDED

  // Theft Deductible Amount
  coverage.TheftDeductibleAmount = jsonRecord.theftDeductibleAmount.trim()
    ? theftDeductibleAmount[jsonRecord.theftDeductibleAmount]
    : NOT_PROVIDED

  // Secondary Property Amount of Insurance
  coverage.SecondaryPropertyAmountOfInsurance = jsonRecord.secondaryPropertyAmountOfInsurance

  // Mold Damage Coverage Liability
  coverage.MoldDamageCoverageCode = jsonRecord.moldDamageCoverageCode
  coverage.MoldDamageCoverageProperty = jsonRecord.moldDamageCoverageCode.trim()
    ? moldDamageCoverageCode[jsonRecord.moldDamageCoverageCode].property
    : NOT_PROVIDED
  coverage.MoldDamageCoverageLiability = jsonRecord.moldDamageCoverageCode.trim()
    ? moldDamageCoverageCode[jsonRecord.moldDamageCoverageCode].liability
    : NOT_PROVIDED
  coverage.MoldDamageCoverageNotes = jsonRecord.moldDamageCoverageCode.trim()
    ? moldDamageCoverageCode[jsonRecord.moldDamageCoverageCode].notes
    : NOT_PROVIDED

  // Pool Code
  coverage.PoolCode = jsonRecord.poolCode
  coverage.PoolCodeDescription = jsonRecord.poolCode.trim()
    ? poolCode[jsonRecord.poolCode]
    : NOT_PROVIDED

  
  // Months Covered
  // Weird instructions for how to code months greater than 12. Just need to know how to input this into json.
  coverage.MonthsCovered = jsonRecord.monthsCovered;

  // Cause of Loss
  coverage.CauseOfLossCode = jsonRecord.causeOfLoss;
  coverage.CauseOfLoss = jsonRecord.causeOfLoss
    ? causeOfLoss[jsonRecord.causeOfLoss].name
    : NOT_PROVIDED
  coverage.CauseOfLossType = jsonRecord.causeOfLoss
    ? causeOfLoss[jsonRecord.causeOfLoss].type
    : NOT_PROVIDED

  // Accident Date
  if (jsonRecord.accidentDate) {
    claim.AccidentDate = convertAccidentDate(jsonRecord.accidentDate)
  }
  
  // Zip Code
  policy.ZipCode = jsonRecord.zipCode.trim()

  // Zip Code Suffix
  policy.ZipCodeSuffix = jsonRecord.zipCodeSuffix.trim()


  // State Exception Example from Auto

  // State Exception A
  // decodeStateException(coverage, jsonRecord, "stateExceptionA", policy.State);
  // decodeStateException(coverage, jsonRecord, "stateExceptionB", policy.State);

  // Limited Coding - Loss Transaction (not showing up, probably because loss not working)
  policy.LimitedCodingLossTransaction = jsonRecord.limitedCodingLossTransaction

  // State Exception Code

  
  // Company Use
  if (jsonRecord.companyUse) {
    convertedRecord.CompanyUse = jsonRecord.companyUse.trim();
  }

  
  //console.table(convertedRecord.Policy);
  //console.table(convertedRecord.Claim);
  //console.table(convertedRecord.Coverage);
  //console.table(convertedRecord.Dwelling);
  return convertedRecord;
};
