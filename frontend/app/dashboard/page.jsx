"use client";

import { useEffect, useState } from "react";
import API from "@/utils/api";
import Navbar from "@/components/Navbar.jsx";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseFilter from "@/components/ExpenseFilter";
import PieChart from "@/components/PieChart";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: "", from: "", to: "" });
  const [total, setTotal] = useState(0);

  const fetchExpenses = async () => {
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.from) params.from = filters.from;
      if (filters.to) params.to = filters.to;
      const res = await API.get("/expenses/get", { params });
      setExpenses(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  return (
    <>
      
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
        <ExpenseForm onSuccess={fetchExpenses} />
        <ExpenseFilter filters={filters} setFilters={setFilters} />
        <div className="flex flex-col md:flex-row gap-6">
          <ExpenseList expenses={expenses} refresh={fetchExpenses} />
          <PieChart expenses={expenses} />
        </div>
        <div className="text-lg font-bold">Total Expense: {total} BDT</div>
      </div>
    </>
  );
}
