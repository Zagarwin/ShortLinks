const jwt = require('jsonwebtoken');

exports.retrieveToken = function(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, userId) => {
          if (err) {
          req.userId = null;
          }
          else {
            req.userId = userId;
          }
          next();
      });
    }
    else {
      req.userId = null;
      next();
    }
  }
  
exports.ensureToken = function(req, res, next) {
    if (req.userId) {
      next();
    }
    else {
      res.status(401); // TODO : to improve
    }
}