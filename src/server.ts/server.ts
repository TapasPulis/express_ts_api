import dotenv from "dotenv";
import { createApp } from "../app.ts/app";
import mongoose, { mongo } from "mongoose";
import { pool } from "../config/db";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/myapp";

const startServer = async () => {
  try {
    const app = createApp();
    pool
      .connect()
      .then(() => {
        console.info("✅ Connected to PostgreSQL DB - Congrats!");
      })
      .catch((error) => {
        console.error("❌ Failed to connect to PostgreSQL DB", error);
      });
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error("❌ Failed to start the server", error);
    process.exit(1);
  }
};

startServer();
