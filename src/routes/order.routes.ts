import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
} from "../controllers/order.controller";

const router = Router();

router.get("/", getAllOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

export default router;
