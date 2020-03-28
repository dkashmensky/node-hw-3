/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-unresolved
const { secret } = require('../../config/auth');

module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    const jwtToken = req.headers['authorization'].split(' ')[1];

    const user = jwt.verify(jwtToken, secret);
    req.user = user;

    next();
  } else {
    res.status(400).json({
      status: 'No authorization headers,',
    });
  }
};
