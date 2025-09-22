"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamic import of Map component for client-side rendering
const Map = dynamic<{ vendors: Vendor[] }>(() => import("../components/map"), { ssr: false });

// Vendor type
type Vendor = {
  id: number;
  name: string;
  position: [number, number];
};

// Sample vendors (replace with your DB data later)
const vendors: Vendor[] = [
  { id: 1, name: "Farmer Joe's Beef", position: [38.63, -90.20] },
  { id: 2, name: "Green Veggie Market", position: [38.62, -90.21] },
  { id: 3, name: "Citrus Grove", position: [38.64, -90.19] },
];

// Sample products
const sampleProducts = [
  { id: 1, name: "Beef", price: 99, image: "/headphones.jpg" },
  { id: 2, name: "Veggies", price: 49, image: "/mouse.jpg" },
  { id: 3, name: "Orange", price: 120, image: "/keyboard.jpg" },
];

export default function HomePage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Local Vendors</h1>

      {/* Map */}
      <div className="mb-10">
        <Map vendors={vendors} />
      </div>

      <h2 className="text-2xl font-bold mb-6">Catagories</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sampleProducts.map((p) => (
          <div key={p.id} className="border rounded-lg shadow-sm overflow-hidden">
            <img src={p.image} alt={p.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-700">${p.price}</p>
              <Link
                href={`/products/${p.id}`}
                className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
