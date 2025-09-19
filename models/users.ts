// models/User.ts
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ["customer","vendor","admin"], default: "customer" },
  password: String,
  // basic vendor info for quick access; extended profile in VendorProfile
  vendorProfile: { type: Schema.Types.ObjectId, ref: "VendorProfile" },
}, { timestamps: true });

export default models.User || model("User", UserSchema);
