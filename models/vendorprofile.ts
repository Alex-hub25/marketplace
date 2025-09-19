// models/VendorProfile.ts
const VendorProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
  businessName: String,
  description: String,
  phone: String,
  address: String,
  location: { // GeoJSON point
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" } // [lng, lat]
  },
  status: { type: String, enum: ["draft","pending","approved","rejected"], default: "draft" },
  verificationDocs: [String], // URLs to uploaded docs (S3/Cloudinary)
  createdAt: Date,
  updatedAt: Date,
});
export default models.VendorProfile || model("VendorProfile", VendorProfileSchema);
