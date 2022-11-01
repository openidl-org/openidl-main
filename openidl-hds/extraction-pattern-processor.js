const config = require('./config/config.json')
const { Pool, Client } = require("pg");
const records = require('../../../con-data/auto.json').records
const credentials = {
  user: config.db.username,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
};
//call postgres
async function callPG(client,query){
    const returnData = await client.query(query)
    console.log(returnData.rows)
  
    return returnData;
}

function parseQuery(queryString){
    let queries = queryString.split(';')
    let creates = []
    let selects = []
    let tearDowns = []
    let queryDict = {}
    for (let query of queries){
        console.log(query)
        queryWord = query.split(' ')[0].toLowerCase()
        if (queryWord == 'create'){
            creates.push(query)

        }
        if (queryWord == 'select'){
            selects.push(query)
        }
        if (queryWord == 'drop'){
            tearDowns.push(query)
        }
    }
    queryDict.creates=creates
    queryDict.selects=selects;
    queryDict.tearDowns=tearDowns
    return queryDict
}


async function main(queryString){
    let queryDict = parseQuery(queryString)
    console.log(queryDict)
    const client = new Client(credentials);
    await client.connect();
    for (let create of queryDict.creates){
        let response = await callPG(client,create)
    }
    for (let select of queryDict.selects){
        let response = await callPG(client,select)
    }
    for (let tearDown of queryDict.tearDowns){
        let response = await callPG(client, tearDown)
    }

    await client.end();
}

let setUpQuery = 'create table openidl_ep.tmp_connector as select * from openidl_base.au_premium limit 5;'

let auQuery = `select coverage_category, coverage
                , auto_ep('2000-01-01'::DATE, '2002-01-01'::DATE,coverage_code) earned_premium
                , auto_cy('2000-01-01'::DATE, '2002-01-01'::DATE,coverage_code) car_years
                , auto_incurred_count('2000-01-01'::DATE, '2002-01-01'::DATE,coverage_code) incurred_count
                , auto_incurred_loss('2000-01-01'::DATE, '2002-01-01'::DATE,coverage_code) incurred_loss
                from openidl_base.au_coverage_vw
                order by coverage_category;`

let tearDownQuery = 'drop table openidl_ep.tmp_connector;'

let masterQueryString = setUpQuery+auQuery+tearDownQuery

main(masterQueryString)