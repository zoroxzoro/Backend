import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  newUser,
} from "../controller/User.controller.js";
import { AdminOnly } from "../middleware/Auth.js";
const app = express.Router();

app.post("/new", newUser);
app.get("/all", AdminOnly, getAllUser);
app.get("/:_id", getUser);
app.delete("/:_id", AdminOnly, deleteUser);

export default app;
