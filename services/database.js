// database.js

// node services/database.js to test connection
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tamacat',
  password: 'postgres',
  port: 5432,
});

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected:', res.rows);
  } catch (error) {
    console.error('DB ERROR:', error);
  } finally {
    await pool.end();
  }
}

testConnection();

export default pool;
