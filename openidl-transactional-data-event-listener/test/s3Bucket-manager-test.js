/**
 SPDX-License-Identifier: Apache-2.0
*/
'use strict'
const chai = require('chai');
const expect = chai.expect;
const S3BucketManager = require('../server/middleware/s3bucket-manager');
const cloudantData = require('./test-data/cloudant-data.json');
const sinon = require("sinon");
const s3BucketManager = new S3BucketManager();


describe('Test for saveTransactionalData to off-chain-db on Success', () => {
    before(() => {
        sinon.stub(s3BucketManager, 'saveTransactionalData').resolves({
            data: 'Document saved successfully'
        });
        sinon.stub(s3BucketManager, 'getTransactionalData').resolves({
            _rev: 'rev_test_123'
        });
    });

    after(() => {
        sinon.restore();
    });

    it('Should return seccess meassge and code', () => {
        s3BucketManager.saveTransactionalData(cloudantData).then(function (result) {
            expect(result.data).to.equal('Document saved successfully');
        })
    });
    it('Should return rev-id', () => {
        s3BucketManager.getTransactionalData(cloudantData._id).then(function (result) {
            expect(result._rev).to.equal("rev_test_123")
        })
    });

});

describe('Test for saveTransactionalData to off-chain-db on Error', () => {
    before(() => {
        sinon.stub(s3BucketManager, 'saveTransactionalData').rejects({
            msg: 'Error inserting records'
        });
    });

    after(() => {
        sinon.restore();
    });

    it('Should return error message', () => {

        s3BucketManager.saveTransactionalData(cloudantData).then(function (result) { }).catch((err) => {
            expect(err.msg).to.equal('Error inserting records');
        });
    });

});