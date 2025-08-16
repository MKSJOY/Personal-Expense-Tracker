"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/api";
import { setToken } from "@/utils/auth";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      setToken(res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <form
        onSubmit={handleLogin}
        className="card w-97 bg-white shadow-xl p-10 rounded-lg space-y-4 relative"
        style={{ animation: "fadeIn 0.5s ease-in-out" }}
      >
        <h2 className="text-xl font-semibold text-center text-green-600 p-4">
          Welcome Back To Personal Expense Tracker 💸
        </h2>
        <h2 className="text-3xl font-bold text-center text-blue-600 p-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full relative z-10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full relative z-10 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button className="btn btn-primary w-full hover:bg-blue-700 transition">
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="link link-primary text-blue-700">
            Signup
          </a>
        </p>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
