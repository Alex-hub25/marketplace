"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorRegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Failed");
    else { setSuccess("Registered! Redirecting..."); setTimeout(() => router.push("/auth/signin"), 1500); }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Vendor Registration</h1>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-3" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-3" required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2 mb-3" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Register</button>
      </form>
    </main>
  );
}

