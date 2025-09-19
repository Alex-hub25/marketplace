import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Marketplace",
  description: "Multi-vendor marketplace built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="bg-blue-600 text-white px-6 py-4 flex justify-between">
          <Link href="/" className="font-bold text-xl">Marketplace</Link>
          <nav className="flex gap-4">
            <Link href="/products">Products</Link>
            <Link href="/vendors">Vendors</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 text-center py-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} My Marketplace
          </p>
        </footer>
      </body>
    </html>
  );
}
