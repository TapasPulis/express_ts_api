import { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.service";
import { CreateProductTypeZ } from "../schemas/product.schema";
import {
  ProductListQueryParams,
  ProductListRequest,
} from "../types/query.types";
import {
  capLimit,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  toPositiveInteger,
} from "../utils/query.util";

export const createProduct = async (
  req: Request<{}, {}, CreateProductTypeZ>, // We are specifying that req.body will have the shape of CreateProductTypeZ
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, price, description, stock, category } = req.body; // Destructuring name and price from the request body
    const newProduct = await productService.createProductService(
      name,
      price,
      description,
      stock,
      category,
    );
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
    const {
      page: pageParam,
      limit: limitParam,
      sort,
      fields,
      search,
      category,
      minPrice,
      maxPrice,
      inStock,
    } = req.query as ProductListQueryParams;

    const page = toPositiveInteger(pageParam, DEFAULT_PAGE);
    const limit = capLimit(toPositiveInteger(limitParam, DEFAULT_LIMIT));

    const options: ProductListRequest = {
      page,
      limit,
      sort,
      fields,
      search,
      category,
      minPrice,
      maxPrice,
      inStock,
    };

    const products = await productService.findAllProductsService(options);
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
    const product = await productService.findProductByIdService(req.params.id);
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
    const updateProduct = await productService.updateByIdService(
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
    const deleteProduct = await productService.deleteByIdService(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
