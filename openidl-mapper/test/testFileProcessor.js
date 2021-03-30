const chai = require('chai');
const expect = require('chai').expect;
const dataFileName = 'test/data/BPPremData.txt'
const processIntoChunks = require('../ChunkProcessor').processIntoChunks
const processTextRecords = require('../FileProcessor').processTextRecords
var fs = require('fs');

describe('Testing Flat File Processor', () => {

    it('should get 1 chunk with 5 record', () => {

        var contents = fs.readFileSync(dataFileName, 'utf8');
        var results = processTextRecords(contents)
        expect(results.length).to.equal(1);
        expect(results[0].records.length).to.equal(5);
    });

    it ('should have 10 chunks, that should all have 100 records', () => {

        var contents = fs.readFileSync('test/data/BPPremData1000.txt', 'utf8');
        var results = processTextRecords(contents)
        expect(results.length).to.equal(10);
        expect(results[0].records.length).to.equal(100);
        expect(results[9].records.length).to.equal(100);
    })

});

