"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 space-x-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Marketplace
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4 flex-1">
          <Link href="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-green-600">
            Products
          </Link>

          {session?.user?.role === "vendor" && (
            <Link
              href="/vendor/dashboard"
              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              Dashboard
            </Link>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}

          {/* Search Input */}
          <div className="ml-auto max-w-lg w-full">
            <form className="relative">
              <input
                type="text"
                placeholder="Search products, vendors..."
                className="bg-white w-full rounded-full px-4 py-2 text-black focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-600"
              >
                🔍
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
}
