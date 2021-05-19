//
// SPDX-License-Identifier: Apache-2.0
//
const log4js = require('log4js');
const logger = log4js.getLogger('mongo-db-manager');
logger.level = "debug"

class ExtractionPatternProcessor {

    constructor(dbManager, dbName, collectionName, extractedCollectionName) {
        this.dbManager = dbManager
        this.dbName = dbName
        this.collectionName = collectionName
        this.extractedCollectionName = extractedCollectionName
    }

    async processExtractionPattern (extractionPattern) {
        logger.debug("In Process Extraction Pattern")
        logger.debug("Map Function: " + extractionPattern.viewDefinition.map)
        logger.debug("Reduce Function: " + extractionPattern.viewDefinition.reduce)
        await this.dbManager.mapReduceWithStrings(this.dbName, this.collectionName, this.extractedCollectionName, extractionPattern.viewDefinition.map, extractionPattern.viewDefinition.reduce)
    }

}

module.exports = ExtractionPatternProcessor