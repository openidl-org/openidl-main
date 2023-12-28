const log4js = require('log4js');
const CloudantDBManager = require('./cloudantDBManager');
const MongoDBManager = require('./mongoDBManager');
const PostgresDBManager = require('./postgresDBManager');

const logger = log4js.getLogger('DBManagerFactory');
logger.level = process.env.LOG_LEVEL || 'debug';

class DBManagerFactory {
  async getInstance(options, dbType) {
    logger.info(`Inside DBManagerFactory getInstance(${dbType}): ${JSON.stringify(options)}`);
    let databaseType = dbType;
    if (databaseType === undefined) {
      databaseType = options.defaultDbType;
    }

    try {
      switch (databaseType) {
        case 'mongo':
          const mongoDBInstance = new MongoDBManager(options.mongo);
          return mongoDBInstance;
        case 'cloudant':
          return new CloudantDBManager(options.cloudant);
        case 'postgres':
          return new PostgresDBManager(options.postgres);
        default:
          logger.error(`Incorrect Usage of database type: ${dbType}. Refer README for more details`);
          throw Error(`Unknown DB type: ${dbType}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
module.exports = DBManagerFactory;
