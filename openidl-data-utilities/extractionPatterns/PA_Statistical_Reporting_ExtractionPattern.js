/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */

function map() {
    let stateName = this.state.name
    let stateCode = this.state.code
    let chunkId = this.chunkId
    let coverageName = this.coverage.name
    let coverageCategory = this.coverage.category
    var result = {
        "key": { "chunkId": chunkId, "state": stateName, "code": stateCode, "category": coverageCategory, "coverage": coverageName },
        "value": {
            "premium": this.premium.amount ? parseFloat(this.premium.amount) : 0,
            "loss": this.claim.amount ? parseFloat(this.claim.amount) : 0,
            "carrierId": this.carrierId

        }
    }
    emit(
        result.key, result.value,
    )
}

function reduce(key, value) {
    let result = { "totalPremium": 0, "totalLoss": 0 }
    for (item of value) {
        result.value = { "chunkId": key.chunkId }
        result.totalPremium += item.premium
        result.totalLoss += item.loss
    }
    return result;
}

exports.map = map
exports.reduce = reduce
exports.metadata = {
    "id": "PA_STAT_06",
    "name": "PA Stat Report 06",
    "description": "Personal Auto Stat Reporting",
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