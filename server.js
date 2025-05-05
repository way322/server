// server/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import favoritesRouter from './routes/favorites.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';
import { execSync } from 'child_process';

dotenv.config();

// Запуск миграций синхронно перед стартом сервера
try {
  console.log('🏗️  Running database migrations...');
  execSync('npm run migrate', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});