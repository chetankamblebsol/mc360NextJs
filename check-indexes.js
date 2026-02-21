require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

async function checkIndexes() {
  const tables = ['us_details', 'us_details_v', 'uk_details', 'un_details', 'eu_details', 'eu_sanctioned_vessels_test'];
  
  for (const table of tables) {
    console.log(`\n=== ${table} ===`);
    const [indexes] = await pool.query(`SHOW INDEX FROM ${table}`);
    indexes.forEach(idx => {
      console.log(`${idx.Key_name} (${idx.Column_name}) - ${idx.Index_type}`);
    });
  }
  
  console.log('\n=== Checking Stored Procedure ===');
  const [proc] = await pool.query(`SHOW CREATE PROCEDURE SearchAllView`);
  console.log(proc[0]['Create Procedure'].substring(0, 500));
  
  process.exit(0);
}

checkIndexes();
