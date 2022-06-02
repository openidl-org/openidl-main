/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */

function map() {
    let key = this.zipcode
    var result = {
        "key": { "zipCode": key },
        "value": {
            "premiumAmount": this.premiumAmount,
            //"chunkId": this.chunkId,
            "companyCode": this.companyCode
        }
    }
    emit(
        result.key, result.value.premiumAmount,
    )
}

function reduce(key, value) {
    return Array.sum(value);
}

exports.map = map
exports.reduce = reduce