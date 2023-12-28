const csv = require('csvtojson')
const utilities = require('../utils/mapping-utilities')
const referenceData = require('../data/referenceData.json')

module.exports.transformRecords = (records) => {
}

module.exports.transform = (record) => {
    let sexMaritalStatus = referenceData.sexMarital[record['SEX_MARITAL_STATUS_EXT']]
    let ageObject = referenceData.operatorAge[record['OPERATOR_AGE_EXT']]
    let vehicleUse = referenceData.vehicleUse[record['VEHICLE_USE_EXT']]
    let performance = referenceData.performance[record['VEHICLE_PERFORMANCE_EXT']]
    let driversTraining = referenceData.driversTraining[record['PL_TRAINING_CL_AUTO_CLASS_EXT']]
    let coverageCode = record['CVRG_CD_EXT']
    let coverage = referenceData.coverage[coverageCode]
    let liabilityLimitsCoverage = referenceData.liabilityLimits[coverageCode]
    let liabilityLimits = liabilityLimitsCoverage ? liabilityLimitsCoverage[record['LIABILITY_LIMITS_EXT']] : {}
    let vehicleClassCode = record['VEHICLE_CLASS_EXT']
    let vehicleBodyStyleCode = vehicleClassCode ? vehicleClassCode.substring(0, 2) : ''
    let vehicleBodySizeCode = vehicleClassCode ? vehicleClassCode.substring(2, 3) : ''
    let modelYearInput = record['MODEL_YR_EXT']
    let century = modelYearInput ? (modelYearInput > '30' ? '19' : '20') : ''
    let modelYear = modelYearInput ? `${century}${modelYearInput}` : 'unknown'
    let exposureInput = record['EXPOSURE_EXT']
    let exposure = exposureInput ? utilities.convertNumber(exposureInput, false) : ``
    let claimCountInput = record['CLAIM_COUNT_EXT']
    let claimCount = claimCountInput ? utilities.convertNumber(claimCountInput, false) : ''
    let lossAmount = record['LOSS_OR_OS_DOLLARS_EXT']
    let premiumAmount = record['PREM_DOLLARS_EXT']
    let causeOfLossCoverageObject = referenceData.causeOfLoss[coverageCode]
    let causeOfLoss = causeOfLossCoverageObject ? causeOfLossCoverageObject[record['CAUSE_OF_LOSS_CD_EXT']] : {}
    let symbolInput = record['SYMBOL_CD_EXT']
    let modelYearCategory = ''
    let accountingDateInput = record['ACCNTNG_DT_EXT']
    let accidentDateInput = record['ACCID_DT_EXT']

    if (modelYear) {
        if (century == '19') {
            if (modelYear < '1990') {
                modelYearCategory = 'Prior to 1990'
            } else {
                modelYearCategory = '1990 and After'
            }
        } else {
            modelYearCategory = '1990 and After'
        }
    }
    let symbolCategory = referenceData.symbol[modelYearCategory]
    let symbol = symbolCategory ? symbolCategory[symbolInput] : {}

    let resultRecord = {
        "lineOfInsurance": referenceData.lineOfInsurance[record['LINE_OF_INS_EXT']],
        "accountingDate": accountingDateInput ? utilities.convertDate(accountingDateInput) : '',
        "companyCode": record['COMPANY_CD_EXT'],
        "state": referenceData.state[record['STATE_CD_EXT']],
        "transaction": referenceData.transaction[record['TRANS_CD_EXT']],
        "territory": { "code": record['TERR_CD_EXT'] },
        "policyId": record['POL_ID_EXT'],
        "zipCode": record['ZIP_CD_EXT'],
        "zipCodeSuffix": record['ZIP_CD_SUFFIX_EXT'],
        "claim": {
            "amount": lossAmount ? utilities.convertNumber(record['LOSS_OR_OS_DOLLARS_EXT']) : '',
            "claimCount": claimCount,
            "causeOfLoss": causeOfLoss,
            "accidentDate": accidentDateInput ? utilities.convertDate(accidentDateInput) : '',
            "occurrenceId": record['OCCURRENCE_ID_EXT'],
            "claimId": record['CLM_ID_EXT']
        },
        "premium": {
            "amount": premiumAmount ? utilities.convertNumber(premiumAmount) : ''
        },
        "program": referenceData.program[record['PROG_CLASS_CD_EXT']],
        "coverage": coverage,
        "subline": referenceData.subline[record['SUBLINE_EXT']],
        "demographics": {
            "gender": sexMaritalStatus ? sexMaritalStatus.sex : "unknown",
            "maritalStatus": sexMaritalStatus ? sexMaritalStatus.maritalStatus : "unknown",
            "ageGroup": ageObject ? ageObject.name : "unknown",
            "principalSecondary": sexMaritalStatus ? sexMaritalStatus.principalSecondary : "unknown"
        },
        "vehicle": {
            "use": vehicleUse ? vehicleUse.name : "unknown",
            "performance": performance ? performance.name : "unknown",
            "bodyStyle": referenceData.vehicleBodyStyle[vehicleBodyStyleCode],
            "bodySize": referenceData.vehicleBodySize[vehicleBodySizeCode],
            "modelYear": modelYear,
            "symbol": symbol,
            "passiveRestraintDiscount": referenceData.passiveRestraintDiscount[record['PASSIVE_RESTRAINT_EXT']],
            "antiLockBrakesDiscount": referenceData.antiLockBrakesDiscount[record['ANTI_LOCK_EXT']],
            "antiTheftDeviceDiscount": referenceData.antiTheftDeviceDiscount[record['ANTI_THEFT_EXT']],
            "defensiveDriverDiscount": referenceData.defensiveDriverDiscount[record['DEFENSIVE_DRIVER_EXT']],
        },
        "singleMultiCar": referenceData.singleMultiCar[record['SINGLE_MULTI_CAR_EXT']],
        "driversTraining": driversTraining ? driversTraining.name : "unknown",
        "penaltyPoints": referenceData.penaltyPoints[record['PL_PNLTYPNT_CL_AUTO_USE_EXT']],
        "liabilltyLimits": liabilityLimits,
        "physicalDamageDeductible": referenceData.physicalDamageDeductible[record['DEDUCTIBLE_EXT']],
        "uiUimCoverage": referenceData.umUimCoverage[record['UM_UIM_EXT']],
        "exposure": exposure,
        "monthsCovered": record['MONTHS_COVERED_EXT'],
        "packageCode": referenceData.packageCode[record['PKG_ID_EXT']],
        "poolAffiliation": referenceData.poolAffiliation[record['POOL_CD_EXT']],
        "pipLimitDeductible": referenceData.pipLimitDeductible[record['PIP_LIMIT_DEDUCT_EXT']],
        "experienceRatingModifier": referenceData.experienceRatingModificationFactor[record['EXP_RATING_MOD_EXT']],
        "exceptionCodeA": record['EXCEPT_CODE_A_EXT'],
        "exceptionCodeB": record['EXCEPT_CODE_B_EXT'],
        "exceptionCodeC": record['EXCEPT_CODE_C_EXT'],
        "exceptionCodeA": record['EXCEPT_CODE_D_EXT'],
        "optionalCountyCode": record['OPT_COUNTY_CODE_EXT']
    }
    return resultRecord
}

