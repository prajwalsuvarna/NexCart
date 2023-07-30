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
  }, [slug]);

  return (
    <Layout title="Category Product">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">
          Products related to category - {category.name}
        </h1>
        <p className="text-lg font-medium mb-2">
          {products.length} results found
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="w-full h-36 object-cover rounded-t-lg"
                src={`${import.meta.env.VITE_API_URL}/api/product/product-photo/${product._id}`}
                alt="product image"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
