import mongoose from 'mongoose';

export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Others'];

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, minlength: 3, trim: true },
    amount:{ type: Number, required: true, min: [0.01, 'Amount must be greater than 0'] },
    category:{ type: String, enum: CATEGORIES, default: 'Others' },
    date:  { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Expense', expenseSchema);
