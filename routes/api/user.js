const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/user/password', (req, res) => {
  userController.change_user_password(req, res);
});

router.get('/user/profile', (req, res) => {
  userController.get_user_info(req, res);
});

router.get('/user/all', (req, res) => {
  userController.get_users(req, res);
});

module.exports = router;
