const S3BucketManager = require('../../server/middleware/s3bucket-manager');
const AWS = require('aws-sdk');

AWS.config.update = jest.fn();

describe('S3BucketManager', () => {
	it('should saveTransactionalData', async () => {
		AWS.S3 = jest.fn().mockImplementation(() => {
			return {
				putObject(params, cb) {
					result = cb(null, {
						data: 'testData'
					});
				}
			};
		});
		const s3bucketManager = new S3BucketManager();
		const actual = await s3bucketManager.saveTransactionalData({
			_id: 'test',
			records: []
		});
		expect(actual).toEqual('Records Inserted Successfully');
	});

	it('should throw error on saveTransactionalData', async () => {
		AWS.S3 = jest.fn().mockImplementation(() => {
			return {
				putObject(params, cb) {
					result = cb('error');
				}
			};
		});
		const s3bucketManager = new S3BucketManager();
		const actual = await s3bucketManager
			.saveTransactionalData({ _id: 'test', records: [] })
			.catch((e) => {
				expect(e).toEqual('error');
			});
	});

	it('should getTransactionalData', async () => {
		AWS.S3 = jest.fn().mockImplementation(() => {
			return {
				getObject(params, cb) {
					result = cb(null, {
						data: 'testData'
					});
				}
			};
		});

		const s3bucketManager = new S3BucketManager();
		const actual = await s3bucketManager
			.getTransactionalData('test')
			.catch((e) => {
				expect(e).toEqual('error');
			});
	});

	it('should getTransactionalData', async () => {
		AWS.S3 = jest.fn().mockImplementation(() => {
			return {
				getObject(params, cb) {
					result = cb(null);
				}
			};
		});

		const s3bucketManager = new S3BucketManager();
		const actual = await s3bucketManager
			.getTransactionalData('test')
			.catch((e) => {
				expect(e).toEqual('error');
			});
	});
});

it('should getTransactionalData', async () => {
	AWS.S3 = jest.fn().mockImplementation(() => {
		return {
			getObject(params, cb) {
				result = cb('error');
			}
		};
	});

	const s3bucketManager = new S3BucketManager();
	const actual = await s3bucketManager
		.getTransactionalData('test')
		.catch((e) => {
			expect(e).toEqual('error');
		});
});
