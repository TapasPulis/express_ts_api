import { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserValidation } from "../models/user.model";

const router = Router();

router.get("/", getUsers);
// router.get("/:id", getUserById);
// router.patch("/:id", updateUserById);
// router.delete("/:id", deleteUserById);
// router.post("/", validate(createUserValidation), createUser);

export default router;
