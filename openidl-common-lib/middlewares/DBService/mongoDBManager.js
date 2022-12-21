const log4js = require('log4js');
var safeEval = require('safe-eval');
const mongoDBManagerInstance = require("mongodb").MongoClient;
let viewFunctionETL = require('./mongo_db_map_reduce_etl');
const logger = log4js.getLogger('mongoDB-manager');
const mongoResponseObject = require('../../helper/response')
const messageObject = require('../../helper/config/constant');
logger.level = process.env.LOG_LEVEL || 'debug';

let mongodb;
class MongoDBManager {

    constructor(dbService) {
        this.DBService = dbService;
        this.createView = false;
        this.name = "mongo";
    }

    async dbName() {
        return this.name;
    }

    /**
     * This method is used to store insurance doucments into respective collection
     * @param {String} batchId - Unique identification of entire file processing
     * @param {String} chunkId - Unique identifcation of  each chunk
     * @param {Jsonarray} documentPayload - Insurance documents
     * @param {String} collectionName - Mongodb collection name
     * @param {String} operationMode  - HDS or Log operation
     */
 async saveBulkDocuments(batchId, chunkId, carrierId, documentPayload, collectionName, operationMode) {

        return new Promise(function (resolve, reject) {
            logger.info("Inside saveBulkDocuments method of mongoDBManager object. batchid is ", batchId + " , chunkid is " + chunkId);
            mongodb.collection(collectionName).insertMany(
                documentPayload.records, { w: 1, ordered: true }).then((mongoResult) => {
                    if (mongoResult.result.ok == 1 && mongoResult.insertedCount == documentPayload.records.length) {
                        logger.info("Success: all documents are inserted successfully");
                        logger.info("Total successfully inserted documents are for chunkid " + chunkId + " " + mongoResult.insertedCount);
                        logger.info("Total received documents are for chunkid " + chunkId + " "  + documentPayload.records.length);
                        if (operationMode != messageObject.Message.operationMode) {
                            logger.info("Mongodb Find execution START_TIME of chunkid is " + chunkId + "   " + new Date().toISOString());

                                    resolve(mongoResponseObject.mongoResponse
                                        (
                                            messageObject.Message.success,
                                            messageObject.Message.successStatusCode,
                                            messageObject.Message.successResult,
                                            documentPayload.records.length,
                                            mongoResult.insertedCount,
                                            messageObject.Message.fullInsert,
                                            documentPayload.records
                                        ))
                        }
                        else {
                            // Status code is 200
                            if (operationMode == messageObject.Message.operationMode)
                                resolve(mongoResponseObject.mongoResponse
                                    (
                                        messageObject.Message.success,
                                        messageObject.Message.successStatusCode,
                                        messageObject.Message.successResult,
                                        documentPayload.records.length,
                                        mongoResult.insertedCount,
                                        messageObject.Message.logInsert
                                    ))
                            else
                                resolve(mongoResponseObject.mongoResponse
                                    (
                                        messageObject.Message.success,
                                        messageObject.Message.successStatusCode,
                                        messageObject.Message.successResult,
                                        documentPayload.records.length,
                                        mongoResult.insertedCount,
                                        messageObject.Message.deleteErrorLogMessage
                                    ));
                        }
                    } else {
                        logger.info("Failure: Documents are inserted partially");
                        logger.info("Total partially inserted documents are for chunkid " + chunkId + " "  + mongoResult.insertedCount);
                        logger.info("Total received documents are for chunkid " + chunkId + " " + documentPayload.records.length);
                        // Status code is 500
                        resolve(mongoResponseObject.mongoResponse
                            (
                                messageObject.Message.failure,
                                messageObject.Message.failureStatusCode,
                                messageObject.Message.failureResult,
                                documentPayload.records.length,
                                mongoResult.insertedCount,
                                messageObject.Message.partialInsert
                            ));
                    }
                }).catch((error) => {
                    console.log("throw error is " + error)
                    logger.error("insertMany method failed while inserting documents for chunkid " + chunkId + ". Error is " + error);
                    // Status code is 504
                    resolve(mongoResponseObject.mongoResponse
                        (
                            messageObject.Message.failure,
                            messageObject.Message.dbErrorStatusCode,
                            messageObject.Message.failureResult,
                            documentPayload.records.length,
                            messageObject.Message.zeroDocument,
                            error
                        ));
                })
        });
    }

