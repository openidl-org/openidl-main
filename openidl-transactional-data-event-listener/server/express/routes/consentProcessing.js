const express = require('express');
const log4js = require('log4js');

const { pollForMaturedDataCall } = require('../../service/pollDataService');

const router = express.Router();
const logger = log4js.getLogger('consentProcessingRoute');

router.route('/').post(async (req, res) => {
	logger.info('Starting Manual Consent Processing');
	logger.info('request.body: ', req.body);

	await pollForMaturedDataCall(req.body);

	res.json({
		message: 'Done'
	});
});

module.exports = router;
