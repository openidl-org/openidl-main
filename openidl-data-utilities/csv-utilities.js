const Parser = require('json2csv')
const fs = require('fs')
const config = require('./config/config.json')

module.exports.convertToCSV = function convertToCSV(json, ignore = []) {
    let rows = []
    for (let item of json) {
        let row = {}
        for (let field in item['_id']) {
            if (ignore.includes(field)) {

            } else {
                row[field] = item['_id'][field]
            }
        }
        for (let field in item.value) {
            if (ignore.includes(field)) {

            } else {
                row[field] = item.value[field]
            }
        }
        rows.push(row)
    }
    console.log('rows ' + rows.length)
    const fields = Object.keys(rows[0])
    console.log('fields ' + fields.length)
    const opts = { fields }

    let csv = null
    try {
        const parser = new Parser.Parser(opts)
        csv = parser.parse(rows)
    } catch (err) {
        console.error(err);
    }
    return csv
}

