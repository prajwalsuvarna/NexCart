import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import slugify from "slugify";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";
//configuring dotenv
dotenv.config();

//braintree config

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // validations
    console.log(req.fields);
    console.log(req.files);
    if (!name || !description || !price || !category || !quantity || !photo)
      return res.status(500).send({ error: "Enter all the feilds" });
    if (photo.size > 1000000)
      return res.status(500).send({ error: "photo should be less then 1mb" });
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    await product.save();
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "New product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "product retrieval successsfull",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting product",
    });
  }
};

//get all products
export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .populate("category")
      .sort({ createdAt: -1 }); //removing photo to reduce size
    res.status(200).send({
      success: true,
      message: "All Products",
      products,
      totalProds: products.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting all products",
    });
  }
};
export const updateProductController = async (req, res) => {
  try {
    console.log(req.fields);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      sucess: true,
      message: "Product Deleted succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting product",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product && product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting photo",
    });
  }
};

export const productsFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      message: "product filtered successsfull",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting photo",
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "product count successsfull",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting photo",
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 1;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({
        createdAt: -1,
      });
    res.status(200).send({
      success: true,
      message: `product for page ${page}  list successsfull`,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting photo",
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    return res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in search product",
    });
  }
};

//get related products
export const getrelatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const related = await productModel
      .find({
        _id: { $ne: pid },
        category: cid,
      })
      .limit(3)
      .populate("category")
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "related product successsfull",
      related,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting related product",
    });
  }
};

//get product by category
export const productCategoryController = async (req, res) => {
  try {
    const slug = req.params.slug;
    const category = await categoryModel.findOne({ slug });
    const products = await productModel
      .find({ category })
      .populate("category")
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "related product successsfull",
      products,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting related product",
    });
  }
};

//braintree payment implementation
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      res.send(response);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in generating braintree token",
    });
  }
};

//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.forEach((p) => {
      total += p.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      (error, result) => {
        if (error) {
          res.status(500).json(error);
        } else {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user.id,
            status: "processing",
          }).save();
          res.json({ ok: true });
        }
      }
    );

    // gateway.transaction.sale({
    //   amount: "10.00",
    //   paymentMethodNonce: nonceFromTheClient,
    //   deviceData: deviceDataFromTheClient,
    //   options: {
    //     submitForSettlement: true
    //   }
    // }, (err, result) => {
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in generating braintree token",
    });
  }
};
