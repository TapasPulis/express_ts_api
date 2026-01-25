import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller";
import { validate } from "../middleware/validate.middleware";
import { createProductValidation } from "../schemas/product.schema";

const router = Router();

router.post("/", validate(createProductValidation), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
