import mongoose from "mongoose";
import { CreateProductTypeZ } from "../schemas/product.schema";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: "Price is required" },
  },
  {
    timestamps: true,
  },
);

export const ProductModel = mongoose.model<CreateProductTypeZ>(
  "Product",
  productSchema,
);
