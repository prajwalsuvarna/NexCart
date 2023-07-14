import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController
} from "../controllers/authController.js";
import { requireLogin, isAdmin } from "../middlewares/authMiddleware.js";

//router object

const router = express.Router();

//rouutes
//register
router.post("/register", registerController);
//login
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireLogin, isAdmin, testController);

//protected router auth for user
router.get("/user-auth", requireLogin, (req, res) => {

  res.status(200).send({
    ok: true,
  });
});

//protected router auth for admin
router.get("/admin-auth", requireLogin, isAdmin, (req, res) => {
  
  res.status(200).send({
    ok: true,
    message: "admin bvc",
  });
});

//update-profile
router.put("/profile", requireLogin, updateProfileController);


//orders by a user
router.get("/orders", requireLogin, getOrdersController);

//orders by all
router.get("/all-orders", requireLogin, isAdmin, getAllOrdersController);

//order status update
router.put("/order-status/:oid", requireLogin, isAdmin, orderStatusController);


export default router;
