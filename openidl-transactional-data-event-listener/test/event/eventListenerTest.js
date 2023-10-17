const assert = require('assert');
const sinon = require('sinon');
const { targetDB } = require('config');
const { initEventListener } = require('../../server/event/eventListener');
const {EventListener} = require("@openidl-org/openidl-common-lib");
const networkConfig = require('../../server/config/connection-profile.json');

describe('initEventListener', () => {
    let processInvokeStub;
    let initStub;

    beforeEach(() => {
        processInvokeStub = sinon.stub().resolves();
        initStub = sinon.stub().returns({ processInvoke: processInvokeStub });
        sinon.stub(console, 'debug');
        sinon.stub(console, 'error');
        sinon.stub(console, 'log');
        sinon.stub(console, 'warn');
        sinon.stub(EventListener, 'init').returns({ processInvoke: processInvokeStub });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call EventListener.init and EventListener.processInvoke with correct arguments', async () => {
        await initEventListener();
        assert.ok(EventListener.init.calledWith(networkConfig, sinon.match.any, sinon.match.any, targetDB));
        assert.ok(processInvokeStub.calledOnce);
    });

    it('should catch and log errors thrown by EventListener.init', async () => {
        const error = new Error('Some error');
        EventListener.init.rejects(error);
        await initEventListener();
        assert.ok(console.error.calledWith('eventHandler init error' + error));
    });
});
