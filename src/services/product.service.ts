import { pool } from "../config/db";
import { AppError } from "../utils/app.error";

interface PRODUCT {
  id: string;
  name: string;
  price: number;
}

const fieldsToReturn = "id, name, price";
export const getAllProductsService = async () => {
  const result = await pool.query<Partial<PRODUCT>>(
    `SELECT ${fieldsToReturn} FROM products`,
  );
  if (!result) throw new AppError("Failed to fetch products...", 500);
  return result.rows;
};

export const getProductByIdService = async (id: string) => {
  const query = `SELECT ${fieldsToReturn} FROM products WHERE id = $1`;

  const result = await pool.query<Partial<PRODUCT>>(query, [id]); // this sends the query to postgres and id is the value we give to the $1 placeholder
  if (!result) throw new AppError("Product not found...", 500);

  return result.rows[0] || null;
};

export const createProductService = async (data: Partial<PRODUCT>) => {
  const query = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING ${fieldsToReturn}`;

  const values = [data.name, data.price];
  const result = await pool.query<Partial<PRODUCT>>(query, values); // this sends the query to postgres and data.name is equal to the $1 placeholder and data.email is equal to $2(This is determined by the order so if data.name and data.email swapped places data.email would become $1 and data.name would become $2)
  if (!result) throw new AppError("Failed to create product...", 500);

  return result.rows[0];
};

export const updateProductByIdService = async (
  id: string,
  data: Partial<PRODUCT>,
) => {
  const query = `UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING ${fieldsToReturn}`;
  const result = await pool.query<Partial<PRODUCT>>(query, [
    data.name,
    data.price,
    id,
  ]);
  if (!result) throw new AppError("Failed to update product...", 500);
  return result.rows[0];
};

export const deleteProductByIdService = async (id: string) => {
  const query = `DELETE from products WHERE id = $1 returning ${fieldsToReturn}`;
  const result = await pool.query<Partial<PRODUCT>>(query, [id]);
  if (!result) throw new AppError("Failed to delete product", 500);
  return result.rows[0];
};
