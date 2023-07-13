import React from "react";
import Layout from "./Layout/Layout";
import { useCategory } from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const Categories = useCategory();
  return (
    <Layout title="Categories">
      <h1 className="text-5xl font-bold text-center">All categories</h1>
      <div className="flex justify-center flex-wrap">
        {Categories?.map((category) => (
          <Link to={`/category/${category.slug}`} key={category._id}
            className="block max-w-[500px] m-3 p-6 bg-white border border-gray-200
            rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800
            dark:border-gray-700 dark:hover:bg-gray-700" >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {category.name}
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
