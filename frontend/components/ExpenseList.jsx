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

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-[500px]">
          <thead>
            <tr>
              <th className="px-2 py-1">Title</th>
              <th className="px-2 py-1">Amount</th>
              <th className="px-2 py-1">Category</th>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e._id}>
                <td className="whitespace-nowrap">{e.title}</td>
                <td className="whitespace-nowrap">
                  BDT {e.amount.toFixed(2)}
                </td>
                <td>
                  <span className="badge badge-primary">{e.category}</span>
                </td>
                <td className="whitespace-nowrap">
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-xs bg-orange-500 text-white"
                      onClick={() => setEditingExpense(e)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs bg-red-600 text-white"
                      onClick={() => handleDelete(e._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
