// SPDX-License-Identifier: Apache-2.0
const chai = require('chai');
const expect = chai.expect;
const sinon = require("sinon");
const eventFunction = require("../server/controllers/event-function").eventFunction;
const dataProcessor = require("../server/controllers/data-processor-mongo");
const processor = require("../server/controllers/processor");
const config = require('config');
const exPattern = require("../test/data/extractionPatternPayload.json");
const consentPayload = require("../test/data/processConsentPayload.json");
const listConsent = require("../test/data/listConsentByDataCallPayload.json");
const mongoRecords = require("../test/data/insuranceRecords_hartFort.json");
const extractionPatternPayload = require("../test/data/checkExtractionPatternPayload.json");
let exPayload = JSON.stringify(exPattern);
let consentPL = JSON.stringify(consentPayload);
class Transaction {
    transientTransaction(methodName, params) {
        return "strategy success for mock transaction 81965e068cfe6d78e2bd078b2f0b49f428abeb4e20dede5381f71828b25214dd"
    }
    executeTransaction(methodName, params) {
        
        if (methodName == 'ListConsentsByDataCall') {
            return JSON.stringify(listConsent);
        } else if (methodName == 'CheckInsuranceDataExists') {
            return "false";
        } else if (methodName == 'CheckExtractionPatternIsSet') {
            return JSON.stringify(extractionPatternPayload);
        }
    }
    initWallet() {
        return true;
    }
    init() {
        
    }
}

describe('Data call mongo processor extraction pattern event function test', () => {
    const process1 = new processor();
    const startProcessor1 = new dataProcessor(exPattern.dataCallId, exPattern.dataCallVersion, consentPayload.carrierID, exPattern.extractionPattern, new Transaction, 'view');
    before(() => {
        sinon.stub(startProcessor1, 'getInsuranceData').resolves(mongoRecords);
        sinon.stub(process1, 'getProcessorInstance').returns(startProcessor1);
        sinon.stub(eventFunction, 'getChannelInstance').returns(new Transaction);

    })
    after(() => {
        sinon.restore();
    })
    it('it should save the processed document for extration pattern set', () => {
        eventFunction.ExtractionPatternSpecified(exPayload, "50001", new Transaction).then(function (result) {
            expect(result).to.equal(true);
        });
    });

});

describe('Data call mongo processor event function test', () => {
    const transaction = new Transaction();
    const process1 = new processor();
    const startProcessor2 = new dataProcessor(consentPayload.datacallID, consentPayload.dataCallVersion, consentPayload.carrierID, exPattern.extractionPattern, new Transaction, 'view');
    before(() => {
        sinon.stub(startProcessor2, 'getInsuranceData').resolves(mongoRecords);
        sinon.stub(eventFunction, 'getChannelInstance').returns(new Transaction);
        sinon.stub(process1, 'getProcessorInstance').returns(startProcessor2);
    })
    after(() => {
        sinon.restore();
    })
    it('it should save the processed document for process consent', () => {
        eventFunction.ConsentedEvent(consentPL, "50001", new Transaction).then(function (result) {
            expect(result).to.equal(true);
        });
    });
});