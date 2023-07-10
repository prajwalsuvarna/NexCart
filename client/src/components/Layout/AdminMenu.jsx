import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const AdminMenu = () => {
    const [auth,setAuth] = useAuth()
  return (
    <>
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 ">
          <div className="w-96 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <h1 className="text-3xl text-center px-2 my-3">Admin Panel</h1>
            <Link
              to="/dashboard/admin/create-category"
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              Create Category
            </Link>
            <Link
              to="/dashboard/admin/create-product"
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              Create Product
            </Link>
            <Link
              to="/dashboard/admin/users"
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
            >
              Users
            </Link>
          </div>
        </div>
        <div class="col-span-2 "><h1 className="text-5xl">Admin Name :{auth?.user.name}</h1></div>
        <div class="row-span-2 col-span-2 ...">
<h3>Admin Name:{auth?.user?.name}</h3>
<h3>Admin Email:{auth?.user?.email}</h3>
<h3>Admin Phone:{auth?.user?.phone}</h3>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
