"use client";

const CATEGORIES = ["Food", "Transport", "Shopping", "Others"];

export default function ExpenseFilter({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setFilters({ category: "", from: "", to: "" });
  };

  return (
    <div className="card bg-base-100 shadow-md p-4 flex flex-col md:flex-row gap-4 items-end">
      <div>
        <label className="label">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">From</label>
        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleChange}
          className="input input-bordered"
        />
      </div>
      <div>
        <label className="label">To</label>
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleChange}
          className="input input-bordered"
        />
      </div>
      <div className="flex space-x-2">
        <button className="btn btn-primary font-bold text-white bg-blue-700 p-1" onClick={() => setFilters({ ...filters })}>
          Apply
        </button>
        <button className="btn btn-ghost font-bold text-white bg-blue-700 p-1" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
