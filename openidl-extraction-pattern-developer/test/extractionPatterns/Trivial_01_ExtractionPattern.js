/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */

function map() {
    let key = this.Policy.PolicyIdentifier
    var result = {
        "key": { "PolicyIdentifier": key },
        "value": {
            "premiumAmount": this.Policy.PremiumAmount,
            //"chunkId": this.chunkId,
            "companyCode": this.Policy.CompanyCode,
            "state": this.Policy.State
        }
    }
    emit(
        result.value.state, result.value.premiumAmount,
    )
}

function reduce(key, value) {
    return Array.sum(value);
}

exports.map = map
exports.reduce = reduce