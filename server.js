const express = require('express');
const mysql = require('mysql2/promise');
const next = require('next');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3001;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  maxIdle: 100,
  idleTimeout: 60000,
  connectTimeout: 10000
});

app.prepare().then(() => {
  const server = express();

  server.disable('x-powered-by');
  server.set('etag', false);

  server.get('/api/search', async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const { name = '', type = '', source = '', page = 1 } = req.query;
    const limit = 50;
    const offset = (parseInt(page) - 1) * limit;

    if (!name.trim()) {
      return res.json({ page, limit, total: 0, totalCount: 0, results: [] });
    }

    try {
      const [result] = await pool.query('CALL SearchAllView(?,?,?,?,?)', [name, type, source, limit, offset]);
      const results = result[0] || [];
      const totalCount = results.length > 0 ? results[0].TOTAL_COUNT : 0;

      res.json({ page, limit, total: results.length, totalCount, results });
    } catch (err) {
      console.error(err);
      res.status(500).json({ page, limit, total: 0, totalCount: 0, results: [] });
    }
  });

  server.get('/api/total-records', async (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=300');
    try {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM us_details) +
          (SELECT COUNT(*) FROM us_details_v) +
          (SELECT COUNT(*) FROM uk_details) +
          (SELECT COUNT(*) FROM un_details) +
          (SELECT COUNT(*) FROM eu_details) +
          (SELECT COUNT(*) FROM eu_sanctioned_vessels_test) +
          (SELECT COUNT(*) FROM ofac_file_hashes)
        AS TOTAL_RECORDS
      `;
      const [rows] = await pool.query(query);
      res.json({ totalRecords: rows[0].TOTAL_RECORDS || 0 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ totalRecords: 0 });
    }
  });

  server.get('/api/details', async (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=60');
    const { table, id } = req.query;

    const allowedTables = [
      'us_details', 'us_details_v', 'uk_details', 'un_details',
      'eu_details', 'eu_sanctioned_vessels_test', 'job_last_run_date', 'ofac_file_hashes'
    ];

    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: 'Invalid table' });
    }

    let query = `SELECT * FROM ${table} WHERE ID=? LIMIT 1`;
    if (table === 'us_details_v') query = `SELECT * FROM ${table} WHERE A_ID=? LIMIT 1`;
    else if (table === 'un_details') query = `SELECT * FROM ${table} WHERE AUTO_ID=? LIMIT 1`;
    else if (table === 'job_last_run_date' || table === 'ofac_file_hashes') query = `SELECT * FROM ${table} WHERE my_row_id=? LIMIT 1`;

    try {
      const [rows] = await pool.query(query, [id]);
      res.json({ record: rows[0] || null });
    } catch (err) {
      console.error(err);
      res.status(500).json({ record: null });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
