import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession();
  if (!session || session.user.role !== "vendor") return new Response("Unauthorized", { status: 401 });
  const data = await req.json();
  const p = await Product.create({ ...data, vendor: session.user.id });
  return new Response(JSON.stringify(p), { status: 201 });
}
