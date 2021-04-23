 // SPDX-License-Identifier: Apache-2.0
/**
 * Updated Implementation of FileSystem Memory Wallet with InMemory Wallet
 * Same applies to couchdb wallet to be implemented
 */
const log4js = require('log4js');
const config = require('config');
const {
  FileSystemWallet,
  X509WalletMixin
} = require('fabric-network');
const {
  CouchDBWallet
} = require('./couchdbwallet');
const {
  InMemoryWallet
} = require('fabric-network');
const logger = log4js.getLogger('helpers - wallet');
//logger.setLevel(config.logLevel);
logger.level = config.logLevel;

const {
  CertificatemanagerWallet
} = require('./certificatemanagerwallet');


/**
 * Wallet object
 */
const wallet = {};

let persistantWallet;
let persistence;

// memory wallet for caching
const memoryWallet = new InMemoryWallet();

/**
 * initCloudant initializes persistent wallet to Cloudant DB 
 */
wallet.initCloudant = (options) => {
  persistantWallet = new CouchDBWallet(options);
  logger.debug('cloudant persistence wallet init done ');
}
/**
 * init initializes persistent wallet to IBM Certificate Manager. 
 * All application uses IBM Certification manager as default 
 */
wallet.init = (options) => {
  persistantWallet = new CertificatemanagerWallet(options);
  persistantWallet.loadoptions(options);
  logger.debug('certificate manager persistence wallet init done ');
}


/**
 * Return inmemory wallet and hide FileSystemWallet object
 */
wallet.getWallet = () => {
  return memoryWallet;
};

/**
 * check if the identity exists in memory wallet
 * @param {string} id - label of id in wallet
 */
wallet.identityExists = async (id) => {
  let existsInMemory = await memoryWallet.exists(id);
  if (!existsInMemory) {
    logger.debug("Identity doesn't exists in memory, checking in persistant database...");
    let existsInPersistant = await persistantWallet.exists(id);
    if (!existsInPersistant) {
      throw new Error("Invalid Identity, no certificate found in certificate store");
    } else {
      // export from persistant wallet and store in memory wallet
      logger.debug("Identity " + id + " found in persistant store");
      let identity = await exportIdentity(id);
      logger.debug("Identity Exportted ", id, ", importing to memory wallet");
      await memoryWallet.import(id, identity);
      logger.debug("Identity ", id, "imported to memory wallet");
      existsInMemory = true;
    }
  }
  logger.debug(`${id} exists in wallet: ${existsInMemory}`);
  return existsInMemory;
};

/**
 *
 * @param {string} id - label of id importing into wallet
 * @param {string} org - org that id belongs to
 * @param {string} cert - cert from enrolling user
 * @param {string} key - key from enrolling user
 */
wallet.importIdentity = async (id, org, cert, key) => {
  // check if the identity exists in persistant wallet
  const exists = await persistantWallet.exists(id);
  logger.info("id", id, "org", org, "cert", cert, "key", key);
  if (!exists) {
    try {
      logger.debug(`Importing ${id} into wallet`);

      await persistantWallet.import(id, X509WalletMixin.createIdentity(org, cert, key));

    } catch (err) {
      logger.debug(`Error importing ${id} into wallet: ${err}`);
      throw new Error(err);
    }
  }
  // export from persistant wallet and store in memory wallet
  let identity = await exportIdentity(id);
  logger.debug("Identity Exportted ", id, ", importing to memory wallet");
  await memoryWallet.import(id, identity);
  logger.debug("Identity ", id, "imported to memory wallet");

};

/**
 *
 * @param {string} id - label of id importing into wallet
 */
let exportIdentity = async (id) => {
  try {
    logger.debug(`Export ${id} from persistant wallet`);
    return await persistantWallet.export(id);
  } catch (err) {
    logger.debug(`Error Exorting ${id} into wallet: ${err}`);
    throw new Error(err);
  }
};

module.exports = wallet;