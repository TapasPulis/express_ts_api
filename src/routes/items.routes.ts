import { Router } from "express";
import {
  getItemsByOrder,
  addItemToOrder,
} from "../controllers/item.controller";

const router = Router();

router.get("/", getItemsByOrder);
router.post("/", addItemToOrder);

export default router;
