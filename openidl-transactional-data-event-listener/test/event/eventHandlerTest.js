const assert = require('assert');
const sinon = require('sinon');
const { eventFunction } = require('../../server/event/eventHandler');

describe('eventFunction', () => {
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return true when called', async () => {
        const payload = {
            dataCallId: 'abc',
            dataCallVersion: '1.0.0',
            carrierId: 'def',
            channelName: 'ghi',
            pageNumber: 1,
            sequenceNum: 1
        };
        const blockNumber = 12345;

        const executeTransactionStub = sandbox.stub().returns(Buffer.from(JSON.stringify({ records: [], recordsNum: 0 })));
        const getInstanceStub = sandbox.stub().resolves({
            getTransactionalData: sandbox.stub().resolves('abc123'),
            saveTransactionalData: sandbox.stub().resolves()
        });
        const ChannelTransactionMap = new Map();
        ChannelTransactionMap.set('ghi', {
            executeTransaction: executeTransactionStub
        });
        const InstanceFactory = {
            getInstance: getInstanceStub
        };

        const result = await eventFunction.TransactionalDataAvailable(JSON.stringify(payload), blockNumber, ChannelTransactionMap, InstanceFactory);

        assert.strictEqual(result, true);
        assert(executeTransactionStub.calledOnceWithExactly('GetInsuranceData', JSON.stringify(payload)));
        assert(getInstanceStub.calledOnceWithExactly('insuranceDataStorageEnv'));
    });
});
