/**
 * Sample file with map and reduce functions used to create an extraction pattern.

group records by policy

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
        result.key.PolicyIdentifier, result.value.premiumAmount,
    )
}

function reduce(key, value){
    return value.join()
}


exports.map = map
exports.reduce = reduce