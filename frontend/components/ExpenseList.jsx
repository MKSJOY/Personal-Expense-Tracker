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

      {/* Responsive, aligned table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full table-fixed min-w-[640px]">
          {/* Stable column widths so header & rows align perfectly */}
          <colgroup>
            <col className="w-[36%]" />   {/* Title */}
            <col className="w-[16%]" />   {/* Amount */}
            <col className="w-[16%]" />   {/* Category */}
            <col className="w-[20%]" />   {/* Date */}
            <col className="w-[12%]" />   {/* Actions */}
          </colgroup>

          <thead>
            <tr>
              <th className="px-3 py-2 text-left whitespace-nowrap">Title</th>
              <th className="px-3 py-2 text-right whitespace-nowrap">Amount</th>
              <th className="px-3 py-2 text-center whitespace-nowrap">Category</th>
              <th className="px-3 py-2 text-center whitespace-nowrap">Date</th>
              <th className="px-3 py-2 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((e) => (
              <tr key={e._id}>
                <td className="px-3 py-2 text-left whitespace-nowrap truncate" title={e.title}>
                  {e.title}
                </td>

                <td className="px-3 py-2 text-right whitespace-nowrap">
                  BDT {Number(e.amount).toFixed(2)}
                </td>

                <td className="px-3 py-2 text-center">
                  <span className="badge badge-primary">{e.category}</span>
                </td>

                <td className="px-3 py-2 text-center whitespace-nowrap">
                  {new Date(e.date).toLocaleDateString()}
                </td>

                <td className="px-3 py-2">
                  <div className="flex justify-center gap-2 flex-wrap">
                    <button
                      className="btn btn-xs bg-orange-500 text-white"
                      onClick={() => setEditingExpense(e)}
                      aria-label="Edit expense"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs bg-red-600 text-white"
                      onClick={() => handleDelete(e._id)}
                      aria-label="Delete expense"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Handle empty state gracefully */}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-sm opacity-70">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
