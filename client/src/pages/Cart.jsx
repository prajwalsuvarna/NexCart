import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../contexts/cart";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

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
      console.log(total)
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let existcart = localStorage.getItem("cart");
    if (existcart) {
      setCart(JSON.parse(existcart));
    }
  }, []);
  return (
    <Layout>
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
            {cart?.map((item,index) => (
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
                  <h5 className="mb-2" >{auth?.user?.address}</h5>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
