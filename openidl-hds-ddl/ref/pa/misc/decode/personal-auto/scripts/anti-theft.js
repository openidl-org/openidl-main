
stateCodes = require('../../state.json').states

generics = [
    {"code": "01", "description": "Vehicles with no discount but rated under a discount program"},
    {"code" : "02", "description": "Vehicles with alarm only — with discount"},
    {"code" : "03", "description": "Vehicles with active devices — with discount"},
    {"code" : "04", "description": "Vehicles with passive devices — with discount"},
    {"code" : "05", "description": "Vehicles with an alarm and an active device — with discount"},
    {"code" : "06", "description": "Vehicles with an alarm and a passive device — with discount"},
    {"code": "99", "description": "All other (Vehicles not rated under a discount program)"}
]

let count = 1
for (let state of stateCodes){
   
    for (let generic of generics){
        line = `insert into pa_anti_theft_device_discount_code values ( ${count},${state.id},'${generic.code}','${generic.description}');`
        count+=1
        console.log(line)
    }
}