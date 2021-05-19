/**
 SPDX-License-Identifier: Apache-2.0
*/
const hdsProcessor = require('./HDSProcessor')

module.exports.convertRecordToFlatJson = (record) => {
  return hdsProcessor.convertRecordToFlatJson(record, schemas)
}

module.exports.convertFlatJsonToHdsJson = (flatJson, batchId, batchHash) => {
  var mapping = hdsProcessor.baseMapping(flatJson, batchId, batchHash) 
  addIMMapping(flatJson, batchId, batchHash, mapping)
  var baseMapped = hdsProcessor.convertToHDSJson(flatJson,batchId,batchHash,mapping)
  mapped = convertIMToHDSJson(flatJson, batchId, batchHash, mapping, baseMapped)
  return mapped

}

addIMMapping = (flatJson, batchId, batchHash, mapping) => {
  mapping.mapTypeOfPolicy = () => { return flatJson.typeOfPolicy  }
  mapping.mapPremiumLevel = () => { return flatJson.packageID === '0' || flatJson.packageID === '7' ? 'Policy' : 'Coverage'}
}

convertIMToHDSJson = (flatJson, batchId, batchHash, mapping, alreadyMapped) => {
  var typeOfPolicy = mapping.mapTypeOfPolicy()
  if (!alreadyMapped.policy.lineOfInsurance.financialServicesProduct || !alreadyMapped.policy.lineOfInsurance.financialServicesProduct) {
    alreadyMapped.policy.lineOfInsurance.financialServicesProduct = [{}]
  }
  alreadyMapped.policy.lineOfInsurance.financialServicesProduct[0].code = typeOfPolicy
  alreadyMapped.policy.lineOfInsurance.financialServicesProduct[0].enumType = 'Type of Policy'
  alreadyMapped.policy.lineOfInsurance.financialServicesProduct[0].description = 'Type of Policy'
  return alreadyMapped
}

