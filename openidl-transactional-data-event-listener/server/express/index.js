const healthRouter = require('./routes/health')
const concentProcessingRouter = require('./routes/consentProcessing')

module.exports = (app) => {
  app.use('/health', healthRouter)
  app.use('/start-consent-processing', concentProcessingRouter)
}