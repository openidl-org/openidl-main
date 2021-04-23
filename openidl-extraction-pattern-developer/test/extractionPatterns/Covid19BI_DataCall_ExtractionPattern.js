//
// SPDX-License-Identifier: Apache-2.0
//
const deepEquals = require('deep-equals')

let emitted = []

module.exports.getEmitted = () => { return emitted}

function emit(key, value) {

    let arrayAtKey = null
    for (emittedItem of emitted) {
        if (deepEquals(emittedItem.key,key)) {
            arrayAtKey = emittedItem.values
        }
    }
    if (arrayAtKey === null) {
        arrayAtKey = []
        emitted.push ({"key":key, "values":arrayAtKey})
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
        "lineOfInsurance" : ['31','47','49'],
        "annualStatementLineofBusiness": ['010','21','51'],
        "lossAccountingStartDate": new Date('01/01/2020'), // 2010 to be changed to 2020 
        "lossAccountingEndDate": '', //current date
        "premiumAccountingStartDate": new Date('01/01/2020'), //2010 to be changed to 2020 
        "premiumAccountingEndDate": new Date('12/31/2020'), //2010 to be changed to 2020 
        "lossAccidentDateStartDate": new Date('01/01/2020'), 
        "lossAccidentDateEndDate": '', 
        "transactionCodeFilter": ["1","2","3","9"] //Transaction code in (1|2|3|9)  
    }
     
    let recordType = (this.claim ? RECORD_TYPE_LOSS : RECORD_TYPE_PREMIUM)
    let carrierId = this.policy.company.code;
    //Variable Setting for Group Fields 
    let stateCode = this.policy.policyStructure[0].location[0].geographicLocation.stateLegacyCode;
    let stateName = this.policy.policyStructure[0].location[0].geographicLocation.stateName;
    let lineOfInsuranceCode = this.policy.lineOfInsurance.legacyCode; 
    let lineOfInsuranceName = this.policy.lineOfInsurance.name;
    let annualStatementLineofBusinessCode = this.policy.annualStatementLineOfBusiness.code;  
    let annualStatementLineofBusinessName = this.policy.annualStatementLineOfBusiness.description;  

    let policyForm  = (recordType === RECORD_TYPE_PREMIUM ? this.policy.policyForm : this.policy.policyStructure[0].coverages[0].policyForm)
    let policyFormName = policyForm.description
    let physicalDamageRequirement = policyForm.physicalDamageRequirement ? 'Y' : 'N'
    let businessInteruptionFlag = policyForm.businessInteruptionFlag ? 'Y' : 'N'
    let viralExclusion = policyForm.viralExclusion ? 'Y' : 'N'

    let majorPerilName = this.policy.perilCategory ? this.policy.perilCategory[0].majorPeril : ''

    let numberOfEmployees = this.policy.numberOfEmployees ? parseInt(this.policy.numberOfEmployees) : null

    let transactionCode = this.coverateLevel === PREMIUM_LEVEL_POLICY ? this.policy.currencyPayment[0].legacyCode : this.policy.policyStructure[0].coverages[0].currencyPayment[0].legacyCode
    let transactionType = this.coverageLevel === PREMIUM_LEVEL_POLICY ? this.policy.currencyPayment[0].transactionType : this.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionType

    let premiumAccountingDate = null
    
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
                "stateName":stateName,
                "lineofInsurance":lineOfInsuranceName,
                "annualStatementLineofBusiness":annualStatementLineofBusinessName,
                "policyForm":policyFormName,
                "majorPeril":majorPerilName,
                "numberOfEmployees":numberOfEmployees,
                "physicalDamageRequirement":physicalDamageRequirement,
                "transactionCode":transactionCode,
                "transactionName":transactionType,
                "causeOfLoss":causeOfLossName,
                "claimStatus":claimStatus,
                "accountingDate": this.claim ? lossAccountingDate : premiumAccountingDate,
                "lossAccidentDate":lossAccidentDate,
                "businessInteruptionFlag":businessInteruptionFlag,
                "physicalDamageRequirementFlag":physicalDamageRequirement,
                "viralExclusion":viralExclusion,
                "sicCode":sicCode
            }, 
            {
                "writtenPremiumAmount":premiumAmount,
                "lossAmount":lossAmount,
                "policyNumber":policyNumber,
                "lossAmount":lossAmount
            }
        ); 
    }
}

