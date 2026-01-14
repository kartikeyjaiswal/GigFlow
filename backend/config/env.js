import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

if (!process.env.MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in .env");
}
