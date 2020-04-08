define({ "api": [
  {
    "type": "delete",
    "url": "/loads/:id",
    "title": "Delete load",
    "name": "DeleteLoads",
    "group": "Load",
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
            "description": "<p>Response status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Load deleted successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/load.js",
    "groupTitle": "Load"
  },
  {
    "type": "get",
    "url": "/loads/:id/info",
    "title": "Get load info by ID",
    "name": "GetTrucksTypes",
    "group": "Load",
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
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "load",
            "description": "<p>Truck types array</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "load.dimensions",
            "description": "<p>Truck dimensions object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.length",
            "description": "<p>Truck length</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.height",
            "description": "<p>Truck height</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "load.dimensions.width",
            "description": "<p>Truck width</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "load._id",
            "description": "<p>Unique truck type id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "load.payload",
            "description": "<p>Truck payload</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "load.assigned_to",
            "description": "<p>Driver assigned to load</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"new\"",
              "\"posted\"",
              "\"assigned\"",
              "\"shipped\""
            ],
            "optional": false,
            "field": "load.status",
            "description": "<p>Load's current status</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"En route to pick up\"",
              "\"Arrived to pick up\"",
              "\"En route to delivery\"",
              "\"Arrived to delivery\""
            ],
            "optional": false,
            "field": "load.state",
            "description": "<p>Load's current state</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "load.created_by",
            "description": "<p>Load's creator ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "load.logs",
            "description": "<p>Event logs container</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "load.logs._id",
            "description": "<p>Unique log entry ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "load.logs.message",
            "description": "<p>Log message</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "load.logs.time",
            "description": "<p>Log message timestamp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"status\": \"Success\",\n \"load\": {\n   \"dimensions\": {\n     \"length\": 1,\n     \"height\": 1,\n     \"width\": 1\n   },\n   \"assigned_to\": \"5e8dc57afc8873f6021967fa\",\n   \"status\": \"shipped\",\n   \"state\": \"Arrived to delivery\",\n   \"_id\": \"5e8df579fe1ad11f1787eb22\",\n   \"payload\": 1,\n   \"created_by\": \"5e8df38dabac3b02b79598d4\",\n   \"logs\": [\n     {\n       \"_id\": \"5e8df5cafe1ad11f1787eb25\",\n       \"message\": \"Unable to find suitable truck\",\n       \"time\": 1586361802708\n     }\n   ],\n }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/load.js",
    "groupTitle": "Load"
  },
  {
    "type": "put",
    "url": "/loads/:id",
    "title": "Update load info",
    "name": "PutLoads",
    "group": "Load",
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
            "type": "Object",
            "optional": false,
            "field": "dimensions",
            "description": "<p>Truck new dimensions object</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.length",
            "description": "<p>Truck new length</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.height",
            "description": "<p>Truck new height</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dimensions.width",
            "description": "<p>Truck new width</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "payload",
            "description": "<p>Truck new payload</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"dimensions\": {\n    \"length\": 150,\n    \"height\": 200,\n    \"width\": 120\n  },\n  \"payload\": 1700\n}",
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
            "description": "<p>Response status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Load info updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/load.js",
    "groupTitle": "Load"
  },
  {
    "type": "delete",
    "url": "/trucks/:id",
    "title": "Delete truck",
    "name": "DeleteTrucks",
    "group": "Truck",
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
            "description": "<p>Response status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Truck deleted successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/truck.js",
    "groupTitle": "Truck"
  },
  {
    "type": "get",
    "url": "/trucks/types",
    "title": "Get truck types",
    "name": "GetTrucksTypes",
    "group": "Truck",
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
            "description": "<p>Response status</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "types",
            "description": "<p>Truck types array</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "types.dimensions",
            "description": "<p>Truck dimensions object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "types.dimensions.length",
            "description": "<p>Truck length</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "types.dimensions.height",
            "description": "<p>Truck height</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "types.dimensions.width",
            "description": "<p>Truck width</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "types._id",
            "description": "<p>Unique truck type id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "types.name",
            "description": "<p>Truck type name</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "types.payload",
            "description": "<p>Truck payload</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Success\",\n  \"types\": [\n    {\n      \"dimensions\": {\n        \"length\": 150,\n        \"height\": 200,\n        \"width\": 120\n      },\n      \"_id\": \"5e7f624b1c9d4400002c1d84\",\n      \"name\": \"SPRINTER\",\n      \"payload\": 1700\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/truck.js",
    "groupTitle": "Truck"
  },
  {
    "type": "patch",
    "url": "/trucks/:id/unassign",
    "title": "Unassign truck from driver",
    "name": "PatchTrucksUnassign",
    "group": "Truck",
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
            "description": "<p>Response status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Truck unassigned successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/truck.js",
    "groupTitle": "Truck"
  },
  {
    "type": "put",
    "url": "/trucks/:id",
    "title": "Update truck info",
    "name": "PutTrucks",
    "group": "Truck",
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
            "field": "comment",
            "description": "<p>Custom comment for user's truck</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"comment\": \"This is my Sprinter type truck\"\n}",
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
            "description": "<p>Response status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"status\": \"Truck info updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/truck.js",
    "groupTitle": "Truck"
  },
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
