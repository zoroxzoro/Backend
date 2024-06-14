import express from "express";
import {
  allCoupon,
  applyDiscount,
  createPayment,
  delelteCoupon,
  newCoupon,
} from "../controller/Payment.js";
import { AdminOnly } from "../middleware/Auth.js";
const app = express.Router();
app.use(express.json());

app.post("/create/payment", createPayment);
app.post("/coupon/new", AdminOnly, newCoupon);
app.get("/discount", applyDiscount);
app.get("/all/coupon", AdminOnly, allCoupon);
app.delete("/coupon/:id", AdminOnly, delelteCoupon);
export default app;
