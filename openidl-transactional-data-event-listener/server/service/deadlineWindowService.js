const config = require('../config/default.json');

const pollIntervalInDays = config.pollIntervalInDays || '1';

const getDefaultDeadlineWindow = () => {
	const startTime = new Date();
	const endTime = new Date();

	startTime.setDate(startTime.getDate() - parseInt(pollIntervalInDays));
	startTime.setHours(0, 0, 0, 0);
	endTime.setHours(0, 0, 0, 0);

	deadlineWindow = {};
	deadlineWindow.startTime = startTime.toISOString();
	deadlineWindow.endTime = endTime.toISOString();
};

module.exports = {
	getDefaultDeadlineWindow
};
