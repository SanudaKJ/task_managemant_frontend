"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { apiFetch } from "@/src/lib/api";
import Link from "next/link";

export default function LoginPage() {
  const { setAccessToken } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // 🔥 Save access token in memory
      setAccessToken(data.accessToken);

      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleLogin} className="space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/register" className="text-black font-semibold">
            Register
          </Link>
        </p>
    </div>
    
  );
}
