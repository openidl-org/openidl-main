const crypto = require("crypto");
const stateCodes = require("./reference/dwelling-properties/stateCodes.json");
const areaIndicator = require("./reference/dwelling-properties/areaIndicator.json");
const transactionCodes = require("./reference/dwelling-properties/transactionCodes.json");
const annualStatementLineOfBusiness = require("./reference/dwelling-properties/annualStatementLineOfBusiness.json");
const programCodes = require("./reference/dwelling-properties/programCodes.json");
const deductibleType = require("./reference/dwelling-properties/deductibleType.json");
const deductibleAmount = require("./reference/dwelling-properties/deductibleAmount.json");
const windstormOrHailCoverageDeductibleAmount = require("./reference/dwelling-properties/windstormOrHailDeductible.json");
const classCodes = require("./reference/dwelling-properties/classCodes.json");
const constructionCodes = require("./reference/dwelling-properties/constructionCodes.json");
const coverageCodes = require("./reference/dwelling-properties/coverageCode.json")
const fireCodes = require("./reference/dwelling-properties/fireProtectionCodes.json");
const occupancyCodes = require("./reference/dwelling-properties/occupancyCodes.json");
const numberOfFamilies = require("./reference/dwelling-properties/numberOfFamilies.json");
const poolCode = require("./reference/dwelling-properties/poolCode.json");
const causeOfLoss = require("./reference/dwelling-properties/causeOfLoss.json");
const majorPerilCode = require("./reference/dwelling-properties/majorPeril.json")
const packageIdentification = require("./reference/dwelling-properties/packageIdentification.json")
const riskType = require("./reference/dwelling-properties/riskType.json")

// ***revisit this
//const exposure = require("./reference/dwelling-properties/exposure.json")




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
// console.log('!!!!*L*O*O*K H*E*R*E*!!!! \n')

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
  policy.LineOfInsurance = "Dwelling Properties";
  policy.LineOfInsuranceCode = jsonRecord.lineOfInsurance;
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

  // RecordType
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
  
  // annualStatementLineOfBusiness
  policy.AnnualStatementLineOfBusiness = jsonRecord.annualStatementLineOfBusiness.trim()
  ? annualStatementLineOfBusiness[jsonRecord.annualStatementLineOfBusiness]
  : NOT_PROVIDED;

  // program
  policy.Program = jsonRecord.programCode.trim()
    ? programCodes[jsonRecord.programCode]
    : NOT_PROVIDED;

  // Major Peril
  policy.MajorPerilCode = jsonRecord.majorPeril;
  // policy.MajorPerilCategory = jsonRecord.majorPeril.trim()
  //   ? majorPerilCode[jsonRecord.majorPeril].category
  //   : NOT_PROVIDED;
  // policy.MajorPerilType = jsonRecord.majorPeril.trim()
  //   ? majorPerilCode[jsonRecord.majorPeril].type
  //   : NOT_PROVIDED;
  // policy.MajorPerilForm = jsonRecord.majorPeril.trim()
  //   ? majorPerilCode[jsonRecord.majorPeril].majorPeril
  //   : NOT_PROVIDED
  //   policy.MajorPerilCategory = jsonRecord.majorPeril.trim()
  //   ? majorPerilCode[jsonRecord.majorPeril].majorPerilCategory
  //   : NOT_PROVIDED



  // Coverage Code
  coverage.CoverageCode = jsonRecord.coverageCode
  coverage.CoverageCodeCategory = jsonRecord.coverageCode.trim()
    ? coverageCodes[jsonRecord.coverageCode]
    : NOT_PROVIDED
  
  // deductibleType
  policy.DeductibleType = jsonRecord.deductibleType.trim()
    ? deductibleType[jsonRecord.deductibleType]
    : NOT_PROVIDED;

  // deductibleAmount
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


  //windHailDeductible
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

  
  // Occupancy Code
  convertedRecord.OccupancyCode = jsonRecord.occupancyCode
  convertedRecord.OccupancyCodeName = jsonRecord.occupancyCode.trim()
    ? occupancyCodes[jsonRecord.occupancyCode].name
    : NOT_PROVIDED;
  convertedRecord.OccupancyCodeType = jsonRecord.occupancyCode.trim()
    ? occupancyCodes[jsonRecord.occupancyCode].type
    : NOT_PROVIDED;


  // Number of Families
  dwelling.NumberOfFamiliesCode = jsonRecord.numberOfFamilies
  dwelling.NumberOfFamilies = jsonRecord.numberOfFamilies
    ? numberOfFamilies[jsonRecord.numberOfFamilies]
    : NOT_PROVIDED
  

  // Secondary Property Amount of Insurance
  coverage.SecondaryPropertyAmountOfInsurance = jsonRecord.secondaryPropertyAmountOfInsurance

  // Risk Type
  policy.RiskTypeCode = jsonRecord.riskType.trim();
  policy.RiskType = jsonRecord.riskType.trim()
    ? riskType[jsonRecord.riskType]
    : NOT_PROVIDED

  // Package Identification
  policy.PackageIdentificationCode = jsonRecord.packageIdentification.trim();
  policy.PackageIdentification = jsonRecord.packageIdentification.trim()
    ? packageIdentification[jsonRecord.packageIdentification]
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
