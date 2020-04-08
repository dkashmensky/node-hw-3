const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.post('/register', (req, res) => {
  userController.create_user(req, res);
});

module.exports = router;
