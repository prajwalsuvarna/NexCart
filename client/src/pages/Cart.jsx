import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../contexts/cart";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import  toast  from "react-hot-toast";

const Cart = () => {
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //gateway payement token
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

  const removeCartitem = (id) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price;
      });
      console.log(total);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log("ClientToken", clientToken);

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  useEffect(() => {
    let existcart = localStorage.getItem("cart");
    if (existcart) {
      setCart(JSON.parse(existcart));
    }
  }, []);

  //payment
  const handlepayment = async() => {
    try{
      setLoading(true)
      const {nonce}=await instance.requestPaymentMethod()
      console.log(nonce)
      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/product/braintree/payment`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${auth?.token}`,
        },
        body:JSON.stringify({nonce,cart})
      })
      const data=await res.json()
      setLoading(false)
      localStorage.removeItem("cart")
      setCart([])
      navigate("/dashboard/u/orders")
      toast.success("Payment Successfull")
      console.log(data)


    }catch(error){
      console.log(error)
      setLoading(false)
      toast.error("Payment Failed") 

    }
  };
  return (
    <Layout title="Cart |NexCom">
      <div className="container w-screen min-h-screen">
        <h1 className="text-5xl text-center py-2">{`Hello ${
          auth?.token && auth?.user?.name
        }`}</h1>
        <h2 className="text-center mb-5 text-3xl">
          {cart.length > 0
            ? `You have ${cart.length} items in your cart .
        ${auth?.token ? "" : "Please Login to checkout"}`
            : "Your Cart is Empty"}
        </h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 border-2 border-red-600">
            <h1>Checkout</h1>
            {cart?.map((item, index) => (
              <div key={index} className="border bg-gray-100 rounded-md">
                <img
                  className="p-4 h-36 w-36 rounded-t-lg"
                  src={`${
                    import.meta.env.VITE_API_URL
                  }/api/product/product-photo/${item._id}`}
                  alt="product image"
                />
                <h1>{item?.name}</h1>
                <h1>{item?.price}</h1>
                <button
                  className="px-3 py-2 text-white rounded-md text-center bg-red-500"
                  onClick={() => removeCartitem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="col-span-2 bg-gray-200">
            <h1>Cart Summary</h1>
            <p>total|checkout|Payment</p>
            <p>Total :{totalPrice()}</p>

            {auth?.user?.address ? (
              <>
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
              </>
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
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}

<div className="mt-2">
<div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlepayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
