import type { NextFunction, Request, Response } from "express";
import { CreateUserTypeZ } from "../models/user.model";
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from "../services/user.service";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsersService();

    if (!users) {
      return res.status(404).json({ status: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const idInt = Number(id);
    const user = await getUserByIdService(idInt);

    if (!user) {
      return res.status(404).json({ status: `User with id ${id} not found` });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request<{}, {}, CreateUserTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newUser = await createUserService(data);

    if (!newUser) {
      return res.status(500).json({ status: "Failed to create user" });
    }

    res.status(201).json({ status: "User Created sucesfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const idInt = Number(id);
    const updateData = req.body;
    // Implementation for updating user goes here
    const updateUser = await updateUserByIdService(idInt, updateData);

    if (!updateUser) {
      return res.status(404).json({ status: `User with id ${id} not found` });
    }

    res.status(200).json({
      status: `User with id ${id} updated successfully`,
      user: updateUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const idInt = Number(id);
    const user = await deleteUserByIdService(idInt);

    if (!user) {
      return res.status(404).json({ status: `User with id ${id} not found` });
    }

    res
      .status(200)
      .json({ status: `User with id ${id} deleted successfully`, user });
  } catch (error) {
    next(error);
  }
};
