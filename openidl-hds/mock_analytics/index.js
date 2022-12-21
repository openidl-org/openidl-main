const {post} = require("axios");
const fs = require("fs");

const ep = require('./extraction')

async function restExampleExecution_9999(){
    try{
        let query = ep();
        const result = await post("http://localhost:3000/query/execute_9999", {
            query
        }, {
            headers: {
                auth_key: "y0dTTafTsmiB2gzjU2BVPOsJLrqZ#o@VjRQILI!Y16mzo3C9eL7hV&$#7fm@Vv4O874SOD%aM&34#XTofDKypRTWwX!"
            }
        })
        const data = result.data;
        fs.writeFileSync("./example_data_9999.json", JSON.stringify(data, null, 4));
        return data;
    }catch(restExampleExecution_e){
        console.log({restExampleExecution_e});
        return null;
    }
}

async function restExampleExecution_9998(){
    try{
        let query = ep();
        const result = await post("http://localhost:3000/query/execute_9998", {
            query
        }, {
            headers: {
                auth_key: "y0dTTafTsmiB2gzjU2BVPOsJLrqZ#o@VjRQILI!Y16mzo3C9eL7hV&$#7fm@Vv4O874SOD%aM&34#XTofDKypRTWwX!"
            }
        })
        const data = result.data;
        fs.writeFileSync("./example_data_9998.json", JSON.stringify(data, null, 4));
        return data;
    }catch(restExampleExecution_e){
        console.log({restExampleExecution_e});
        return null;
    }
}

async function restExampleExecution_9997(){
    try{
        let query = ep();
        const result = await post("http://localhost:3000/query/execute_9997", {
            query
        }, {
            headers: {
                auth_key: "y0dTTafTsmiB2gzjU2BVPOsJLrqZ#o@VjRQILI!Y16mzo3C9eL7hV&$#7fm@Vv4O874SOD%aM&34#XTofDKypRTWwX!"
            }
        })
        const data = result.data;
        fs.writeFileSync("./example_data_9997.json", JSON.stringify(data, null, 4));
        return data;
    }catch(restExampleExecution_e){
        console.log({restExampleExecution_e});
        return null;
    }
}


async function main(){
    console.log(ep())
    response = await restExampleExecution_9999()
    response = await restExampleExecution_9998()
    response = await restExampleExecution_9997()
    // n9999 = require("./example_data_9999.json").result
    // count9999 = (n9999[0].result.result.rows[0].count)

    // n9998 = require("./example_data_9998.json").result
    // count9998 = (n9999[0].result.result.rows[0].count)

    // total = parseInt(count9998) + parseInt(count9999)
    // console.log(total)
}

main()