import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../contexts/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();


  const getAllProducts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/products`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.log(err);
      toast.error("Error in getting all products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Admin Dashboard | All Products">
      <div class="md:grid grid-cols-5 gap-4">
        <div class="md:col-span-1 p-3">
          <AdminMenu />
        </div>
        <div class="md:col-span-4 p-3 mt-4 shadow-md bg-white rounded-lg">
        <h1 className="text-center  text-5xl px-2 font-semibold">Available Products</h1>
          <div className="flex items-center flex-wrap justify-between p-4 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
            {!products && <h1>No products Available</h1>}
            {products?.map((product, index) => (
              <div
                key={index}
                className=" m-3 w-64 h-full bg-white border rounded-lg  dark:bg-gray-800 dark:border-gray-700 shadow-md"
              >
                <img
                  className="p-4 h-56 w-full rounded-t-lg"
                  src={`${
                    import.meta.env.VITE_API_URL
                  }/api/product/product-photo/${product._id}`}
                  alt="product image"
                />
                <div className="px-5 mt-5  ">
                  <div className="  flex flex-col flex-wrap items-center mb-5 justify-end">
                    <span className="text-3xl flex justify-between font-bold text-gray-900 dark:text-white">
                      {product.price}
                      {product.name}
                    </span>
                    {product.description}
                    <div className="flex ">
                      <button
                        onClick={() => navigate(`/product/${product.slug}`)}
                        className="  mt-5 mr-1 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-2 py-1 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-500"
                      >
                        More Details
                      </button>
                      <button
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("Product added to cart");
                        }}
                        className="mt-5  text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
