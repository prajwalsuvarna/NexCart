import express from "express";
import { isAdmin, requireLogin } from "../middlewares/authMiddleware.js";
import {
  catgeoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();

//routes
//create-category
router.post(
  "/create-category",
  requireLogin,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireLogin,
  isAdmin,
  updateCategoryController
);

router.get("/categories", catgeoryController)

router.get("/get-category/:slug", singleCategoryController)

router.delete('/delete-category/:id',requireLogin,isAdmin,deleteCategoryController)

export default router;
