import express from "express";
import {
  getAdminProducts,
  newProduct,
  deleteProduct,
  getAllProducts,
  getAllCategories,
  getSingleProduct,
  getlatestProducts,
  updateProduct,
} from "../controller/Products.js";
import { AdminOnly } from "../middleware/Auth.js";
import { singleUpload } from "../middleware/multer.js";
const app = express.Router();
app.use(express.json());

app.post("/new", singleUpload, AdminOnly, newProduct);
app.get("/latestProduct", getlatestProducts);
app.get("/categories", getAllCategories);
app.get("/getAllProducts", AdminOnly, getAdminProducts);
app
  .route("/:id")
  .get(getSingleProduct)
  .put(AdminOnly, singleUpload, updateProduct)
  .delete(AdminOnly, deleteProduct);

app.get("/", getAllProducts);

export default app;
