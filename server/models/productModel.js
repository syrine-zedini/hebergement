import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  description: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  duration: { type: String }, 
  category: { type: String }, 
  imageUrl: { type: String }, 
  features: [{ type: String }], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})
const productModel = mongoose.models.product || mongoose.model("products", productSchema);
export default productModel;