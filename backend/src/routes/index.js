import { Router } from 'express';
import authRoutes from './auth.routes.js';
import expenseRoutes from './expense.routes.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));

router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);

export default router;
