import type { Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (
  req: Request<{}, {}, userService.Users>,
  res: Response,
) => {
  try {
    const { name, email, age } = req.body;
    const newUser = await userService.createUser(name, email, age);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: "User creation failed", error });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Failed to retrive users", error });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ Message: "Failed to retrieve user", error });
  }
};

export const updateById = async (
  req: Request<{ id: string }, {}, Partial<userService.Users>>,
  res: Response,
) => {
  const changeUser = await userService.updateById(req.params.id, req.body);
  res.status(200).json(changeUser);
};

export const deleteById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const removeUser = await userService.deleteById(req.params.id);
  if (!removeUser) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.status(200).json({ msg: "User deleted successfully" });
};
