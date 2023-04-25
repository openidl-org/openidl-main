const crypto = require("crypto");
const stateCodes = require("./reference/homeowners/stateCodes.json");
const areaIndicator = require("./reference/homeowners/areaIndicator.json");
const transactionCodes = require("./reference/homeowners/transactionCodes.json");
const annualStatementLineOfBusiness = require("./reference/homeowners/annualStatementLineOfBusiness.json");
const programCodes = require("./reference/homeowners/programCodes.json");
const policyFormCode = require("./reference/homeowners/policyFormCode.json");
const deductibleType = require("./reference/homeowners/deductibleType.json");
const deductibleAmount = require("./reference/homeowners/deductibleAmount.json");
const windstormOrHailCoverageDeductibleAmount = require("./reference/homeowners/windstormOrHailDeductible.json");
const classCodes = require("./reference/homeowners/classCodes.json");
const constructionCodes = require("./reference/homeowners/constructionCodes.json");
const fireCodes = require("./reference/homeowners/fireProtectionCodes.json");
const escapedLiquidFuelCoverageProperty = require("./reference/homeowners/escapedLiquidFuelCoverageProperty.json");
const escapedLiquidFuelAndLeadCoverageLiability = require("./reference/homeowners/escapedLiquidFuelAndLeadCoverageLiability.json");
const occupancyCodes = require("./reference/homeowners/occupancyCodes.json");
const hbbIndicator = require("./reference/homeowners/homeBasedBusinessIndicator.json");
const numberOfFamilies = require("./reference/homeowners/numberOfFamilies.json");
const ordinanceOrLawCoverage = require("./reference/homeowners/ordinanceOrLawCoverage.json");
const theftDeductibleAmount = require("./reference/homeowners/theftDeductibleAmount.json");
const ncProgramEnhancementIndicator = require("./reference/homeowners/ncProgramEnhancementIndicator.json");
const moldDamageCoverageCode = require("./reference/homeowners/moldDamageCoverage.json");
const poolCode = require("./reference/homeowners/poolCode.json");
const causeOfLoss = require("./reference/homeowners/causeOfLoss.json");
const buildingCodeEffectivenessGrade = require("./reference/homeowners/buildingCodeEffectivenessGrade.json");




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
  policy.LineOfBusiness = "Homeowners";
  policy.LineOfBusinessCode = jsonRecord.lineOfInsurance;
  policy.AccountingDate = convertAccountingDate(jsonRecord.accountingDate);
  policy.CompanyCode = jsonRecord.companyCode;
  policy.CompanyID = jsonRecord.companyCode;
  policy.State = stateCodes.codes[jsonRecord.stateCode];
  policy.CountyCode = jsonRecord.countyCode;
  policy.AreaIndicator = jsonRecord.areaIndicator;
  policy.Territory = jsonRecord.territory;

  // Area Indicator
  policy.AreaIndicator = jsonRecord.areaIndicator.trim()
    ? areaIndicator[jsonRecord.areaIndicator]
    : NOT_PROVIDED

  // Record Type
  convertedRecord.RecordType = jsonRecord.transactionCode.trim()
    ? transactionCodes[jsonRecord.transactionCode].type
    : NOT_PROVIDED;
  convertedRecord.TransactionType = jsonRecord.transactionCode.trim()
    ? transactionCodes[jsonRecord.transactionCode].name
    : NOT_PROVIDED;
  convertedRecord.TransactionCode = jsonRecord.transactionCode;


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
  
  // Annual Statement Line Of Business
  policy.AnnualStatementLineOfBusiness = jsonRecord.annualStatementLineOfBusiness.trim()
  ? annualStatementLineOfBusiness[jsonRecord.annualStatementLineOfBusiness]
  : NOT_PROVIDED;

  // Program Code
  policy.Program = jsonRecord.programCode.trim()
    ? programCodes[jsonRecord.programCode]
    : NOT_PROVIDED;

  // Policy Form Code
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
  // *** get with peter on how to write the json for this

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


  // added for earned premium
  policy.EffectiveDate = convertDate(jsonRecord.effectiveDate);
  policy.ExpirationDate = convertDate(jsonRecord.expirationDate);

  if (convertedRecord.RecordType === "Premium") {
    coverage.MonthsCovered = parseInt(jsonRecord.monthsCovered);
    policy.PolicyNumber = jsonRecord.policyNumber.trim();
    policy.AccountingTermExpiration = addTerm(
      policy.AccountingDate,
      coverage.MonthsCovered
    );
  }

  if (jsonRecord.claimIdentifier) {
    claim.ClaimNumber = jsonRecord.claimNumber
    claim.ClaimIdentifier = jsonRecord.claimIdentifier
  }





  //Wind Hail Deductible
  policy.WindHailDeductible = jsonRecord.windstormOrHailCoverageDeductibleAmount.trim()
    ? windstormOrHailCoverageDeductibleAmount[jsonRecord.windstormOrHailCoverageDeductibleAmount]
    : NOT_PROVIDED;



  // Class Code
  // figure out how to get it to only display watercraft if applicable.
  policy.ClassCode = jsonRecord.classCode
  console.log(jsonRecord.classCode)
  policy.ClassCodeName = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].name
    : NOT_PROVIDED;
  policy.ClassCodeType = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].type
    : NOT_PROVIDED;
  policy.ClassCodeCategory = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].category
    : NOT_PROVIDED;
    // wanted this to disappear if not applicable
  dwelling.Subcategory = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].subcategory
    : NOT_PROVIDED
  dwelling.WatercraftSize = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].watercraftSize
    : NOT_PROVIDED;
  dwelling.EngineSize = jsonRecord.classCode.trim()
    ? classCodes[jsonRecord.classCode].engine
    : NOT_PROVIDED



  // Construction Code
  policy.ConstructionCode = jsonRecord.constructionCode
  policy.ConstructionCodeName = jsonRecord.constructionCode.trim()
    ? constructionCodes[jsonRecord.constructionCode].name
    : NOT_PROVIDED;
  policy.ConstructionCodeType = jsonRecord.constructionCode.trim()
    ? constructionCodes[jsonRecord.constructionCode].type
    : NOT_PROVIDED;

  // Fire Protection
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

  // Year of Construction
  dwelling.YearOfConstruction = jsonRecord.yearOfConstruction;

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

  // Number of Families
  let numberOfFamiliesCode = numberOfFamilies[policy.NumberOfFamilies];
  if (!numberOfFamiliesCode) numberOfFamiliesCode = numberOfFamilies["setA"];
  if (jsonRecord.numberOfFamilies) {
    dwelling.NumberOfFamiliesCode = jsonRecord.numberOfFamilies
    dwelling.NumberOfFamilies = numberOfFamiliesCode[jsonRecord.numberOfFamilies].name;
    dwelling.DwellingType = numberOfFamiliesCode[jsonRecord.numberOfFamilies].type
  }

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

  // NC Program Enhancement Indicator (Reserved - have Peter review what to do with this. Do we keep it in or make a function for it only to show up when state === NC)
  policy.NCProgramEnhancementIndicator = jsonRecord.ncProgramEnhancementIndicator.trim()
    ? ncProgramEnhancementIndicator[jsonRecord.ncProgramEnhancementIndicator]
    : NOT_PROVIDED

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
  // this is another thing we need to figure out about why it doesn't reflect loss with a negative premium)
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

  // Building Code Effectiveness Grade
  dwelling.BuildingCodeEffectivenessGradeCode = jsonRecord.buildingCodeEffectivenessGrade
  dwelling.BuildingCodeEffectivenessGrade = jsonRecord.buildingCodeEffectivenessGrade
    ? buildingCodeEffectivenessGrade[jsonRecord.buildingCodeEffectivenessGrade]
    : NOT_PROVIDED




  // State Exception Example from Auto

    // function decodeStateException(outputObject, inputRecord, exceptionName, state) {
    //   let stateExceptionObject = stateExceptionCodes[exceptionName];
    //   if (!stateExceptionObject) return;
    //   let stateException = stateExceptionObject[state];
    //   if (!stateException) return;
    //   if (stateException.type === "code")
    //     object[stateException.hdsName] =
    //       stateException.codes[inputRecord[stateException.statPlanName]];
    //   if (stateException.type === "copy")
    //     object[stateException.hdsName] = inputRecord[stateException.statPlanName];
    // }

  // State Exception A
  //decodeStateException(coverage, jsonRecord, "stateExceptionA, policy.State")

  // State Exception B
  //

  // State Exception C
  //

  // Small Premium Indicator
  policy.SmallPremiumIndicator = jsonRecord.smallPremiumIndicator

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
