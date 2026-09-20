"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 404) {
        setError("API not found. Make sure you are accessing via the Wrangler dev server (port 8788), not the Next.js server (port 3000).");
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        setError("Unexpected server response. Please access via http://localhost:8788/admin/login");
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        window.location.href = "/admin"; // Redirect to admin dashboard
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0c0e] relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[url('/store_exterior.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#fdb813]/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#111111]/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fdb813]/0 via-[#fdb813] to-[#fdb813]/0" />
          
          <div className="flex justify-center mb-8">
            <Image
              src="/nyc_logo_latest.png"
              alt="NYC Chicken"
              width={100}
              height={100}
              className="drop-shadow-[0_0_15px_rgba(253,184,19,0.5)]"
            />
          </div>

          <h1 className="text-2xl font-bold text-center text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Manager Portal
          </h1>
          <p className="text-gray-400 text-center text-sm mb-8">
            Sign in to manage the menu and prices.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#fdb813] transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#fdb813]/50 focus:ring-1 focus:ring-[#fdb813]/50 transition-all"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#fdb813] transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#fdb813]/50 focus:ring-1 focus:ring-[#fdb813]/50 transition-all"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#fdb813] to-[#e5a00d] text-black font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(253,184,19,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed group mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <a href="/" className="text-gray-500 hover:text-white text-xs transition-colors">
              &larr; Back to Public Website
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
