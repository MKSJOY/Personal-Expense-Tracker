import Expense from '../models/Expense.js';
import { httpNotFound } from '../utils/httpErrors.js';

// ✅ POST /expenses
export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      date
    });

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

// ✅ GET /expenses?category=&from=&to=
export const getExpenses = async (req, res, next) => {
  try {
    const { category, from, to } = req.query;

    const query = { user: req.user._id };

    // Filter by category
    if (category) query.category = category;

    // Filter by date range
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    // Fetch & sort
    const items = await Expense.find(query).sort({ date: -1, createdAt: -1 });

    // Calculate total amount
    const total = items.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({
      items,
      total,
      filters: {
        category: category || null,
        from: from || null,
        to: to || null
      }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ FILTER: BY CATEGORY
export const filterByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    const items = await Expense.find({
      user: req.user._id,
      category
    }).sort({ date: -1 });

    const total = items.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({ items, total, filters: { category } });
  } catch (err) {
    next(err);
  }
};

// ✅ FILTER: BY DATE RANGE
export const filterByDate = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const items = await Expense.find({
      user: req.user._id,
      date: { $gte: new Date(from), $lte: new Date(to) }
    }).sort({ date: -1 });

    const total = items.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({ items, total, filters: { from, to } });
  } catch (err) {
    next(err);
  }
};

// ✅ FILTER: BY CATEGORY + DATE RANGE
export const filterByCategoryAndDate = async (req, res, next) => {
  try {
    const { category, from, to } = req.query;
    const items = await Expense.find({
      user: req.user._id,
      category,
      date: { $gte: new Date(from), $lte: new Date(to) }
    }).sort({ date: -1 });

    const total = items.reduce((sum, exp) => sum + exp.amount, 0);

    res.json({ items, total, filters: { category, from, to } });
  } catch (err) {
    next(err);
  }
};

// ✅ PATCH /expenses/:id
export const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({ _id: id, user: req.user._id });
    if (!expense) throw httpNotFound('Expense not found');

    // Update only provided fields
    ['title', 'amount', 'category', 'date'].forEach((field) => {
      if (req.body[field] !== undefined) expense[field] = req.body[field];
    });

    await expense.save();
    res.json(expense);
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE /expenses/:id
export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findOneAndDelete({ _id: id, user: req.user._id });
    if (!deleted) throw httpNotFound('Expense not found');

    res.json({ message: 'Deleted successfully', _id: id });
  } catch (err) {
    next(err);
  }
};
