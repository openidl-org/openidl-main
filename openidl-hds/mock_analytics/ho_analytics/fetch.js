const {post} = require("axios");
const fs = require("fs");

const ep = require('./extraction')




  function getStamp(){
    stampString = Math.round(Math.floor(Date.now() / 1000)).toString()
    stampString.slice(stampString.length - 5)
    return stampString
  }

async function restExampleExecution_9999(){
    try{
        let query = ep();
        console.log(query)
        const result = await post("http://localhost:3000/query/execute_9999", {
            query
        }, {
            headers: {
                auth_key: "y0dTTafTsmiB2gzjU2BVPOsJLrqZ#o@VjRQILI!Y16mzo3C9eL7hV&$#7fm@Vv4O874SOD%aM&34#XTofDKypRTWwX!"
            }
        })
        const data = result.data;
        console.log(data)
        stamp = getStamp()
        fs.writeFileSync(`./response/ho/ho_data_9999_${stamp}.json`, JSON.stringify(data, null, 4));
        return data;
    }catch(restExampleExecution_e){
        console.log({restExampleExecution_e});
        return null;
    }
}



async function main(){
    console.log(ep())
    response = await restExampleExecution_9999()

}

main()