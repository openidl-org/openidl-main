//
// SPDX-License-Identifier: Apache-2.0
//
const chai = require('chai');
const expect = require('chai').expect;
const deepEquals = require('deep-equals')
const covidData = require('./data/testCovidDataSDMA.json')
const covidPattern = require('./extractionPatterns/Covid19BI_DataCall_ExtractionPattern')
const fs = require('fs')
const Parser = require('json2csv')
let emitted = []

describe('Testing Map Reduce Helper', () => {
    let reduced = []
    it('should allow map testing', () => {
        var sampleData = [{ "name": "a", "value": 1 }, { "name": "a", "value": 3 }, { "name": "b", "value": 1 }, { "name": "b", "value": 2 }, { "name": "c", "value": 3 }]
        for (record of sampleData) {
            mapIt.call(record)
        }
        expect(Object.keys(emitted).length).to.equal(3)
        for (emittedItem of emitted) {
            reduced.push({ "key": emittedItem.key, "value": reduceIt(emittedItem.key, emittedItem.values) })
        }
        expect(reduced[0].value).to.equal(4)
        expect(reduced[1].value).to.equal(3)
        expect(reduced[2].value).to.equal(3)
    });
})

describe('Testing Covid 19 Extraction Pattern', () => {
    let reduced = []
    it('should run extraction pattern', () => {
        console.log(`Processing ${covidData.length} Records`)
        for (record of covidData) {
            covidPattern.map.call(record)
        }

        console.log(`Mapped ${covidPattern.getEmitted().length} Records`)
        for (emittedItem of covidPattern.getEmitted()) {
            reduced.push({ "key": emittedItem.key, "value": covidPattern.reduce(emittedItem.key, emittedItem.values) })
        }

        console.log(`Reduced to ${reduced.length} Records`)
        fs.writeFile('output.json', JSON.stringify(reduced), (err) => {
            if (err) {
                console.log('Error writing file: ' + err)
            }
        })

        console.log('Records prcessed')
        let csv = convertToCSV(reduced)

        fs.writeFile('output.csv', csv, (err) => {
            if (err) {
                console.log('Error writing csv file: ' + err)
            }
        })

        expect(reduced.length).to.equal(5)
        expect(covidPattern.getEmitted().length).to.equal(5)
    })
})

function convertToCSV(json) {
    let rows = []
    for (item of json) {
        let row = {}
        for (field in item.key) {
            row[field] = item.key[field]
        }
        for (field in item.value) {
            row[field] = item.value[field]
        }
        rows.push(row)
    }
    const fields = Object.keys(rows[0])
    const opts = {fields}

    let csv = null
    try {
        const parser = new Parser.Parser(opts)
        csv = parser.parse(rows)
    } catch (err) {
        console.error(err);
    }
    return csv
}

function emit(key, value) {

    let arrayAtKey = null
    for (emittedItem of emitted) {
        if (deepEquals(emittedItem.key, key)) {
            arrayAtKey = emittedItem.values
        }
    }
    if (arrayAtKey === null) {
        arrayAtKey = []
        emitted.push({ "key": key, "values": arrayAtKey })
    }
    arrayAtKey.push(value)
}

function mapIt() {
    emit({ "key": this.name }, this.value)
}

function reduceIt(key, values) {
    let sum = 0
    for (value of values) {
        sum += value;
    }
    return sum
}