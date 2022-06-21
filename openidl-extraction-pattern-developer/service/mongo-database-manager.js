const log4js = require('log4js');
const logger = log4js.getLogger('mongo-db-manager');
// logger.level = "debug"
logger.level = "off"
const { emitDeprecationWarning } = require('mongodb/lib/utils');
const safeEval = require('safe-eval')

const MongoClient = require('mongodb').MongoClient

class MongoDBManager {

    constructor(dbConfig) {
        this.url = dbConfig.url
    }

    setClient(aClient) {
        this.client = aClient
    }

    async connect() {
        logger.info("In connect")
        this.client = await MongoClient.connect(this.url).catch(err => {
            throw err
        })
        logger.info("Done connect" + this.client ? ' have client' : ' no client')
    }

    async disconnect() {
        this.client.close()
    }

    async useDatabase(dbName) {
        logger.debug('In Use Database')
        this.db = this.client.db(dbName)
        logger.debug('Done Use Database')
    }

    async dropDatabase(dbName) {
        logger.debug('In Drop Database')
        await this.dropDatabase(dbName).catch(err => {
            logger.info('Problem dropping Database ' + dbName + ' : ' + err)
        })
        logger.debug('Done Drop Database')
    }

    async dropCollection(collectionName) {
        await this.db.dropCollection(collectionName).catch(err => {
            logger.info('Problem dropping Collection ' + collectionName + ' : ' + err)
        })
    }

    async loadData(data, dbName, collectionName) {
        logger.debug("Putting Data into: " + dbName + "." + collectionName)
        // await this.useDatabase(dbName)
        await this.db.collection(collectionName).insertMany(data)
        logger.debug("Done Putting Data into: " + dbName + "." + collectionName)
    }

    async loadSingleData(data, dbName, collectionName) {
        logger.debug("Putting Data into: " + dbName + "." + collectionName)
        // await this.useDatabase(dbName)
        await this.db.collection(collectionName).insertOne(data)
        logger.debug("Done Putting Data into: " + dbName + "." + collectionName)
    }

    async replacePolicyData(data,value,  collectionName) {
        logger.debug("replacing Data into: " +data )
        // await this.useDatabase(dbName)
        //console.table(data)
        //console.log('key: policy idenifier value: '+value)
   
        delete data._id

        await this.db.collection(collectionName).replaceOne({"PolicyIdentifier": value},data)
//        await this.db.collection(collectionName).replaceOne({[key]:[value]},data)
        logger.debug("Done replacingData into: " + collectionName)
    }

    async loadDataFromInsuranceDataManagerPayload(data, dbName, collectionName) {
        logger.debug("Putting Data into: " + dbName + "." + collectionName)
        console.log(data)
        await this.useDatabase(dbName)
        for (let payload of data) {
            await this.db.collection(collectionName).insertMany(payload.records)
        }
    }

    async getAllRecords(dbName, collectionName) {
        return await this.getRecords(dbName, collectionName, {})
    }

    async getRecords(dbName, collectionName, query) {
        await this.useDatabase(dbName)
        let collection = this.db.collection(collectionName)
        //console.log('get records query: '+query)
        let recordCursor = collection.find(query);
        let records = await recordCursor.toArray()
        return records
    }

    async mapReduce(dbName, collectionName, reductionName, mapFunction, reduceFunction) {

        await this.useDatabase(dbName)
        await this.db.collection(collectionName).mapReduce(
            mapFunction,
            reduceFunction,
            {
                out: reductionName
            }
        );
    }

    async mapReduceWithStrings(dbName, collectionName, reductionName, mapFunctionString, reduceFunctionString) {

        logger.debug("In Map Reduce with Strings")
        await this.useDatabase(dbName)
        await this.db.collection(collectionName).aggregate([
            { $group: { _id: "a", value: 1 } },
            { $out: "agg_alternative_1" }
        ])
        await this.db.collection(collectionName).mapReduce(
            safeEval(mapFunctionString),
            safeEval(reduceFunctionString),
            {
                out: reductionName
            }
        );
    }

