import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product.controller";
import { validate } from "../middleware/validate.middleware";
import { createProductValidation } from "../schemas/product.schema";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.delete("/:id", protect, restrictTo("admin"), deleteProductById);
router.patch("/:id", protect, restrictTo("admin"), updateProductById);
router.post(
  "/",
  validate(createProductValidation),
  protect,
  restrictTo("admin"),
  createProduct,
);

export default router;
