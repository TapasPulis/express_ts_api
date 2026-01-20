import mongoose from "mongoose";

export interface ProductDocument {
  name: string;
  type: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: "Type is required" },
    price: { type: Number, required: "Price is required" },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
