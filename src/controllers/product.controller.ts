import { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.service";
import { CreateProductTypeZ } from "../schemas/product.schema";

export const createProduct = async (
  req: Request<{}, {}, CreateProductTypeZ>, // We are specifying that req.body will have the shape of CreateProductTypeZ
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, price } = req.body; // Destructuring name and price from the request body
    const newProduct = await productService.createProduct(name, price);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request<{ id: string }>, // We are specifying that req.params will have an id of type string
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await productService.findProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (
  req: Request<{ id: string }, {}, Partial<CreateProductTypeZ>>, // We are using Partial here because we might update either name or price or both
  res: Response,
  next: NextFunction,
) => {
  try {
    const updateProduct = await productService.updateById(
      req.params.id,
      req.body,
    ); // We are passing in two arguments: id and the update data because the service function requires both to perform the update
    res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleteProduct = await productService.deleteById(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
