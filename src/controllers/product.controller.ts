import { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.service";
import { CreateProductTypeZ } from "../schemas/product.schema";

export const createProduct = async (
  req: Request<{}, {}, CreateProductTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, price } = req.body;
    const newProduct = await productService.createProduct(name, price);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getProductById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;
    res.json({ id: productId });
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
