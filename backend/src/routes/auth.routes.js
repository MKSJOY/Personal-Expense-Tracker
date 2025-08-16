import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';

const r = Router();

r.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
  ],
  validate,
  register
);

r.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required')
  ],
  validate,
  login
);

r.get('/me', auth, me);

export default r;
