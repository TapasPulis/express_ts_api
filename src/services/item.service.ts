import { pool } from "../config/db";
import { AppError } from "../utils/app.error";

interface ITEM {
  order_id: string;
  product_id: string;
  quantity: number;
}

export const getItemsByOrderService = async () => {
  const query = `SELECT order_id, product_id, quantity FROM order_items `;
  const result = await pool.query<Partial<ITEM>>(query);
  return result.rows;
};

export const addItemToOrderService = async (data: Partial<ITEM>) => {
  const query = `INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING order_id, product_id, quantity`;
  const values = [data.order_id, data.product_id, data.quantity];
  const result = await pool.query<Partial<ITEM>>(query, values);
  if (!result) throw new AppError("Failed to add item to order...", 500);
  return result.rows[0];
};
