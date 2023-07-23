import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../contexts/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();

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
  }, [])

  return (
    <Layout title="Admin Dashboard | All Products">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 ">
          <AdminMenu />
        </div>
        <div className="row-span-2 col-span-2  w-full">
          <div className="flex items-center flex-wrap justify-between p-4 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
            {!products && <h1>No products Available</h1>}
            {products?.map((product, index) => (
              <Link to={`/dashboard/admin/product/${product.slug}`}>
                <div className=" m-3 w-48 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className="p-8 rounded-t-lg"
                      src={`${import.meta.env.VITE_API_URL}/api/product/product-photo/${product._id}`}
                      alt="product image"
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.name}
                    </h5>

                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.price}
                      </span>
                      <div>{product.description}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
