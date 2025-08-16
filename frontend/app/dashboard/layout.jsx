"use client";

import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
}
