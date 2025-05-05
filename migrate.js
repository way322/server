// server/migrate.js
import { readFileSync } from 'fs';
import { Pool } from 'pg';

const runMigrations = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { 
      rejectUnauthorized: false,
      require: true
    }
  });

  try {
    console.log('Starting migrations...');
    const sql = readFileSync('./schema.sql').toString();
    
    // Разделяем запросы по точкам с запятой
    const queries = sql.split(';').filter(q => q.trim());
    
    for (const query of queries) {
      await pool.query(query);
      console.log(`✅ Executed query: ${query.slice(0, 50)}...`);
    }
    
    console.log('✅ All migrations completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runMigrations();