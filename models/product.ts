// models/Product.ts
const ProductSchema = new Schema({
  vendor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: String,
  slug: { type: String, index: true },
  description: String,
  price: Number,
  categories: [String],
  tags: [String],
  images: [String],
  stock: Number,
  avgRating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  createdAt: Date,
});
ProductSchema.index({ title: "text", description: "text", tags: "text", categories: "text" }, { weights: { title: 5, tags: 3, description: 1 }});
export default models.Product || model("Product", ProductSchema);
