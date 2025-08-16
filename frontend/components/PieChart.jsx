"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ expenses }) {
  const data = {
    labels: ["Food", "Transport", "Shopping", "Others"],
    datasets: [
      {
        label: "Expenses",
        data: [
          expenses.filter(e => e.category === "Food").reduce((a, b) => a + b.amount, 0),
          expenses.filter(e => e.category === "Transport").reduce((a, b) => a + b.amount, 0),
          expenses.filter(e => e.category === "Shopping").reduce((a, b) => a + b.amount, 0),
          expenses.filter(e => e.category === "Others").reduce((a, b) => a + b.amount, 0),
        ],
        backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#fbbf24"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card bg-base-100 shadow-md flex-1">
      <h2 className="text-xl font-bold mb-2">Expenses by Category</h2>
      <div className="w-56 h-56 mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
}
