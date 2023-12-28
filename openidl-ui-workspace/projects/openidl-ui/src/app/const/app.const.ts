export const appConst = {
	regulator: {
		org: {
			'ohio doi': '../../assets/images/reg-ohio-doi.png',
			'colorado doi': '../../assets/images/reg-colorado-doi.png',
			'virginia doi': '../../assets/images/reg-virginia-doi-new.png',
			'california doi': '../../assets/images/reg-california-doi.png',
			'mississippi doi':
				'../../assets/images/reg-mississippi-doi-new.jpeg',
			'connecticut doi': '../../assets/images/reg-connecticut-doi.png',
			'north dakota doi':
				'../../assets/images/reg-north-dakota-doi-new.jpeg',
			'alabama doi': '../../assets/images/reg-alabama-doi.jpg',
			'maryland doi': '../../assets/images/reg-maryland-doi.jpeg',
			'new jersey doi': '../../assets/images/reg-newjersey-doi.jpg',
			'texas doi': '../../assets/images/reg-texas-doi.png'
		},

		shouldCreateDatacall: true
	},
	statagent: {
		org: {
			'12345': '../../assets/images/openidl-header-logo1.png' //stat-agent orgId changes
		},
		shouldCreateDatacall: false
	},
	carrier: {
		org: {
			'12345': '../../assets/images/car-hartford.png',
			'54321': '../../assets/images/car-faircover.png',
			'76543': '../../assets/images/lazarus_logo.png'
		},
		shouldCreateDatacall: false
	},
	roles: {
		// added for ui role decoration
		carrier: '../../assets/images/carrier.png',
		regulator: '../../assets/images/regulator.png',
		statagent: '../../assets/images/stat-agent.png'
	},
	status: {
		DRAFT: 'DRAFT',
		ISSUED: 'ISSUED',
		CANCELLED: 'CANCELLED'
	}
};
