const crypto = require("crypto");
const stateCodes = require("./reference/personal-auto/stateCodes.json");
const transactionCodes = require("./reference/personal-auto/transactionCodes.json");
const programCodes = require("./reference/personal-auto/programCodes.json");
const coverageCodes = require("./reference/personal-auto/coverageCodes.json");
const sublineCodes = require("./reference/personal-auto/sublineCodes.json");
const operatorAgeCodes = require("./reference/personal-auto/operatorAgeCodes.json");
const sexAndMaritalStatusCodes = require("./reference/personal-auto/sexAndMaritalStatusCodes.json");
const vehicleUseCodes = require("./reference/personal-auto/vehicleUseCodes.json");
const vehiclePerformanceCodes = require("./reference/personal-auto/vehiclePerformanceCodes.json");
const privatePassengerDriversTrainingGoodStudentCodes = require("./reference/personal-auto/privatePassengerDriversTrainingGoodStudentCodes.json");
const penaltyPointsCodes = require("./reference/personal-auto/penaltyPointsCodes.json");
const liabilityLimitCodes = require("./reference/personal-auto/liabilityLimitCodes.json");
const deductibleCodes = require("./reference/personal-auto/deductibleCodes.json");
const numberTypeCodes = require("./reference/personal-auto/numberTypeCodes.json");
const vehicleClassCodes = require("./reference/personal-auto/vehicleClassCodes.json");
const umUimCodes = require("./reference/personal-auto/umUimCodes.json");
const terrorismIndicatorCodes = require("./reference/personal-auto/terrorismIndicatorCodes.json");
const singleMultiCarCodes = require("./reference/personal-auto/singleMultiCarCodes.json");
const packageCodes = require("./reference/personal-auto/packageCodes.json");
const poolAffiliationCodes = require("./reference/personal-auto/poolAffiliationCodes.json");
const ncProgramEnhancementCodes = require("./reference/personal-auto/ncProgramEnhancementCodes.json");
const umuimStackingCodes = require("./reference/personal-auto/umuimStackingCodes.json");
const passiveRestraintDiscountCodes = require("./reference/personal-auto/passiveRestraintDiscountCodes.json");
const antiLockBrakesDiscountCodes = require("./reference/personal-auto/antiLockBrakesDiscountCodes.json");
const antiTheftDeviceDiscountCodes = require("./reference/personal-auto/antiTheftDeviceDiscountCodes.json");
const defensiveDriverDiscountCodes = require("./reference/personal-auto/defensiveDriverDiscountCodes.json");
const pipLimitsDeductibleCodes = require("./reference/personal-auto/pipLimitsDeductibleCodes.json");
const experienceRatingModificationFactorCodes = require("./reference/personal-auto/experiencedRatingModificationFactorCodes.json");
const stateExceptionCodes = require("./reference/personal-auto/stateExceptionCodes.json");
const causeOfLossCodes = require("./reference/personal-auto/causeOfLossCodes.json");
const limitedCodingLossTransactionCodes = require("./reference/personal-auto/limitedCodingLossTransactionCodes.json");
const { syncBuiltinESMExports } = require("module");

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
function convertAccountingMonth(dateString) {
  return `${dateString.substring(0, 2)}`;
}
function convertAccountingYear(dateString) {
  return `${dateString.substring(2, 3)}`;
}