const schemas = {
  "Premium": {
    "type": "record", "name": "premiumrecord",
    "fields": [
      { "name": "lineOfInsurance", "type": "string", "start": 0, "length": 2 },
      { "name": "accountingDate", "type": "string", "start": 2, "length": 4 },
      { "name": "companyCode", "type": "string", "start": 6, "length": 4 },
      { "name": "stateCode", "type": "string", "start": 10, "length": 2 },
      { "name": "reserved1", "type": "string", "start": 12, "length": 7 },
      { "name": "transactionCode", "type": "string", "start": 19, "length": 1 },
      { "name": "premiumLossAmount", "type": "string", "start": 20, "length": 10 },
      { "name": "exposureClaimCount", "type": "string", "start": 30, "length": 5 },
      { "name": "annualStatementLineOfBusiness", "type": "string", "start": 35, "length": 3 },
      { "name": "programClassCode", "type": "string", "start": 38, "length": 1 },
      { "name": "policyForm", "type": "string", "start": 39, "length": 2 },
      { "name": "reserved2", "type": "string", "start": 41, "length": 13 },
      { "name": "classCode", "type": "string", "start": 54, "length": 3 },
      { "name": "reserved3", "type": "string", "start": 57, "length": 25 },
      { "name": "typeOfPolicy", "type": "string", "start": 82, "length": 1 },
      { "name": "reserved4", "type": "string", "start": 83, "length": 1 },
      { "name": "packageID", "type": "string", "start": 84, "length": 1 },
      { "name": "reserved5", "type": "string", "start": 85, "length": 16 },
      { "name": "zipCode", "type": "string", "start": 101, "length": 5 },
      { "name": "reserved6", "type": "string", "start": 106, "length": 20 },
      { "name": "policyNumberClaimNumberIdentifier", "type": "string", "start": 126, "length": 14 },
      { "name": "reserved7", "type": "string", "start": 140, "length": 10 },
      { "name": "sicCode", "type": "string", "start": 150, "length": 4 },
      { "name": "taxID", "type": "string", "start": 154, "length": 9 },
      { "name": "numberOfEmployees", "type": "string", "start": 163, "length": 6 },
      { "name": "policyFormEdition", "type": "string", "start": 169, "length": 25 },
      { "name": "address", "type": "string", "start": 194, "length": 150 }
    ]
  },
  "Loss": {
    "type": "record", "name": "lossesrecord",
    "fields": [
      { "name": "lineOfInsurance", "type": "string", "start": 0, "length": 2 },
      { "name": "accountingDate", "type": "string", "start": 2, "length": 4 },
      { "name": "companyCode", "type": "string", "start": 6, "length": 4 },
      { "name": "stateCode", "type": "string", "start": 10, "length": 2 },
      { "name": "reserved1", "type": "string", "start": 12, "length": 7 },
      { "name": "transactionCode", "type": "string", "start": 19, "length": 1 },
      { "name": "premiumLossAmount", "type": "string", "start": 20, "length": 10 },
      { "name": "exposureClaimCount", "type": "string", "start": 30, "length": 5 },
      { "name": "annualStatementLineOfBusiness", "type": "string", "start": 35, "length": 3 },
      { "name": "programClassCode", "type": "string", "start": 38, "length": 1 },
      { "name": "policyForm", "type": "string", "start": 39, "length": 2 },
      { "name": "reserved2", "type": "string", "start": 41, "length": 13 },
      { "name": "classCode", "type": "string", "start": 54, "length": 3 },
      { "name": "reserved3", "type": "string", "start": 57, "length": 25 },
      { "name": "typeOfPolicy", "type": "string", "start": 82, "length": 1 },
      { "name": "reserved4", "type": "string", "start": 83, "length": 1 },
      { "name": "packageID", "type": "string", "start": 84, "length": 1 },
      { "name": "reserved5", "type": "string", "start": 85, "length": 7 },
      { "name": "monthsCoveredCauseOfLoss", "type": "string", "start": 92, "length": 2 },
      { "name": "claimStatus", "type": "string", "start": 94, "length": 1 },
      { "name": "accidentDate", "type": "string", "start": 95, "length": 6 },
      { "name": "zipCode", "type": "string", "start": 101, "length": 5 },
      { "name": "reserved6", "type": "string", "start": 106, "length": 20 },
      { "name": "policyNumberClaimNumberIdentifier", "type": "string", "start": 126, "length": 14 },
      { "name": "reserved7", "type": "string", "start": 140, "length": 10 },
      { "name": "sicCode", "type": "string", "start": 150, "length": 4 },
      { "name": "taxID", "type": "string", "start": 154, "length": 9 },
      { "name": "numberOfEmployees", "type": "string", "start": 163, "length": 6 },
      { "name": "policyFormEdition", "type": "string", "start": 169, "length": 25 },
      { "name": "address", "type": "string", "start": 194, "length": 150 }
    ]
  }
}

usableKeys = [
  "lineOfInsurance",
  "accountingDate",
  "companyCode",
  "stateCode",
  // //"countyCode",
  // //"areaIndicator",
  // //"territoryCode",
  "transactionCode",
  "premiumLossAmount",
  "exposureClaimCount",
  "annualStatementLineOfBusiness",
  // //"programCode",
  "programClassCode",
  "policyForm",
  // //"coverageCode",
  // //"lossSettlementIndicator",
  // //"terrorismIndicator",
  // //"propertyAmountOfInsurance",
  // //"deductibleType",
  // "deductibleAmount",
  // "windHailDeductibleAmount",
  "classCode",
  // "constructionCode",
  // "fireProtectionCode",
  // "entryYearClaimsMade",
  // "liabilityLimit",
  // "medicalPaymentLimit",
  // "annualAggregateLimit",
  // "occupancyCode",
  // "liabilityExposureIndicator",
  // "typeOfCoverage",
  // "typeOfPolicy",
  // "packageID",
  // "sprinklerSystemCode",
  // "policyTermEffectiveDate",
  // "moldDamageCoverage",
  // "poolCoverage",
  "monthsCoveredCauseOfLoss",
  "claimStatus",
  "accidentDate",
  "zipCode",
  // "zipCodeSuffix",
  // "buildingCodeEffectivenessGrade",
  // "windLossMitigation",
  // "stateExceptionCode",
  "policyNumberClaimNumberIdentifier",
  // "companyUse",
  "sicCode",
  "taxID",
  "numberOfEmployees",
  "policyFormEdition",
  "address"
]

