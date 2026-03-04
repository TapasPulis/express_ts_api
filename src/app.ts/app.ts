import express, { type Request, type Response } from "express";
import { errorHandler } from "../middleware/error.middleware";
import userRoutes from "../routes/user.routes";
import productRoutes from "../routes/product.routes";
import orderRoutes from "../routes/order.routes";
import itemsRoutes from "../routes/items.routes";

export const createApp = () => {
  const app = express();
  // * middlewares
  app.use(express.json());

  // * routes
  app.use("/api/users", userRoutes);

  app.use("/api/products", productRoutes);

  app.use("/api/orders", orderRoutes);

  app.use("/api/orders/:id/items", itemsRoutes);
  // * error handling middleware
  app.use(errorHandler); // new line

  // * Health check (quick way to verify server is alive)
  app.get("/health", (req: Request, res: Response) => {
    void req;
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
};
