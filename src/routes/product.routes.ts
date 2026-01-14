import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller";
import { getProductById } from "../controllers/product.controller";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
