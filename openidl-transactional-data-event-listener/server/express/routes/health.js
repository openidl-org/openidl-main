const express = require('express');

const router = express.Router();

router.route('/').get((req, res) => {
	res.json({
		message: 'Data call trasactional event listener is alive.'
	});
});

module.exports = router;
