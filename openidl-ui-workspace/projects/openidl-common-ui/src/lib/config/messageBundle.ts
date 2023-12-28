export const MESSAGE = {
	LOGIN: {
		USER_PASSWORD_MISSING: {
			message: 'Please enter username and password',
			type: 'error',
			title: 'Error'
		},
		INVALID_CREDENTIALS: {
			message: 'Could not login due to invalid credentials',
			type: 'error',
			title: 'Error'
		},
		INVALID_ROLE: {
			message: 'Invalid Nifi Role',
			type: 'error',
			title: 'Error'
		}
	},

	PAGE_LEAVE_CONFIRMATION: {
		message:
			'Are you sure you want to leave this page without submitting? Your information will be lost.',
		type: 'info',
		title: ''
	},

	COMMON_ERROR: {
		type: 'error',
		message: 'Some technical error has occured.',
		title: 'Error'
	},
	MANDATORY_FIELDS_ERROR: {
		type: 'error',
		message: 'All fields are mandatory.',
		title: 'Error'
	},
	ACTIVITY_FAIL: {
		Unauthorized: {
			type: 'error',
			message: 'Please log back in to continue your activity.',
			title: 'Session Timed Out'
		}
	},

	DATACALL_FETCH_ERROR: {
		type: 'error',
		message:
			'Could not fetch the datacall details due to some technical error.',
		title: 'Error'
	},

	DATACALL_VERSION_FETCH_ERROR: {
		type: 'error',
		message:
			'Could not fetch datacall versions due to some technical error.',
		title: 'Error'
	},

	DATA_FETCH_ERROR: {
		type: 'error',
		message: 'Could not fetch data due to some technical error.',
		title: 'Error'
	},

	DUPLICATE_HASH: {
		type: 'error',
		message: 'Cannot use duplicate hash.',
		title: 'Error'
	},
	HASH_UPDATE_SUCCESS: {
		type: 'success',
		title: 'Success',
		message: 'The report URL and hash have been updated.'
	},
	DATACALL_ISSUE_SUCCESS: {
		type: 'success',
		title: 'Data Call Issued',
		message: 'Data call has been issued.'
	},
	DATACALL_DRAFT_SUCCESS: {
		type: 'success',
		title: 'Data Call Saved',
		message: 'Data call draft has been created.'
	},
	DATACALL_DRAFT_UPDATE_SUCCESS: {
		type: 'success',
		title: 'Data Call Draft Updated',
		message: 'Data Call draft has been updated.'
	},
	FORUMURL_UPDATE_INFO: {
		type: 'info',
		title: 'Update Forum URL',
		message: 'Forum URL'
	},
	DELIVERY_DATE_UPDATE_SUCCESS: {
		type: 'success',
		title: 'Success',
		message: 'Proposed delivery date has been successfully updated.'
	},
	DATACALL_ABANDON_SUCCESS: {
		type: 'success',
		title: 'Success',
		message: 'Data Call has been abandoned.'
	},
	DELIVERY_DATE_UPDATE_FAIL: {
		type: 'error',
		title: 'Error',
		message:
			'Could not update the delivery date due to some technical error.'
	},
	DRAFT_SAVE_FAIL: {
		type: 'error',
		title: 'Cannot save a new draft',
		message: 'No changes have been made to the data call fields.'
	},

	SET_EXTRACTION_SUCCESS: {
		type: 'success',
		title: 'Success',
		message: 'Extraction pattern has been successfully updated.'
	},

	SET_EXTRACTION_FAIL: {
		type: 'error',
		title: 'Error',
		message:
			'Could not update the extraction pattern due to some technical error.'
	},

	SET_ALL_FIELDS_SUCCESS: {
		type: 'success',
		title: 'Success',
		message: 'Data Call have been successfully updated.'
	},

	SET_ALL_FIELDS_FAIL: {
		type: 'error',
		title: 'Error',
		message: 'Could not update Data Call due to some technical error.'
	},

	SET_PATTERN_FORUM_SUCCESS: {
		type: 'success',
		title: 'Success',
		message:
			'Forum URL and extraction pattern have been successfully updated.'
	},
	SET_PATTERN_FORUM__FAIL: {
		type: 'error',
		title: 'Error',
		message:
			'Could not update forum URL and extraction pattern due to some technical error.'
	},

	SET_PATTERN_DATE_SUCCESS: {
		type: 'success',
		title: 'Success',
		message:
			'Proposed delivery date and extraction pattern have been successfully updated.'
	},
	SET_PATTERN_DATE__FAIL: {
		type: 'error',
		title: 'Error',
		message:
			'Could not update proposed delivery date and extraction pattern due to some technical error.'
	},
	SET_FORUM_DATE_SUCCESS: {
		type: 'success',
		title: 'Success',
		message:
			'Proposed delivery date and forum URL have been successfully updated.'
	},

	SET_FORUM_DATE__FAIL: {
		type: 'error',
		title: 'Error',
		message:
			'Could not update proposed delivery date and forum URL due to some technical error.'
	},

	SET_FORUM_SUCCESS: {
		type: 'success',
		title: 'Success',
		message: 'Forum URL has been successfully updated.'
	},

	SET_FORUM_FAIL: {
		type: 'error',
		title: 'Error',
		message: 'Could not update the Forum URL due to some technical error.'
	},
	SET_DATE_SUCCESS: {
		type: 'success',
		title: 'Success',
		message: 'Proposed delivery date has been successfully updated.'
	},

	SET_DATE_FAIL: {
		type: 'error',
		title: 'Error',
		message:
			'Could not update the delivery date due to some technical error.'
	},

	NAME_FETCH_FAIL: {
		type: 'error',
		title: 'Error',
		message: 'Could not fetch the names due to some technical error.'
	},
	EXTRACTION_PATTERN_MESSAGE: {
		message:
			"Please note that this file is for informational purposes only. This file can't be used to run the data extraction."
	},
	GENERIC_ERROR: {
		type: 'error',
		title: 'Error',
		message: 'Could not process request due to some technical error.'
	}
};
