import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../contexts/cart";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

const Cart = () => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //gateway payment token
  const getToken = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/braintree/token`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await res.json();
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
  }, []);

  // Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/braintree/payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth?.token}`,
          },
          body: JSON.stringify({ nonce, cart }),
        }
      );
      const data = await res.json();
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/u/orders");
      toast.success("Payment Successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Payment Failed");
    }
  };

  return (
    <Layout title="Cart | NexCom">
      <div className="container w-full min-h-screen p-4">
        <h1 className="text-4xl text-center py-2">{`Hello ${
          auth?.token && auth?.user?.name
        }`}</h1>
        <h2 className="text-center mb-5 text-xl">
          {cart.length > 0
            ? `You have ${cart.length} items in your cart.${
                auth?.token ? "" : " Please Login to checkout."
              }`
            : "Your Cart is Empty"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-2 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="border bg-gray-100 rounded-md shadow-md max-h-[350px] p-4"
                >
                  <img
                    className="h-36 w-36 object-cover rounded-t-lg mx-auto"
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/api/product/product-photo/${item._id}`}
                    alt="product image"
                  />
                  <h1 className="text-lg font-semibold mt-2 text-center">
                    {item.name}
                  </h1>
                  <p className="text-lg font-semibold mt-2 text-center">
                    ${item.price}
                  </p>
                  <button
                    className="block mx-auto mt-4 px-3 py-2 text-white rounded-md text-center bg-red-500"
                    onClick={() => removeCartItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xl text-center col-span-full">
                Your cart is empty.
              </p>
            )}
          </div>

          {/* Cart Summary */}
          <div className="md:col-span-1 bg-gray-200 p-4">
            <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
            <p className="mb-2">Total: {totalPrice()}</p>

            {auth?.user?.address ? (
              <div className="mb-3">
                <h4 className="text-2xl">Current Address</h4>
                <h5 className="mb-2">{auth?.user?.address}</h5>
                <button
                  className="px-3 py-2 text-white rounded-md text-center bg-yellow-500"
                  onClick={() => navigate("/dashboard/u/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="px-3 py-2 text-white rounded-md text-center bg-yellow-500"
                    onClick={() => navigate("/dashboard/u/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="px-3 py-2 text-white rounded-md text-center bg-red-500"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}

            <div className="mt-4">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-2">Payment</h2>
                  <div className="mb-4">
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  </div>
                  <button
                    className="bg-blue-500 text-white font-medium rounded-md text-sm px-4 py-2 mr-2 hover:bg-blue-600"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
