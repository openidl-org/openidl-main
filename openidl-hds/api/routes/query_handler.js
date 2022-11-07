var express = require('express');
var { ConfigurationManager } = require('../../utils_js/configuration');
var {ConfigurationManager: LocalConfig} = require('../utils/config');
var { DBHelper } = require('../../utils_js/db');
const { authMiddleware } = require('../middlewares/auth');
var router = express.Router();
var helper = new DBHelper({credentials: ConfigurationManager.mySQLDBCredentials});


/* post queryString */
router.post('/execute', authMiddleware, async function(req, res, next) {
    const query = req.body["query"];
    if(!query){
        return res.status(400).json({
            ok: false,
            error: "Invalid query parameter provided: you need to provide a valid Postgres query on the 'query' query parameter."
        });
    }
    const result = await helper.runQuery(query);

    return res.json({
        ok: true,
        result: result
    })
});

module.exports = router;
