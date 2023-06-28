import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";

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
    const hashedPassword = await hashPassword(password)
    const newUser = new userModel({ name, email,password:hashedPassword, phone, address });
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