function reduce (key,values) {
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
    return result;
}

function mapX() {
    const RECORD_TYPE_PREMIUM = 'Premium'
    const RECORD_TYPE_LOSS = 'Loss'
    const LOB_IM = '31'
    const LOB_CP = '47'
    const LOB_BP = '49'
    const PREMIUM_LEVEL_POLICY = 'Policy'
    const PREMIUM_LEVEL_COVERAGE = 'Coverage'
    let recordType = (this.claim ? RECORD_TYPE_LOSS : RECORD_TYPE_PREMIUM)
    let carrierId = this.policy.company.code;
    //Variable Setting for Group Fields 
    let stateCode =  this.policy.policyStructure[0].location[0].geographicLocation.stateLegacyCode;
    let lineofInsurance = this.policy.lineOfInsurance.legacyCode; 

    let annualStatementLineofBusiness = this.policy.annualStatementLineOfBusiness.code;  
    let numberOfEmployees = this.policy.numberOfEmployees; 
   
    //premium level and policy levels
    let policyForm  = '';
    if (recordType === RECORD_TYPE_PREMIUM) {
        policyForm = this.policy.policyForm.legacyCode
    } else {
        policyForm = this.policy.policyStructure[0].coverages[0].policyForm.legacyCode
    }
    // if (lineOfInsurance === LOB_CP) {
    //     // TODO: KS Trying to fix
    //     // policyForm = this.policy.perilCategory[0].majorPeril;
    //     policyForm = this.policy.policyStructure[0].coverages[0].policyForm.legacyCode;
    // } 
    // if (policyForm === '') {
    //     policyForm = this.policy.policyForm.legacyCode;
    // }
    // if (policyForm === '') {
    //     policyForm = this.policy.policyStructure[0].coverages[0].policyForm.legacyCode;
    // }
    
    let premiumLevel = this.coverageLevel;
    // TODO: taking from record directly
    // if (lineofInsurance === LOB_IM) {
    //     if (policyForm === '14' || policyForm === '15' || policyForm === '16') {
    //         premiumLevel = PREMIUM_LEVEL_POLICY
    //     } else { 
    //         premiumLevel = PREMIUM_LEVEL_COVERAGE
    //     }
    // } else if (lineOfInsurance === LOB_IM) {
    //     // TODO: KS - how determine premium level for IM?
    //     premiumLevel = PREMIUM_LEVEL_POLICY
    // } else if (lineOfInsurance === LOB_CP) {
    //     premiumLevel = (["20", "21", "22","23","25","26","32","33","31","80","81","82","83","87","28","29","30","34","35","36","37","38"].includes(flatJson.majorPeril) }
    // }
    let premiumTransactionCodeAgreement = this.policy.currencyPayment[0].transactionCode; 
   // let premiumTransactionCodeCoverage = this.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionCode; 
    let premiumTransactionCode = ''; 
    if (premiumTransactionCodeAgreement != '') { 
        premiumTransactionCode = premiumTransactionCodeAgreement; 
    } 
    else if (premiumTransactionCodeCoverage != '') { 
        premiumTransactionCode = premiumTransactionCodeCoverage; 
    } 
  //  let lossTransactionCode = this.policy.policyStructure[0].coverages[0].currencyPayment[0].transactionCode; 
   // let causeOfLoss = this.claim.Claim_folder.Claim_components[0].Cause_of_loss.Legacy_code;
   // let claimStatus = this.claim.claimFolder.claimStatus; 
    let premiumAccountingDate = (premiumLevel === 'Policy' ? this.policy.currencyPayment[0].accountStatement[0].periodStartDate : this.policy.policyStructure[0].coverages[0].currencyPayment[0].periodStartDate); 
    // TODO: KS Trying to fix
    // let lossAccountingDate = this.policy.currencyPayment[0].accountStatement[0].periodStartDate;  
    let lossAccountingDate = (recordType == 'Claim' ? this.claim.claimFolder.claimComponent[0].currencyPayment[0].accountStatement[0].periodStartDate : null); 
    //let lossAccountingDate = this.claim.claimFolder.claimComponent[0].currencyPayment[0].accountStatement[0].periodStartDate; 
   // let lossAccidentDate = this.claim.claimFolder.accidentDate; 
   // TODO: KS Not sure about this one
   let lossAccidentDate = (recordType == 'Claim' ? this.claim.claimFolder.claimComponent[0].currencyPayment[0].accountStatement[0].periodStartDate : null); 
    // fill these out for C19
    let businessInteruptionFlag = this.policy.policyForm.businessInterruptionFlag;
    let physicalDamageRequirement = this.policy.policyForm.physicalDamageRequirement;
    let viralExclusion = this.policy.policyForm.viralExclusion;
    let sicCode = this.policy.businessClassification[0].industryCode;
    let sicCodeName = this.policy.businessClassification[0].description;
    //let claimNumber = this.claim.claimFolder.claimNumber; 
    let policyNumber = this.policy.commercialPolicy.policyNumber;
   // let writtenPremiumAmount = this.policy.policyStructure[0].coverages[0].currencyPayment[0].accountStatement[0].currencyPaymentAmount;
     // this would be new field
    //let purePremiumAmount = (this.policy.strctrlCmpnnt.cvrgCmpnnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.enmTyp = 'Pure Premium Amount') ? parseFloat(this.policy.strctrlCmpnnt.cvrgCmpnnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.amnt) : ''; 
    // need clarification
   // let claimCount = parseInt(this.claim.claimFolder.claimComponent[0].currencyPayment[0],claimsCount); 
    // need clarification based on trans code (2, 6 = paid, 3,7 = outstanding)
   // let lossAmount = parseFloat(this.claim.claimFolder.claimComponent[0].claimOffer[0].payment[0].amount); 
    let accountingDate = ''; 
    let transactionCode=''; 
    if(premiumTransactionCode != '' ) { 
        accountingDate = premiumAccountingDate; 
        transactionCode = premiumTransactionCode; 
    } else if(lossTransactionCode != '' ) { 
        accountingDate = lossAccountingDate; 
        transactionCode = lossTransactionCode; 
    } 
     //Conditional Variables 
     let lineofInsuranceFilter = ['31','47','49'];// BP:49, CP:47, IM:31 
     let annualStatementLineofBusinessFilter = ['010','21','51']; 
     let lossAccountingStartDate = new Date('01/01/2020'); // 2010 to be changed to 2020 
     let lossAccountingEndDate = ''; //current date
     let premiumAccountingStartDate = new Date('01/01/2020'); //2010 to be changed to 2020 
     let premiumAccountingEndDate = new Date('12/31/2020'); //2010 to be changed to 2020 
     let lossAccidentDateStartDate = new Date('01/01/2020'); 
     let lossAccidentDateEndDate = ''; 
     let transactionCodeFilter = ["1","2","3","9"]; //Transaction code in (1|2|3|9)  
     //Apply conditions 
     let premiumAccountingDateParts = premiumAccountingDate.split("/");  
     let premiumAccountingDateModified = new Date(premiumAccountingDateParts[1],premiumAccountingDateParts[0],'01'); 
     let lossAccountingDateParts = lossAccountingDate.split("/"); 
     let lossAccountingDateModified = new Date(lossAccountingDateParts[1],lossAccountingDateParts[0],'01'); 
     let lossAccidentDateParts = lossAccidentDate.split("/"); 
     let lossAccidentDateModified = new Date(lossAccidentDate[1],lossAccidentDate[0],'01'); 
     let currentDate = new Date(); 
    //  if (lineofInsuranceFilter.includes(lineofInsurance) && (transactionCodeFilter.includes(transactionCode)) 
    //      && ((premiumAccountingDateModified >= premiumAccountingStartDate && premiumAccountingDateModified <= premiumAccountingEndDate) 
    //      || (lossAccountingDateModified >= lossAccountingStartDate && lossAccountingDateModified <= currentDate)) 
    //      //&& (lossAccidentDateModified >= lossAccidentDateStartDate && lossAccidentDateModified <= currentDate) 
    //      //&& (annualStatementLineofBusinessFilter.includes(annualStatementLineofBusiness)) 
    //      //&& •  Cause of loss in (‘All other physical damage’)  
    //  )
    if (true) 
    {
        let mapvalue = { 
            "carrierId": carrierId, 
            "stateCode": stateCode, 
            "lineofInsurance": lineofInsurance, 
            "annualStatementLineofBusiness": annualStatementLineofBusiness, 
            "policyForm": policyForm, 
            "numberOfEmployees": numberOfEmployees, 
            "transactionCode": transactionCode, 
          //  "causeOfLoss": causeOfLoss, 
          //  "claimStatus": claimStatus, 
            "accountingDate": accountingDate, 
            "lossAccidentDate": lossAccidentDate, 
            "businessInteruptionFlag": businessInteruptionFlag, 
            "physicalDamageRequirement": physicalDamageRequirement, 
            "viralExclusion": viralExclusion, 
            "sicCode": sicCode, 
            "policyNumber": policyNumber, 
          //  "claimNumber": claimNumber, 
            "uniquePolicyNumber": 0, 
            // "writtenPremiumAmount": writtenPremiumAmount, 
           // "lossAmount": lossAmount, 
          //  "uniqueClaimNumber": 0 
        }; 
        //Key, Value setting Result Calculation and setting 
        let newKey = [
            carrierId
            ,stateCode
            ,lineofInsurance
            ,annualStatementLineofBusiness
            ,policyForm
            ,numberOfEmployees
            ,transactionCode
           // ,causeOfLoss
           // ,claimStatus
            ,accountingDate
           // ,lossAccidentDate
            ,businessInteruptionFlag
            ,physicalDamageRequirement
            ,viralExclusion
            ,sicCode];
        let result = { 
            "key": newKey, 
            "value": mapvalue 
        } 
        emit({"carrierId":carrierId
        ,"stateCode":stateCode
        ,"lineofInsurance":lineofInsurance
        ,"annualStatementLineofBusiness":annualStatementLineofBusiness
        ,"policyForm":policyForm
        ,"numberOfEmployees":numberOfEmployees
        ,"transactionCode":transactionCode
       // ,"causeOfLoss":causeOfLoss
      //  ,"claimStatus":claimStatus
        ,"accountingDate":accountingDate
      //  ,"lossAccidentDate":lossAccidentDate
        ,"businessInteruptionFlag":businessInteruptionFlag
        ,"physicalDamageRequirement":physicalDamageRequirement
        ,"viralExclusion":viralExclusion
        ,"sicCode":sicCode}
        , result); 
    } 
}

