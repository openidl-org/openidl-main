const InstanceFactory = require('../../server/middleware/instance-factory');
const S3BucketManager = require('../../server/middleware/s3bucket-manager');
const CloudantManager = require('../../server/middleware/cloudant-manager');
const MongoDBManager = require('../../server/middleware/mongodb-manager');
const mongoDBManagerInstance = require('mongodb').MongoClient;

describe('InstanceFactory', () => {
	it('InstanceFactory', async () => {
		const mongoconfig = {
			connection: {
				mongodb: {
					composed: [{}],
					certificate: {
						certificate_base64: 'test'
					}
				}
			}
		};
		JSON.parse = jest.fn().mockImplementationOnce(() => {
			return mongoconfig;
		});
		const client = {
			db: jest.fn().mockReturnThis(),
			collection: jest.fn()
		};
		const connectSpy = jest
			.spyOn(mongoDBManagerInstance, 'connect')
			.mockResolvedValueOnce(client);

		let factoryObject = new InstanceFactory();
		let bucket1 = await factoryObject.getInstance('s3Bucket');
		expect(bucket1).toBeInstanceOf(S3BucketManager);
		let bucket2 = await factoryObject.getInstance('cloudant');
		expect(bucket2).toBeInstanceOf(CloudantManager);
		let bucket3 = await factoryObject.getInstance('mongo');
		jest.spyOn(MongoDBManager, 'initMongoDBConnection').mockReturnValueOnce(
			{}
		);
		expect(bucket3).toBeInstanceOf(MongoDBManager);
	});
});
