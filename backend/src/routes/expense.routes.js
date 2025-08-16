import { Router } from 'express';
import { body, param, query } from 'express-validator';
import {
  createExpense,
  getExpenses,
  filterByCategory,
  filterByDate,
  filterByCategoryAndDate,
  updateExpense,
  deleteExpense
} from '../controllers/expense.controller.js';
import { validate } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import { CATEGORIES } from '../models/Expense.js';

const r = Router();

r.use(auth);

// CREATE
r.post(
  '/create',
  [
    body('title').trim().isLength({ min: 3 }).withMessage('title min length 3'),
    body('amount').isFloat({ gt: 0 }).withMessage('amount must be > 0').toFloat(),
    body('date').isISO8601().withMessage('date must be valid').toDate(),
    body('category').optional().isIn(CATEGORIES).withMessage(`category must be one of: ${CATEGORIES.join(', ')}`)
  ],
  validate,
  createExpense
);

// GET ALL
r.get('/get', getExpenses);

// FILTER BY CATEGORY
r.get(
  '/filter/category',
  [
    query('category').isIn(CATEGORIES).withMessage(`category must be one of: ${CATEGORIES.join(', ')}`)
  ],
  validate,
  filterByCategory
);

// FILTER BY DATE RANGE
r.get(
  '/filter/date',
  [
    query('from').isISO8601().withMessage('from must be a valid date'),
    query('to').isISO8601().withMessage('to must be a valid date')
  ],
  validate,
  filterByDate
);

// FILTER BY CATEGORY + DATE RANGE
r.get(
  '/filter/category-date',
  [
    query('category').isIn(CATEGORIES).withMessage(`category must be one of: ${CATEGORIES.join(', ')}`),
    query('from').isISO8601().withMessage('from must be a valid date'),
    query('to').isISO8601().withMessage('to must be a valid date')
  ],
  validate,
  filterByCategoryAndDate
);

// UPDATE
r.patch(
  '/update/:id',
  [
    param('id').isMongoId().withMessage('Invalid id'),
    body('title').optional().trim().isLength({ min: 3 }).withMessage('title min length 3'),
    body('amount').optional().isFloat({ gt: 0 }).withMessage('amount must be number & greater than 0').toFloat(),
    body('date').optional().isISO8601().withMessage('date must be valid').toDate(),
    body('category').optional().isIn(CATEGORIES).withMessage(`category must be one of: ${CATEGORIES.join(', ')}`)
  ],
  validate,
  updateExpense
);

// DELETE
r.delete('/delete/:id', [param('id').isMongoId().withMessage('Invalid id')], validate, deleteExpense);

export default r;
