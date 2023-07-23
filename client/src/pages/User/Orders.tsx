import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../contexts/auth";
import moment from "moment";

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/orders`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `${auth.token}`,
          },
        }
      );
      const data = await res.json();
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="User | Orders">
      <div class="grid grid-cols-3 grid-flow-col gap-4">
        <div class="row-span-1 ">
          <UserMenu />
        </div>
        <div class="col-span-2 ">
          <h1 className="text-5xl">Orders</h1>
          {/* {JSON.stringify(orders,null,4)} */}

          {orders?.map((o, i) => {
            return (
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        sr.no
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Buyer
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Orders
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Payment
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {i + 1}
                      </th>
                      <td class="px-6 py-4">{o?.status}</td>
                      <td class="px-6 py-4">{o?.buyer.name}</td>
                      <td class="px-6 py-4">
                        {moment(o?.createdAt).fromNow()}
                      </td>
                      <td class="px-6 py-4">
                        {o?.payment?.success ? "success" : "failed"}
                      </td>
                      <td class="px-6 py-4">{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                {o?.products?.map((item, index) => (
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
              </div>
            ))}
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
