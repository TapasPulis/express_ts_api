import { ProductDocument, ProductModel } from "../models/product.model";
export interface Product {
  id: number;
  name: string;
  price: number;
}

export const createProduct = async (
  name: string,
  type: string,
  price: number
) => {
  const existingProduct = await ProductModel.findOne({ name });
  if (existingProduct) {
    throw new Error("Product with this name already exists");
  }

  const newProduct: ProductDocument = {
    name,
    type,
    price,
  };
  const createdProduct = await ProductModel.create(newProduct);
  return createdProduct;
};

export const findAllProducts = async () => {
  const products = await ProductModel.find();

  if (products.length === 0) {
    return {
      message: "No products found",
    };
  }
  return products;
};
