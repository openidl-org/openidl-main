/**
 * Extraction Pattern Manager
 * CRUD functions for extraction patterns.
 * While we don't have a user interface for managing the extraction patterns, this class will suffice.
 * It uses the data-call-app as the api for managing the patterns.
 */
const log4js = require('log4js');
const fs = require('fs')
const logger = log4js.getLogger('extraction-pattern-manager');
logger.level = "debug"

class ExtractionPatternManager {

    createExtractionPattern(id, name, description, jurisdiction, insurance, mapFunction, reduceFunction, version, effectiveDate, expirationDate, premiumFromDate, premiumToDate, lossFromDate, lossToDate, userId) {
        var today = new Date()
        today.setSeconds(0)
        today.setMilliseconds(0)
        var todayString = today.toISOString()
        todayString = todayString.substring(0, todayString.lastIndexOf(':')) + ':00Z'
        return {
            "extractionPatternID": id,
            "extractionPatternName": name,
            "description": description,
            "jurisdication": jurisdiction,
            "insurance": insurance,
            "viewDefinition": {
                "map": mapFunction.toString(),
                "reduce": reduceFunction.toString()
            },
            "dbType": "mongo",
            "version": version,
            "isActive": true,
            "effectiveStartTs": effectiveDate,
            "effectiveEndTs": expirationDate,
            "premiumFromDate": premiumFromDate,
            "premiumToDate": premiumToDate,
            "lossFromDate": lossFromDate,
            "lossToDate": lossToDate,
            "updatedTs": todayString,
            "updatedBy": userId
        }
    }

    listExtractionPatterns(extractionPattern) {

    }

    async writeExtractionPatternToFile(extractionPattern, fileName) {
        console.log("ExtractonPattern:", extractionPattern)
        fs.writeFileSync(fileName, JSON.stringify(extractionPattern), (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    }
}

module.exports = ExtractionPatternManager
