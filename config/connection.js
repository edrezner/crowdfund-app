const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const url = process.env.JAWSDB_URL || process.env.DATABASE_URL;

const sequelize = url
  ? new Sequelize(url, {
      dialect: "mysql",
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        port: Number(process.env.DB_PORT || 3306),
        logging: false,
      }
    );

module.exports = sequelize;
