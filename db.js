// server/db.js
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true
  }
});

// Явная проверка подключения
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected via DATABASE_URL'))
  .catch(err => {
    console.error('❌ FATAL DB ERROR:', err);
    process.exit(1);
  });

export default pool;