import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setProduct(data["product"]);
      await getRelatedProducts(
        data["product"]._id,
        data["product"].category._id
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) getProduct();
  }, [slug]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout title={product.name}>
      <div className="container">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img
              className="h-[500px] w-full object-cover rounded-md"
              src={`${import.meta.env.VITE_API_URL}/api/product/product-photo/${product._id}`}
              alt="product"
              onError={(e) => {
                e.target.src = "/path/to/fallback-image.jpg"; // Provide a fallback image URL here
              }}
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-semibold">{product?.name}</h1>
            <p className="text-gray-600">{product?.description}</p>
            <p className="text-xl font-semibold mt-2">${product?.price}</p>
            <p className="text-gray-700">Category: {product?.category?.name}</p>
            <p className="text-gray-700">Quantity: {product?.quantity}</p>
            <button
              className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={() => {
                // Add the add-to-cart functionality here
                toast.success("Product added to cart!");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <h2 className="text-xl text-center font-semibold mt-8">
          Related products - {product?.category?.name}
          {relatedProducts?.length === 0 && (
            <span className="text-red-500"> No related products found</span>
          )}
        </h2>
        <div className="grid my-5 grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts?.map((product, index) => (
            <div key={index} className="border flex justify-center items-center flex-col bg-white rounded-md shadow-md p-4">
              <img
                className="h-36 w-36 object-cover rounded-lg"
                src={`${import.meta.env.VITE_API_URL}/api/product/product-photo/${product._id}`}
                alt="product"
                onError={(e) => {
                  e.target.src = "/path/to/fallback-image.jpg"; // Provide a fallback image URL here
                }}
              />
              <div className="mt-4">
                <h1 className="font-semibold text-center text-gray-900">{product?.name}</h1>
                <p className="text-gray-600 text-center">{product?.description}</p>
                <p className="text-xl text-center font-semibold mt-2">${product?.price}</p>
                <div className="flex mt-4">
                  <Link
                    to={`/product/${product.slug}`}
                    className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    More Details
                  </Link>
                  <button
                    className="bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={() => {
                      // Add the add-to-cart functionality here
                      toast.success("Product added to cart!");
                    }}
                  >
                    Add to Cart
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
