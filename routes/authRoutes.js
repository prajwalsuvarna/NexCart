import express from "express"
import {registerController,loginController, testController} from "../controllers/authController.js"
import {requireLogin,isAdmin} from "../middlewares/authMiddleware.js"
//router object


const router=express.Router();

//rouutes
//register
router.post('/register',registerController);
//login
router.post('/login',loginController);

router.get('/test',requireLogin,isAdmin,testController)

//protected router auth
router.get("/user-auth",requireLogin,(req,res)=>{
    res.status(200).send({
        ok:true })
})


export default router;