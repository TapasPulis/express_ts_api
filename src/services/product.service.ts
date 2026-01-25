import { ProductDocument, ProductModel } from "../models/product.model";
import { CreateProductTypeZ } from "../schemas/product.schema";
import { AppError } from "../utils/app.error";
export interface Product {
  id: number;
  name: string;
  price: number;
}

export const createProduct = async (name: string, price: number) => {
  const existingProduct = await ProductModel.findOne({ name });
  if (existingProduct) {
    throw new AppError("Product with this name already exists", 409);
  }

  const newProduct: ProductDocument = {
    name,
    price,
  };
  const createdProduct = await ProductModel.create(newProduct);
  return createdProduct;
};

export const findAllProducts = async () => {
  const products = await ProductModel.find();

  if (products.length === 0) {
    throw new AppError("No products found", 404);
  }
  return products;
};
