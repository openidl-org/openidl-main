const { DatabaseCredentials } = require('./dbCredentials.js');
const fs = require("fs");
const path = require("path");
let config;
try{
    //config = JSON.parse(fs.readFileSync(path.join("..", "config", "config.json")).toString());;
    config = require('../config/config.json')
    console.log(config)
}catch(error_e){
    console.log("Couldn't read config.json.");
    console.log({error_e});
}


module.exports.ConfigurationManager = class ConfigurationManager {

    static get mySQLDBCredentials(){
        let credentials = new DatabaseCredentials();
        credentials.user = config.db.username;
        credentials.host = config.db.host;
        credentials.database = config.db.database;
        credentials.password = config.db.password;
        credentials.port = config.db.port;
        return credentials;
    }
}