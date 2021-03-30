const chai = require('chai');
const expect = require('chai').expect;
const records = require('./data/testData').sampleBPFlatRecords
const processIntoChunks = require('../ChunkProcessor').processIntoChunks
const mapBPRecord = require('../BPProcessor').convertBPRecordToFlatJson

describe('Testing Chunk Processor', () => {

    var results = []
    it('should get 3 chunks last one with 1 record', () => {

        results = processIntoChunks(2, '11111', '9999', ["1","2","3","4","5"], (record) => { return record })
        expect(results.length).to.equal(3);
        expect(results[0].records.length).to.equal(2);
        expect(results[1].records.length).to.equal(2);
        expect(results[2].records.length).to.equal(1);
    });

});
