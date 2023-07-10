import express from "express"
import {registerController,loginController, testController, forgotPasswordController} from "../controllers/authController.js"
import {requireLogin,isAdmin} from "../middlewares/authMiddleware.js"

//router object


const router=express.Router();

//rouutes
//register
router.post('/register',registerController);
//login
router.post('/login',loginController);

//forgot password
router.post('/forgot-password',forgotPasswordController);

router.get('/test',requireLogin,isAdmin,testController)

//protected router auth for user
router.get("/user-auth",requireLogin,(req,res)=>{
    console.log("testing auth")
    res.status(200).send({
        ok:true })
})

//protected router auth for admin
router.get("/admin-auth",requireLogin,isAdmin,(req,res)=>{
    console.log("testing auth")
    console.log(req.user)
    res.status(200).send({
        ok:true,message:"admin bvc" })
})


export default router;