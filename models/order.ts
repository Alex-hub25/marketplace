// models/Order.ts (simplified)
const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User" },
  items: [{ product: { type: Schema.Types.ObjectId, ref: "Product" }, qty: Number, price: Number, vendor: { type: Schema.Types.ObjectId, ref: "User" } }],
  total: Number,
  status: { type: String, enum: ["pending","paid","fulfilled","cancelled"], default: "pending" },
  createdAt: Date
});
export default models.Order || model("Order", OrderSchema);
