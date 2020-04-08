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

/**
 * @api {put} /user/password Change user password
 * @apiName PutUserPassword
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
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

/**
 * @api {get} /user/profile Get user info
 * @apiName GetUserProfile
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
 *  }
 *
 * @apiSuccess {Number} id Unique user ID
 * @apiSuccess {String} fullname User fullname
 * @apiSuccess {String} email User email
 * @apiSuccess {string="driver","shipper"} type User account type
 * @apiSuccess {String} avatar User profile picture
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "id": 1,
 *    "fullname": "John Doe",
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

/**
 * @api {get} /user/all Request all users info
 * @apiName GetApiUserAll
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
 * @apiSuccess {String} users.email User email address
 * @apiSuccess {string="driver","shipper"} users.type User account type (driver or shipper)
 * @apiSuccess {String} users.avatar User profile photo in base64 format, could be empty string if no photo is present
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "users": [
 *      {
 *        "id": 1,
 *        "fullname": "John Doe",
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

/**
 * @api {delete} /user/delete Delete current user
 * @apiName DeleteUserDelete
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

/**
 * @api {put} /user/update Update user info
 * @apiName PutUserUpdate
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
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

/**
 * @api {put} /user/avatar Upload user profile pic
 * @apiName PutUserAvatar
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String} Authorization Authorization type and token, see example (JWT used)
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "JWT token_string"
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
