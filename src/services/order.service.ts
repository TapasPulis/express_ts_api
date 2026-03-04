import { pool } from "../config/db";
import { AppError } from "../utils/app.error";

interface ORDER {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

const fieldsToReturn = "id, user_id, created_at, updated_at";

export const getAllOrdersService = async () => {
  const query = `SELECT ${fieldsToReturn} from orders`;
  const result = await pool.query(query);
  if (!result) throw new AppError("Failed to fetch orders...", 500);
  return result.rows;
};

export const getOrderByIdService = async (id: string) => {
  const query = `SELECT o.id AS order_id, u.id AS user_id, u.name, p.id AS product_id, p.name AS product_name, oi.quantity FROM orders o JOIN users u ON o.user_id = u.id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.id = $1`;
  const result = await pool.query(query, [id]);

  if (!result) throw new AppError("Order not found...", 500);
  return result.rows[0];
};

export const createOrderService = async (data: Partial<ORDER>) => {
  const query = `INSERT INTO orders (user_id) VALUES ($1) RETURNING ${fieldsToReturn}`;
  const result = await pool.query<Partial<ORDER>>(query, [data.user_id]);
  if (!result) throw new AppError("Failed to create order...", 500);
  return result.rows[0];
};

export const updateOrderByIdService = async (
  id: string,
  data: Partial<ORDER>,
) => {
  const query = `UPDATE orders SET user_id = $1 WHERE id = $2 RETURNING ${fieldsToReturn}`;
  const result = await pool.query<Partial<ORDER>>(query, [data.user_id, id]);
  if (!result) throw new AppError("Failed to update order...", 500);
  return result.rows[0];
};

export const deleteOrderByIdService = async (id: string) => {
  const query = `DELETE from orders WHERE id = $1`;
  const result = await pool.query(query, [id]);
  if (!result) throw new AppError("Failed to delete order...", 500);
  return result.rows[0];
};
