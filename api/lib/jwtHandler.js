const jwt = require('jsonwebtoken');

/**
 * Returns the JWT_SECRET from the process enviroment object
 * @returns {String}
 */
module.exports.getTokenSecret = () => process.env.JWT_SECRET;

/**
 * Returns a jwt-signed token
 * @param {*} user
 */
module.exports.issueNewToken = user => jwt.sign(user, this.getTokenSecret(), { expiresIn: '1y' }); // HMMMM!!

module.exports.getTokenUser = function(headers) {
    if (!headers || !headers.authorization) return null;
    var authorization = headers.authorization;
    var part = authorization.split(' ');
    if (part.length === 2) 
      try {
        return jwt.verify(part[1], process.env.JWT_SECRET)
      } catch(err) {}

    return null;
  };
