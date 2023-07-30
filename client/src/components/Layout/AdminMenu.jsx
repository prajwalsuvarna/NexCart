import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminMenu = () => {
  const location = useLocation();

  return (
    <>
      <div className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <h1 className="text-3xl text-center px-2 my-3">Admin Panel</h1>
        <Link
          to="/dashboard/admin/create-category"
          className={`block w-full px-4 py-2 border-b border-gray-200 cursor-pointer ${
            location.pathname === "/dashboard/admin/create-category"
              ? "bg-gray-100 text-blue-700"
              : "hover:bg-gray-100 hover:text-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}
        >
          Create Category
        </Link>
        <Link
          to="/dashboard/admin/create-product"
          className={`block w-full px-4 py-2 border-b border-gray-200 cursor-pointer ${
            location.pathname === "/dashboard/admin/create-product"
              ? "bg-gray-100 text-blue-700"
              : "hover:bg-gray-100 hover:text-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}
        >
          Create Product
        </Link>
        <Link
          to="/dashboard/admin/orders"
          className={`block w-full px-4 py-2 border-b border-gray-200 cursor-pointer ${
            location.pathname === "/dashboard/admin/orders"
              ? "bg-gray-100 text-blue-700"
              : "hover:bg-gray-100 hover:text-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}
        >
          All Orders
        </Link>
        <Link
          to="/dashboard/admin/products"
          className={`block w-full px-4 py-2 border-b border-gray-200 cursor-pointer ${
            location.pathname === "/dashboard/admin/products"
              ? "bg-gray-100 text-blue-700"
              : "hover:bg-gray-100 hover:text-blue-700"
          } focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white`}
        >
          All Products
        </Link>
      </div>
    </>
  );
};

export default AdminMenu;
