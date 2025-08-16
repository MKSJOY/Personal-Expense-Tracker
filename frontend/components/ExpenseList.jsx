"use client";

import API from "@/utils/api";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

export default function ExpenseList({ expenses, refresh }) {
  const [editingExpense, setEditingExpense] = useState(null);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      await API.delete(`/expenses/delete/${id}`);
      refresh();
    }
  };

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-2">Expenses</h2>
      {editingExpense && (
        <ExpenseForm
          expenseToEdit={editingExpense}
          onSuccess={() => {
            setEditingExpense(null);
            refresh();
          }}
        />
      )}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e._id}>
                <td>{e.title}</td>
                <td>BDT {e.amount.toFixed(2)}</td>
                <td>
                  <span className="badge badge-primary">{e.category}</span>
                </td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-info font-bold text-white bg-orange-500 p-1" onClick={() => setEditingExpense(e)}>Edit</button>
                  <button className="btn btn-sm btn-error font-bold text-white bg-red-600 p-1" onClick={() => handleDelete(e._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
