import { NextFunction, Response, Request } from "express";
import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductByIdService,
  deleteProductByIdService,
} from "../services/product.service";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await getAllProductsService();

    if (!products) {
      return res.status(404).json({ status: "No products found..." });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const products = await getProductByIdService(id);
    if (!products) {
      return res.status(404).json({ status: "No products found..." });
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const products = await createProductService(data);
    if (!products) {
      return res.status(404).json({ status: "Failed to create product..." });
    }
    res.status(200).json({ status: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const products = await updateProductByIdService(id, data);
    if (!products) {
      return res
        .status(404)
        .json({ status: `Product with id ${id} not found` });
    }
    res
      .status(200)
      .json({ status: `Product with id ${id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const products = await deleteProductByIdService(id);

    if (!products) {
      return res
        .status(404)
        .json({ status: `Product with id ${id} not found` });
    }
    res
      .status(200)
      .json({ status: `Product with id ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
