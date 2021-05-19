/**
 SPDX-License-Identifier: Apache-2.0
*/
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
    var transactionType = referenceData.TransactionCode[transactionCode]
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
    var majorPerilCode = mapping.mapMajorPeril()
    var majorPerilName = majorPerilCode ? referenceData.MajorPeril[majorPerilCode] : ''
    var lossAmount = mapping.mapLossAmount()
    var structure = {
        "metaData": {
            "lineOfBusiness":lineOfInsurance,
            "transactionCode":transactionCode,
            "state":stateAbbreviation,
            "amount": isAPremiumTransaction ? premiumAmount : lossAmount
        },
        "coverageLevel": premiumLevel,
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
                                    "transactionType": transactionType,
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
    if (majorPerilCode) {
        structure.policy.perilCategory = [
            {
                "majorPeril":majorPerilName
            }
        ]
    }
    if (isAPremiumTransaction) {
        structure.policy.taxID = taxID
        structure.policy.currencyPayment[0].transactionType = transactionType
        structure.policy.currencyPayment[0].transactionCode = transactionCode
        structure.policy.currencyPayment[0].currencyPaymentAmount = premiumAmount
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
        structure.policy.policyStructure[0].coverages[0].currencyPayment[0].currencyPaymentAmount = premiumAmount
        structure.policy.policyStructure[0].coverages[0].exposureAmount = exposureAmount
        if (premiumLevel === 'Policy') {
            if (!structure.policy.currencyPayment[0].accountStatement) {
                structure.policy.currencyPayment[0].accountStatement = {}
            }
            structure.policy.currencyPayment[0].accountStatement.periodStartDate = premiumAccountingDate
            structure.policy.currencyPayment[0].transactionType = transactionType
            structure.policy.currencyPayment[0].transactionCode = transactionCode
        } else {
            structure.policy.policyStructure[0].coverages[0].currencyPayment[0].periodStartDate = premiumAccountingDate
            structure.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionType = transactionType
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
        structure.claim = {
            "claimFolder": {
                "eventStartDate": accidentDate,
                "claimNumber": claimNumber,
                "claimStatus": claimStatus,
                "claimComponent": [
                    {
                        "type": "TODO: need a type",
                        "currencyPayment": [
                            {
                                "type": "TODO: need a type",
                                "transactionType": transactionType,
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
        structure.claim.lossType = lossType
        if (lossType === 'Paid Loss') {
            structure.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].type = 'Loss amount'
            structure.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].amount = lossAmount
        } else {
            structure.claim.claimFolder.claimComponent[0].currencyPayment[0].type = 'Reserve for Claim'
            structure.claim.claimFolder.claimComponent[0].currencyPayment[0].currencyPaymentAmount = lossAmount
        }

    }
    return structure
}

convertStringToFloat = (num) => {
    if (num.length === 0) {
        return 0
    } else if (num.includes('.')) {
        return parseFloat(num)
    }
    var code = num[num.length - 1]
    var base = num.substring(0, num.length -1)
    newLastDigit = numberTypeCode[code].digit
    var multiplier = numberTypeCode[code].multiplier
    return multiplier * parseFloat(base + newLastDigit) / 100
}

const numberTypeCode = {
        "}": {"digit":"0","multiplier":-1},
        "J": {"digit":"1","multiplier":-1},
        "K": {"digit":"2","multiplier":-1},
        "L": {"digit":"3","multiplier":-1},
        "M": {"digit":"4","multiplier":-1},
        "N": {"digit":"5","multiplier":-1},
        "O": {"digit":"6","multiplier":-1},
        "P": {"digit":"7","multiplier":-1},
        "Q": {"digit":"8","multiplier":-1},
        "R": {"digit":"9","multiplier":-1},
        "0": {"digit":"0","multiplier":1},
        "1": {"digit":"1","multiplier":1},
        "2": {"digit":"2","multiplier":1},
        "3": {"digit":"3","multiplier":1},
        "4": {"digit":"4","multiplier":1},
        "5": {"digit":"5","multiplier":1},
        "6": {"digit":"6","multiplier":1},
        "7": {"digit":"7","multiplier":1},
        "8": {"digit":"8","multiplier":1},
        "9": {"digit":"9","multiplier":1},
        "{": {"digit":"0","multiplier":1},
        "A": {"digit":"1","multiplier":1},
        "B": {"digit":"2","multiplier":1},
        "C": {"digit":"3","multiplier":1},
        "D": {"digit":"4","multiplier":1},
        "E": {"digit":"5","multiplier":1},
        "F": {"digit":"6","multiplier":1},
        "G": {"digit":"7","multiplier":1},
        "H": {"digit":"8","multiplier":1},
        "I": {"digit":"9","multiplier":1}
    }

module.exports.baseMapping = (flatJson, batchId, batchHash) => {
    var mapping = {
        mapTransactionCode: () => { return flatJson.transactionCode },
        mapLineOfInsurance: () => { return flatJson.lineOfInsurance },
        mapCompanyCode: () => { return flatJson.companyCode },
        mapPremiumAmount: () => { return flatJson.premiumLossAmount ? convertStringToFloat(flatJson.premiumLossAmount.trim()) : null },
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
        mapLossAmount: () => { return flatJson.premiumLossAmount ? convertStringToFloat(flatJson.premiumLossAmount.trim()) : null },
        mapMajorPeril: () => { return ''}
    }
    return mapping
}

function convert4DigitDate(dateString) {
    return '20' + dateString.substring(2, 4) + '-' + dateString.substring(0, 2) + '-01'
}

function convert6DigitDate(dateString) {
    return '20' + dateString.substring(4, 6) + '-' + dateString.substring(0, 2) + '-' + dateString.substring(2, 4)
}