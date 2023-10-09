const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'db',
  user: 'jonlumi',
  password: 'legen_mamaqi',
  database: 'pastebin_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
