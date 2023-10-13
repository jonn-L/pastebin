const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'pastebin_db',
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
