import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (
  req: Request<{}, {}, productService.Product>,
  res: Response
) => {
  try {
    const { name, price } = req.body;
    const newProduct = await productService.createProduct(name, price);
    res.status(201).json({
      message: "Product Created",
      product: newProduct,
    });
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