function convertAccidentDate(dateString) {
  let year = parseInt(dateString.substring(2, 4)) + 2000;

  let thisYear = new Date().getFullYear();
  let century = thisYear < year ? "19" : "20";
  return `${century}${dateString.substring(2, 4)}-${dateString.substring(0, 2)}-01`;
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
    Coverage: {},
    Driver: {},
    Vehicle: {},
    Claim: {},
  };

  let policy = convertedRecord.Policy;
  let claim = convertedRecord.Claim;
  let coverage = convertedRecord.Coverage;
  let driver = convertedRecord.Driver;
  let vehicle = convertedRecord.Vehicle;
  convertedRecord.createdTime = new Date().toISOString();
  policy.LineOfBusiness = "Personal Auto";
  policy.LineOfBusinessCode = jsonRecord.lineOfInsurance;
  policy.SublineCode = jsonRecord.subline;
  policy.SublineName = jsonRecord.subline.trim()
    ? sublineCodes[jsonRecord.subline].name
    : NOT_PROVIDED;
  policy.SublineCategory = jsonRecord.subline.trim()
    ? sublineCodes[jsonRecord.subline].category
    : NOT_PROVIDED;
  policy.SublineCode = jsonRecord.subline.trim();
  policy.AccountingDate = convertAccountingDate(jsonRecord.accountingDate);
  policy.AccountingMonth = convertAccountingMonth(jsonRecord.accountingDate);
  policy.AccountingYear = convertAccountingYear(jsonRecord.accountingDate);

  policy.CompanyCode = jsonRecord.companyCode;
  policy.CompanyID = jsonRecord.companyCode;
  policy.State = stateCodes.codes[jsonRecord.stateCode];
  policy.Territory = jsonRecord.territory;
  policy.OptionalZipCodeIndicator = jsonRecord.optionalZipCodeIndicator;
  
  
  convertedRecord.RecordType = jsonRecord.transactionCode.trim()
    ? transactionCodes[jsonRecord.transactionCode].type
    : NOT_PROVIDED;
  convertedRecord.TransactionType = jsonRecord.transactionCode.trim()
    ? transactionCodes[jsonRecord.transactionCode].name
    : NOT_PROVIDED;
  convertedRecord.TransactionCode = jsonRecord.transactionCode;


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


  if ('programCodes' in jsonRecord) {
    policy.ProgramCode = jsonRecord;
    policy.Program = programCodes[jsonRecord.program];
  }
  // policy.ProgramCode = jsonRecord.program;
  // policy.Program = jsonRecord.program.trim()
  //   ? programCodes[jsonRecord.program]
  //   : NOT_PROVIDED;
  let coverageCodesState = coverageCodes[policy.State];

  if (!coverageCodesState) coverageCodesState = coverageCodes["MU"];

  if (jsonRecord.coverage) {
    coverage.CoverageCategory = coverageCodesState[jsonRecord.coverage].category;
    coverage.Coverage = coverageCodesState[jsonRecord.coverage].name;
    coverage.CoverageCode = jsonRecord.coverage;
  }

  driver.OperatorAge = operatorAgeCodes[jsonRecord.operatorsAge];
  driver.OperatorAgeCode = jsonRecord.operatorsAge;
  driver.Gender = jsonRecord.sexAndMaritalStatus.trim()
    ? sexAndMaritalStatusCodes[jsonRecord.sexAndMaritalStatus].gender
    : NOT_PROVIDED;
  driver.MaritalStatus = jsonRecord.sexAndMaritalStatus.trim()
    ? sexAndMaritalStatusCodes[jsonRecord.sexAndMaritalStatus].maritalStatus
    : NOT_PROVIDED;
  driver.MaritalStatusCode = jsonRecord.sexAndMaritalStatus;
  driver.PrincipalSecondary = jsonRecord.sexAndMaritalStatus.trim()
    ? sexAndMaritalStatusCodes[jsonRecord.sexAndMaritalStatus].principalSecondary
    : NOT_PROVIDED;

  if ('vehicleUseCodes' in jsonRecord) {
    vehicle.VehicleUseCode = jsonRecord.vehicleUse;
    vehicle.VehicleUse = vehicleUseCodes[jsonRecord.vehicleUse].use;
    vehicle.VehicleUseOperator = vehicleUseCodes[jsonRecord.vehicleUse].operator;
    vehicle.VehicleCommuteDistance = vehicleUseCodes[jsonRecord.vehicleUse].commuteDistance;
    vehicle.VehicleAnnualDistance = vehicleUseCodes[jsonRecord.vehicleUse].annualDistance;
  }  
  // vehicle.VehicleUseCode = jsonRecord.vehicleUse;
  // vehicle.VehicleUse = jsonRecord.vehicleUse.trim()
  //   ? vehicleUseCodes[jsonRecord.vehicleUse].use
  //   : NOT_PROVIDED;

  // vehicle.VehicleUseOperator = jsonRecord.vehicleUse.trim()
  //   ? vehicleUseCodes[jsonRecord.vehicleUse].operator
  //   : NOT_PROVIDED;
  // vehicle.CommuteDistance = jsonRecord.vehicleUse.trim()
  //   ? vehicleUseCodes[jsonRecord.vehicleUse].commuteDistance
  //   : NOT_PROVIDED;
  // vehicle.AnnualDistance = jsonRecord.vehicleUse.trim()
  //   ? vehicleUseCodes[jsonRecord.vehicleUse].annualDistance
  //   : NOT_PROVIDED;

  if ('vehiclePerformanceCodes' in jsonRecord) {
    vehicle.VehiclePerformanceCode = jsonRecord.vehiclePerformance;
    vehicle.VehiclePerformance = vehiclePerformanceCodes[jsonRecord.vehiclePerformance];
  }
  // vehicle.VehiclePerformanceCode = jsonRecord.vehiclePerformance;
  // vehicle.VehiclePerformance = jsonRecord.vehiclePerformance.trim()
  //   ? vehiclePerformanceCodes[jsonRecord.vehiclePerformance]
  //   : NOT_PROVIDED;
    
  driver.DriversTrainingGoodStudentCode = jsonRecord.privatePassengerDriversTrainingGoodStudent;
  try {
    let tempCode = jsonRecord.privatePassengerDriversTrainingGoodStudent.trim();
    driver.DriversTraining =
      privatePassengerDriversTrainingGoodStudentCodes[tempCode].driversTraining;
  } catch {
    driver.DriversTraining = "No";
  }

  try {
    let tempCode = jsonRecord.privatePassengerDriversTrainingGoodStudent.trim();
    driver.GoodStudentDiscount =
      privatePassengerDriversTrainingGoodStudentCodes[
        tempCode
      ].goodStudentDiscount;
  } catch {
    driver.GoodStudentDiscount = "No";
  }

  if ('penaltyPointsCodes' in jsonRecord) {
    driver.PenaltyPointsCode = jsonRecord.privatePassengerPenaltyPoints;
    driver.PenaltyPoints = penaltyPointsCodes[jsonRecord.privatePassengerPenaltyPoints];
  }
  // driver.PenaltyPointsCode = jsonRecord.privatePassengerPenaltyPoints;
  // driver.PenaltyPoints = jsonRecord.privatePassengerPenaltyPoints.trim()
  //   ? penaltyPointsCodes[jsonRecord.privatePassengerPenaltyPoints]
  //   : NOT_PROVIDED;


  // coverage.LiabilityLimitCode = jsonRecord.liabilityLimitCodes;
  let liabilityLimitState = liabilityLimitCodes.state[policy.State];
  if (!liabilityLimitState) {
    liabilityLimitState = liabilityLimitCodes.state["MU"];
  }

  if (
    (coverage.LiabilityLimitsName =
      liabilityLimitState.coverage[jsonRecord.coverage])
  ) {
    coverage.LiabilityLimitsName =
      liabilityLimitState.coverage[jsonRecord.coverage].name;
    coverage.LiabilityLimitsAmount =
      liabilityLimitState.coverage[jsonRecord.coverage][
        jsonRecord.liabilityLimitsAmount
      ];
  }

  coverage.DeductibleAmount = deductibleCodes[jsonRecord.deductibleAmount];
  coverage.DeductibleCode = jsonRecord.deductibleAmount;
  policy.EffectiveDate = convertDate(jsonRecord.effectiveDate);
  policy.ExpirationDate = convertDate(jsonRecord.expirationDate);
  vehicle.BodyStyle = vehicleClassCodes.bodyStyle[jsonRecord.bodyStyle];
  vehicle.BodyStyleCode = vehicleClassCodes[jsonRecord.bodyStyle]
    ? vehicleClassCodes[jsonRecord.bodyStyle]
    : NOT_PROVIDED
  vehicle.BodySize = vehicleClassCodes.bodySize[jsonRecord.bodySize];
  vehicle.ModelYear = jsonRecord.modelYear;

  let lclExposurePresent = false;
  if (typeof jsonRecord.exposure == "undefined") {
    lclExposurePresent = false;
  } else if (jsonRecord.exposure.length > 0) {
    lclExposurePresent = true
  }

  if (lclExposurePresent) {
    let digit = parseInt(numberTypeCodes[jsonRecord.exposure.slice(-1)].digit);
    // console.log('digit: '+digit);
    let multiplier = numberTypeCodes[jsonRecord.exposure.slice(-1)].multiplier;
    // console.log('multiplier: '+multiplier);
    let recordLead = parseInt(jsonRecord.exposure.slice(0, -1));
    // console.log('recordLead: '+recordLead);
    if (!recordLead == 0) {
      coverage.Exposure = parseInt(
        recordLead.toString() + (digit * multiplier).toString()
      );
    } else {
      coverage.Exposure = digit * multiplier;
    }
  }

  let umUimState = umUimCodes.state[policy.State];
  if (!umUimState) {
    umuimState = umUimCodes.state["MU"];
  }
  coverage.UninsuredUnderinsuredMotorist =
    umuimState[jsonRecord.uninsuredUnderinsuredMotorist];
    
  if (convertedRecord.RecordType === "Premium") {
    coverage.MonthsCovered = parseInt(jsonRecord.monthsCovered);
    coverage.SingleMultiCarRating =
      singleMultiCarCodes[jsonRecord.singleMultiCar];
    policy.PolicyIdentifier = jsonRecord.policyIdentification.trim();
    coverage.ExperienceRatingModificationFactor =
      experienceRatingModificationFactorCodes[
        jsonRecord.experienceRatingModificationFactor
      ];
    policy.AccountingTermExpiration = addTerm(
      policy.AccountingDate,
      coverage.MonthsCovered
    );
  }

  if (jsonRecord.occurrenceIdentification) {
    claim.ClaimCount = parseInt(jsonRecord.claimCount);
    //console.log('cause of loss' +jsonRecord.causeOfLoss)
    //console.log(jsonRecord)
    if (!jsonRecord.coverage == "") {
      if (!jsonRecord.causeOfLoss == "") {
        claim.CauseOfLoss =
        causeOfLossCodes.coverage[jsonRecord.coverage][jsonRecord.causeOfLoss];
      }
    }
    claim.AccidentDate = convertAccidentDate(jsonRecord.accidentDate);

    claim.OccurrenceIdentifier = jsonRecord.occurrenceIdentification.trim();
    claim.ClaimIdentifier = jsonRecord.claimIdentifier.trim();
    try {
      claim.LimitedCodingLossTransaction =
        jsonRecord.limitedCodingLossTransaction.trim()
          ? limitedCodingLossTransactionCodes[
              jsonRecord.limitedCodingLossTransaction
            ]
          : "N/A";
    } catch {
      claim.LimitedCodingLossTransaction = "";
    }
  }

  if ('terrorismIndicator' in jsonRecord ) {
    coverage.Terrorism = terrorismIndicatorCodes[jsonRecord.terrorismIndicator];
  }

  // coverage.Terrorism = jsonRecord.terrorismIndicator.trim()
  //   ? "N/A"
  //   : terrorismIndicatorCodes[jsonRecord.terrorismIndicator];

  coverage.Packaging = packageCodes[jsonRecord.packageCode];
  coverage.CoverageCode = jsonRecord.coverage;
  coverage.PoolAffiliation = poolAffiliationCodes[jsonRecord.poolAffiliation];
  
  if ('ncProgramEnhancementIndicator' in jsonRecord) {
    policy.NCProgramEnhancement = ncProgramEnhancementCodes[jsonRecord.ncProgramEnhancementIndicator];
  }

  // policy.NCProgramEnhancement = jsonRecord.ncProgramEnhancementIndicator.trim()
  //   ? ncProgramEnhancementCodes[jsonRecord.ncProgramEnhancementIndicator]
  //   : "N/A";

  if ('zipCode' in jsonRecord) {
    policy.ZipCode = jsonRecord.zipCode;
  }
  // policy.ZipCode = jsonRecord.zipCode.trim();
  policy.ZipCodeSuffix = jsonRecord.zipCodeSuffix.trim();
  // coverage.UmUimCode = umUimCodes.state[jsonRecord.uninsuredUnderinsuredMotorist];
  coverage.UMUIMStacking = jsonRecord.umUimStackingIndicator
    ? umuimStackingCodes[jsonRecord.umUimStackingIndicator]
    : "N/A";
  vehicle.Symbol = jsonRecord.symbolCode;
  coverage.PassiveRestraintDiscount =
    passiveRestraintDiscountCodes[jsonRecord.passiveRestraintDiscountCode];
  coverage.AntiLockBrakesDiscount =
    antiLockBrakesDiscountCodes[jsonRecord.antiLockBrakesDiscountCode];
  let antiTheftDeviceDiscountState =
    antiTheftDeviceDiscountCodes.state[policy.State];
  if (!antiTheftDeviceDiscountState)
    antiTheftDeviceDiscountState = antiTheftDeviceDiscountCodes.state["MU"];
  coverage.AntiTheftDeviceDiscount =
    antiTheftDeviceDiscountState[jsonRecord.antiTheftDeviceDiscountCode];
  coverage.DefensiveDriverDiscount =
    defensiveDriverDiscountCodes[jsonRecord.defensiveDriverDiscountCode];
  let pipLimitsDeductibleState = pipLimitsDeductibleCodes.state[policy.State];
  if (!pipLimitsDeductibleState)
    pipLimitsDeductibleState = pipLimitsDeductibleCodes.state["MU"];
  coverage.PIPLimitsDeductible =
    pipLimitsDeductibleState[jsonRecord.pipLimitsDeductibleCode];
  if (jsonRecord.rateClassCode) {
    coverage.RateClassCode = jsonRecord.rateClassCode.trim();
  }
  decodeStateException(coverage, jsonRecord, "stateExceptionA", policy.State);
  decodeStateException(coverage, jsonRecord, "stateExceptionB", policy.State);
  decodeStateException(coverage, jsonRecord, "stateExceptionC", policy.State);
  decodeStateException(coverage, jsonRecord, "stateExceptionD", policy.State);
  if (jsonRecord.companyUse) {
    convertedRecord.CompanyUse = jsonRecord.companyUse.trim();
  }
  if (jsonRecord.vehicleIdentificationVIN) {
    vehicle.VIN = jsonRecord.vehicleIdentificationVIN.trim();
  }

  if (jsonRecord.vehicleIdentificationVIN) {
    vehicle.VINHash = hashString(jsonRecord.vehicleIdentificationVIN);
  }

  //console.table(convertedRecord.Policy);
  return convertedRecord;
};
