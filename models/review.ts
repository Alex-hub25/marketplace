// models/Review.ts
const ReviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  vendor: { type: Schema.Types.ObjectId, ref: "User" }, // optional denormalization
  rating: { type: Number, min: 1, max: 5 },
  title: String,
  body: String,
  approved: { type: Boolean, default: true }, // moderation toggle
  createdAt: Date,
});
export default models.Review || model("Review", ReviewSchema);
