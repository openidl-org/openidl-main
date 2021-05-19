//
// SPDX-License-Identifier: Apache-2.0
//
/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */

function reduce(key,value) {
    return Array.sum(value);
}

function map() {
    var carrierId = this.documentId.split("-")[0] 
    //Variable Setting for Group Fields 
    var stateCode = (this.agrmnt.strctrlCmpnnt.plc.ggrphcArea.enmTyp = 'State Code') ? this.agrmnt.strctrlCmpnnt.plc.ggrphcArea.extrnlRfrnc : ''; 
    var lineofInsurance = this.agrmnt.prdctGrp.extrnlRfrnc; 
    var annualStatementLineofBusiness = ''; 
    //var annualStatementLineofBusiness = -- bug fixed ? add loop through agrmnt.othrRgstrtn[0] and conditional check for enumtype = 'Annual Statement Line of Business' 
    var policyForm = (this.agrmnt.stndrdTxtSpcfctn.cmpstTxtBlck.enmTyp = 'Policy Form') ? this.agrmnt.stndrdTxtSpcfctn.cmpstTxtBlck.extrnlRfrnc : ''   
    var numberOfEmployees = this.agrmnt.othrCtgry.mxmmSz; 
    var premiumTransactionCodeAgreement = (this.agrmnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.fnnclTrnsctn.enmTyp = 'Premium Statistical Transaction Code') ? this.agrmnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.fnnclTrnsctn.extrnlRfrnc : '' ; 
    var premiumTransactionCodeCoverage = (this.agrmnt.strctrlCmpnnt.cvrgCmpnnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.fnnclTrnsctn.enmTyp = 'Premium Statistical Transaction Code') ? this.agrmnt.strctrlCmpnnt.cvrgCmpnnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.fnnclTrnsctn.extrnlRfrnc : ''; 
    var premiumTransactionCode = ''; 
    if (premiumTransactionCodeAgreement != '') { 
        premiumTransactionCode = premiumTransactionCodeAgreement; 
    } 
    else if (premiumTransactionCodeCoverage != '') { 
        premiumTransactionCode = premiumTransactionCodeCoverage; 
    } 
    var lossTransactionCode = (this.clm.clmFldr[0].elmntryClm[0].prtclrMnyPrvsn[0].mnyPrvsnCshFlw[0].mnyPrvsnPrt[0].fnnclTrnsctn.enmTyp = 'Loss Statistical Transaction Code') ? this.clm.clmFldr[0].elmntryClm[0].prtclrMnyPrvsn[0].mnyPrvsnCshFlw[0].mnyPrvsnPrt[0].fnnclTrnsctn.extrnlRfrnc : '';  
    var transactionCode=''; 
    var causeOfLoss = (this.clm.clmFldr[0].elmntryClm[0].evnt[0].csoflss[0].enmTyp = 'Cause of Loss' ) ? this.clm.clmFldr[0].elmntryClm[0].evnt[0].csoflss[0].extrnlRfrnc : ''; 
    var claimStatus = this.clm.clmFldr[0].stts; 
    var premiumAccountingDate = this.agrmnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.accntSttmnt.prdStrtDt; 
    var lossAccountingDate = this.clm.clmFldr[0].elmntryClm[0].prtclrMnyPrvsn[0].mnyPrvsnCshFlw[0].mnyPrvsnPrt[0].accntSttmnt.prdStrtDt; 
    var accountingDate = ''; 
    var lossAccidentDate = this.clm.clmFldr[0].evnt[0].strtDt; 
    var businessInteruptionFlag = (this.agrmnt.stndrdTxtSpcfctn.cmpstTxtBlck.plcyCvrgs[0].enmTyp = 'Business Interruption Flag') ? this.agrmnt.stndrdTxtSpcfctn.cmpstTxtBlck.plcyCvrgs[0].cvrgFlg : '' 
    var physicalDamageRequirement = (this.agrmnt.stndrdTxtSpcfctn.cmpstTxtBlck.enmTyp = 'Physical Damage Requirement') ? this.agrmnt.stndrdTxtSpcfctn.cmpstTxtBlck.extrnlRfrnc : '' 
    var viralExclusion = (this.agrmnt.stndrdTxtSpcfctn.cmpstTxtBlck.plcyCvrgs[0].enmTyp = 'Viral Exclusion') ? this.agrmnt.stndrdTxtSpcfctn.cmpstTxtBlck.plcyCvrgs[0].cvrgFlg : '' 
    var sicCode = (this.agrmnt.bsnssActvty.enmTyp = 'SIC Code') ? this.agrmnt.bsnssActvty.indstryCd : '' 
    var sicCodeName = (this.agrmnt.bsnssActvty.enmTyp = 'SIC Code') ? this.agrmnt.bsnssActvty.nm : '' 
    var claimNumber = (this.clm.clmFldr[0].enmTyp = 'Claim Number') ? this.clm.clmFldr[0].nm : ''; 
    var policyNumber = '' ; 
    //this.agrmnt.indvdlAgrmnt.nm ; //option to temporary use individual location as location for Commerical Aggreement not available in data model 
    var writtenPremiumAmount = (this.agrmnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.enmTyp = 'Written Premium Amount') ? parseFloat(this.agrmnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.amnt) : '' 
    var purePremiumAmount = (this.agrmnt.strctrlCmpnnt.cvrgCmpnnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.enmTyp = 'Pure Premium Amount') ? parseFloat(this.agrmnt.strctrlCmpnnt.cvrgCmpnnt.prtclrMnyPrvsn.mnyPrvsnCshFlw.mnyPrvsnPrt.amnt) : ''; 
    var claimCount = parseInt(this.clm.clmFldr[0].elmntryClm[0].prtclrMnyPrvsn[0].mnyPrvsnCshFlw[0].mnyPrvsnPrt[0].clmsCnt); 
    var lossAmount = parseFloat(this.clm.clmFldr[0].elmntryClm[0].prtclrMnyPrvsn[0].mnyPrvsnCshFlw[0].mnyPrvsnPrt[0].amnt); 
    if(premiumTransactionCode != '' ) { 
        accountingDate = premiumAccountingDate; 
        transactionCode = premiumTransactionCode; 
    } else if(lossTransactionCode != '' ) { 
        accountingDate = lossAccountingDate; 
        transactionCode = lossTransactionCode; 
    } 
    //Conditional Variables 
    var lineofInsuranceFilter = ['31','47','49'];// BP : 49, CP : 47, IM:31 
    var annualStatementLineofBusinessFilter = ['010','21','51']; 
    var lossAccountingStartDate = new Date('01/01/2010'); // 2010 to be changed to 2020 
    var lossAccountingEndDate = ''; 
    var premiumAccountingStartDate = new Date('01/01/2010'); //2010 to be changed to 2020 
    var premiumAccountingEndDate = new Date('12/31/2019'); 
    var lossAccidentDateStartDate = new Date('01/01/2020'); 
    var lossAccidentDateEndDate = ''; 
    var transactionCodeFilter = ["1","2","3","9"]; //Transaction code in (1|2|3|9)  
    //Apply conditions 
    var premiumAccountingDateParts = premiumAccountingDate.split("/");  
    var premiumAccountingDateModified = new Date(premiumAccountingDateParts[1],premiumAccountingDateParts[0],'01'); 
    var lossAccountingDateParts = lossAccountingDate.split("/"); 
    var lossAccountingDateModified = new Date(lossAccountingDateParts[1],lossAccountingDateParts[0],'01'); 
    var lossAccidentDateParts = lossAccidentDate.split("/"); 
    var lossAccidentDateModified = new Date(lossAccidentDate[1],lossAccidentDate[0],'01'); 
    var currentDate = new Date(); 
    if (lineofInsuranceFilter.includes(lineofInsurance) && (transactionCodeFilter.includes(transactionCode)) 
        && ((premiumAccountingDateModified >= premiumAccountingStartDate && premiumAccountingDateModified <= premiumAccountingEndDate) 
        || (lossAccountingDateModified >= lossAccountingStartDate && lossAccountingDateModified <= currentDate)) 
        //&& (lossAccidentDateModified >= lossAccidentDateStartDate && lossAccidentDateModified <= currentDate) 
        //&& (annualStatementLineofBusinessFilter.includes(annualStatementLineofBusiness)) 
        //&& •  Cause of loss in (‘All other physical damage’)  
    ) {
        var mapvalue = { 
            "carrierId": carrierId, 
            "stateCode": stateCode, 
            "lineofInsurance": lineofInsurance, 
            "annualStatementLineofBusiness": annualStatementLineofBusiness, 
            "policyForm": policyForm, 
            "numberOfEmployees": numberOfEmployees, 
            "transactionCode": transactionCode, 
            "causeOfLoss": causeOfLoss, 
            "claimStatus": claimStatus, 
            "accountingDate": accountingDate, 
            "lossAccidentDate": lossAccidentDate, 
            "businessInteruptionFlag": businessInteruptionFlag, 
            "physicalDamageRequirement": physicalDamageRequirement, 
            "viralExclusion": viralExclusion, 
            "sicCode": sicCode, 
            "policyNumber": policyNumber, 
            "claimNumber": claimNumber, 
            "uniquePolicyNumber": 0, 
            "writtenPremiumAmount": writtenPremiumAmount, 
            "lossAmount": lossAmount, 
            "uniqueClaimNumber": 0 
        }; 
        //Key, Value setting Result Calculation and setting 
        var newKey = [carrierId,stateCode,lineofInsurance,annualStatementLineofBusiness,policyForm,numberOfEmployees,transactionCode,causeOfLoss,claimStatus,accountingDate,lossAccidentDate,businessInteruptionFlag,physicalDamageRequirement,viralExclusion,sicCode];
        var result = { 
            "key": newKey, 
            "value": mapvalue 
        } 
        emit({"carrierId":carrierId,"stateCode":stateCode,"lineofInsurance":lineofInsurance,"annualStatementLineofBusiness":annualStatementLineofBusiness,"policyForm":policyForm,"numberOfEmployees":numberOfEmployees,"transactionCode":transactionCode,"causeOfLoss":causeOfLoss,"claimStatus":claimStatus,"accountingDate":accountingDate,"lossAccidentDate":lossAccidentDate,"businessInteruptionFlag":businessInteruptionFlag,"physicalDamageRequirement":physicalDamageRequirement,"viralExclusion":viralExclusion,"sicCode":sicCode}, result); 
    } 
}

