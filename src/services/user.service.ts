import { pool } from "../config/db";
import { USER } from "../models/user.model";
import { AppError } from "../utils/app.error";

const fieldsToReturn = "id, name, email, created_at, updated_at";

export const getAllUsersService = async () => {
  const result = await pool.query<Partial<USER>>(
    `SELECT ${fieldsToReturn} FROM users`,
  );
  if (!result) throw new AppError("Failed to fetch users...", 500);
  return result.rows;
};

export const getUserByIdService = async (id: string) => {
  const query = `SELECT ${fieldsToReturn} FROM users WHERE id = $1`;

  const result = await pool.query<Partial<USER>>(query, [id]);
  if (!result) throw new AppError("User not found...", 404);

  return result.rows[0] || null;
};

export const createUserService = async (data: Partial<USER>) => {
  const query = `INSERT INTO users (name, email) VALUES ($1, $2) returning ${fieldsToReturn}`;

  const values = [data.name, data.email];

  const result = await pool.query<Partial<USER>>(query, values);
  if (!result) throw new AppError("Failed to create user...", 500);

  return result.rows[0];
};

export const updateUserService = async (
  id: string,
  updateData: Partial<USER>,
) => {
  const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING ${fieldsToReturn}`;

  const result = await pool.query<Partial<USER>>(query, [
    updateData.name,
    updateData.email,
    id,
  ]);
  if (!result) throw new AppError("Failed to update user...", 500);

  return result.rows[0];
};

export const deleteUserService = async (id: string) => {
  const query = `DELETE FROM users WHERE id = $1 RETURNING ${fieldsToReturn}`;

  const result = await pool.query<Partial<USER>>(query, [id]);
  if (!result) throw new AppError("Failed to delete user...", 500);

  return result.rows[0];
};
