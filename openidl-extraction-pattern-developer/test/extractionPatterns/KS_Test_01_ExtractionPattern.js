//
// SPDX-License-Identifier: Apache-2.0
//
/**
 * Sample file with map and reduce functions used to create an extraction pattern.
 */

function map() {
    var key = [this.chunkId, this.carrierId]
    var result = {
        "key": key,
        "value": {
            "amount":this.agrmnt.strctrlCmpnnt[0].cvrgCmpnnt[0].prtclrMnyPrvsn[0].mnyPrvsnCshFlw[0].mnyPrvsnPrt[0].amnt,
            "chunkId":this.chunkId,
            "carrierId":this.carrierId
        }
    }
    emit( 
        result.value, result, 
    )
}

function reduce(key,value) {
    return Array.sum(value);
}

exports.map = map
exports.reduce = reduce