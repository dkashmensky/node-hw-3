const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.put('/user/password', (req, res) => {
  userController.change_user_password(req, res);
});

router.get('/user/profile', (req, res) => {
  userController.get_user_info(req, res);
});

router.get('/user/all', (req, res) => {
  userController.get_users(req, res);
});

router.delete('/user/delete', (req, res) => {
  userController.delete_user(req, res);
});

router.put('/user/update', (req, res) => {
  userController.update_user_info(req, res);
});

router.put('/user/avatar', (req, res) => {
  userController.upload_avatar(req, res);
});

module.exports = router;
