const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('Users');
const router = express.Router();

// eslint-disable-next-line import/no-unresolved
const { secret } = require('config');

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
