//
// SPDX-License-Identifier: Apache-2.0
//
/**
 * Converts robo 3t export of multiple records into a json array in a text file
 * Removes ObjectId lines as well
 */
const fs = require('fs')
// open the input file "inputMongoText.txt"
fs.readFile('./process/inputMongoText.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    // console.log(data)

    // remove all comment lines of the form "/* <number> */"
    var text = data.replace('\/\* 1 \*\/', '[')
    text = text.replace(/\/\* \d+ \*\//g, ',')
    text = text.replace(/"_id" : ObjectId\(".+"\),/g,'')
    text = text + ']'
    fs.writeFile('./processed/outputMongoJson.json', text, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
})

// create a json array

// save that array to json
