/**
 SPDX-License-Identifier: Apache-2.0
*/
const MongoDBManager = require('../openidl-extraction-pattern-developer/service/mongo-database-manager')
const fileProcessor = require('./FileProcessor')
const fs = require('fs');
const { exit } = require('process');

module.exports.writeTotalsToCSV = function writeTotalsToCSV(totals, fileName) {

    let csv = 'source,lob,state,transaction,records,amount\n'
    let overallTotals = {"amount":0,"recordCount":0}
    for(let source in totals) {
        let totalSource = {"amount":0,"recordCount":0}
        for(let lob in totals[source]) {
            let totalLOB = {"amount":0,"recordCount":0}
            for (let state in totals[source][lob]) {
                let totalState = {"amount":0,"recordCount":0}
                for (let transactionCode in totals[source][lob][state]) {
                    let transactionCodeRecord = totals[source][lob][state][transactionCode]
                    // console.log(` ${source} ${lob} ${state} ${transactionCode} => records ${transactionCodeRecord.recordCount} amount ${transactionCodeRecord.amount}`)
                    csv = csv + `"${source}","${lob}","${state}","${transactionCode}",${transactionCodeRecord.recordCount},${transactionCodeRecord.amount}\n`
                    totalState.amount += transactionCodeRecord.amount
                    totalState.recordCount += transactionCodeRecord.recordCount
                    totalLOB.amount += transactionCodeRecord.amount
                    totalLOB.recordCount += transactionCodeRecord.recordCount
                    totalSource.amount += transactionCodeRecord.amount
                    totalSource.recordCount += transactionCodeRecord.recordCount
                    overallTotals.amount += transactionCodeRecord.amount
                    overallTotals.recordCount += transactionCodeRecord.recordCount
                }
                // console.log(` ${source} ${lob} ${state} => records ${totalState.recordCount} amount ${totalState.amount}`)
            }
            // console.log(` ${source} ${lob} => records ${totalLOB.recordCount} amount ${totalLOB.amount}`)
        }
        // console.log(` ${source} => records ${totalSource.recordCount} amount ${totalSource.amount}`)
    }
    // console.log(` overall => records ${overallTotals.recordCount} amount ${overallTotals.amount}`)

    fs.writeFileSync(`${fileName}.csv`, csv)

}

module.exports.loadData = async (dataFolder, dbName, collectionName, chunkSize = 10000, maxRecordsToProcess = -1) => {
    var dbManager = new MongoDBManager({ url: "mongodb://localhost:27017" })

    await dbManager.connect()
    await dbManager.useDatabase(dbName).catch((err) => { throw err })
    await dbManager.dropCollection(collectionName).catch((err) => { throw err })

    let dataFileNames = fs.readdirSync(dataFolder)

    // Load all the data from the test files
    let auditInfo = []
    let totals = {}
    for (let dataFileName of dataFileNames) {
        let sequenceNo = 0

        console.log(`Processing ${dataFileName}`)
        let contents = fs.readFileSync(dataFolder + dataFileName, 'utf8');
        let start = 0
        let recordCount = fileProcessor.countTextRecords(contents)
        do {
            let results = fileProcessor.processTextRecords(contents, start, start + chunkSize)
            let allResults = []
            // let results = fileProcessor.processTextRecords(contents)
            for (let result of results) {
                for (let record of result.records) {
                    record.sourceId = dataFileName
                    record.batchId = "1111"
                    record.chunkId = "1111111"
                    record.carrierId = "9999"
                    record.policyNo = "1111111"
                    record.errFlg = false
                    record.errrLst = []
                    record.SquenceNum = sequenceNo
                    record['_id'] = dataFileName + sequenceNo.toString()
    
                    allResults.push(record)
                    let auditRecord = {"source":dataFileName,"lineOfBusiness":record.metaData.lineOfBusiness,"transactionCode":record.metaData.transactionCode,"state":record.metaData.state,"amount":record.metaData.amount}
                    auditInfo.push(auditRecord)
                    addToAuditTotals(totals,auditRecord)
                    sequenceNo = sequenceNo + 1
                }
            }
            console.log("About to load from " + start + " to " + (start + chunkSize) + " of " + recordCount + " records from " + dataFileName)
            await dbManager.loadData(allResults, dbName, collectionName).catch((err) => {throw err})
            start = start + chunkSize
        } while (start < recordCount && (maxRecordsToProcess <= 0 || start < maxRecordsToProcess))
    }
    return totals

}

function addToAuditTotals(totals, auditRecord) {
    totalSource = totals[auditRecord.source]
    if (!totalSource) {
        totalSource = {}
        totals[auditRecord.source] = totalSource
    }
    let totalLOB = totalSource[auditRecord.lineOfBusiness]
    if (!totalLOB) {
        totalLOB = {}
        totalSource[auditRecord.lineOfBusiness] = totalLOB
    }
    let totalState = totalLOB[auditRecord.state]
    if (!totalState) {
        totalState = {}
        totalLOB[auditRecord.state] = totalState
    }
    let totalTransactionCode = totalState[auditRecord.transactionCode]
    if (!totalTransactionCode) {
        totalTransactionCode = {"amount":0,"recordCount":0}
        totalState[auditRecord.transactionCode] = totalTransactionCode
    }
    totalTransactionCode.amount += auditRecord.amount
    totalTransactionCode.recordCount += 1
}

async function process() {
    const dataFolder = 'test/data/fromSDMA/'
    const chunkSize = 10000  // best size is 10000
    const maxRecordsToProcess = -1 // use -1 to read all records
    const dbName = 'covid-report'
    const collectionName = 'hds-data'
        let results = await loadData(dataFolder, dbName, collectionName, chunkSize, maxRecordsToProcess)
    writeTotalsToCSV(results, 'totals')
}

process().then(() => {

    console.log("Done")
    process.exit()
})



