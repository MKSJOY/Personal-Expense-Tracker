// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './src/lib/db.js';
import router from './src/routes/index.js';

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Body parser
app.use(express.json());

// Logging
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Root route
app.get('/', (_req, res) => res.json({ ok: true, name: 'Expense Tracker API' }));

// Mount your router at a relative path
app.use('/', router);  // ✅ use relative path, not full URL

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

// Start server after DB connection
const PORT = process.env.PORT || 5000;
await connectDB(process.env.MONGODB_URI);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
