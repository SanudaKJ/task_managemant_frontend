"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/src/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      router.push("/login");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      
      {/* Glass Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl p-10 border border-gray-200">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary tracking-tight">
            Create Account
          </h2>
          <p className="text-black mt-2 text-sm font-medium">
            Join us and start your journey today
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">

          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all bg-white"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-black">
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all bg-white"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-black">
              Email Address
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all bg-white"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2
              peer-focus:text-sm
              peer-focus:text-black">
              Password (min 6 characters)
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-primary hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black font-semibold hover:underline transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
