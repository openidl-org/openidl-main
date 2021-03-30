
const referenceData = require('./referenceData.js').referenceData
const lobProcessor = require('./LOBProcessor')

function isPremiumTransaction(transactionCode) {
    return referenceData.TransactionType[transactionCode].Type === 'Premium'
}

module.exports.convertRecordToFlatJson = (record, schemas) => {
    var transactionType = lobProcessor.getTransactionType(record)
    var result = {}
    var schema = schemas[transactionType]
    for (let field of schema.fields) {
        var start = field.start
        var end = start + field.length
        result[field.name] = record.substring(start, end)
    }
    return result
}

module.exports.convertToHDSJson = (flatJson, batchId, batchHash, mapping) => {
    var transactionCode = mapping.mapTransactionCode()
    var isAPremiumTransaction = isPremiumTransaction(transactionCode)
    var lineOfInsurance = mapping.mapLineOfInsurance()
    var lineOfInsuranceName = referenceData.LineOfInsurance[lineOfInsurance].Name
    var companyCode = mapping.mapCompanyCode()
    var premiumAmount = mapping.mapPremiumAmount()
    var exposureAmount = mapping.mapExposureAmount()
    var premiumAccountingDate = mapping.mapPremiumAccountingDate()
    var claimAccountingDate = mapping.mapClaimAccountingDate()
    var stateCode = mapping.mapStateCode()
    var stateAbbreviation = referenceData.StateCode[stateCode].abbreviation
    var stateName = referenceData.StateCode[stateCode].name
    var policyFormCode = mapping.mapPolicyFormCode()
    var premiumLevel = mapping.mapPremiumLevel()
    // var premiumLevel = referenceData.PolicyForm[policyFormCode] ? referenceData.PolicyForm[policyFormCode].PremiumLevel : 'Policy'
    var policyFormDescription = referenceData.PolicyForm[policyFormCode] ? referenceData.PolicyForm[policyFormCode].Description : ''
    var riskClassificationCode = mapping.mapRiskClassificationCode()
    var riskClassificationDescription = referenceData.ClassCode[riskClassificationCode]
    var postalCode = mapping.mapPostalCode()
    var policyNumber = mapping.mapPolicyNumber()
    var countryCode = mapping.mapCountryCode()
    var countryName = "TODO: need reference data"
    var address = mapping.mapAddress()
    var taxID = mapping.mapTaxID()
    var sicCode = mapping.mapSicCode()
    var sicCodeDescription = referenceData.SICCode[sicCode]
    var biLimitAmount = mapping.mapBusinessInterruptionLimit()
    var biLimitType = "Business Interruption Limit"
    var numberOfEmployees = mapping.mapNumberOfEmployees()
    var policyFormEdition = mapping.mapPolicyFormEdition()
    var businessInterruptionFlagString = referenceData.BusinessInterruptionFlag[policyFormEdition]
    var businessInterruptionFlag = (businessInterruptionFlagString ? businessInterruptionFlagString === 'Y' : false)
    var physicalDamageRequirementString = referenceData.PhysicalDamageRequirement[policyFormEdition]
    var physicalDamageRequirement = (physicalDamageRequirementString ? physicalDamageRequirementString === 'Y' : false)
    var viralExclusionString = referenceData.ViralExclusion[policyFormEdition]
    var viralExclusion = (viralExclusionString ? viralExclusionString === 'Y' : false)
    var annualStatementLineOfBusinessCode = mapping.mapAnnualStatementLineOfBusinessCode()
    var annualStatementLineOfBusinessDescription = referenceData.AnnualStatementLineOfBusiness[annualStatementLineOfBusinessCode]
    var structure = {
        "policy": {
            "lineOfInsurance": {
                "legacyCode": lineOfInsurance,
                "name": lineOfInsuranceName,
                "financialServicesProduct": [{}]
            },
            "company": {
                "code": companyCode,
                "name": referenceData.CompanyCode[companyCode]
            },
            "annualStatementLineOfBusiness": {
                "code": annualStatementLineOfBusinessCode,
                "description": annualStatementLineOfBusinessDescription
            },
            "currencyPayment": [{}],
            "policyStructure": [
                {
                    "location": [
                        {
                            "geographicLocation": {
                                "stateLegacyCode": stateCode,
                                "stateName": stateName,
                                "stateAbbreviation": stateAbbreviation,
                                "postalCode": postalCode,
                                "countryLegacyCode": countryCode,
                                "countryName": countryName
                            }
                        }
                    ],
                    "coverages": [
                        {
                            "currencyPayment": [
                                {
                                    "transactionType": "Premium Statistical Transaction",
                                    "transactionCode": transactionCode,
                                }
                            ],
                            "policyForm": {
                                "legacyCode": policyFormCode,
                                "description": policyFormDescription,
                                "versionNumber": "??"
                            }
                        }
                    ],
                    "riskClassification": {
                        "legacyCode": riskClassificationCode,
                        "description": riskClassificationDescription
                    }

                }

            ]
        }
    }
    if (isAPremiumTransaction) {
        structure.policy.taxID = taxID
        structure.policy.currencyPayment = [
            {
                "accountStatement": {
                },
                "transactionType": "Premium Statistical Transaction",
                "amount": premiumAmount
            }
        ]
        structure.policy.currencyPayment = [
            {
                "accountStatement": {
                },
                "transactionType": "Premium Statistical Transaction",
                "amount": premiumAmount
            }
        ]
        structure.policy.policyForm = {
            "legacyCode": policyFormCode,
            "description": policyFormDescription,
            "versionNumber": "??",
            "policyFormEdition": policyFormEdition,
            "businessInterruptionFlag": businessInterruptionFlag,
            "physicalDamageRequirement": physicalDamageRequirement,
            "viralExclusion": viralExclusion
        }
        structure.policy.commercialPolicy = {
            "policyNumber": policyNumber,
        }
        structure.policy.location = [
            {
                "address": address
            }
        ]
        structure.policy.businessClassification = [
            {
                "enumType": "SIC Code",
                "industryCode": sicCode,
                "description": sicCodeDescription

            }
        ]
        structure.policy.limits = [
            {
                "type": biLimitType,
                "amount": biLimitAmount
            }
        ]
        structure.policy.numberOfEmployees = numberOfEmployees
        structure.policy.policyStructure[0].Type = "TODO: Need type"
        structure.policy.policyStructure[0].coverages[0].Type = "TODO: Need a way to identify which coverage"
        structure.policy.policyStructure[0].coverages[0].currencyPayment[0].amount = premiumAmount
        structure.policy.policyStructure[0].coverages[0].exposureAmount = exposureAmount
        if (premiumLevel === 'Policy') {
            structure.policy.currencyPayment[0].accountStatement.periodStartDate = premiumAccountingDate
            structure.policy.currencyPayment[0].transactionType = "Premium Statistical Transaction"
            structure.policy.currencyPayment[0].transactionCode = transactionCode
        } else {
            structure.policy.policyStructure[0].coverages[0].currencyPayment[0].periodStartDate = premiumAccountingDate
            structure.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionType = "Premium Statistical Transaction"
            structure.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionCode = transactionCode
        }


    } else {
        var causeOfLossCode = mapping.mapCauseOfLossCode()
        var causeOfLoss = referenceData.CauseOfLoss[causeOfLossCode]
        var causeOfLossCategory = causeOfLoss ? causeOfLoss.category : null
        var causeOfLossName = causeOfLoss ? causeOfLoss.name : null
        var accidentDate = mapping.mapAccidentDate()
        var claimNumber = mapping.mapClaimNumber()
        var claimStatus = mapping.mapClaimStatus()
        var lossAmount = mapping.mapLossAmount()
        structure.claim = {
            "claimFolder": {
                "accidentDate": accidentDate,
                "claimNumber": claimNumber,
                "claimStatus": claimStatus,
                "claimComponent": [
                    {
                        "type": "TODO: need a type",
                        "currencyPayment": [
                            {
                                "type": "TODO: need a type",
                                "transactionType": "Loss Statistical Transaction",
                                "transactionCode": transactionCode,
                                "accountStatement": {
                                    "type": "TODO: need a type",
                                    "periodStartDate": claimAccountingDate
                                }
                            }
                        ],
                        "causeOfLoss": {
                            "legacyCode": causeOfLossCode,
                            "category": causeOfLossCategory,
                            "name": causeOfLossName
                        },
                        "claimOffer": [
                            {
                                "payment": [
                                    {
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
        var lossType = referenceData.TransactionType[transactionCode].SubType
        if (lossType === 'Paid Loss') {
            structure.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].type = 'Loss amount'
            structure.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].amount = lossAmount
        } else {
            structure.claim.claimFolder.claimComponent[0].currencyPayment[0].type = 'Reserve for Claim'
            structure.claim.claimFolder.claimComponent[0].currencyPayment[0].amount = lossAmount
        }

    }
    return structure
}

module.exports.baseMapping = (flatJson, batchId, batchHash) => {
    var mapping = {
        mapTransactionCode: () => { return flatJson.transactionCode },
        mapLineOfInsurance: () => { return flatJson.lineOfInsurance },
        mapCompanyCode: () => { return flatJson.companyCode },
        mapPremiumAmount: () => { return flatJson.premiumLossAmount ? parseInt(flatJson.premiumLossAmount.trim()) : null },
        mapExposureAmount: () => { return flatJson.exposureClaimCount ? parseInt(flatJson.exposureClaimCount.trim()) : null },
        mapClaimCount: () => { return flatJson.exposureClaimCount ? parseInt(flatJson.exposureClaimCount.trim()) : null },
        mapPremiumAccountingDate: () => { return flatJson.accountingDate ? convert4DigitDate(flatJson.accountingDate) : null },
        mapClaimAccountingDate: () => { return flatJson.accountingDate ? convert4DigitDate(flatJson.accountingDate) : null },
        mapStateCode: () => { return flatJson.stateCode },
        mapPolicyFormCode: () => { return flatJson.policyForm },
        mapRiskClassificationCode: () => { return flatJson.classCode },
        mapPostalCode: () => { return flatJson.zipCode },
        mapCountryCode: () => { return flatJson.countryCode },
        mapPolicyNumber: () => { return flatJson.policyNumberClaimNumberIdentifier },
        mapAddress: () => { return flatJson.address.trim() },
        mapTaxID: () => { return flatJson.taxID },
        mapSicCode: () => { return flatJson.sicCode },
        mapBusinessInterruptionLimit: () => { return null },
        mapNumberOfEmployees: () => { return flatJson.numberOfEmployees ? parseInt(flatJson.numberOfEmployees.trim()) : null },
        mapPolicyFormEdition: () => { return flatJson.policyFormEdition.trim() },
        mapAnnualStatementLineOfBusinessCode: () => { return flatJson.annualStatementLineOfBusiness },
        mapCauseOfLossCode: () => { return flatJson.monthsCoveredCauseOfLoss },
        mapAccidentDate: () => { return flatJson.accidentDate ? convert6DigitDate(flatJson.accidentDate.trim()) : null },
        mapClaimNumber: () => { return flatJson.policyNumberClaimNumberIdentifier },
        mapClaimStatus: () => { return flatJson.claimStatus },
        mapLossAmount: () => { return flatJson.premiumLossAmount ? parseInt(flatJson.premiumLossAmount.trim()) : null }
    }
    return mapping
}

function convert4DigitDate(dateString) {
    return '20' + dateString.substring(2, 4) + '-' + dateString.substring(0, 2) + '-01'
}

function convert6DigitDate(dateString) {
    return '20' + dateString.substring(4, 6) + '-' + dateString.substring(0, 2) + '-' + dateString.substring(2, 4)
}