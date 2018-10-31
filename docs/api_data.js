define({ "api": [
  {
    "type": "post",
    "url": "/orders/",
    "title": "Add an order for a user with products",
    "name": "AddOrder",
    "group": "Order",
    "permission": [
      {
        "name": "admin and user"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "             {\n\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the order</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Order",
            "description": "<p>validation failed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Order",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the order</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5bc764b0a8ce7a3060a98af9\",\n \"date\": 20181010\n },\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/orders/:id",
    "title": "Request a order's informations",
    "name": "GetOrder",
    "group": "Order",
    "permission": [
      {
        "name": "user and admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/orders/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the order</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OrderNotFound",
            "description": "<p>The <code>id</code> of the Order was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Order",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the order</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5bc764b0a8ce7a3060a98af9\",\n \"date\": 20181010\n },\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/orders/",
    "title": "Request all orders's informations",
    "name": "GetOrders",
    "group": "Order",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Order",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the order</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5bc764b0a8ce7a3060a98af9\",\n \"date\": 20181010\n },\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/orders/:id",
    "title": "Request the products of the user's order",
    "name": "GetUserOrderProducts",
    "group": "Order",
    "permission": [
      {
        "name": "user and admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/orders/5bc766872b4eb60ccc24766a/products",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the order</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OrderNotFound",
            "description": "<p>The <code>id</code> of the Order was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Order",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the order</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5bc764b0a8ce7a3060a98af9\",\n \"date\": 20181010\n },\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/orders/:Id",
    "title": "Modify an order",
    "name": "ModifyOrder",
    "group": "Order",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/orders/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the order</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OrderNotFound",
            "description": "<p>The <code>id</code> of the Order was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Order",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of the order</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5bc764b0a8ce7a3060a98af9\",\n \"date\": 20181010\n },\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/products/",
    "title": "Add a product",
    "name": "AddProduct",
    "group": "Product",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "             {\n\"name\": \"Banana\",\n\"price\": 1.9,\n\"image\": \"images/banana.jpeg\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the product</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>URL of the image of the product</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Product",
            "description": "<p>validation failed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the product</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>URL of the image of the product</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5bc87ca7902104022c82bd5e\",\n    \"name\": \"Banana\",\n    \"price\": 1,90,\n    \"image\": \"images/banana.jpeg\",\n    \"__v\": 0\n    }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/Product/:id",
    "title": "Delete a Product",
    "name": "DeleteProduct",
    "group": "Product",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/products/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the product</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No-content\n{ }",
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
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProductNotFound",
            "description": "<p>The <code>id</code> of the product was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products/:id",
    "title": "Request a product's informations",
    "name": "GetProduct",
    "group": "Product",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/products/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the products</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProductNotFound",
            "description": "<p>The <code>id</code> of the Product was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the product</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>URL of the image of the product</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5bc87ca7902104022c82bd5e\",\n    \"name\": \"Banana\",\n    \"price\": 1,90,\n    \"image\": \"images/banana.jpeg\",\n    \"__v\": 0\n    }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/products/",
    "title": "Request all products's informations",
    "name": "GetProducts",
    "group": "Product",
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the product</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>URL of the image of the product</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5bc87ca7902104022c82bd5e\",\n    \"name\": \"Banana\",\n    \"price\": 1,90,\n    \"image\": \"images/banana.jpeg\",\n    \"__v\": 0\n    }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/products/",
    "title": "Modify a product",
    "name": "ModifyProduct",
    "group": "Product",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/products/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the products</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ProductNotFound",
            "description": "<p>The <code>id</code> of the Product was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the product</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of the product</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>URL of the image of the product</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5bc87ca7902104022c82bd5e\",\n    \"name\": \"Banana\",\n    \"price\": 1,90,\n    \"image\": \"images/banana.jpeg\",\n    \"__v\": 0\n    }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users/",
    "title": "Add a user",
    "name": "AddUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "{\n\"firstname\": \"John\",\n\"name\": \"Doe\",\n\"email\": \"John.Doe@gmail.com\",\n\"password\": \"toor\",\n\"address\": {\n\"street\": \"Avenue des Sports 20\",\n\"NPA\": \"1401\",\n\"City\": \"Yverdon-les-Bains\"\n}\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "e-mail",
            "description": "<p>E-mail of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "Hash",
            "optional": false,
            "field": "password",
            "description": "<p>Hash password ot the user</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address.street",
            "description": "<p>Street of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "address.npa",
            "description": "<p>NPA of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address.city",
            "description": "<p>City of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User",
            "description": "<p>validation failed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "e-mail",
            "description": "<p>E-mail of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Hash",
            "optional": false,
            "field": "password",
            "description": "<p>Hash password ot the user</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address.street",
            "description": "<p>Street of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "address.npa",
            "description": "<p>NPA of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address.city",
            "description": "<p>City of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5bc764b0a8ce7a3060a98af9\",\n \"firstname\": \"John\",\n \"name\": \"Doe\",\n \"email\": \"John.Doe@gmail.com\",\n \"password\": \"$2a$10$Py3VOkDWvoYcaydFjs6yEOlEmSiOXEeKURov1coXyc/7YqHMJo1uC\",\n \"address\": {\n \"street\": \"Avenue des Sports 20\",\n \"NPA\": 1401,\n \"City\": \"Yverdon-les-Bains\"\n },\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete a user",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "user and admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/users/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No-content\n{ }",
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
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Request a user's informations",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "user and admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/users/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "e-mail",
            "description": "<p>E-mail of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Hash",
            "optional": false,
            "field": "password",
            "description": "<p>Hash password ot the user</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address.street",
            "description": "<p>Street of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "address.npa",
            "description": "<p>NPA of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address.city",
            "description": "<p>City of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5bc764b0a8ce7a3060a98af9\",\n \"firstname\": \"John\",\n \"name\": \"Doe\",\n \"email\": \"John.Doe@gmail.com\",\n \"password\": \"$2a$10$Py3VOkDWvoYcaydFjs6yEOlEmSiOXEeKURov1coXyc/7YqHMJo1uC\",\n \"address\": {\n \"street\": \"Avenue des Sports 20\",\n \"NPA\": 1401,\n \"City\": \"Yverdon-les-Bains\"\n },\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/protected",
    "title": "Test route Send logged user email",
    "name": "GetUserEmail",
    "group": "User",
    "permission": [
      {
        "name": "user and admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/users/protected",
          "type": "url"
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
            "field": "e-mail",
            "description": "<p>E-mail of the user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:Id/nbrOrders",
    "title": "Request the number of the user's orders",
    "name": "GetUserNbrOrders",
    "group": "User",
    "permission": [
      {
        "name": "admin or user"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/users/5bc766872b4eb60ccc24766a/nbrOrders",
          "type": "url"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:Id/orders",
    "title": "Request the user's orders",
    "name": "GetUserOrders",
    "group": "User",
    "permission": [
      {
        "name": "admin or user"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/users/5bc766872b4eb60ccc24766a/orders",
          "type": "url"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Request all users's informations",
    "name": "GetUsers",
    "group": "User",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can access the data.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "e-mail",
            "description": "<p>E-mail of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Hash",
            "optional": false,
            "field": "password",
            "description": "<p>Hash password ot the user</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address.street",
            "description": "<p>Street of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "address.npa",
            "description": "<p>NPA of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address.city",
            "description": "<p>City of the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"_id\": \"5bc764b0a8ce7a3060a98af9\",\n \"firstname\": \"John\",\n \"name\": \"Doe\",\n \"email\": \"John.Doe@gmail.com\",\n \"password\": \"$2a$10$Py3VOkDWvoYcaydFjs6yEOlEmSiOXEeKURov1coXyc/7YqHMJo1uC\",\n \"address\": {\n \"street\": \"Avenue des Sports 20\",\n \"NPA\": 1401,\n \"City\": \"Yverdon-les-Bains\"\n },\n \"__v\": 0\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "pactch",
    "url": "/users/:id",
    "title": "Modifiy a user",
    "name": "PatchUser",
    "group": "User",
    "permission": [
      {
        "name": "user and admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/users/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n{ user modified }",
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
            "field": "NoAccessRight",
            "description": "<p>Only authenticated User and logged User can access and modifiy his own data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Modifiy a user",
    "name": "PutUser",
    "group": "User",
    "permission": [
      {
        "name": "user and admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Example usage:",
          "content": "http://localhost:3000/users/5bc766872b4eb60ccc24766a",
          "type": "url"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n{ user modified }",
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
            "field": "NoAccessRight",
            "description": "<p>Only authenticated User and logged User can access and modifiy his own data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
