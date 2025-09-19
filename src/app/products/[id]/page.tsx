import { notFound } from "next/navigation";

const products = [
  { id: 1, name: "Wireless Headphones", price: 99, description: "High-quality sound with noise cancellation." },
  { id: 2, name: "Gaming Mouse", price: 49, description: "Ergonomic mouse with RGB lighting." },
  { id: 3, name: "Mechanical Keyboard", price: 120, description: "Durable keyboard with tactile switches." },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id.toString() === params.id);
  if (!product) return notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-6">${product.price}</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}
