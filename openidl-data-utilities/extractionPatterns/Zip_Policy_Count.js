/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */

function map() {
    let key = this.zipCode
    let chunkId = this.chunkId
    let policyId = this.policyId
    let transactionName = this.transaction.name
    var result = {
        "key": { "chunkId": chunkId, "zipcode": key },
        "value": {
            "transaction": transactionName,
            "policyId": policyId,
            "premium": this.premium.amount ? parseFloat(this.premium.amount) : 0,
            "carrierId": this.carrierId
        }
    }
    emit(
        result.key, result.value,
    )
}

function reduce(key, value) {
    let result = { "totalPremium": 0, "totalPolicies": 0 }
    let policyIds = []
    for (item of value) {
        if (policyIds.includes(item.policyId)) {

        } else {
            result.value = { "chunkId": key.chunkId }
            result.totalPolicies += 1
        }
        policyIds.push(item.policyId)
        result.totalPremium += item.premium
    }
    return result;
}

exports.map = map
exports.reduce = reduce
exports.metadata = {
    "id": "ZIP_POLICY_COUNT_01",
    "name": "ZipCode Policy Count",
    "description": "Personal Auto Policy Count",
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