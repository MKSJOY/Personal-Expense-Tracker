// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './src/lib/db.js';
import router from './src/routes/index.js';

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://personal-expense-tracker-mks.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.options('*', cors()); // preflight

app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

app.get('/', (_req, res) => res.json({ ok: true, name: 'Expense Tracker API' }));

app.use('/', router);

// 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
await connectDB(process.env.MONGODB_URI);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
