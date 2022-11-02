const config = require('../config/config.json')
const { Pool, Client } = require("pg");
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

async function queryMachine(client,queryString){
    let queries = queryString.split(';')
    let returnVal = null
    for (let query of queries){
        console.log(query)
        queryWord = query.split(' ')[0].toLowerCase()
        if (queryWord == 'create'){
            await callPG(client,query)
        }
        if (queryWord == 'select'){
            returnVal= await callPG(client,query)
        }
        if (queryWord == 'drop'){
            await callPG(client,query)
        }
    }
    return returnVal
}


async function main(queryString){
    
    const client = new Client(credentials);
    await client.connect();

    let result = await queryMachine(client,queryString)
    await client.end();
    return result
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

console.log({masterQueryString});

//let masterResult = main(masterQueryString)
