/* eslint-disable camelcase */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('@hapi/joi');
const validateSchemas = require('../utils/validator');
const utils = require('../utils/utils');

const saltRounds = 10;
const User = mongoose.model('Users');
const Truck = mongoose.model('Trucks');
const Load = mongoose.model('Loads');

module.exports.get_users = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        status: 'MongooseError',
        error: err,
      });
      return;
    }

    const usersArray = users.map(item => {
      let avatar;
      try {
        avatar = `${item.avatar_info},${item.avatar.toString('base64')}`;
      } catch (e) {
        avatar = '';
      }

      return {
        id: item.id,
        fullname: item.fullname,
        email: item.email,
        type: item.type,
        avatar,
      };
    });

    res.status(200).json({ users: usersArray });
  });
};

module.exports.create_user = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json({
        status: 'MongooseError',
        error: err,
      });
      return;
    }

    const validation = validateSchemas.create_user_schema.validate(req.body);
    if (validation.error) {
      res.status(400).json({
        status: 'ValidationError',
        error: validation.error.details[0].message,
      });
      return;
    }

    const { username, fullname, email, password, type } = req.body;

    const emailExists = utils.checkEmail(users, email);
    if (emailExists) {
      res.status(400).json({
        status: 'EmailExists',
      });
      return;
    }

    const usernameExists = utils.checkUsername(users, username);
    if (usernameExists) {
      res.status(400).json({
        status: 'UsernameExists',
      });
      return;
    }

    const id = utils.getNewId(users);

    const newUser = new User({
      id,
      username,
      fullname,
      password: bcrypt.hashSync(password, saltRounds),
      email,
      type,
    });

    newUser.save(async (error, user) => {
      if (error) {
        res.status(500).json({
          status: 'MongooseError',
          error,
        });
        return;
      }

      res.status(200).json({
        status: `UserRegistered ID:${id}`,
      });

      utils.send_mail('register', user, user.email);
    });
  });
};

module.exports.update_user_info = (req, res) => {
  const validation = validateSchemas.update_user_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: 'ValidationError',
      error: validation.error.details[0].message,
    });
    return;
  }

  if (req.user.type === 'driver') {
    Load.findOne(
      { assigned_to: req.user.id, state: { $ne: 'shipped' } },
      (err, load) => {
        if (err) {
          res.status(500).json({
            status: 'MongooseError',
            error: err,
          });
          return;
        }

        if (load) {
          res.status(400).json({
            status: 'Unable to change info while user is on load',
          });
          return;
        }

        const { fullname, email } = req.body;

        User.findOneAndUpdate(
          { id: req.user.id },
          { fullname, email },
          (error, user) => {
            if (error) {
              res.status(500).json({
                status: 'MongooseError',
                error,
              });
              return;
            }

            res.status(200).json({
              status: 'User info updated',
            });
          }
        );
      }
    );
    return;
  }

  const { fullname, email } = req.body;

  User.findOneAndUpdate(
    { id: req.user.id },
    { fullname, email },
    (error, user) => {
      if (error) {
        res.status(500).json({
          status: 'MongooseError',
          error,
        });
        return;
      }

      res.status(200).json({
        status: 'User info updated',
      });
    }
  );
};

module.exports.get_user_info = (req, res) => {
  User.findOne({ id: req.user.id }, (err, user) => {
    if (err) {
      res.status(500).json({
        status: 'MongooseError',
        error: err,
      });
      return;
    }

    const { id, fullname, email, type, avatar, avatar_info } = user;

    let profilePhoto;
    try {
      profilePhoto = `${avatar_info},${avatar.toString('base64')}`;
    } catch (e) {
      profilePhoto = '';
    }

    res.json({
      id,
      fullname,
      email,
      type,
      avatar: profilePhoto,
    });
  });
};

module.exports.change_user_password = (req, res) => {
  const validation = validateSchemas.change_pass_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: 'ValidationError',
      error: validation.error.details[0].message,
    });
    return;
  }

  User.findOneAndUpdate(
    { id: req.user.id },
    { password: bcrypt.hashSync(req.body.password, saltRounds) },
    (err, user) => {
      if (err) {
        res.status(500).json({
          status: 'MongooseError',
          error: err,
        });
        return;
      }

      res.status(200).json({
        status: 'PasswordChanged',
      });

      utils.send_mail('password_change', user, user.email);
    }
  );
};

module.exports.delete_user = (req, res) => {
  if (req.user.type === 'driver') {
    Truck.findOne({ assigned_to: req.user.id }, (err, truck) => {
      if (err) {
        res.status(500).json({
          status: 'MongooseError',
          error: err,
        });
        return;
      }

      if (truck) {
        res.status(400).json({
          status: 'TruckAssigned',
        });
        return;
      }

      User.findOneAndDelete({ id: req.user.id }, async (error, user) => {
        if (error) {
          res.status(500).json({
            status: 'MongooseError',
            error,
          });
          return;
        }

        if (!user) {
          res.status(500).json({
            status: 'UnableDeleteUser',
          });
          return;
        }

        await Truck.deleteMany({ created_by: user.id }, errorTruck => {
          if (errorTruck) {
            res.status(500).json({
              status: 'MongooseError',
              error: errorTruck,
            });
          }
        });

        res.status(200).json({
          status: 'UserDeleted',
        });
      });
    });
  } else {
    Load.findOne(
      {
        created_by: req.user.id,
        status: { $or: [{ $ne: 'new' }, { $ne: 'shipped' }] },
      },
      (err, load) => {
        if (err) {
          res.status(500).json({
            status: 'MongooseError',
            error: err,
          });
          return;
        }

        if (load) {
          res.status(400).json({
            status: 'LoadShipping',
          });
          return;
        }

        User.findOneAndDelete({ id: req.user.id }, async (error, user) => {
          if (error) {
            res.status(500).json({
              status: 'MongooseError',
              error,
            });
            return;
          }

          if (!user) {
            res.status(500).json({
              status: 'UnableDeleteUser',
            });
            return;
          }

          await Load.deleteMany({ created_by: user.id }, errorTruck => {
            if (errorTruck) {
              res.status(500).json({
                status: 'MongooseError',
                error: errorTruck,
              });
            }
          });

          res.status(200).json({
            status: 'UserDeleted',
          });
        });
      }
    );
  }
};

module.exports.upload_avatar = (req, res) => {
  const validation = validateSchemas.upload_avatar_schema.validate(req.body);
  if (validation.error) {
    res.status(400).json({
      status: 'ValidationError',
      error: validation.error.details[0].message,
    });
    return;
  }

  let userAvatar;
  let avatarInfo;
  try {
    const splitFileString = req.body.file.split(',');
    // eslint-disable-next-line prefer-destructuring
    avatarInfo = splitFileString[0];
    userAvatar = Buffer.from(splitFileString[1], 'base64');
  } catch (e) {
    res.status(500).json({
      status: 'UnexpectedError',
      error: e,
    });
    return;
  }

  User.findOneAndUpdate(
    { id: req.user.id },
    { avatar: userAvatar, avatar_info: avatarInfo },
    (err, user) => {
      if (err) {
        res.status(500).json({
          status: 'MongooseError',
          error: err,
        });
        return;
      }

      res.status(200).json({
        status: 'AvatarUploaded',
      });
    }
  );
};
