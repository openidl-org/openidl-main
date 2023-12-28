const valueReplacer = require('../openidl-tools')
const secrets = require('./config/config-secrets.json')

valueReplacer.replaceValuesInFolder('./test/config', secrets)
