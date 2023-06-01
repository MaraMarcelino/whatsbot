require('dotenv').config();

 module.exports = {
  "development": {
    "server": process.env.DB_HOST,
    "database": process.env.DB_BASE,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "pool": {
        "max": 10,
        "min": 0,
        "idleTimeoutMillis": 30000,
      },
      "options": {
        "trustServerCertificate": true,
        "encrypt": false,
      },
  },
  "test": {
    "server": process.env.DB_HOST,
    "database": process.env.DB_BASE,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "pool": {
        "max": "10",
        "min": "0",
        "idleTimeoutMillis": "30000",
      },
      "options": {
        "trustServerCertificate": "true",
        "encrypt": "false",
      }
  },
  "production": {
    "server": process.env.DB_HOST,
    "database": process.env.DB_BASE,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "pool": {
        "max": "10",
        "min": "0",
        "idleTimeoutMillis": "30000",
      },
      "options": {
        "trustServerCertificate": "true",
        "encrypt": "false",
      }
  }
}
