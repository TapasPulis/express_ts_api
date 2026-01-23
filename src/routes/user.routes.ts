import { Router } from "express";
import { createUser, getAllUser } from "../controllers/user.controller";
import { getUserById, updateById } from "../controllers/user.controller";
import { deleteById } from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.patch("/:id", updateById);
router.delete("/:id", deleteById);

export default router;
