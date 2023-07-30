import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../contexts/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/all-orders`,
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

  //handle change status
  const handleChangeStatus = async (value, orderId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/order-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${auth.token}`,
          },
          body: JSON.stringify({
            status: value,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 400 || !data) {
        toast.error(data.message);
      } else {
        toast.success("Status Updated Successfully");
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
<Layout title="Admin Dashboard | Product">
<div class="md:grid grid-cols-5 gap-4">
  <div class="md:col-span-1 p-3">
    <AdminMenu />
  </div>
  <div class="md:col-span-4 p-3 mt-4 shadow-md bg-white rounded-lg">
    <h1 className="text-3xl text-center font-semibold">All Orders</h1>
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
                      <td class="px-6 py-4">
                        <Select
                          bordered={false}
                          onChange={(value) => {
                            handleChangeStatus(value, o?._id);
                          }}
                          defaultValue={o?.status}
                        >
                          {status?.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td class="px-6 py-4">{o?.buyer?.name}</td>
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
                <div className="flex flex-wrap justify-center md:justify-start">
                  {o?.products?.map((item, index) => (
                    <div key={index} className="border m-4 p-4 bg-white rounded-md shadow-md flex flex-col items-center">
                    <img
                      className="h-36 w-36 rounded-t-lg object-cover"
                      src={`${import.meta.env.VITE_API_URL}/api/product/product-photo/${item._id}`}
                      alt="product"
                    />
                    <div className="mt-4">
                      <h1 className="font-semibold text-gray-900 text-lg">{item?.name}</h1>
                      <p className="text-gray-600">{item?.description}</p>
                      <p className="text-gray-900 font-semibold mt-2">${item?.price}</p>
                    </div>
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

export default AdminOrders;



