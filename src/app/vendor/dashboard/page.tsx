"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function VendorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session || !session.user) { router.push("/auth/signin"); return null; }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-xl shadow-sm">Manage Products</div>
        <div className="p-4 bg-white rounded-xl shadow-sm">View Orders</div>
        <div className="p-4 bg-white rounded-xl shadow-sm">Account Settings</div>
      </div>
      <button onClick={() => signOut()} className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Sign Out</button>
    </main>
  );
}

