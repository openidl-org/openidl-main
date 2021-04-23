/**
 SPDX-License-Identifier: Apache-2.0
*/
const chai = require('chai');
const expect = require('chai').expect;
const dataFolder = 'test/data/dataLoaderTest/'
const dataLoader = require('../data-loader')

var fs = require('fs');

describe('Testing The Data Loader', () => {

    it('number of records and total premiums should match', async function () {

        let result = await dataLoader.loadData(dataFolder, 'data-loader-test', 'hds-data')
        expect(result['BPLossData.txt']['49']['AL']['2'].recordCount).to.be.equal(1)
        expect(result['BPLossData.txt']['49']['AL']['2'].amount).to.be.equal(95.67)
        expect(result['BPLossData.txt']['49']['AK']['3'].recordCount).to.be.equal(1)
        expect(result['BPLossData.txt']['49']['AK']['3'].amount).to.be.equal(13.45)
        expect(result['BPLossData.txt']['49']['FL']['6'].recordCount).to.be.equal(1)
        expect(result['BPLossData.txt']['49']['FL']['6'].amount).to.be.equal(36.78)
        expect(result['BPLossData.txt']['49']['DC']['7'].recordCount).to.be.equal(1)
        expect(result['BPLossData.txt']['49']['DC']['7'].amount).to.be.equal(43.21)
        expect(result['BPLossData.txt']['49']['CT']['2'].recordCount).to.be.equal(1)
        expect(result['BPLossData.txt']['49']['CT']['2'].amount).to.be.equal(78.43)

        expect(result['BPPremData.txt']['49']['AL']['1'].recordCount).to.be.equal(1)
        expect(result['BPPremData.txt']['49']['AL']['1'].amount).to.be.equal(95.67)
        expect(result['BPPremData.txt']['49']['AK']['8'].recordCount).to.be.equal(1)
        expect(result['BPPremData.txt']['49']['AK']['8'].amount).to.be.equal(13.45)
        expect(result['BPPremData.txt']['49']['FL']['9'].recordCount).to.be.equal(1)
        expect(result['BPPremData.txt']['49']['FL']['9'].amount).to.be.equal(36.78)
        expect(result['BPPremData.txt']['49']['DC']['1'].recordCount).to.be.equal(1)
        expect(result['BPPremData.txt']['49']['DC']['1'].amount).to.be.equal(43.21)
        expect(result['BPPremData.txt']['49']['CT']['8'].recordCount).to.be.equal(1)
        expect(result['BPPremData.txt']['49']['CT']['8'].amount).to.be.equal(78.43)
    })

});

