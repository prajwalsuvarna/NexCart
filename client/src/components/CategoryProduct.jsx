import Layout from "./Layout/Layout";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const getProductsByCat = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/products-category/${slug}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();
      setProducts(data["products"]);
      setCategory(data["category"]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (slug) getProductsByCat();
  }, []);

  return (
    <Layout title="Category Product">
      {JSON.stringify(slug)}
      <h1>Products related to category -{category.name}</h1>
      <p>{products.length} results found</p>
      <div className="flex flex-wrap  border-2 border-red-300">
        {products?.map((product, index) => (
          <div
            key={index}
            className=" m-3 w-56 h-[400px] bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-red-500"
          >
            <img
              className="p-4 h-36 w-36 rounded-t-lg"
              src={`${import.meta.env.VITE_API_URL}/api/product/product-photo/${
                product._id
              }`}
              alt="product image"
            />
            <div className="px-5   pb-2">
              <div className=" border-2  flex flex-col flex-wrap items-center mb-10 justify-end">
                <span className="text-3xl flex justify-between font-bold text-gray-900 dark:text-white">
                  {product.price}
                  {product.name}
                </span>
                {product.description}
                <button
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className=" my-2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  More Details
                </button>
                <button className="my-2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
