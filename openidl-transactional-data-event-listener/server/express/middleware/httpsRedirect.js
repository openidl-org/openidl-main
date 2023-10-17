const log4js = require('log4js');

const logger = log4js.getLogger('expressMiddleware');

const httpsRedirect = (req, res, next) => {
	if (req.secure || process.env.BLUEMIX_REGION === undefined) {
		next();
	} else {
		logger.info('Redirecting to https');
		res.redirect('https://' + req.headers.host + req.url);
	}
};

module.exports = httpsRedirect;
