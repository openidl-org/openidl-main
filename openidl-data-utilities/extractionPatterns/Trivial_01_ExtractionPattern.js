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
        result.key, result.value,
    )
}

function reduce(key, value) {
    let result = { "totalPremium": 0 }
    for (item of value) {
        result.totalPremium += item.premium
    }
    return result;
}

exports.map = map
exports.reduce = reduce
exports.metadata = {
    "id": "Trivial_01",
    "name": "Trivial_01",
    "description": "Trivial EP 01",
    "jurisdiction": "AL",
    "insurance": "Personal Auto",
    "version": "0.1",
    "effectiveDate": "2022-01-30T18:30:00Z",
    "expirationDate": "2023-01-30T18:30:00Z",
    "premiumFromDate": "2022-01-30T18:30:00Z",
    "premiumToDate": "2023-01-30T18:30:00Z",
    "lossFromDate": "2022-01-30T18:30:00Z",
    "lossToDate": "2023-01-30T18:30:00Z",
    "userId": "kens@aaisonline.com"
}