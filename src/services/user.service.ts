import { UserDocument, UserModel } from "../models/user.model";
import { AppError } from "../utils/app.error";
import { pool } from "../config/db";
import bcrypt from "bcrypt";

export interface Users {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
  password: string;
  created_at: string;
  updated_at: string;
}

export const createUser = async (data: Partial<Users>) => {
  const query =
    "INSERT INTO users (firstname, lastname, email, age) VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, email, admin, createdat, updated_at";
  const encryptedPassword = await bcrypt.hash(data.password as string, 10);
  const values = [data.firstname, data.lastname, data.email, encryptedPassword];

  const result = await pool.query<Partial<Users>>(query, values);
  if (!result) throw new AppError("Failed to create user...", 500);

  return result.rows[0];
};

export const getAllUsers = async () => {
  const results = await pool.query<Partial<Users>>(
    "SELECT id, firstname, lastname, email, admin, createdat, updated_at FROM users",
  );
  console.log(results);

  if (results.rows.length === 0) {
    throw new AppError("No users found", 404);
  }
  return results.rows;
};

export const getUserById = async (id: string) => {
  const getUserId = await UserModel.findById(id);
  if (!getUserId) {
    throw new AppError("User not found", 404);
  }
  return getUserId;
};

export const updateById = async (id: string, updateData: Partial<Users>) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(",");

  const query = `UPDATE users SET ${setClause} WHERE id = ${id} RETURNING id, firstname, lastname, email, admin, createdat, updated_at`;
  const result = await pool.query<Partial<Users>>(query, values);
  if (!result.rows[0]) {
    throw new AppError("Failed to update user", 500);
  }
  return result.rows[0];
};

export const deleteById = async (id: string) => {
  const deleteUser = await UserModel.findByIdAndDelete(id);
  if (!deleteUser) {
    throw new AppError("Couldn't delete it", 404);
  }
  return deleteUser;
};
