var processors = {
    "BP": require('./BPProcessor'),
    "CP": require('./CPProcessor'),
    "HO": require('./HOProcessor'),
    "IM": require('./IMProcessor')
}

const referenceData = require('./referenceData').referenceData

module.exports.convertFlatToHDS = function convertFlatToHDS(textRecord, batchId, batchHash) {
    var lob = getLOB(textRecord)
    var processor = processors[lob]
    if (processor) {
        var flatJson = processor.convertRecordToFlatJson(textRecord)
        return processor.convertFlatJsonToHdsJson(flatJson, batchId, batchHash)
    }
    throw 'No processor found for LOB: ' + lob
}

module.exports.convertCSVToHDS = function convertFlatToHDS(csvRow, batchId, batchHash) {
    var lob = csvRow.lob
    var processor = processors[lob]
    if (processor) {
        return processor.convertFlatJsonToHdsJson(csvRow, batchId, batchHash)
    }
    throw 'No processor found for LOB: ' + lob
}

module.exports.getTransactionType = (record) => {
    var transactionCode = record.substring(19,20)
    return referenceData.TransactionType[transactionCode].Type
}

function getLOB(line) {
    var lobCode = line.substring(0,2)
    return referenceData.LineOfInsurance[lobCode] ? referenceData.LineOfInsurance[lobCode].Abbreviation : ''
}