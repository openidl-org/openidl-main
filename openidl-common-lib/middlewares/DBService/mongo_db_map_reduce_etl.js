// SPDX-License-Identifier: Apache-2.0
const viewFunctionETL = {};
viewFunctionETL.map = function () {
    var lineofInsurance = ['32', '34']; // HO : 32, MHO : 34
    var policyFormCodes = ['01', '02', '03', '04', '05', '06', '08', '84', '86', '41', '61'];
    var annualStatementLineofBusiness = ['040'];
    var premiumTransactionCode = ["1", "8"];
    var lossTransactionCode = ["2", "3"];
    if (annualStatementLineofBusiness.indexOf(this.annualStatementLineofBusiness) > -1 &&
        lineofInsurance.indexOf(this.lineOfInsurance) > -1 && (policyFormCodes.indexOf(this.policyForm) > -1)) {
        var newKey = [this.carrierId, this.policyFormDesc, this.companyCode, this.yearofConstruction, this.zipCode, this.stateCode, this.exposure, this.transactionCode, this.monthsCovered];
        var mapvalue = {
            "companyCode": this.companyCode,
            "yearofConstruction": this.yearofConstruction,
            "zipCode": this.zipCode,
            "stateCode": this.stateCode,
            "exposure": this.exposure,
            "transactionCode": this.transactionCode,
            "monthsCovered": this.monthsCovered,
            "writtenPremium": 0,
            "writtenLoss": 0,
            "claimCount": 0
        }
        if (premiumTransactionCode.indexOf(this.transactionCode) > -1) {
            mapvalue.writtenPremium = parseFloat(this.premiumAmount);
            mapvalue.claimCount = 0;
        } else if (lossTransactionCode.indexOf(this.transactionCode) > -1) {
            mapvalue.writtenLoss = parseFloat(this.lossesAmount);
            mapvalue.claimCount = parseInt(this.claimCount);
        }
        var result = {
            "key": newKey,
            "value": mapvalue
        }
        emit({
            carrierId: this.carrierId,
            policyFormDesc: this.policyFormDesc,
            companyCode: this.companyCode,
            yearofConstruction: this.yearofConstruction,
            zipCode: this.zipCode,
            stateCode: this.stateCode,
            exposure: this.exposure,
            transactionCode: this.transactionCode,
            monthsCovered: this.monthsCovered
        }, result);
    }


};

viewFunctionETL.reduce = function (key, value) {
    print("key");
    function aggregateFields(values, result) {
        // Aggregate data for computing exposure and premium values
        var lossSum = 0.0;
        var premiumSum = 0.0;
        var claimCount = 0.0;
        values.forEach(function (element) {
            lossSum = lossSum + element.value.writtenLoss;
            premiumSum = premiumSum + element.value.writtenPremium;
            claimCount = claimCount + element.value.claimCount;
        });
        result.writtenLoss = lossSum;
        result.writtenPremium = premiumSum;
        result.claimCount = claimCount;
    }
    var innerResult = {
        "policyFormDesc": value[0].policyFormDesc,
        "companyCode": value[0].companyCode,
        "yearofConstruction": value[0].yearofConstruction,
        "zipCode": value[0].zipCode,
        "stateCode": value[0].stateCode,
        "exposure": value[0].exposure,
        "transactionCode": value[0].transactionCode,
        "monthsCovered": value[0].monthsCovered,
    };
    aggregateFields(value, innerResult);
    var result = {
        "key": value[0].key,
        "value": innerResult
    }
    return result;
};

module.exports = viewFunctionETL;