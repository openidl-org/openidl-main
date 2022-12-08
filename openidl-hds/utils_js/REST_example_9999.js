const {post} = require("axios");
const fs = require("fs");

const REPORT_QUERY = `
    SELECT * from openidl_base_@comp.au_premium limit 5;
`

const SELECT_QUERY = `
    SELECT * from openidl_base.au_premium limit 5;
`;

async function restExampleExecution(){
    try{
        let query = REPORT_QUERY;
        const result = await post("http://localhost:3000/query/execute_9999", {
            query
        }, {
            headers: {
                auth_key: "y0dTTafTsmiB2gzjU2BVPOsJLrqZ#o@VjRQILI!Y16mzo3C9eL7hV&$#7fm@Vv4O874SOD%aM&34#XTofDKypRTWwX!"
            }
        })
        const data = result.data;
        fs.writeFileSync("./example_data.json", JSON.stringify(data, null, 4));
        return data;
    }catch(restExampleExecution_e){
        console.log({restExampleExecution_e});
        return null;
    }
}

restExampleExecution()
.then((data)=>{
    console.log({data});
})
.catch((restExampleExecution_e_2)=>{
    console.log({restExampleExecution_e_2});
});