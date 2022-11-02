const { ConfigurationManager } = require("./configuration.js");
const { DBHelper } = require("./db.js");

async function runThisExample(){
    const dbHelper = new DBHelper({credentials: ConfigurationManager.mySQLDBCredentials});
    const result = await dbHelper.runQuery(`
        select count(1)
        from openidl_base.au_premium;
    `)
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