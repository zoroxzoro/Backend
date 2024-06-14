import express from "express";
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts, } from "../controller/Stats.js";
import { AdminOnly } from "../middleware/Auth.js";
const app = express.Router();
app.use(express.json());
// dashborad routes
app.get("/dashbord", AdminOnly, getDashboardStats);
// pie chart
app.get("/pie", AdminOnly, getPieCharts);
// bar chart
app.get("/bar", AdminOnly, getBarCharts);
// line charts
app.get("/line", AdminOnly, getLineCharts);
export default app;
