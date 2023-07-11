import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [auth, setAuth] = useAuth();
  const Navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");

  //get all categories
  const getAllCategories = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/categories`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCategories(data["catgeory"]);
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all categories");
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      console.log(name, description, price, quantity, shipping, category);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      console.log(productData);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/create-product`,
        {
          method: "POST",
          headers: {
            Authorization: `${auth?.token}`,
          },
          credentials: "include",
          body: productData,
        }
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success(`${name} is created`);
        Navigate("/dashboard/admin/products");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setShipping("");
        setCategory(null);
        setPhoto("");
        getAllCategories();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in creating product");
    }
  };
  // setCategory("")
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title="Admin Dashboard | Product">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 col-span-1 ">
          <AdminMenu />
        </div>
        <div className="row-span-3 col-span-2 ">
          <h1 className="text-5xl mb-3 ">Product</h1>
          <Select
            bordered={false}
            placeholder="Select a catehory"
            size="large"
            showSearch
            className=" px-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            onChange={(value) => {
              setCategory(value);
            }}
          >
            {categories?.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
          <div className="flex flex-col ">
            <label className="py-3 w-36 my-3 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              {photo && photo.name ? photo.name : "Upload Images"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="my-3 flex justify-center">
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="productphoyo"
                width="200"
                height="200"
                className=""
              />
            )}
          </div>
          <div className="flex flex-col my-3 mx-2">
            <input
              type="text"
              placeholder="Name"
              className="px-3 py-3 my-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-3 mx-2">
            <input
              type="text"
              placeholder="Description"
              className="px-3 py-3 my-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-3 mx-2">
            <input
              type="number"
              placeholder="Price"
              className="px-3 py-3 my-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-3 mx-2">
            <input
              type="number"
              placeholder="Quantity"
              className="px-3 py-3 my-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-3 mx-2">
            <Select
              bordered={false}
              placeholder="Shipping"
              size="large"
              showSearch
              className=" px-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(value) => {
                setShipping(value);
              }}
            >
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
          </div>
          <div className="flex flex-col my-3 mx-2">
            <button
              className="px-3 py-3 my-3 w-full bg-blue-500 text-white rounded-md focus:bg-blue-600 focus:outline-none"
              onClick={handleCreateProduct}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="row-span-2 col-span-2 ..."></div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
