require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 100,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

async function test() {
  console.time('Query Time');
  const [result] = await pool.query('CALL SearchAllView(?,?,?,?,?)', ['hi', '', '', 50, 0]);
  console.timeEnd('Query Time');
  console.log('Results:', result[0]?.length || 0);
  process.exit(0);
}

test();
