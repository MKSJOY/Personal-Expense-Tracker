"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getToken, removeToken } from "@/utils/auth.js";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    setTokenState(getToken());
  }, [pathname]);

  const handleLogout = () => {
    removeToken();
    setTokenState(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
        Personal Expense Tracker
      </Link>
      <div className="flex gap-3 items-center">
        {token && (
          <button
            onClick={handleLogout}
            className="btn btn-error btn-sm flex items-center gap-2 font-bold text-white bg-red-800 p-1"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
