/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */

 function map() {
    let state = this.Policy.State
    let vin = this.Vehicle.VINHash
    let coverage = this.Coverage.Coverage
    var result = {
        "key": { "state": state, "vin": vin},
        "value": {
            "coverage": coverage,
            "chunkId": this.chunkId,
            "carrierId": this.Policy.CarrierID
        }
    }
    if (state && state === 'ND') {
        emit(
            result.key, result.value.coverage,
        )
    }
}

function reduce(key, value) {
    return value;
}

exports.map = map
exports.reduce = reduce