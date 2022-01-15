const dbConfig = require("./db.config.js");
const { Pool } = require("pg");
// const logger = require("../util/logging");

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL || dbConfig.URI,
  ssl: {
    rejectUnauthorized: false,
  },
});
