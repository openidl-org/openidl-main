const designDocument = require('../../server/controllers/design-document');
const dbSpy1 = {
	get: (name, callback) => {
		callback(null, {views:[], _rev: 'rev'});
	},
	insert: (doc, callback) => {
		callback(null,{rev: 'rev'});
	}
}
const dbSpy2 = {
	get: (name, callback) => {
		callback(new Error('Some Error'));
	},
	insert: (doc, callback) => {
		callback(null,{rev: 'rev'});
	}
}

jest.mock('@cloudant/cloudant', () => {
	const Cloudant = () => {
		return {
			db: {
				use: (dbname) => {
					if(dbname === 'undefined_carrierId')
						return dbSpy1;
					else
						return dbSpy2;
				}
			}
		};
	};
	return Cloudant;
});

describe('DesignDocument', () => {
	beforeAll(()=>{
		const localCloudantConfig = {
			url: 'https://myaccountid.cloudantnosqldb.appdomain.cloud',
			username: 'testUser',
			password: 'unitTest'
		};
		process.env['OFF_CHAIN_DB_CONFIG'] =
			JSON.stringify(localCloudantConfig);

	});

	describe('updateDesignDocument', () => {
		it('should  updateDesignDocument', (done) => {
			const extractionPattern = {
				viewDefinition: {
					map: '',
					reduce: ''
				}
			};
			designDocument.updateDesignDocument(
				extractionPattern,
				'mockViewname',
				'carrierId'
			).then((result)=>{
				expect(result).toBe('mockViewname');
			});
			done();
		});
		it('should  updateDesignDocument with error while get()', (done) => {
			const extractionPattern = {
				viewDefinition: {
					map: '',
					reduce: ''
				}
			};
			designDocument.updateDesignDocument(
				extractionPattern,
				'mockViewname',
				null
			).then((result)=>{
				expect(result).toBe('mockViewname');
			});
			done();
		});
	});
});
