"use client";

import { useState, useEffect } from "react";
import API from "@/utils/api";

const CATEGORIES = ["Food", "Transport", "Shopping", "Others"];

export default function ExpenseForm({ onSuccess, expenseToEdit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(new Date(expenseToEdit.date).toISOString().split("T")[0]);
    }
  }, [expenseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (expenseToEdit) {
        await API.patch(`/expenses/update/${expenseToEdit._id}`, { title, amount, category, date });
      } else {
        await API.post("/expenses/create", { title, amount, category, date });
      }
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving expense");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-md p-4 space-y-3">
      <h2 className="text-xl font-bold">{expenseToEdit ? "Edit Expense" : "Add Expense"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input input-bordered w-full"
        min="0.01"
        step="0.01"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select select-bordered w-full"
        required
      >
        <option value="">Select Category</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <button type="submit" className="btn btn-primary w-full bg-blue-600 font-bold text-white">
        {expenseToEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
