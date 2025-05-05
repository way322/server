// server/db.js
import pg from 'pg';
const { Pool } = pg;

const config = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'aroma_db',
  password: process.env.DB_PASSWORD || '2298',
  port: Number(process.env.DB_PORT) || 5432,
};

console.log('Database config:', config); // Добавляем логирование конфига
console.log('Database config:', {
  host: pool.options.host,
  port: pool.options.port,
  database: pool.options.database,
  user: pool.options.user
});
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Важно для подключения через SSL
  }
})

// Проверка подключения
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL connected successfully'))
  .catch(err => {
    console.error('❌ PostgreSQL connection error:', err);
    process.exit(1);
  });

export default pool;