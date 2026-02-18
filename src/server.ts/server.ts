import dotenv from "dotenv";
import { createApp } from "../app.ts/app";
import { pool } from "../config/db";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const app = createApp();

pool
  .connect()
  .then(() => console.log("DB connected✅"))
  .catch((e) => console.log(e));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
