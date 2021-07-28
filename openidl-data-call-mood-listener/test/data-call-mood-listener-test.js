const chai = require('chai');
const sinon = require("sinon");
const expect = chai.expect;
const openidlCommonLib = require('@openidl-org/openidl-common-lib');
const Transaction = openidlCommonLib.Transaction;
const eventFunction = require('../server/event/event-handler');
const payloadConscent = require('./data/payload-conscent.json');
const payloadLike = require('./data/payload-like.json');



describe('Test Mood listenerlistener', () => {

  before(() => {
    sinon.stub(Transaction.prototype, 'submitTransaction').returns(true);
  })
  after(() => {
    sinon.restore();
  })

  it('Should conscent successfully for good conscent payload', async () => {
    let result = await eventFunction.eventFunction.ConsentedEvent(JSON.stringify(payloadConscent), 10);
    expect(result).to.equal(true);
  });

  it('Should Toggle like successfully for good like payload', async () => {
    let result = await eventFunction.eventFunction.ToggleLikeEvent(JSON.stringify(payloadLike), 10);
    expect(result).to.equal(true);
  });

  it('Should fail to conscent for payload without data call id', async () => {
    delete payloadConscent.datacallID;
    let result = await eventFunction.eventFunction.ConsentedEvent(JSON.stringify(payloadConscent), 10);
    expect(result).to.equal(false);
  });

  it('Should fail to Toggle like for payload without data call id', async () => {
    delete payloadLike.datacallID;
    let result = await eventFunction.eventFunction.ToggleLikeEvent(JSON.stringify(payloadLike), 10);
    expect(result).to.equal(false);
  });

  it('Should fail to conscent for payload without data call version', async () => {
    payloadLike.datacallID = "cd6767e0_457f_11e9_ad1e_c99860a32ee7";
    delete payloadConscent.dataCallVersion;
    let result = await eventFunction.eventFunction.ConsentedEvent(JSON.stringify(payloadConscent), 10);
    expect(result).to.equal(false);
  });

  it('Should fail to Toggle like for payload without data call version', async () => {
    payloadLike.datacallID = "cd6767e0_457f_11e9_ad1e_c99860a32ee7";
    delete payloadLike.dataCallVersion;
    let result = await eventFunction.eventFunction.ToggleLikeEvent(JSON.stringify(payloadLike), 10);
    expect(result).to.equal(false);
  });

})

