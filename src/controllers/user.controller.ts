import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { RegisterUserTypeZ } from "../models/user.model";

export const createUser = async (
  req: Request<{}, {}, RegisterUserTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const newUser = await userService.createUser(data);
    res
      .status(201)
      .json({ status: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userService.getUserById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (
  req: Request<{ id: string }, {}, Partial<userService.Users>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const changeUser = await userService.updateById(req.params.id, req.body);
    res.status(200).json(changeUser);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const removeUser = await userService.deleteById(req.params.id);

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
