//
// SPDX-License-Identifier: Apache-2.0
//
"use strict";
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs')
const processTextRecords = require('openidl-mapper/FileProcessor').processTextRecords

describe('Ready: Test HDS Generation', function() {

    var contents
    before(() => {
        contents = fs.readFileSync('test/data/BPPremData1000.txt', 'utf8');
    })

    it('Data Loads', function() {
      return expect(contents).to.not.be.null
    });
    it('Get Valid Transformed Data', function() {
      var records = processTextRecords(contents)
      expect(records.length).to.equal(10)
    })
 
});