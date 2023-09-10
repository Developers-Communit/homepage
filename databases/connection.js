const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

// KONEKSI KE DATABASE
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = { connection };
