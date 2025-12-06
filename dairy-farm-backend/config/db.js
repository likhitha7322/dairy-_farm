// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "dairy_farm",   // Local DB fallback
  process.env.DB_USER || "root",        // Local user fallback
  process.env.DB_PASS || "vibha@14",    // Local pass fallback
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
