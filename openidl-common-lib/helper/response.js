// SPDX-License-Identifier: Apache-2.0
/**
 * 
 * @param {Boolean} status  --  Executed result true or false
 * @param {String} statusCode -- Response status code
 * @param {String} mongoResult -- Executed  mongo result
 * @param {Int} inputDocuments -- Documents count from input payload
 * @param {Int} processedDocuments -- Successfully execuged documents count
 * @param {String} statusDescription -- Error message
 * @param {[]} hashDocuments -- Default value empty array. This parameter is used to have array value of find() method
 */
module.exports.mongoResponse = (status, statusCode, mongoResult, inputDocuments, processedDocuments, statusDescription, hashDocuments = []) => {
    return {
        "success": status,
        "statusCode": statusCode,
        "result": mongoResult,
        "totalInputdocuments": inputDocuments,
        "totalProcesseddocuments": processedDocuments,
        "message": statusDescription,
        "hashDocuments": hashDocuments
    }
}
