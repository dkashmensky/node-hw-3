const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('Users');
const router = express.Router();

// eslint-disable-next-line import/no-unresolved
const { secret } = require('config');

/**
 * @api {post} /login Login user
 * @apiName PostLogin
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiParam {String} username User login
 * @apiParam {String} password User password in plain text
 * @apiParamExample {json} Request-Example:
 * {
 *  "username": "johndoe",
 *  "password": "p@ssw0rd"
 * }
 *
 * @apiSuccess {String} jwt_token JWT token, used later to authenticate user, expires in 3 days
 * @apiSuccessExample {json} Success-Response
 * HTTP/1.1 200 OK
 * {
 *  "jwt_token": "token_string"
 * }
 *
 * @apiError UserNotFound Provided login or password are incorrect
 * @apiErrorExample {json} Login-Error:
 * HTTP/1.1 400 Bad Request
 * {
 *  "status": "UserNotFound"
 * }
 *
 * @apiError (Error 5xx) MongooseError DB queries error
 * @apiErrorExample {json} Mongoose-Error:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "MongooseError",
 *    "error": "Error text"
 *  }
 */

router.post('/login', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        status: 'MongooseError',
        error: err,
      });
      return;
    }

    const { username, password } = req.body;

    const [user] = users.filter(
      item =>
        item.username === username &&
        bcrypt.compareSync(password, item.password)
    );

    if (!user) {
      res.status(400).json({
        status: 'UserNotFound',
      });
      return;
    }

    const token = jwt.sign(user.toJSON(), secret, {
      expiresIn: 259200, // 3 days
    });
    res.json({
      jwt_token: token,
    });
    res.header();
  });
});

module.exports = router;
