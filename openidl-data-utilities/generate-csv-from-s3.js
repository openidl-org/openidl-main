const fs = require('fs')
const convertToCSV = require('./csv-utilities').convertToCSV
const AWS = require('aws-sdk')
var credentials = new AWS.SharedIniFileCredentials({ profile: 'hig1-user' });
AWS.config.credentials = credentials;
AWS.config.update({ region: 'us-east-1' })
let s3 = new AWS.S3({ apiVersion: '2006-03-01' })

let commandArgs = process.argv.slice(2)
let s3Key = commandArgs[0]
let reportName = commandArgs[1]

let outputFile = 'report.csv'
let bucketName = 'openidl-analytics-dev-output'
let reportBucketName = 'openidl-analytics-dev-report'

// get all the object names
let bucketParams = { Bucket: bucketName }
s3.listObjects(bucketParams, (err, data) => {
    if (err) {
        console.log("Error:", err)
    } else {
        let objects = []
        console.log(data)
        for (object of data.Contents) {
            if (object.Key.includes('chunk_10101')) objects.push(object)
        }
        objects.sort(compareObjects)
        createReport(bucketName, objects[0], reportBucketName)
        createReport(bucketName, objects[1])
    }
})

function compareObjects(a, b) {
    if (a.LastModified > b.LastModified) {
        return -1
    } else if (a.LastModified < b.LastModified) {
        return 1
    } else {
        return 0
    }
}

// get the two that have the inputs for the reports and process them
/*
File uploaded successfully. https://openidl-analytics-dev-report.s3.amazonaws.com/DataCall-Report-2021-12-15T153512.000Z.csv
File uploaded successfully. https://openidl-analytics-dev-report.s3.amazonaws.com/Stat-Report-2021-12-15T153814.000Z.csv
*/
function createReport(bucketName, s3Object) {
    let objectParams = { Bucket: bucketName, Key: s3Object.Key }
    s3.getObject(objectParams, (err, objectData) => {
        if (err) {
            console.log(err, err.stack)
        } else {
            // console.log(objectData)
            let json = JSON.parse(objectData.Body.toString())
            // console.log(JSON.stringify(json))
            let reportName = (json[0]['_id'].zipcode ? 'DataCall-Report-' : 'Stat-Report-') + s3Object.LastModified.toISOString().split(' ').join('-').split(':').join('')
            let ignore = ['chunkid', 'chunkId', 'value']
            // console.log(convertToCSV(json, ignore))
            let content = convertToCSV(json, ignore)
            fs.writeFileSync(outputFile, content)

            let reportParams = { Bucket: reportBucketName, Key: reportName + '.csv', Body: content }
            s3.upload(reportParams, (err, uploadData) => {
                if (err) {
                    console.log('Error:', err)
                } else {
                    console.log(`File uploaded successfully. ${uploadData.Location}`)
                }
            })
        }
    })
}