function reduce (key,value) {
    var lossAmountSum = 0.0;
    var writtenPremiumAmountSum = 0.0;
    var claimCountSum = 0.0;
    var policyCountSum = 0.0;
    var result = {};
    var distinctPolicyNumber = {};
    var distinctClaimNumber = {};
    //value.map(e => { distinctPolicyNumber[e.value.policyNumber] = (distinctPolicyNumber[e.value.policyNumber] || 0) + 1 }) 
    value.forEach(function(element) {
        //if (element.value.policyNumber != '') {policyCountSum = policyCountSum +1;} 
        if ((distinctPolicyNumber[element.value.policyNumber] === undefined || distinctPolicyNumber[element.value.policyNumber] === 0) 
            && element.value.policyNumber != '') {
                distinctPolicyNumber[element.value.policyNumber] = 1;
        } else if (element.value.policyNumber != ''){ 
            distinctPolicyNumber[element.value.policyNumber] = distinctPolicyNumber[element.value.policyNumber] + 1;
        }
        if ((distinctClaimNumber[element.value.claimNumber] === undefined || distinctClaimNumber[element.value.claimNumber] === 0) 
            && element.value.claimNumber != '') { 
                distinctClaimNumber[element.value.claimNumber] = 1;
        } else if (element.value.claimNumber != '') {
            distinctClaimNumber[element.value.claimNumber] = distinctClaimNumber[element.value.claimNumber] + 1;
        }
        lossAmountSum = lossAmountSum + element.value.lossAmount;
        writtenPremiumAmountSum = writtenPremiumAmountSum + element.value.writtenPremiumAmount;
        //claimCountSum = claimCountSum + element.value.claimCount;
    });
    //result.policyCount = policyCountSum;
    result.uniquePolicyNumber = Object.keys(distinctPolicyNumber).length;
    result.writtenPremiumAmount = writtenPremiumAmountSum;
    result.lossAmount = lossAmountSum;
    //result.claimCount = claimCountSum;
    result.uniqueClaimNumber = Object.keys(distinctClaimNumber).length;
    return result;
}

exports.map = map
exports.reduce = reduce