function reduceX (key,values) {
    let lossAmountSum = 0.0;
    let writtenPremiumAmountSum = 0.0;
    let claimCountSum = 0.0;
    let policyCountSum = 0.0;
    let result = {};
    let distinctPolicyNumber = {};
    let distinctClaimNumber = {};
    //value.map(e => { distinctPolicyNumber[e.value.policyNumber] = (distinctPolicyNumber[e.value.policyNumber] || 0) + 1 }) 
    values.forEach(function(element) {


        //if (element.value.policyNumber != '') {policyCountSum = policyCountSum +1;} 
        if ((distinctPolicyNumber[element.value.policyNumber] === undefined || distinctPolicyNumber[element.value.policyNumber] === 0) 
            && element.value.policyNumber != '') {
                distinctPolicyNumber[element.value.policyNumber] = 1;
        } else if (element.value.policyNumber != ''){ 
            distinctPolicyNumber[element.value.policyNumber] = distinctPolicyNumber[element.value.policyNumber] + 1;
        }

       // lossAmountSum = lossAmountSum + element.value.lossAmount;

        writtenPremiumAmountSum = writtenPremiumAmountSum + element.value.writtenPremiumAmount;

        //claimCountSum = claimCountSum + element.value.claimCount;
    });
    //result.policyCount = policyCountSum;
    result.uniquePolicyNumber = Object.keys(distinctPolicyNumber).length;
    result.writtenPremiumAmount = writtenPremiumAmountSum;
    //result.lossAmount = lossAmountSum;
    //result.claimCount = claimCountSum;
    //result.uniqueClaimNumber = Object.keys(distinctClaimNumber).length;
    return result;
}

exports.map = map
exports.reduce = reduce
