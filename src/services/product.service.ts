import { ProductModel } from "../models/product.model";
import { CreateProductTypeZ } from "../schemas/product.schema";
import { AppError } from "../utils/app.error";

export const createProduct = async (
  name: string,
  price: number,
  description: string,
  stock: number,
  category: string,
) => {
  const existingProduct = await ProductModel.findOne({ name });
  if (existingProduct) {
    throw new AppError("Product with this name already exists", 409);
  }

  const newProduct: CreateProductTypeZ = {
    name,
    price,
    description,
    stock,
    category,
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

export const findProductById = async (id: string) => {
  const productId = await ProductModel.findById(id);
  if (!productId) {
    throw new AppError("Product with the provided ID could not be found", 404);
  }
  return productId;
};

export const updateById = async (
  id: string, // We are passing in id as an argument to identify which product to update
  updateData: Partial<CreateProductTypeZ>, // We are passing in updateData as an argument which contains the fields to be updated, in this case, it can be either name or price or both
) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true, // This option returns the newly modified document and not the original
    runValidators: true, // This option runs the schema validators on the update operation so that the updated data follows the schema rules
  });

  if (!updatedProduct) {
    throw new AppError("Product with the provided ID could not be found", 404);
  }
  return updatedProduct;
};

export const deleteById = async (id: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new AppError("Product with the provided ID could not be found", 404);
  }
  return deletedProduct;
};
