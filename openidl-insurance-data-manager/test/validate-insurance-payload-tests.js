/*
 SPDX-License-Identifier: Apache-2.0
*/
const chai = require('chai');
const expect = require('chai').expect;
const util = require('../server/helpers/util');
const insuranceDataNoBatchId = require('./data/insurance-request-data-nobatchid');
const insuranceDataNoCarrierId = require('./data/insurance-request-data-nocarrierid');
const insuranceDataNoRecords = require('./data/insurance-request-data-norecords');
const insuranceData = require('./data/insurance-request-data');

    it('Should Reject Insurance Data without BatchId', async() => {
        let res = util.isValidInsuranceDataPayload(insuranceDataNoBatchId);
        expect(res.statusCode).to.equal(500);
        expect(res.success).to.equal(false);
        expect(res.message).to.equal('FAILED: batchId is missing in the Request payload');
    });    
     
    it('Should Reject Insurance Data without CarrierId', async() => {
        let res = util.isValidInsuranceDataPayload(insuranceDataNoCarrierId);
        expect(res.statusCode).to.equal(500);
        expect(res.success).to.equal(false);
        expect(res.message).to.equal('FAILED: carrierId is missing in the Request payload');
    });    

    it('Should Reject Insurance Data without Records', async() => {
        let res = util.isValidInsuranceDataPayload(insuranceDataNoRecords);
        expect(res.statusCode).to.equal(500);
        expect(res.success).to.equal(false);
        expect(res.message).to.equal('FAILED: Records are missing in the Request payload');
                                      
    });    

    it('Should Accept Insurance Data that matches specifications', async() => {
        let res = util.isValidInsuranceDataPayload(insuranceData);
        expect(res).to.not.have.property('statusCode');
    });  