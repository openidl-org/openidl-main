const fs = require('fs');
const { exit } = require('process');

const AWS = require('aws-sdk')

module.exports.loadSecretsFromCloud = function loadSecretsFromCloud(dir, cloud, environment, node) {

    var region = "us-east-1",
        secretName = `/openidl/${cloud}/${environment}/${node}`,
        secret,
        decodedBinarySecret;

    console.info(`Loading secrets from ${secretName}`)

    // Create a Secrets Manager client
    var client = new AWS.SecretsManager({
        region: region
    });

    // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
    // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    // We rethrow the exception by default.

    client.getSecretValue({ SecretId: secretName }, function (err, data) {
        if (err) {
            console.log(`There was an error getting the secret value: ${err.code}`)
            if (err.code === 'DecryptionFailureException')
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidParameterException')
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidRequestException')
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                // We can't find the resource that you asked for.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
        }
        else {
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            console.log(`Secrets data: ${data}`)
            if ('SecretString' in data) {
                secret = data.SecretString;
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
            }
        }

        var secretJson = JSON.parse(secret)
        // console.log(secretJson)
        var channelConfigJson = JSON.parse(secretJson['channel-config'])
        // console.log(channelConfigJson)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        for (key in secretJson) {
            console.log(`${key}`)
            fs.writeFile(dir + '/' + key + '.json', secretJson[key], err => {
                if (err) {
                    console.log('Error writing file for key ' + key, err)
                }
            })
        }
    });
    console.info("Loaded secrets")
}

// var args = process.argv.slice(2)
// if (args.length !== 3) {
//     console.log('Error.  Must provide 3 parguments: cloud, environment, node.')
//     console.log("Usage: node index.js <cloud> <environment> <node>")
//     exit(1)
// } else {
//     this.loadSecretsFromCloud('./config', args[0], args[1], args[2])
// }

