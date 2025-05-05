// server/migrate.js
import { readFileSync } from 'fs';
import { Pool } from 'pg';

const runMigrations = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const sql = readFileSync('./schema.sql').toString();
    await pool.query(sql);
    console.log('✅ Schema applied successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runMigrations();