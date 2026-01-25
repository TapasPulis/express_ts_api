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

const router = Router();

router.post("/", validate(createProductValidation), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);
router.patch("/:id", updateProductById);

export default router;
