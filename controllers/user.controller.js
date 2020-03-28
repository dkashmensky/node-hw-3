const mongoose = require('mongoose');
const utils = require('../utils/utils');

const User = mongoose.model('Users');

module.exports.get_users = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    res.json(users);
  });
};

module.exports.create_user = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    const { username, fullname, email, password, type } = req.body;

    const emailExists = utils.checkEmail(users, email);
    if (emailExists) {
      res.status(400).json({
        status: 'Email already exists',
      });
      return;
    }

    const usernameExists = utils.checkUsername(users, username);
    if (usernameExists) {
      res.status(400).json({
        status: 'Username already exists',
      });
      return;
    }

    const id = utils.getNewId(users);

    const newUser = new User({
      id,
      username,
      fullname,
      password,
      email,
      type,
    });

    newUser.save((error, user) => {
      if (error) {
        res.status(500).json({
          status: error,
        });
        return;
      }

      res.status(200).json(user);
    });
  });
};

module.exports.get_user_info = (req, res) => {
  User.findOne({ id: req.user.id }, (err, user) => {
    if (err) {
      res.status(500).json({
        status: err,
      });
      return;
    }

    const { id, fullname, email, type } = user;

    res.json({
      id,
      fullname,
      email,
      type,
    });
  });
};

module.exports.change_user_password = (req, res) => {
  User.findOneAndUpdate(
    { id: req.user.id },
    { password: req.body.password },
    (err, user) => {
      if (err) {
        res.status(500).json({
          status: err,
        });
        return;
      }

      res.status(200).json({
        status: 'Password changed successfully',
      });
    }
  );
};
