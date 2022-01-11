require('dotenv').config();
module.exports = {
  "development": {
    "username": 'practice',
    "password": process.env.DB_PASSWORD,
    "database": "practice",
    "host": process.env.HOST,
    "dialect": "mysql",
    "timezone": "+09:00",
    "dialectOptions": {
      "charset": "utf8mb4",
      "timezone":"+09:00",
      "dateStrings": true,
      "typeCast": true
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
