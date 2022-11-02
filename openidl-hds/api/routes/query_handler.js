var express = require('express');
var { ConfigurationManager } = require('../../utils_js/configuration');
var {ConfigurationManager: LocalConfig} = require('..//utils/config');
var { DBHelper } = require('../../utils_js/db');
var router = express.Router();
var helper = new DBHelper({credentials: ConfigurationManager.mySQLDBCredentials});


/* GET users listing. */
router.get('/execute', async function(req, res, next) {
    const authorizedKey = LocalConfig.queryAuthKey;
    const requestAuthKey = req.get('auth_key') || req.query['auth_key'];
    const query = req.query["query"];
    if(!requestAuthKey || !authorizedKey || authorizedKey !== requestAuthKey){
        return res.status(401).json({
            ok: false,
            error: "ERROR: Invalid key provided."
        })
    }
    if(!query){
        return res.status(400).json({
            ok: false,
            error: "Invalid query parameter provided: you need to provide a valid MySQL query on the 'query' query parameter."
        });
    }
    const result = await helper.runQuery(query);
    console.log({result});
    return res.json({
        ok: true,
        result: result
    })
});

module.exports = router;
