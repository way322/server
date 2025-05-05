// server/migrate.js
import pg from 'pg';
const { Client } = pg; // Используем Client вместо Pool для миграций
import { readFileSync } from 'fs';

const runMigrations = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { 
      rejectUnauthorized: false // Без require: true (Railway сам управляет SSL)
    }
  });

  try {
    await client.connect();
    console.log('🚀 Starting migrations...');
    
    const sql = readFileSync('./schema.sql').toString();
    
    // Улучшенный сплит с учетом PL/pgSQL блоков
    const queries = sql.split(/;\s*?(?=CREATE|INSERT|ALTER|DROP|SELECT|DELETE|UPDATE)/i);
    
    for (const query of queries) {
      if (query.trim()) {
        await client.query(query);
        console.log(`✅ Executed query: ${query.split(/\s+/).slice(0, 4).join(' ')}...`);
      }
    }
    
    console.log('🎉 All migrations completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end(); // Всегда закрываем соединение
  }
};

runMigrations();