import { ProductDocument, ProductModel } from "../models/product.model";
import { CreateProductTypeZ } from "../schemas/product.schema";
import { ProductListRequest, ListResult } from "../types/query.types";
import { AppError } from "../utils/app.error";
import {
  buildSearchQuery,
  parseBoolean,
  parseProjection,
  parseSort,
} from "../utils/query.util";

const allowedSortFields = [
  "createdAt",
  "price",
  "name",
  "stock",
  "updatedAt",
] as const;

const allowedProjectionFields = [
  "_id",
  "name",
  "price",
  "description",
  "category",
  "stock",
  "createdAt",
  "updatedAt",
] as const;
const allowedSearchFields = ["name", "description", "category"] as const;

export const createProductService = async (
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

export const findAllProductsService = async (
  params: ProductListRequest,
): Promise<ListResult<ProductDocument>> => {
  const {
    limit,
    category,
    page,
    fields,
    minPrice,
    maxPrice,
    inStock,
    search,
    sort,
  } = params;

  const filters: Record<string, unknown> = {};

  if (category) filters.category = category;

  const priceFilter: Record<string, number> = {};

  if (minPrice) {
    const parsed = Number(minPrice);
    if (!Number.isNaN(parsed)) priceFilter.$gte = parsed;
  }

  if (maxPrice) {
    const parsed = Number(maxPrice);
    if (!Number.isNaN(parsed)) priceFilter.$lte = parsed;
  }

  if (Object.keys(priceFilter).length > 0) filters.price = priceFilter;

  const inStockBool = parseBoolean(inStock);
  if (inStockBool !== undefined) {
    filters.stock = inStockBool ? { $gt: 0 } : { $lte: 0 };
  }

  const searchQuery = buildSearchQuery(search, [...allowedSearchFields]);
  const query: Record<string, unknown> = { ...filters, ...(searchQuery ?? {}) };

  const sortBy = parseSort(sort, [...allowedSortFields], "-createdAt");
  const projection = parseProjection(fields, [...allowedProjectionFields]);

  const skip = (page - 1) * limit;

  const findQuery = ProductModel.find(query)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  if (projection) findQuery.select(projection);

  const [data, total] = await Promise.all([
    findQuery.exec(),
    ProductModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};

export const findProductByIdService = async (id: string) => {
  const productId = await ProductModel.findById(id);
  if (!productId) {
    throw new AppError("Product with the provided ID could not be found", 404);
  }
  return productId;
};

export const updateByIdService = async (
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

export const deleteByIdService = async (id: string) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new AppError("Product with the provided ID could not be found", 404);
  }
  return deletedProduct;
};
