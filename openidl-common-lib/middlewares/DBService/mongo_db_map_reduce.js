// SPDX-License-Identifier: Apache-2.0
const viewFunction = {};
viewFunction.map = function() {
    var lineofInsurance = ['32', '34']; // HO : 32, MHO : 34
    var policyFormCodes = ['01', '02', '03', '04', '05', '06', '08', '84', '86', '41', '61'];
    var annualStatementLineofBusiness = ['040'];
    var premiumTransactionCode = ["1", "8"];
    var lossTransactionCode = ["2", "3"];
    var carrierId = this.documentId.split("-")[0];
    this.records.forEach(function(record) {
        if (annualStatementLineofBusiness.indexOf(record.annualStatementLineofBusiness) > -1 &&
            lineofInsurance.indexOf(record.lineOfInsurance) > -1 && (policyFormCodes.indexOf(record.policyForm) > -1)) {
            var newKey = [carrierId, record.policyFormDesc, record.companyCode, record.yearofConstruction, record.zipCode, record.stateCode, record.exposure, record.transactionCode, record.monthsCovered];
            var mapvalue = {
                "companyCode": record.companyCode,
                "yearofConstruction": record.yearofConstruction,
                "zipCode": record.zipCode,
                "stateCode": record.stateCode,
                "exposure": record.exposure,
                "transactionCode": record.transactionCode,
                "monthsCovered": record.monthsCovered,
                "writtenPremium": 0,
                "writtenLoss": 0,
                "claimCount": 0
            }
            if (premiumTransactionCode.indexOf(record.transactionCode) > -1) {
                mapvalue.writtenPremium = parseFloat(record.premiumAmount);
                mapvalue.claimCount = 0;
            } else if (lossTransactionCode.indexOf(record.transactionCode) > -1) {
                mapvalue.writtenLoss = parseFloat(record.lossesAmount);
                mapvalue.claimCount = parseInt(record.claimCount);
            }
            var result = {
                "key": newKey,
                "value": mapvalue
            }
            emit({
                carrierId: carrierId,
                policyFormDesc: record.policyFormDesc,
                companyCode: record.companyCode,
                yearofConstruction: record.yearofConstruction,
                zipCode: record.zipCode,
                stateCode: record.stateCode,
                exposure: record.exposure,
                transactionCode: record.transactionCode,
                monthsCovered: record.monthsCovered
            }, result);
        }

    });
};

viewFunction.reduce = function(key, value) {

    function aggregateFields(values, result) {
        // Aggregate data for computing exposure and premium values
        var lossSum = 0.0;
        var premiumSum = 0.0;
        var claimCount = 0.0;
        values.forEach(function(element) {
            lossSum = lossSum + element.value.writtenLoss;
            premiumSum = premiumSum + element.value.writtenPremium;
            claimCount = claimCount + element.value.claimCount;
        });
        result.writtenLoss = lossSum;
        result.writtenPremium = premiumSum;
        result.claimCount = claimCount;
    }
    var innerResult = {
        "policyFormDesc": value[0].value.policyFormDesc,
        "companyCode": value[0].value.companyCode,
        "yearofConstruction": value[0].value.yearofConstruction,
        "zipCode": value[0].value.zipCode,
        "stateCode": value[0].value.stateCode,
        "exposure": value[0].value.exposure,
        "transactionCode": value[0].value.transactionCode,
        "monthsCovered": value[0].value.monthsCovered,
    };
    aggregateFields(value, innerResult);
    var result = {
        "key": value[0].key,
        "value": innerResult
    }
    return result;
};

module.exports = viewFunction;