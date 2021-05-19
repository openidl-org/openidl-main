// SPDX-License-Identifier: Apache-2.0
/**
 * Message Object is used for config the response parameter value
 */
module.exports.Message = {
    "success": true,
    "failure": false,
    "partialInsert": "Partial documents inserted successfully, Partial documents failed to insert",
    "fullInsert": "All Documents are inserted successfully into HDS",
    "logInsert": "All documents are deleted from HDS and successfully inserted into error collection",
    "successStatusCode": 200,
    "failureStatusCode": 500,
    "dbErrorStatusCode": 512,
    "successResult": "success",
    "partialResult": "partialsuccess",
    "failureResult": "failure",
    "zeroDocument": 0,
    "deleteSucessMsg": "Documents are deleted successfully from HDS for the specific batchid and chunkid",
    "operationMode": "err",
    "fetchFailure": "Failure: find operation failed for the inserted document from HDS for the specific batchid and chunkid",
    "sucessCollection": "Collection is creates successfully",
    "successIndex": "Index is creates successfully",
    "deleteErrorLogMessage" : "Documents are deleted from HDS and insert into error log collection"
}