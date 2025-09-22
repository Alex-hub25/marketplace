import { connectDB } from "@/lib/mongodb";
import VendorProfile from "@/models/VendorProfile";

export async function POST(req: Request) {
  await connectDB();
  const { lng, lat, maxDistance = 5000 } = await req.json();
  const vendors = await VendorProfile.find({
    location: { $near: { $geometry: { type: "Point", coordinates: [lng, lat] }, $maxDistance: maxDistance } },
    status: "approved"
  }).limit(50);
  return new Response(JSON.stringify(vendors));
}
