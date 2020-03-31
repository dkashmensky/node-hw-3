/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-unresolved
const { secret } = require('../../config/auth');

module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    const jwtToken = req.headers['authorization'].split(' ')[1];

    let user;
    try {
      user = jwt.verify(jwtToken, secret);
    } catch (e) {
      res.status(401).json({
        status: 'Authorization token failed verification',
      });
      return;
    }
    req.user = user;

    next();
  } else {
    res.status(401).json({
      status: 'User is not authorized',
    });
  }
};
