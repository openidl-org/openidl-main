const { ConfigurationManager } = require("./configuration.js");
const { DBHelper } = require("./db.js");

async function runThisExample(){
    const dbHelper = new DBHelper({credentials: ConfigurationManager.mySQLDBCredentials});
    const result = await dbHelper.runQuery(`
        select count(1)
        from openidl_base_9999.au_premium;|
    `)
    console.log('result')
    console.log(result[0].result)
    return result;
}


runThisExample()
.then((data_example)=>{
    console.log({data_example});
})
.catch((runThisExample_err)=>{
    console.log({
        runThisExample_err
    });
})