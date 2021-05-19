/**
 SPDX-License-Identifier: Apache-2.0
*/
const cred = require("../cloudant/config/local-cloudant-config.json")
const cloudant = require('@cloudant/cloudant')(cred);
const const_DB = require('../cloudant/config/constant');
const insuranceDB = cloudant.db.use(const_DB.DB_NAME);
const sizeof = require('object-sizeof');
const records = require('../cloudant/config/records.json');
console.log(records);
records.records.forEach(record => {
    insuranceDB.get(record, { revs: true }, function(err, data) {
        if (data) {
            console.log("The record with id " + record + " has been updated " + data["_revisions"].start + " times");
            console.log("********************************************************************");
        } else {
            console.log("Records not availabe for id " + record)
            console.log("********************************************************************");
        }
    });
});