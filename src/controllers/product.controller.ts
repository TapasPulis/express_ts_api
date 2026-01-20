import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { ProductDocument } from "../models/product.model";

export const createProduct = async (
  req: Request<{}, {}, ProductDocument>,
  res: Response
) => {
  try {
    const { name, type, price } = req.body;
    const newProduct = await productService.createProduct(name, type, price);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const getProductById = (req: Request, res: Response) => {
  const productId = req.params.id;
  res.json({ id: productId });
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
