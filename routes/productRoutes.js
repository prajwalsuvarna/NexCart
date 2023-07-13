import express from "express";
import { isAdmin, requireLogin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getProductController,
  updateProductController,
  productPhotoController,
  productsFilterController,
  productCountController,
  productListController,
  searchProductController,
  getrelatedProductController,
  productCategoryController
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
router.get("/products", getAllProductController);
router.get("/get-product/:slug", getProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete(
  "/delete-product/:pid",
  requireLogin,
  isAdmin,
  deleteProductController
);
router.post("/product-filter", productsFilterController);

//product-count
router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

//search product
router.post("/search-product/:keyword", searchProductController);

//get similar products
router.get("/related-products/:pid/:cid", getrelatedProductController);

//get products by category
router.get("/products-category/:slug", productCategoryController);
export default router;
