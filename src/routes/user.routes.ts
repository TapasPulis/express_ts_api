import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.post("/", validate(createUserValidation), createUser);
userRoutes.get("/:id", getUserById);
userRoutes.patch("/:id", updateUserById);
userRoutes.delete("/:id", deleteUserById);

export default userRoutes;
