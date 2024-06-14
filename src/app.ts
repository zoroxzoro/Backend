import express from "express";
import morgan from "morgan";
import Stripe from "stripe";
import NodeCache from "node-cache";
import dotenv from "dotenv";
import cors from "cors";
import OrderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js";
import ProductRoutes from "./routes/Products.routes.js";
import PaymentRoutes from "./routes/payment.routes.js";
import DashBoradRoutes from "./routes/Stats.routes.js";
import { ConnectDb } from "./utils/db.js";
import { errorMiddleware } from "./middleware/error.js";

// Load environment variables
dotenv.config({
  path: "./.env",
});

const app = express();
const stripeKey = process.env.STRIPE_KEY || "";
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();
// This should log your actual Stripe key now

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Using routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/order", OrderRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/v1/admin", DashBoradRoutes);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
  ConnectDb();
});
