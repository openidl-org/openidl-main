/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */

function map() {
    let key = this.zipcode
    var result = {
        "key": { "zipcode": key },
        "value": {
            "premium": this.premium,
            "chunkId": this.chunkId,
            "carrierId": this.carrierId
        }
    }
    emit(
        result.key, result.value.premium,
    )
}

function reduce(key, value) {
    return Array.sum(value);
}

exports.map = map
exports.reduce = reduce