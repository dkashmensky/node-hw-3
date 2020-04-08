const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

/**
 * @api {put} /users/password Change user password
 * @apiName PutUsersPassword
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Auth-Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiHeader {String} Content-type Payload content type
 * @apiHeaderExample {json} Content-Header-Example:
 *  {
 *    "Content-type": "application/json"
 *  }
 *
 * @apiParam {String} password New user password in plain text, at least 8 symbols, one lowercase, one uppercase, one digit are mandatory
 * @apiParamExample {json} Request-Example:
 *  {
 *    "password": "MyNewPassword"
 *  }
 *
 * @apiSuccess {String} status PasswordChanged success status returned
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "status": "PasswordChanged"
 *  }
 *
 * @apiError ValidationError Received data is not valid
 * @apiErrorExample {json} Validation-Error:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "ValidationError",
 *    "error": "\"password\" with value \"value\" fails to match the required pattern: /^[0-9a-zA-Z]{8,}$/"
 *  }
 *
 * @apiError (Error 5xx) MongooseError DB queries error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "MongooseError",
 *    "error": "Error text"
 *  }
 */
router.put('/users/password', (req, res) => {
  userController.change_user_password(req, res);
});

/**
 * @api {get} /users Get user info
 * @apiName GetUsers
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiSuccess {String} id Unique user ID
 * @apiSuccess {String} [fullname] User fullname
 * @apiSuccess {String} username User login
 * @apiSuccess {String} [email] User email
 * @apiSuccess {string="driver","shipper"} type User account type
 * @apiSuccess {String} avatar User profile picture
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "id": "5e8dc57afc8873f6021967fa",
 *    "fullname": "John Doe",
 *    "username": "johndoe",
 *    "email": "example@mail.com",
 *    "type": "driver",
 *    "avatar": "data:image/png;base64,long-string"
 *  }
 *
 * @apiError (Error 5xx) MongooseError DB queries error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "MongooseError",
 *    "error": "Error text"
 *  }
 */
router.get('/users', (req, res) => {
  userController.get_user_info(req, res);
});

/**
 * @api {get} /users/all Request all users info
 * @apiName GetUsersAll
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiSuccess {Object[]} users Array of all users
 * @apiSuccess {Number} users.id Unique user ID
 * @apiSuccess {String} users.fullname User fullname
 * @apiSuccess {String} [users.username] User login
 * @apiSuccess {String} [users.email] User email address
 * @apiSuccess {string="driver","shipper"} users.type User account type (driver or shipper)
 * @apiSuccess {String} users.avatar User profile photo in base64 format, could be empty string if no photo is present
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "users": [
 *      {
 *        "id": "5e8dc57afc8873f6021967fa",
 *        "fullname": "John Doe",
 *        "username": "johndoe",
 *        "email": "example@mail.com",
 *        "type": "driver",
 *        "avatar": "data:image/png;base64,long-string"
 *      }
 *    ]
 *  }
 *
 * @apiError ValidationError Received data is not valid
 * @apiErrorExample {json} Validation-Error:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "ValidationError",
 *    "error": "\"email\" must be a valid email"
 *  }
 *
 * @apiError (Error 5xx) MongooseError DB queries error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "MongooseError",
 *    "error": "Error text"
 *  }
 */
router.get('/users/all', (req, res) => {
  userController.get_users(req, res);
});

/**
 * @api {delete} /users Delete current user
 * @apiName DeleteUsers
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiSuccess {String} status UserDeleted success status returned
 * @apiSuccessExample {json} Success-Response
 *  HTTP/1.1 200 OK
 *  {
 *    "status": "UserDeleted"
 *  }
 *
 * @apiError TruckAssigned Unable to delete user because of truck has been assigned to the user
 * @apiErrorExample {json} Truck-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "TruckAssigned"
 *  }
 *
 * @apiError LoadShipping Unable to delete user because of user-created load is in the process of shipping
 * @apiErrorExample {json} Truck-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "LoadShipping"
 *  }
 *
 * @apiError (Error 5xx) UnableDeleteUser Unable to delete user, mostly due to user was not found in database
 * @apiErrorExample {json} Unable-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "UnableDeleteUser"
 *  }
 *
 * @apiError (Error 5xx) MongooseError DB queries error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "MongooseError",
 *    "error": "Error text"
 *  }
 */
router.delete('/users', (req, res) => {
  userController.delete_user(req, res);
});

/**
 * @api {put} /users Update user info
 * @apiName PutUsers
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiHeader {String} Content-type Payload content type
 * @apiHeaderExample {json} Content-Header-Example:
 *  {
 *    "Content-type": "application/json"
 *  }
 *
 * @apiParam {String} fullname New user fullname
 * @apiParam {String} email New user email
 * @apiParamExample {json} Request-Example:
 *  {
 *    "fullname": "John Doe",
 *    "email": "example@mail.com"
 *  }
 *
 * @apiSuccess {String} status UserUpdated success status returned
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "status": "UserUpdated"
 *  }
 *
 * @apiError ValidationError Received data is not valid
 * @apiErrorExample {json} Validation-Error:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "ValidationError",
 *    "error": "\"email\" must be a valid email"
 *  }
 *
 * @apiError DriverOnLoad User could not change profile info while on load
 * @apiErrorExample {json} Driver-Error:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "DriverOnLoad"
 *  }
 *
 * @apiError (Error 5xx) MongooseError DB queries error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "MongooseError",
 *    "error": "Error text"
 *  }
 */
router.put('/users', (req, res) => {
  userController.update_user_info(req, res);
});

/**
 * @api {put} /users/avatar Upload user profile pic
 * @apiName PutUsersAvatar
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiHeader {String} Content-type Payload content type
 * @apiHeaderExample {json} Content-Header-Example:
 *  {
 *    "Content-type": "application/json"
 *  }
 *
 * @apiParam {String} file Image file binary data in base64 encoding
 * @apiParamExample {json} Request-Example:
 *  {
 *    "file": "data:image/png;base64,long-string"
 *  }
 *
 * @apiSuccess {String} status AvatarUploaded success status returned
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "status": "AvatarUploaded"
 *  }
 *
 * @apiError ValidationError Received data is not valid
 * @apiErrorExample {json} Validation-Error:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "status": "ValidationError",
 *    "error": "\"file\" must be a valid string"
 *  }
 *
 * @apiError (Error 5xx) UnexpectedError Unexpected server error while working with "file" attribute
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "UnexpectedError",
 *    "error": "Error text"
 *  }
 *
 * @apiError (Error 5xx) MongooseError DB queries error
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "status": "MongooseError",
 *    "error": "Error text"
 *  }
 */
router.put('/users/avatar', (req, res) => {
  userController.upload_avatar(req, res);
});

module.exports = router;
