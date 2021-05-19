/*
 SPDX-License-Identifier: Apache-2.0
*/
const chai = require('chai');
const expect = chai.expect;
const statAgent = require('../server/controllers/stat-agent');
const insuranceData = require('./data/insurance-request-data');
const insuranceDataHandler = require('../server/middlewares/insurance-data-handler');
const transactionFactory = require('../server/helpers/transaction-factory');
const { mockRequest, mockResponse } = require('mock-req-res');
const sinon = require("sinon");


class Transaction {
  submitTransaction(methodName, params) {
    params = JSON.parse(params);
    return;
  }
}

describe('Success for document save in off-chain and blockchain', () => {
  before(() => {
    sinon.stub(insuranceDataHandler, 'saveInsuranceData').resolves({ data: 'Document saved successfully' });
    sinon.stub(transactionFactory, 'getCarrierChannelTransaction').returns(new Transaction());

  });
  
  after(() => {
    sinon.restore();
  });

  it('Should send successful response', () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = insuranceData;
    statAgent.insuranceData(req, res).then(function (result) {
      expect(res.statusCode).to.equal(200);
      expect(res.json.lastCall.lastArg.success).to.equal(true);
      expect(res.json.lastCall.lastArg.message).to.equal('OK');
    });

  });
})

describe('Error out if off-chain save fails', () => {
  before(() => {
    sinon.stub(insuranceDataHandler, 'saveInsuranceData').rejects({ data: 'Some error' });
  });

  after(() => {
    sinon.restore();
  });

  it('Should send failed response', () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = insuranceData;
    statAgent.insuranceData(req, res).then(function (result) {
      expect(res.statusCode).to.equal(500);
      expect(res.json.lastCall.lastArg.success).to.equal(false);
      expect(res.json.lastCall.lastArg.message).to.equal('FAILED: error storing insurance data in off-chain database.');
    });

  });
})


describe('Error out for Document update conflict', () => {
  before(() => {
    sinon.stub(insuranceDataHandler, 'saveInsuranceData').rejects({ data: 'Document update conflict' });
    sinon.stub(insuranceDataHandler, 'getInsuranceData').resolves({ data: '1000' });
  })

  after(() => {
    sinon.restore();
  });

  it('Should send failed response', () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = insuranceData;
    statAgent.insuranceData(req, res).then(function (result) {
      expect(res.statusCode).to.equal(500);
      expect(res.json.lastCall.lastArg.success).to.equal(false);
      expect(res.json.lastCall.lastArg.message).to.equal('FAILED: error storing insurance data in off-chain database.');
    });

  });
})






