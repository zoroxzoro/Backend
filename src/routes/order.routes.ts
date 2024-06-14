import express from "express";
import { AdminOnly } from "../middleware/Auth.js";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  processOrder,
} from "../controller/Order.js";
const app = express.Router();
app.use(express.json());

app.post("/new", newOrder);
app.get("/myOrder", myOrders);
app.get("/allOrder", AdminOnly, allOrders);
app.route("/:id").get(getSingleOrder).put(processOrder).delete(deleteOrder);

export default app;
