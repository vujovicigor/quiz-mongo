/**
 * Merge 
 * req.query (?x=2&y=3),
 * req.body (POST) and 
 * req.params (path like /song/:songid)
 * in one obj: req.vars
**/
module.exports = async function groupReqVars(req, res, next) {
    if (req) req.vars = {...req.query, ...req.body, ...req.params}
    return next()
}