//
// SPDX-License-Identifier: Apache-2.0
//
"use strict";
const ExtractionPatternManager = require('../service/extraction-pattern-manager')
const chai = require('chai');
const expect = chai.expect;

describe('Extracton Pattern Manager Tests', function() {

  var manager
  beforeEach(() => {
    manager = new ExtractionPatternManager()
  });
  it('Create Extraction Pattern With Formulas', function() {
    let map = function map() {
      emit( this.SequenceNum, {"sicCode": this.agrmnt.bsnssActvty[0].indstryCd})
    }
    let reduce = function reduce(key,value) {
      return value;
    }
    var ep = manager.createExtractionPattern("ep01","extracton pattern 01", "described", map, reduce, "0.1", "2022-01-30T18:30:00Z", "2023-01-30T18:30:00Z", "jack.bubba@bubba.com")
    console.log(ep)
  });
});