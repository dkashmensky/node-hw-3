const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

/**
 * @api {post} /register Register new user
 * @apiName PostRegister
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiParam {String} username User login which will be used to log in
 * @apiParam {String} fullname User fullname
 * @apiParam {String} password User password in plain text, at least 8 symbols, one lowercase, one uppercase, one digit are mandatory
 * @apiParam {String="driver","shipper"} type User account type, two values only (driver or shipper)
 * @apiParam {String} email User email address
 * @apiParamExample {json} Request-Example:
 *  {
 *    "username": "johndoe",
 *    "fullname": "John Doe",
 *    "password": "p@ssw0rd",
 *    "type": "driver",
 *    "email": "example@mail.com"
 *  }
 *
 * @apiSuccess {String} status UserRegistered returned on success with ID attribute, see example
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "status": "UserRegistered ID:123"
 *  }
 *
 * @apiError ValidationError Received data is not valid
 * @apiErrorExample {json} Validation Error:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "ValidationError",
 *    "error": "\"email\" must be a valid email"
 *  }
 *
 * @apiError EmailExists Provided email already exists in database
 * @apiErrorExample {json} Email-Error:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "EmailExists"
 *  }
 *
 * @apiError UsernameExists Provided username already exists in database
 * @apiErrorExample {json} Username-Error:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "UsernameExists"
 *  }
 *
 * @apiError (Error 5xx) MongooseError DB queries error
 * @apiErrorExample {json} Mongoose-Error:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "MongooseError",
 *    "error": "Error text"
 *  }
 */

router.post('/register', (req, res) => {
  userController.create_user(req, res);
});

module.exports = router;
