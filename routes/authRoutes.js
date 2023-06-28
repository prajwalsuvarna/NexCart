import express from "express"
import {registerController,loginController, testController} from "../controllers/authController.js"
import {requireLogin} from "../middlewares/authMiddleware.js"
//router object


const router=express.Router();

//rouutes
//register
router.post('/register',registerController);
//login
router.post('/login',loginController);

router.get('/test',requireLogin,testController)


export default router;