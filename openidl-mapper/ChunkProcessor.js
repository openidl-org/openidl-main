/**
 SPDX-License-Identifier: Apache-2.0
*/
/**
 * Process the records into chunks based on the desired chunk size
 */
module.exports.processIntoChunks = function (chunkSize, batchId, carrierId, records, transform) {

    let i = 1
    let sequenceNum = 0
    let chunkId = '1111111'
    let results = []
    result = {
        "batchId": batchId,
        "chunkId": chunkId,
        "carrierId": carrierId,
        "policyNo": '1111111',
        "errFlg": false,
        "errrLst": [],
        "SquenceNum": "" + sequenceNum++, 
        "records": []
    };
    for (let record of records) {
        if (record) {
            let transformedRecord = transform(record)
            if (transformedRecord) {
                result.records.push(transform(record));
            }
        }
        if (i % chunkSize == 0 && i > 0) {
            results.push(result)
            result = {
                "batchId": batchId,
                "chunkId": "" + chunkId++,
                "carrierId": carrierId,
                "policyNo": '1111111',
                "errFlg": false,
                "errrLst": [],
                "SquenceNum": "" + sequenceNum++, 
                "records": []
            };
        }
        i++;
    }
    if ((i % chunkSize) + 1 > 0) {
        if (result.records.length > 0) {
            results.push(result)
        }
    }

    return results
}