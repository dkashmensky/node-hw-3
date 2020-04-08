define({ "api": [
  {
    "type": "delete",
    "url": "/users",
    "title": "Delete current user",
    "name": "DeleteUsers",
    "group": "User",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization type and token, see example (JWT used)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT token_string\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>UserDeleted success status returned</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"UserDeleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TruckAssigned",
            "description": "<p>Unable to delete user because of truck has been assigned to the user</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoadShipping",
            "description": "<p>Unable to delete user because of user-created load is in the process of shipping</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "UnableDeleteUser",
            "description": "<p>Unable to delete user, mostly due to user was not found in database</p>"
          },
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "MongooseError",
            "description": "<p>DB queries error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Truck-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"TruckAssigned\"\n}",
          "type": "json"
        },
        {
          "title": "Truck-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"LoadShipping\"\n}",
          "type": "json"
        },
        {
          "title": "Unable-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"UnableDeleteUser\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"MongooseError\",\n  \"error\": \"Error text\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get user info",
    "name": "GetUsers",
    "group": "User",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization type and token, see example (JWT used)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT token_string\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Unique user ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "fullname",
            "description": "<p>User fullname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User login</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"driver\"",
              "\"shipper\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>User account type</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>User profile picture</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": \"5e8dc57afc8873f6021967fa\",\n  \"fullname\": \"John Doe\",\n  \"username\": \"johndoe\",\n  \"email\": \"example@mail.com\",\n  \"type\": \"driver\",\n  \"avatar\": \"data:image/png;base64,long-string\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "MongooseError",
            "description": "<p>DB queries error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"MongooseError\",\n  \"error\": \"Error text\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/all",
    "title": "Request all users info",
    "name": "GetUsersAll",
    "group": "User",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization type and token, see example (JWT used)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT token_string\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>Array of all users</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "users.id",
            "description": "<p>Unique user ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.fullname",
            "description": "<p>User fullname</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "users.username",
            "description": "<p>User login</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": true,
            "field": "users.email",
            "description": "<p>User email address</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"driver\"",
              "\"shipper\""
            ],
            "optional": false,
            "field": "users.type",
            "description": "<p>User account type (driver or shipper)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.avatar",
            "description": "<p>User profile photo in base64 format, could be empty string if no photo is present</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"users\": [\n    {\n      \"id\": \"5e8dc57afc8873f6021967fa\",\n      \"fullname\": \"John Doe\",\n      \"username\": \"johndoe\",\n      \"email\": \"example@mail.com\",\n      \"type\": \"driver\",\n      \"avatar\": \"data:image/png;base64,long-string\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Received data is not valid</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "MongooseError",
            "description": "<p>DB queries error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Validation-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"ValidationError\",\n  \"error\": \"\\\"email\\\" must be a valid email\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"MongooseError\",\n  \"error\": \"Error text\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users",
    "title": "Update user info",
    "name": "PutUsers",
    "group": "User",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization type and token, see example (JWT used)</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-type",
            "description": "<p>Payload content type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT token_string\"\n}",
          "type": "json"
        },
        {
          "title": "Content-Header-Example:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullname",
            "description": "<p>New user fullname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>New user email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"fullname\": \"John Doe\",\n  \"email\": \"example@mail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>UserUpdated success status returned</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"UserUpdated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Received data is not valid</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "DriverOnLoad",
            "description": "<p>User could not change profile info while on load</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "MongooseError",
            "description": "<p>DB queries error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Validation-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"ValidationError\",\n  \"error\": \"\\\"email\\\" must be a valid email\"\n}",
          "type": "json"
        },
        {
          "title": "Driver-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"DriverOnLoad\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"MongooseError\",\n  \"error\": \"Error text\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/avatar",
    "title": "Upload user profile pic",
    "name": "PutUsersAvatar",
    "group": "User",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization type and token, see example (JWT used)</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-type",
            "description": "<p>Payload content type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT token_string\"\n}",
          "type": "json"
        },
        {
          "title": "Content-Header-Example:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>Image file binary data in base64 encoding</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"file\": \"data:image/png;base64,long-string\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>AvatarUploaded success status returned</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"AvatarUploaded\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Received data is not valid</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "UnexpectedError",
            "description": "<p>Unexpected server error while working with &quot;file&quot; attribute</p>"
          },
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "MongooseError",
            "description": "<p>DB queries error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Validation-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"ValidationError\",\n  \"error\": \"\\\"file\\\" must be a valid string\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"UnexpectedError\",\n  \"error\": \"Error text\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"MongooseError\",\n  \"error\": \"Error text\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/password",
    "title": "Change user password",
    "name": "PutUsersPassword",
    "group": "User",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization type and token, see example (JWT used)</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-type",
            "description": "<p>Payload content type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Auth-Header-Example:",
          "content": "{\n  \"Authorization\": \"JWT token_string\"\n}",
          "type": "json"
        },
        {
          "title": "Content-Header-Example:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New user password in plain text, at least 8 symbols, one lowercase, one uppercase, one digit are mandatory</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"password\": \"MyNewPassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>PasswordChanged success status returned</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"PasswordChanged\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Received data is not valid</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "MongooseError",
            "description": "<p>DB queries error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Validation-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": \"ValidationError\",\n  \"error\": \"\\\"password\\\" with value \\\"value\\\" fails to match the required pattern: /^[0-9a-zA-Z]{8,}$/\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": \"MongooseError\",\n  \"error\": \"Error text\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  }
] });
