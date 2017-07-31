require('dotenv').config
module.exports = {
  "development": {
    "username": "postgres",
    "password": 12345,
    "database": "db_test_RESTMan",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": 12345,
    "database": "db_test_RESTMan",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DB_RESTMAN,
    "host": process.env.HOST_SERVER,
    "dialect": "postgres"
  }
}
