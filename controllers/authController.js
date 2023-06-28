import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //check if user already exists
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration error",
      error: error.message,
    });
  }
};

//Login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).send({
            success:false,
            message:"Invalid username or password"
        })
    }
    const user= await userModel.findOne({email});
    if(!user){
        return res.status(400).send({
            success:false,
            message:"Email is not registered"
        })
    }
    const match=comparePassword(password,user.password);
    if(!match){
        return res.status(400).send({
            success:false,
            message:"Invalid username or password"
        })
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.status(200).send({
        success:true,
        message:'Login Successful',
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address
        },
        token
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login error",
      error: error.message,
    });
  }
};
