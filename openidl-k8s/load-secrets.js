/**
 SPDX-License-Identifier: Apache-2.0
*/
/**
 * Load the secrets from aws.
 * call via node load-secrets.js <cloud> <environment> <node>
 * The results will be placed into the config directory.
 */
const { exit } = require('node:process')
const secretsManager = require('../openidl-secrets-manager/secrets-manager')

var args = process.argv.slice(2)

if (args.length < 3) {
    console.log('Error.  Must provide at least 3 parguments: cloud, environment, node.')
    console.log("Usage: node load-secrets.js <cloud> <environment> <node>")
    exit(1)
} else {
    var destination = (args.length > 3 ? args[3] : './charts/openidl-secrets/config')
    secretsManager.loadSecretsFromCloud(destination, args[0], args[1], args[2])
    exit(0)
}