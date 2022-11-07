var {ConfigurationManager: LocalConfig} = require('../utils/config');

module.exports.authMiddleware = async function(req, res, next) {
    const authorizedKey = LocalConfig.queryAuthKey;
    const requestAuthKey = req.get('auth_key') || req.query['auth_key'];
    if(!requestAuthKey || !authorizedKey || authorizedKey !== requestAuthKey){
        return res.status(401).json({
            ok: false,
            error: "ERROR: Invalid key provided."
        })
    }
    return next();
}