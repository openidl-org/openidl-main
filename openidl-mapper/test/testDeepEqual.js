/**
 SPDX-License-Identifier: Apache-2.0
*/
const chai = require('chai');
const expect = require('chai').expect;
const deepEqual = require('deep-equal')

describe('Testing Deep Equal', () => {
    it ('compare the not matching jsons', () => {
        var actual = {"name":"a","description":"B"}
        var expected = {"name":"a","description":"C"}
        expect(deepEqual(actual,expected)).to.be.false
    })

    it ('compare the matching jsons', () => {
        var actual = {"name":"a","description":"C", "child":{"name":"b","description":"c"}}
        var expected = {"name":"a","description":"C", "child":{"description":"c","name":"b"}}
        expect(deepEqual(actual,expected)).to.be.true
    })

});