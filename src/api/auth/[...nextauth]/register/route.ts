import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

let client: MongoClient | null = null;
async function connectDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB);
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) return NextResponse.json({ error: "All fields required" }, { status: 400 });

    const db = await connectDB();
    const existing = await db.collection("users").findOne({ email });
    if (existing) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.collection("users").insertOne({ name, email, passwordHash, role: "vendor", createdAt: new Date() });

    return NextResponse.json({ message: "Vendor registered", userId: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
