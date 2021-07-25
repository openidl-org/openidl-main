const deepEquals = require('deep-equals')

let emitted = []

module.exports.getEmitted = () => { return emitted }

function emit(key, value) {

    let arrayAtKey = null
    for (emittedItem of emitted) {
        if (deepEquals(emittedItem.key, key)) {
            arrayAtKey = emittedItem.values
        }
    }
    if (arrayAtKey === null) {
        arrayAtKey = []
        emitted.push({ "key": key, "values": arrayAtKey })
    }
    arrayAtKey.push(value)
}

function map() {
    const RECORD_TYPE_PREMIUM = 'Premium'
    const RECORD_TYPE_LOSS = 'Loss'
    const LOB_IM = '31'
    const LOB_CP = '47'
    const LOB_BP = '49'
    const PREMIUM_LEVEL_POLICY = 'Policy'
    const PREMIUM_LEVEL_COVERAGE = 'Coverage'

    let filters = {
        "lineOfInsurance": ['31', '47', '49'],
        "annualStatementLineofBusiness": ['010', '21', '51'],
        "lossAccountingStartDate": new Date('01/01/2020'), // 2010 to be changed to 2020 
        "lossAccountingEndDate": '', //current date
        "premiumAccountingStartDate": new Date('01/01/2020'), //2010 to be changed to 2020 
        "premiumAccountingEndDate": new Date('12/31/2020'), //2010 to be changed to 2020 
        "lossAccidentDateStartDate": new Date('01/01/2020'),
        "lossAccidentDateEndDate": '',
        "transactionCodeFilter": ["1", "2", "3", "9"] //Transaction code in (1|2|3|9)  
    }

    let chunkId = this.chunkId
    let recordType = (this.claim ? RECORD_TYPE_LOSS : RECORD_TYPE_PREMIUM)
    let carrierId = this.carrierId;
    //Variable Setting for Group Fields 
    let stateCode = this.policy.policyStructure[0].location[0].geographicLocation.stateLegacyCode;
    let stateName = this.policy.policyStructure[0].location[0].geographicLocation.stateName;
    let lineOfInsuranceCode = this.policy.lineOfInsurance.legacyCode;
    let lineOfInsuranceName = this.policy.lineOfInsurance.name;
    let annualStatementLineofBusinessCode = this.policy.annualStatementLineOfBusiness.code;
    let annualStatementLineofBusinessName = this.policy.annualStatementLineOfBusiness.description;

    let policyForm = (recordType === RECORD_TYPE_PREMIUM ? this.policy.policyForm : this.policy.policyStructure[0].coverages[0].policyForm)
    let policyFormName = policyForm.description
    let physicalDamageRequirement = policyForm.physicalDamageRequirement ? policyForm.physicalDamageRequirement : null
    let businessInteruptionFlag = policyForm.businessInteruptionFlag ? policyForm.businessInteruptionFlag : null
    let viralExclusion = policyForm.viralExclusion ? policyForm.viralExclusion : null

    let majorPerilName = this.policy.perilCategory ? this.policy.perilCategory[0].majorPeril : ''

    let numberOfEmployees = this.policy.numberOfEmployees ? parseInt(this.policy.numberOfEmployees) : null

    let transactionCode = this.coverageLevel === PREMIUM_LEVEL_POLICY ? this.policy.currencyPayment[0].legacyCode : this.policy.policyStructure[0].coverages[0].currencyPayment[0].legacyCode
    let transactionType = this.coverageLevel === PREMIUM_LEVEL_POLICY ? this.policy.currencyPayment[0].transactionType : this.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionType

    let premiumAccountingDate = null

    let pppIndicataor = this.ppp.pppIndicator ? 'Y' : 'N'
    let naicsCode = this.ppp.naicsCode
    let jobsReported = this.ppp.jobsReported
    let processingMethod = this.ppp.processingMethod
    let ruralUrbanIndicator = this.ppp.ruralUrbanIndicator
    let cd = this.ppp.cd
    let race = this.ppp.race
    let initialApprovalAmount = this.ppp.initialApprovalAmount
    let currentApprovalAmount = this.ppp.currentApprovalAmount

    let coverageCode = this.policy.policyStructure[0].coverages[0].legacyCode
    if (this.coverageLevel === PREMIUM_LEVEL_POLICY) {
        if (this.policy.currencyPayment[0].accountStatement) {
            premiumAccountingDate = this.policy.currencyPayment[0].accountStatement.periodStartDate
        }
    } else {
        premiumAccountingDate = this.policy.policyStructure[0].coverages[0].currencyPayment[0].periodStartDate
    }

    let lossAccountingDate = null
    let lossAccidentDate = null
    let causeOfLossName = ''
    let causeOfLossCode = ''
    let claimStatus = ''
    let lossAmount = null
    let premiumAmount = null
    if (this.claim) {
        lossAmount = this.claim.lossType === 'Paid Loss' ? this.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].amount : this.claim.claimFolder.claimComponent[0].currencyPayment[0].currencyPaymentAmount
        if (this.claim.claimFolder) {
            // TODO: KS Claim Status is meaningless
            // let claimStatusCode = this.claim.claimFolder.claimStatus
            // if (claimStatusCode) {
            //     claimStatus = 'closed'
            // } else {
            //     claimStatus = ''
            // }
            if (this.claim.claimFolder.claimComponent) {
                if (this.claim.claimFolder.claimComponent[0].causeOfLoss) {
                    causeOfLossName = this.claim.claimFolder.claimComponent[0].causeOfLoss.name
                    causeOfLossCode = this.claim.claimFolder.claimComponent[0].causeOfLoss.legacyCode
                }
                if (this.claim.claimFolder.claimComponent[0].currencyPayment[0].accountStatement) {
                    lossAccountingDate = this.claim.claimFolder.claimComponent[0].currencyPayment[0].accountStatement.periodStartDate
                }
            }
            lossAccidentDate = this.claim.claimFolder.eventStartDate
        }
    } else {
        premiumAmount = this.policy.currencyPayment[0].currencyPaymentAmount
    }
    let sicCode = ''
    if (this.policy.businessClassification) {
        sicCode = this.policy.businessClassification.description
    }

    let policyNumber = this.policyNo

    // TODO: KS only emit if it's a loss record?
    // TODO: KS only emit if inside the dates
    //  if (lineofInsuranceFilter.includes(lineofInsurance) && (transactionCodeFilter.includes(transactionCode)) 
    //      && ((premiumAccountingDateModified >= premiumAccountingStartDate && premiumAccountingDateModified <= premiumAccountingEndDate) 
    //      || (lossAccountingDateModified >= lossAccountingStartDate && lossAccountingDateModified <= currentDate)) 
    //      //&& (lossAccidentDateModified >= lossAccidentDateStartDate && lossAccidentDateModified <= currentDate) 
    //      //&& (annualStatementLineofBusinessFilter.includes(annualStatementLineofBusiness)) 
    //      //&& •  Cause of loss in (‘All other physical damage’)  
    //  )
    if (filters.lineOfInsurance.includes(lineOfInsuranceCode)) {
        emit(
            {
                "stateName": stateName,
                "lineofInsurance": lineOfInsuranceName,
                "annualStatementLineofBusiness": annualStatementLineofBusinessName,
                "policyForm": policyFormName,
                "majorPeril": majorPerilName,
                "numberOfEmployees": numberOfEmployees,
                "physicalDamageRequirement": physicalDamageRequirement,
                "transactionCode": transactionCode,
                "transactionName": transactionType,
                "coverageCode": coverageCode,
                "causeOfLossCode": causeOfLossCode,
                "causeOfLoss": causeOfLossName,
                "claimStatus": claimStatus,
                "accountingDate": this.claim ? lossAccountingDate : premiumAccountingDate,
                "lossAccidentDate": lossAccidentDate,
                "businessInteruptionFlag": businessInteruptionFlag,
                "physicalDamageRequirementFlag": physicalDamageRequirement,
                "viralExclusion": viralExclusion,
                "sicCode": sicCode,
                "pppIndicator": pppIndicataor,
                "naicsCode": naicsCode,
                "jobsReported": jobsReported,
                "processingMethod": processingMethod,
                "ruralUrbanIndicator": ruralUrbanIndicator,
                "cd": cd,
                "race": race,
                "initialApprovalAmount": initialApprovalAmount,
                "currentApprovalAmount": currentApprovalAmount
            },
            {
                "writtenPremiumAmount": premiumAmount,
                "lossAmount": lossAmount,
                "policyNumber": policyNumber,
                "lossAmount": lossAmount,
                "chunkId": chunkId
            }
        );
    }
}

function reduce(key, values) {
    let result = {}
    let totalLossAmount = 0
    let totalWrittenPremiumAmount = 0
    let policyNumbers = []
    let claimCount = 0
    for (value of values) {
        totalLossAmount += value.lossAmount
        totalWrittenPremiumAmount += value.writtenPremiumAmount
        if (value.policyNumber) {
            policyNumbers.push(value.policyNumber)
        }
        claimCount++
    }
    result.lossAmount = totalLossAmount
    result.writtenPremiumAmount = totalWrittenPremiumAmount
    result.numberOfPolicies = new Set(policyNumbers).size
    result.numberOfClaims = claimCount
    result.chunkId = values[0].chunkId
    result.value = { "chunkId": values[0].chunkId }
    return result;
}


exports.map = map
exports.reduce = reduce
