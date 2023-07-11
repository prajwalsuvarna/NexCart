import express from "express";
import { isAdmin, requireLogin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getProductController,
  updateProductController,
  productPhotoController
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireLogin,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:id",
  requireLogin,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/products", requireLogin, isAdmin, getAllProductController);
router.get("/get-product/:slug", getProductController);
router.get('/product-photo/:pid',productPhotoController)
router.delete(
  "/delete-product/:pid",
  requireLogin,
  isAdmin,
  deleteProductController
);



export default router;
