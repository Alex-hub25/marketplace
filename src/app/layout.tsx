"use client";

import "../app/globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { useSession, signOut, SessionProvider } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className="bg-white shadow-md w-64 min-h-screen">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 text-xl font-bold border-b">Produce Stand</div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col p-2 space-y-2">
          <Link
            href="/"
            className="px-3 py-2 rounded hover:bg-green-100 text-gray-700"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="px-3 py-2 rounded hover:bg-green-100 text-gray-700"
          >
            Products
          </Link>

          {/* Vendor Dashboard (requires role) */}
          {session?.user?.role === "vendor" && (
            <Link
              href="/vendor/dashboard"
              className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Dashboard
            </Link>
          )}

          {/* Auth controls */}
          {session ? (
            <button
              onClick={() => signOut()}
              className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/signin"
              className="px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-center"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
}

function TopNav() {
  return (
    <div className="bg-green-600 shadow p-4 w-full flex justify-center">
      <form className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search products, vendors..."
          className="w-full bg-white rounded-full px-4 py-2 text-black focus:outline-none border"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-200"
        >
          🔍
        </button>
      </form>
    </div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <SessionProvider>
          <TopNav />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
