import Link from "next/link";

const sampleProducts = [
  { id: 1, name: "Wireless Headphones", price: 99, image: "/headphones.jpg" },
  { id: 2, name: "Gaming Mouse", price: 49, image: "/mouse.jpg" },
  { id: 3, name: "Mechanical Keyboard", price: 120, image: "/keyboard.jpg" },
];

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sampleProducts.map((p) => (
          <div key={p.id} className="border rounded-lg shadow-sm overflow-hidden">
            <img src={p.image} alt={p.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-700">${p.price}</p>
              <Link
                href={`/products/${p.id}`}
                className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
