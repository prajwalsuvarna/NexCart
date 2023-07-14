import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, cpassword, phone, address, answer } =
      req.body;
    //check if user already exists
    if (
      !name ||
      !email ||
      !password ||
      !cpassword ||
      !phone ||
      !address ||
      !answer
    ) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    if (password !== cpassword) {
      return res.status(400).send({
        success: false,
        message: "Password and confirm password do not match",
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
      answer,
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
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login error",
      error: error.message,
    });
  }
};

//forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // ..check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong Email or answer",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Forgot password error",
      error: error.message,
    });
  }
};

export const testController = async (req, res) => {
  res.send("protected route");
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;
    const user = await userModel.findById(req.user.id);
    if (password && password?.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and six characthers long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(req.user.id, {
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      address: address || user.address,
      password: hashedPassword || user.password,
    });
    return res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Update profile error",
      error: error.message,
    });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({
        buyer: req.user.id,
      })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.status(200).send({
      success: true,
      message: "orders fetched successfully",
      orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in getting orders",
      error: e.message,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.status(200).send({
      success: true,
      message: "orders fetched successfully",
      orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in getting orders",
      error: e.message,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const { oid } = req.params;
    const orders = await orderModel.findByIdAndUpdate(
      oid,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "orders fetched successfully",
      orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "error in getting orders",
      error: e.message,
    });
  }
};
