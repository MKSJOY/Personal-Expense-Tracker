"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar.jsx";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-black px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-6 text-center">
          Welcome to Personal Expense Tracker 💸
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
          <Link
            href="/login"
            className="font-bold text-xl sm:text-2xl md:text-3xl text-white btn btn-primary btn-lg hover:bg-blue-900 transition w-full sm:w-auto text-center"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </>
  );
}
