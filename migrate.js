// server/migrate.js
import { readFileSync } from 'fs';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sql = readFileSync('./init.sql').toString();

async function runMigrations() {
  try {
    await pool.query(sql);
    console.log('✅ База данных создана!');
  } catch (err) {
    console.error('❌ Ошибка:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();