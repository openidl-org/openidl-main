const { DatabaseCredentials } = require("./dbCredentials.js");
const PG = require("pg");

/**
 * @typedef {{
 *      credentials: DatabaseCredentials
 * }} DBHelperInitializationPayload The credentials used to connect to the database.
 */
module.exports.DBHelper = class DBHelper {
    credentials = new DatabaseCredentials();
    /**
     * @type {PG.Client} The client to use for query.
     */
    client = null;

    /**
     * 
     * @param {DBHelperInitializationPayload} initializingData The data to initialize the database helper.
     */
    constructor(initializingData){
        this.credentials = initializingData.credentials;
    }

    async getClient(){
        if(!this.client){
            this.client = new PG.Client(this.credentials);
            try{
                await this.client.connect();
            }catch(client_connect_e){
                console.log({client_connect_e});
                throw client_connect_e;
            }
        }
        return this.client;
    }


    async callPG(query){
        try{
            const client = await this.getClient();
            const returnData = await client.query(query)
            return {
                query,
                result: returnData
            };
        }catch(callPG_e){
            return {
                error: true,
                text: callPG_e+""
            };
        }
    }

    async queryMachine(queryString){
        //queryString.replaceAll('@comp','9999')
        let queries = queryString.split('|')
        let returnVal = []
        let logVal = []
        for (let query of queries){
            try{
                const queryWord = query.trim().split(/\s/)[0].toLowerCase()
                if (queryWord === "create"){
                    const result = await this.callPG(query)
                    if(result && result.error){
                        logVal.push({
                            query, result
                        });
                    }
                }else if (queryWord === "select"){
                    const result = await this.callPG(query)
                    returnVal.push({
                        query, result
                    });
                }else if (queryWord === "drop"){
                    await this.callPG(query)
                    const result = await this.callPG(query)
                    if(result && result.error){
                        logVal.push({
                            query, result
                        });
                    }
                }
            }catch(runQuery_query_e){
                console.log({runQuery_query_e});
                returnVal.push({
                    query: {
                        error: true,
                        text: runQuery_query_e+""
                    }
                });
            }
        }
        return returnVal
    }


    async runQuery(queryString){
        let result = await this.queryMachine(queryString.trim());
        return result
    }

    async disconnect(){
        try{
            await this.client.end();
        }catch(disconnect_e){
            console.log("Error disconnecting the database: ",{disconnect_e});
        }
    }
}