import mongoose from "mongoose";
import { CreateProductTypeZ } from "../schemas/product.schema";

export interface ProductDocument {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: "Price is required" },
    description: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  productSchema,
);
