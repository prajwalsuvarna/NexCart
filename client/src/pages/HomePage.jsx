import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../contexts/auth";
import { useCart } from "../contexts/cart";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  console.log("page initial", page);

  //get total
  const getTotal = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/product-count`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();
      setTotal(data["total"]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("total", total);
  const getAllProducts = async () => {
    try {
      setLoading(true);
      console.log("page", page);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/product-list/${page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      console.log(data);
      setProducts(data["products"]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
    getAllCategories();
    getTotal();
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) FilterProduct();
  }, [checked, radio]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((item) => item !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (page == 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/product-list/${page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();
      setLoading(false);
      console.log(page);
      setProducts((prevProducts) => [...prevProducts, ...data["products"]]);
    } catch (error) {
      console.log(error);
    }
  };

  const FilterProduct = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/product-filter`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checked, radio }),
        }
      );

      const data = await res.json();
      console.log(data["products"]);
      setProducts(data["products"]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Home | NexCom">
      <div className="grid grid-cols-5 gap-4 min-h-screen">
        <div className="col-span-1">
          <h1 className="text-5xl">Filter By category</h1>
          <div className="flex flex-col">
            {categories?.map((category, index) => (
              <Checkbox
                key={index}
                onChange={(e) => {
                  handleFilter(e.target.checked, category._id);
                }}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>

          <h1 className="text-5xl">Filter By price</h1>
          <div className="flex flex-col">
            <Radio.Group
              value={radio}
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((price, index) => (
                <Radio key={index} value={price.array}>
                  {price.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>

          <div className="flex flex-col">
            <button
              className="my-2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset filters
            </button>
          </div>
        </div>
        <div className="col-span-4 ">
          <h1 className="text-5xl">All Products</h1>
          <div className="flex flex-wrap  border-2 border-red-300">
            {products?.map((product, index) => (
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
                    <button
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Product added to cart");
                      }}
                      className="my-2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="my-2  text-white bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
