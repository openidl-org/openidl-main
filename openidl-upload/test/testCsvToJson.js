/**
 SPDX-License-Identifier: Apache-2.0
*/
const fs = require('fs');
const csvFilePath='test/Book1.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
 
// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);
// const jsonArray=csv().fromFile(csvFilePath);

// console.log(jsonArray)

fs.readFile(csvFilePath, 'utf8', function(err, data) {
    if (err) throw err;
    csv()
    .fromString(data)
    .then((csvRow)=>{ 
        console.log(csvRow) // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
    })
    // console.log(csv({noheader:false,output:"csv"}).fromString(data))
})


