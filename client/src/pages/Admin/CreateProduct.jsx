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
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
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

      const data = await res.json();

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
      <div class="md:grid grid-cols-5 gap-4">
        <div class="md:col-span-1 p-3">
          <AdminMenu />
        </div>
        <div class="md:col-span-4 p-3 mt-4 shadow-md bg-white rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="row-span-3 col-span-2 bg-white p-5 rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold mb-4">Add New Product</h1>

              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="px-3 mb-5 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4"
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

              <label className="py-3 w-36 my-10 px-5 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer">
                {photo && photo.name ? photo.name : "Upload Images"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>

              {photo && (
                <div className="flex justify-center my-3">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo"
                    width="200"
                    height="200"
                    className="rounded-md"
                  />
                </div>
              )}

              <input
                type="text"
                placeholder="Name"
                className="px-3 mt-5 my-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                className="px-3 py-3 my-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                placeholder="Price"
                className="px-3 py-3 my-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                placeholder="Quantity"
                className="px-3 py-3 my-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-md"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Select
                bordered={false}
                placeholder="Shipping"
                size="large"
                showSearch
                className="px-3 w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent rounded-md"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Select.Option value="Yes">Yes</Select.Option>
                <Select.Option value="No">No</Select.Option>
              </Select>

              <button
                className="px-3 py-3 my-3 w-full bg-blue-500 text-white rounded-md focus:bg-blue-600 focus:outline-none"
                onClick={handleCreateProduct}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