         //Fix for Jira 104   
    async getByCarrierIdNew(chunkId,collectionName) {
 
        return new Promise(function (resolve, reject) {
            
            logger.debug(" getByCarrierIdNew.chunkId: " + chunkId + "  collectionName: " + collectionName)
            mongodb.collection(collectionName)
                .find({"value.value.chunkId": chunkId})
                .toArray(function (err, results) {
                    if (err) {
                        logger.error("error  >>>>>>>>>>>>>" + err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        })
    }
    //Fix for Jira 104   
    async findUniqueChunkID(collectionName) {

        logger.info("Find Unique Chunkid from - " + collectionName);
        return new Promise(function (resolve, reject) {
            mongodb.collection(collectionName)
            .distinct("value.value.chunkId", function (err, results) {
                if (err) {
                    logger.error("error  >>>>>>>>>>>>>" + err);
                    reject(err);
                } else {

                    resolve(results);
                }
            });
        });

    }
    //Fix for Jira 104  
    async insertChunkID(payload) {
        return new Promise(function (resolve, reject) {
               try {
                mongodb.collection("extract_pattern_migration").insertOne(payload).then((mongoResult) => {
                    resolve({
                        "status" : "success"
                    })
                }).catch((error)=> {
                    reject({
                        "status" : "failure"
                    })
                })
               } catch (ex) {
                reject({
                    "status" : "failure"
                })
               }
        
        });
    }

    //Fix for Jira 104 
       async findAndUpdate(payload){
        return new Promise(function (resolve, reject) {
            try {
             mongodb.collection("extract_pattern_migration").findOneAndUpdate(
                 {collectionname:payload.collectionname},
                 {
                    $set:{
                    overallStatus:payload.overallStatus,
                    totalchunks:payload.totalchunks
                    }
                 }).then((mongoResult) => {
                 resolve({
                     "status" : "success"
                 })
             }).catch((error)=> {
                 reject({
                     "status" : "failure"
                 })
             })
            } catch (ex) {
             reject({
                 "status" : "failure"
             })
            }
     
     });
    }

    async saveLogDocument(collectionName, logPayLoad) {
        try {
            return await this.insertDocument(collectionName, logPayLoad);
        } catch (error) {
            logger.error("Failed: Error occured during saveLogDocument method in mongoDBManager - " + error)
            return false;
        }
    }

    async insertDocument(collectionName, logPayLoad) {
        logger.info("Inside insertDocument - ");
        return new Promise(function (resolve, reject) {
            mongodb.collection(collectionName).insertOne(logPayLoad).then((mongoResult) => {
                logger.info("Success: insertDocument for log into collection is created successfully - " + collectionName);
                resolve(mongoResponseObject.mongoResponse
                    (
                        messageObject.Message.success,
                        messageObject.Message.successStatusCode,
                        messageObject.Message.successResult,
                        1,
                        1,
                        "Document is inserted into log successfully"
                    ))
            }).catch((error) => {
                logger.info("Failed to create document into log collection  - " + error);
                resolve(mongoResponseObject.mongoResponse
                    (
                        messageObject.Message.failure,
                        messageObject.Message.failureStatusCode,
                        messageObject.Message.failureStatusCode,
                        1,
                        0,
                        "Failed to insert the document into log collection"
                    ))
            })
        });
    }

    async updateDocument(collectionName, logPayLoad, document, batchId) {
        return new Promise(function (resolve, reject) {
            try {
                mongodb.collection(collectionName).updateOne({ _id: batchId },
                    {
                        $push:
                        {
                            "records": {
                                "$each":
                                    [logPayLoad]
                            }
                        }
                    }, { upsert: true }, (error, result) => {
                        if (error) {
                            logger.info('Error: Failed to update the log document - ' + error)
                            reject(mongoResponseObject.mongoResponse
                                (
                                    messageObject.Message.failure,
                                    messageObject.Message.failureStatusCode,
                                    messageObject.Message.failureStatusCode,
                                    1,
                                    0,
                                    "Failed to update the document into log collection"
                                ));
                        } else {
                            resolve(mongoResponseObject.mongoResponse
                                (
                                    messageObject.Message.success,
                                    messageObject.Message.successStatusCode,
                                    messageObject.Message.successResult,
                                    1,
                                    1,
                                    "Document is updated into log successfully"
                                ))
                        }
                    });
            } catch (err) {
                logger.error('Error: Failed to update the log document caught at catch block', err);
                resolve(false);
            }
        });
    }

    /**
     * 
     * @param {String} collectionName - mongdb Collection name
     */
    async createCollection(collectionName, carrierIds) {
        logger.info("Creating Mongodb Collection - " + collectionName);
        return new Promise(function (resolve, reject) {
            mongodb.createCollection(collectionName).then((mongoResult) => {
                logger.info("Collection is created successfully - " + collectionName);
                resolve(true)
            }).catch((error) => {
                logger.info("Failed to create collection  - " + collectionName);
                resolve(false)
            })
        });
    }

    /**
     * 
     * @param {String} collectionName - mongdb Collection name
     */
    async createIndex(collectionName) {
        logger.info("Inside createIndex  method");
        return new Promise(function (resolve, reject) {
            mongodb.collection(collectionName).createIndex(
                {
                    "batchId": 1,
                    "chunkId": 1,
                    "carrierId": 1,
                    "records.SequenceNum": 1
                }).then((mongoResult) => {
                    logger.info("Index is created successfully on collection name is - " + collectionName);
                    resolve(true)
                }).catch((error) => {
                    logger.info("Failed to create Index on collection name is - " + collectionName);
                    reject(false)
                })
        });
    }

    /**
     * This method is used to delete the documents from specific collection
     * @param {String} batchId - Unique identification of entire file processing
     * @param {String} chunkId - Unique identifcation of  each chunk
     * @param {String} collectionName - Mongodb collection name
     */
    async deleteBulkDocuments(batchId, chunkId, collectionName) {
        logger.info("Inside deleteBulkDocuments method of mongoDBManager object. batchid is ", batchId + " , chunkid is " + chunkId);
        return new Promise(function (resolve, reject) {
            logger.info("Inside deleteBulkDocuments method of mongoDBManager object. batchid is ", batchId + " , chunkid is " + chunkId);
            mongodb.collection(collectionName).deleteMany(
                {
                    "batchId": batchId,
                    "chunkId": chunkId
                }).then((mongoResult) => {
                    logger.info("Documents are deleted for batchid " + batchId + " chunkid. " + chunkId + " Deleted documents are " + mongoResult.result.n);
                    // Status code is 200
                    resolve(mongoResponseObject.mongoResponse
                        (
                            messageObject.Message.success,
                            messageObject.Message.successStatusCode,
                            messageObject.Message.successResult,
                            null,
                            mongoResult.deletedCount,
                            messageObject.Message.deleteSucessMsg
                        ));
                }).catch((error) => {
                    logger.error("Failed to delete  the documents for batchid " + batchId + " chunkid is " + chunkId + ". Error is " + error);
                    // Status code is 504
                    resolve(mongoResponseObject.mongoResponse
                        (
                            messageObject.Message.failure,
                            messageObject.Message.dbErrorStatusCode,
                            messageObject.Message.failureResult,
                            "",
                            messageObject.Message.zeroDocument,
                            error
                        ));
                })
        });
    }

    async initMongoDBConnection(mongoDBName) {
        try {
            logger.info('Inside init mongodb connection');
            const ca = this.DBService.connection.mongodb.certificate.certificate_base64;

            const options = {
                ssl: true,
                sslValidate: false,
                sslCA: ca,
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            const connectionString = this.DBService.connection.mongodb.composed[0];
            const mongoDBClient = await mongoDBManagerInstance.connect(connectionString, options);
            mongodb = mongoDBClient.db(mongoDBName);
            return mongodb;
        } catch (error) {
            console.log('DB CONNECTION ERROR ' + error)
            throw error;
        }
    }

    async initSimpleMongoDBConnection(mongoDBName, uri) {
        try {
            logger.info('Inside init mongodb connection');

            const options = {
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            const mongoDBClient = await mongoDBManagerInstance.connect(uri, options);
            mongodb = mongoDBClient.db(mongoDBName);
            return mongodb;
        } catch (error) {
            console.log('DB CONNECTION ERROR ' + error)
            throw error;
        }
    }

    async insert(payload, DBCollection) {
        return new Promise(function (resolve, reject) {
            try {
                logger.info("Inside mongodb insert ", payload._id);
                mongodb.collection(DBCollection).update({ _id: payload._id }, payload, { upsert: true }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            } catch (err) {
                logger.error('Error updating record in mongodb', err);
                reject(err);
            }
        });
    }
    
       async get(id, DBCollection) {
        logger.info('Inside mongodb get', id);
        return new Promise(function (resolve, reject) {
            mongodb.collection(DBCollection)
                .find({ _id: id })
                .toArray(function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0]);
                    }
                });
        });
    }

    async getFilteredData(DBCollection, transactionMonth) {
        logger.info('Inside mongodb get', id);
        return new Promise(function (resolve, reject) {
            mongodb.collection(DBCollection)
                .find({ transactionMonth: transactionMonth })
                .toArray(function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0]);
                    }
                });
        });
    }

    async getFilteredDocuments(DBCollection, query) {
        logger.info('Inside mongodb getFilteredDocuments');
        const regexString = "^" + query.transactionMonth
        let projection = {};
        if(query.isReport){
            projection = {VINHash: 1, VIN: 1, _ID: 0}
        }
        return new Promise(function (resolve, reject) {
            mongodb.collection(DBCollection)
                .find({ transactionDate: {"$regex": regexString}, organizationID: query.organizationId })
                .project(projection)
                .toArray(function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    }


    async getDocument(batchId, DBCollection) {
        logger.info('Inside mongodb get', batchId);
        return new Promise(function (resolve, reject) {
            mongodb.collection(DBCollection)
                .find({ _id: batchId })
                .toArray(function (error, results) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                })
        });
    }

    async getByLimit(params, DBCollection) {
        //this.DBCollection = DBCollection;
        logger.info("Inside mongo get");
        return new Promise(function (resolve, reject) {
            logger.debug(DBCollection);
            mongodb.collection(DBCollection)
                .find({}, { skip: 1, limit: 1, fields: { b: 1 } })
                .toArray(function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        logger.debug('This is from mongodb getByLimit', results[0]);
                        resolve(results[0]);
                    }
                });
        })
    }


    async getByCarrierId(carrierId, DBCollection, skip, limit) {
        let skipCount = parseInt(skip);
        let limitCount = parseInt(limit);
        logger.debug("skipCount" + skipCount);
        logger.debug("limitCount" + limitCount);
        logger.debug("Inside getByCarrierId" + skipCount + "  " + limitCount);
        return new Promise(function (resolve, reject) {
            logger.debug("DBCollection" + DBCollection);
            mongodb.collection(DBCollection)
                .find({}, { skip: skipCount, limit: limitCount, noCursorTimeout: true })
                .toArray(function (err, results) {
                    if (err) {
                        logger.error("error  >>>>>>>>>>>>>" + err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        })
    }
    
    async mapReduceData(DBName, reduceCollectionName, extractionPattern,
        premiumFromDate,
        premiumToDate,
        lossFromDate,
        lossToDate,
        lineOfBusiness,
        jurisdiction) {
        logger.info("Map Reduce Mongo");
        logger.info("Extraction Pattern " + JSON.stringify(extractionPattern));
        let map = extractionPattern.viewDefinition.map;
        logger.info("map: ", JSON.stringify(map));
        let reduce = extractionPattern.viewDefinition.reduce;
        logger.info("reduce " + JSON.stringify(reduce));
        let response;

        // let queryFilter = {
        //     "$and":[
        //        {
        //           "$or":[
        //              {
        //                 "Policy.crrncyPymnt.accntSttmnt.prdStrtDt":{
        //                    "$gte":"12/13/2020",
        //                    "$lte":"12/20/2020"
        //                 }
        //              },
        //              {
        //                 "clm.clmFldr.clmCmpnnt.crrncyPymnt.accntSttmnt.prdStrtDt":{
        //                    "$gte":"12/13/2020",
        //                    "$lte":"12/31/2020"
        //                 }
        //              }
        //           ]
        //        },
        //        {
        //           "Policy.prdctTyp.cd":"Auto: Personal"
        //        },
        //        {
        //           "Policy.plcyStrctr.lctn.ggrphcLctn.ggrphcLctnCds.cd":"Maryland"
        //        }
        //     ]
        //  }
        
         let queryFilter = {
            $and: [
                   {
                       $or : [ {
                                   REPLACE_PREMIUM_DATA : { $gte: premiumFromDate, $lte: premiumToDate}
                               },
                               {
                                   REPLACE_LOSS_DATA : { $gte: lossFromDate, $lte: lossToDate}
                               },
                             ]
                   },
                   {
                     REPLACE_JURISDICATION: jurisdiction
                   },
                   {
                     REPLACE_LOB: lineOfBusiness
                   }
                  ]
        }
        
        let queryString = JSON.stringify(queryFilter)
        let queryPremiumFromDate = queryString.replace(/REPLACE_PREMIUM_DATA/g, extractionPattern.premiumFromdate)
        let queryLossStartDate = queryPremiumFromDate.replace(/REPLACE_LOSS_DATA/g,  extractionPattern.lossFromdate)
        let queryJurisdication = queryLossStartDate.replace(/REPLACE_JURISDICATION/g,  extractionPattern.jurisdication)
        let querylineofBusiness = queryJurisdication.replace(/REPLACE_LOB/g,  extractionPattern.insurance)

        logger.info("Filter query is " + querylineofBusiness)

        // openidl-2 - removed use of filter until we have new model and better idea how to implement.
        try {
            response = await mongodb.collection(DBName)
                .mapReduce(
                    safeEval(map),
                    safeEval(reduce), {
                    out: reduceCollectionName
                }
            );

        } catch (err) {
            logger.error(err);
            throw err;
        }
        console.log("MAP REDUCE EXECUTION OUTPUT" + response);
        return response;
    }


    async mapReduceDataETL(DBName, reduceCollectionName) {
        const response = await mongodb.collection(DBName)
            .mapReduce(
                viewFunctionETL.map,
                viewFunctionETL.reduce, {
                out: reduceCollectionName
            }
            )
        return response;
    }
    // Calls a view of the specified designDoc from a specific DB with optional query string params. 
    //}
    //@DBName - the database name 
   async getViewData(carrierID, DBname, reduceCollectionName, extractionPattern,
        premiumFromDate,
        premiumToDate,
        lossFromDate,
        lossToDate,
        lineOfBusiness,
        jurisdiction) {
        try {
            console.log("<<<<<<<<<<<<<<<<<<<<<<<<Testing code checkin >>>>>>>>>>>>>")
            //Fix for Jira-88
            const response = await this.mapReduceData(DBname, reduceCollectionName, extractionPattern, premiumFromDate,
                premiumToDate,
                lossFromDate,
                lossToDate,
                lineOfBusiness,
                jurisdiction);
            logger.debug("getViewData  response" + response);
        }
        catch (ex) {
            throw ex
        }
    }

       async getUnprocessedChunks() {
        logger.info('Inside getUnprocessedChunks get');
        return new Promise(function (resolve, reject) {
            mongodb.collection("extract_pattern_migration")
                .find({ overallStatus: { $in: [ "Inprogress", "YettoProcess" ]}  })
                .toArray(function (error, results) {
                    if (error) {
                        reject(null);
                    } else {
                        resolve(results);
                    }
                })
        });
    }

    async fetchCarrierNames(ids, DBCollection) {
        logger.info('Inside fetchCarriername mongo', ids);
        return new Promise(function (resolve, reject) {
            mongodb.collection(DBCollection)
                .find({ _id: { $in: ids } })
                .toArray(function (err, results) {
                    if (err) {
                        logger.error('Unable to fetch records', err);
                        reject(err);
                    } else {
                        const idAndName = arrayToObject(results);
                        resolve(idAndName);
                    }
                });
        });
    }
}



const arrayToObject = (array) =>
    array.reduce((obj, item) => {
        obj[item._id] = item.Name
        return obj
    }, {});
module.exports = MongoDBManager;