    // async xwithNewConnection(url, action) {
    //     return new Promise(() => {
    //         MongoClient.connect(url, function (err, client) {
    //             if (err) action(err);
    //             withConnection(client, action)
    //         })
    //     })
    // }

    // async xwithConnection(client, action) {
    //     action(null,client)
    // }

    // async xdropDatabase(dbName, cb) {
    //     return new Promise(() => {
    //         MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    //             if (err) throw err;
    //             const db = client.db(dbName);
    //             client.dropDatabase(function (err, result) {
    //                 if (err) cb(err);
    //                 console.log('Dropped ' + dbName)
    //                 client.close()
    //                 cb(null)
    //             })
    //         });
    //     })
    // }

    // async xdropCollection(dbName, collectionName, cb) {
    //     return new Promise(() => {
    //         MongoClient.connect("mongodb://localhost:27017", (err, client) {
    //             if (err) cb(err);
    //             const db = client.db(dbName);

    //             db.dropCollection(collectionName, (err, result) => {
    //                 // if (err) throw err;
    //                 console.log('dropped collection ' + dbName + '.' + collectionName)
    //                 client.close()
    //                 cb(null)
    //             });
    //         });
    //     })
    // }

    // async xcreateCollection (dbName, collectionName, cb) {

    //     return new Promise(() => {
    //         MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    //             if (err) throw err;
    //             const db = client.db(dbName);

    //             db.createCollection(collectionName, (err,collection) => {
    //                 if (err) cb(err);
    //                 db.collection(collectionName).insertMany(data,
    //                     (err, result) => {
    //                         if (err) throw err;
    //                         client.close()
    //                         cb(null)
    //                     }
    //                 )
    //             })
    //         })
    //     })
    // }

    // async xloadData (data, dbName, collectionName, cb) {

    //     return new Promise(() => {
    //         withNewConnection("mongodb://localhost:27017", function (err, client) {
    //             if (err) throw err;
    //             console.log('1')
    //             const db = client.db(dbName);

    //             db.dropCollection(collectionName, (err, result) => {
    //                 // if (err) throw err;
    //                 db.createCollection(collectionName, (err,collection) => {
    //                     if (err) cb(err);
    //                     db.collection(collectionName).insertMany(data,
    //                         (err, result) => {
    //                             if (err) cb(err)
    //                             client.close()
    //                             cb(null)
    //                         }
    //                     )
    //                 })
    //             })

    //         });
    //     })
    // }

    // async xmapReduce (dbName, collectionName, reductionName, mapFunction, reduceFunction, cb) {

    //     return new Promise(() => {
    //         MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    //             if (err) cb(err);
    //             console.log('2')
    //             const db = client.db(dbName);

    //             try {
    //                 let i = 0
    //                 db.collection(collectionName).mapReduce(
    //                     mapFunction,
    //                     reduceFunction,
    //                     {
    //                         out: reductionName
    //                     }
    //                 );
    //             } catch (err) {
    //                 cb(err);
    //             }
    //             client.close();
    //             cb(null)
    //         })
    //     })

    // }

    // async xmapReduceWithStrings (err, client, dbName, collectionName, reductionName, mapFunctionString, reduceFunctionString, cb) {

    //     return new Promise(() => {
    //         // MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    //             if (err) cb(err);
    //             console.log('2')
    //             const db = client.db(dbName);

    //             try {
    //                 let i = 0
    //                 db.collection(collectionName).mapReduce(
    //                     safeEval(mapFunctionString),
    //                     safeEval(reduceFunctionString),
    //                     {
    //                         out: reductionName
    //                     }
    //                 );
    //             } catch (err) {
    //                 cb(err);
    //             }
    //             client.close();
    //             cb(null)
    //         // })
    //     })

    // }

}


module.exports = MongoDBManager