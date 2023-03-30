const processRecords = require("./processor").process

exports.handler = async function (event, context) {
    return processRecords(event.Records)
}