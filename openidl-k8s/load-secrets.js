/**
 * Load the secrets from aws.
 * call via node load-secrets.js <cloud> <environment> <node>
 * The results will be placed into the config directory.
 */
const secretsManager = require('../openidl-secrets-manager/secrets-manager')

var args = process.argv.slice(2)

if (args.length < 4) {
    console.error('Error.  Must provide at least 4 parguments: destination, cloud, environment, node.')
    console.error("Usage: node load-secrets.js <destination> <cloud> <environment> <node>")
} else {
    var destination = (args.length > 3 ? args[0] : './charts/openidl-secrets/config')
    console.info("About to load secrets into " + destination)
    try {
        secretsManager.loadSecretsFromCloud(destination, args[1], args[2], args[3])
    } catch (err) {
        console.log(`Error Loading secrets - ${err}`)
        process.exit(1)
    }
    console.info("Finished loading secrets")
    process.exit()
}