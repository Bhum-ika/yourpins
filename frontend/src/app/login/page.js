"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"
import Link from "next/link"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext";
import  LoadingButton from "../components/LoadingButton"


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.user);
      router.push("/dashboard");
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative">

      <Link
        href="/"
        className="cursor-pointer absolute top-6 left-6 text-sm text-gray-400 hover:text-black flex items-center gap-1"
      >
        ← Back
      </Link>

      <div className="bg-white border border-gray-100 rounded-2xl p-10 w-full max-w-sm">

        <h1 className="text-2xl font-bold mb-1">
          Your<span className="text-blue-500">Pins</span>
        </h1>
        <p className="text-xs text-gray-400 mb-7">Welcome back</p>

        {error && <p className="text-xs text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
          />
          <LoadingButton loading={loading} text="Login" loadingText="Logging in..." />
        </form>

        <p className="text-xs text-gray-400 mt-5 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500">Register</Link>
        </p>

      </div>
    </main>
  );
}