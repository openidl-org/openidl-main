const mongoDBManager = require('../../server/middleware/mongodb-manager');
const mongoDBManagerInstance = require('mongodb').MongoClient;
const config = require('config');
const DBCollection = jest.fn().mockReturnThis();

describe('MongoDBManager', () => {
	describe('insert', () => {
		let connection;
		let db;

		beforeAll(async () => {
			connection = await mongoDBManagerInstance.connect(
				global.__MONGO_URI__,
				{
					useNewUrlParser: true,
					useUnifiedTopology: true
				}
			);
			db = await connection.db();
		});

		afterAll(async () => {
			await connection.close();
		});

		it('initMongoDBConnection', () => {
			mongoDBManager.initMongoDBConnection();
		});

		it('should insert a doc into collection', async () => {
			const mockRecord = { _id: 'some-input-id', val: 'test' };

			const dbManager = new mongoDBManager();
			dbManager.saveTransactionalData(mockRecord).catch((e) => {
				expect(e).toEqual('error');
			});
		});

		it('should throw error on inserting a doc into collection', async () => {
			const mockRecord = { _id: 'some-input-id', val: 'test' };

			mongoDBManager.prototype
				.saveTransactionalData(mockRecord)
				.catch((e) => {
					expect(e).toEqual('error');
				});
		});
		it('should get a doc based on it', async () => {
			const mockRecord = { _id: 'some-input-id', val: 'test' };

			mongoDBManager.prototype.saveTransactionalData(mockRecord);
			mongoDBManager.prototype
				.getTransactionalData('some-input-id')
				.catch((e) => {
					expect(e).toEqual('error');
				});
		});

		it('initMongoDBConnection', async () => {
			const mongoconfig = {
				connection: {
					mongodb: {
						composed: [{ test }],
						certificate: {
							certificate_base64: 'test'
						}
					}
				}
			};
			JSON.parse = jest.fn().mockImplementationOnce(() => {
				return mongoconfig;
			});
			const ca = 'test';
			const options = {
				ssl: true,
				sslValidate: false,
				sslCA: ca,
				useNewUrlParser: true,
				useUnifiedTopology: true
			};
			const connectionString = 'testConnection';

			const client = {
				db: jest.fn().mockReturnThis(),
				collection: jest.fn()
			};
			const connectSpy = jest
				.spyOn(mongoDBManagerInstance, 'connect')
				.mockResolvedValueOnce(client);

			let db = await mongoDBManager.initMongoDBConnection();

			expect(connectSpy).toHaveBeenCalled();
		});
	});
});
