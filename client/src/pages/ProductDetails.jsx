import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const getRelatedProducts = async (pid, cid) => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/product/related-products/${pid}/${cid}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
      setRelatedProducts(data["related"]);
    } catch (error) {
      console.log(error);
      toast.error("Error in getting related products");
    }
  };

  const getProduct = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/get-product/${slug}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setProduct(data["product"]);
      await getRelatedProducts(
        data["product"]._id,
        data["product"].category._id
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  return (
    <Layout title="">
      <div className="container">
        {JSON.stringify(product)}
        <div className="row">
          <div className="col-md-6">
            <img src={product?.image} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <img
              className="p-4 h-36 w-36 rounded-t-lg"
              src={`${import.meta.env.VITE_API_URL}/api/product/product-photo/${
                product._id
              }`}
              alt="product image"
            />
            <h1>product name:{product?.name}</h1>
            <p>product {product?.description}</p>
            <p>{product?.price}</p>
            <p>{product?.category?.name}</p>
            <p>{product?.quantity}</p>
            <p>{product?.shipping}</p>
          </div>
        </div>
        <h2>Related products -{product?.category?.name}</h2>
        <div className="row flex flex-wrap">
          {relatedProducts?.map((product, index) => (
            <div
              key={index}
              className=" m-3 w-56 h-[400px] bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-red-500"
            >
              <img
                className="p-4 h-36 w-36 rounded-t-lg"
                src={`${
                  import.meta.env.VITE_API_URL
                }/api/product/product-photo/${product._id}`}
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
      </div>
    </Layout>
  );
};

export default ProductDetails;
