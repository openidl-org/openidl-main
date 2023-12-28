/**
 * Message Object is used for config the response parameter value
 */
module.exports.Message = {
    "success"               :    true,
    "failure"               :    false,
    "successStatusCode"     :    200,
    "failureStatusCode"     :    500,
    "validationStatusCode"  :    400,

    "dbDownStatusCode"      :    503,
    "dbDown"                :    "DBDOWN",
    "dbDownError"           :    "Mongodb service down. Please contact system administrator.",
    "dbDownEmailMessage"    :    "Mongo DB service is down. For BatchID <<batchid>> , Chunkid  <<chunkid>> failed to insert into HDS. ETL system will re-try",
    "dbDownInfolog"         :    "Success:====> Email sent successfully to customer about Mongodb service down",
    "dbDownErrorlog"        :    "Failed:====> Failed to sent an email to csutomer about Mongodb service down",

    "backEndError"          :    512,
    "dbExecDown"            :    "DBEXECERROR",
    "dbExecError"           :    "Mongodb execution error.",
    "dbExecEmailMessage"    :    "For BatchID <<batchid>>, ChunkID <<chunkid>> failed to insert into HDS. ETL system will re-try",
    "dbExecInfolog"         :    "Success:====> Email sent successfully to customer about Batchid <<batchid>>, Chunkid <<chunkid>> failed to insert into HDS. ETL system will re-try",
    "dbExecErrorlog"        :    "Failed:====> To sent an email to customer about Mongodb db error about Batchid <<batchid>>, Chunkid <<chunkid>> failed to insert into HDS",

 
    "dbLogFailure"          :   "DBLOGFAILURE",
    "dbLogEmailMessage"    :    "For BatchID <<batchid>>, ChunkID <<chunkid>>, the documents are stored successfully into HDS & Blockchain. However, Fail to save the data into Log collection.",
    "dbLogInfolog"         :    "Success:====> Email sent successfully to customer about Batchid <<batchid>>, Chunkid <<chunkid>> failed to save into log collection",
    "dbLogErrorlog"        :    "Failed:====> To sent an email to customer about save into log collection for Batchid <<batchid>>, Chunkid <<chunkid>>",


    "bcDown"                 :   "BCERROR",
    "bcDownError"           :    "Blockchain hashing failed.",

 
    "dbbcDownInfolog"         :    "Success:====> Email sent successfully to customer about Batchid <<batchid>>, Chunkid <<chunkid>> failed to save into log collection",
    "dbbcDowngErrorlog"        :   "Failed:====> To sent an email to customer about save into log collection for Batchid <<batchid>>, Chunkid <<chunkid>>",


    "dbErrorStatusCode"     :    504,
    "backEndError1"          :    503,
 
    "batchIdMessage"        :    "Failed: BatchId is missing in the payload request",
    "chunkIdMessage"        :    "Failed: Chunkid is missing in the payload request",
    "carrierIdMessage"      :    "Failed: CarrierId is missing in the payload request",
    "documentMessage"       :    "Failed: No Insurance data found in the payload request",
    "successValidation"     :    "Success: Insurance payload structure is valid",
    "blockchainSuccessMsg"  :    "Success: Insurance documents saved into HDS and Hash value stored into Blockchain successfully",
    "hashFailureMsg"        :    "Failed: Hash generation",
    "hdsAlias"              :    "HDS",
    "logAlias"              :    "err",
    "reconLog"              :    "log",



    "dbInternal"            :    "DBINTERR",
    "dbInternalError"       :    "Mongodb or Server Internal Error.",
  
    "partialSuccess"        :   "Documents are inserted into HDS partially or failed to fetch the documents for Hashing. Hence system deleted the documents from HDS. Please re-send"
}