import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { useSearch } from "../contexts/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useSearch();

  return (
    <Layout>
      {search?.results?.length > 0 ?(
        <h1 className="text-5xl text-center">
          Search results for {search.keyword}-({search.results.length})
        </h1>
      ):(
        <h1 className="text-5xl text-center">
            No results found for {search.keyword}
            </h1>
      )}
      <div className="flex flex-wrap  border-2 border-red-300">
        {search.results?.map((product, index) => (
          <Link key={index} to={`/dashboard/admin/product/${product.slug}`}>
            <div className=" m-3 w-56 h-[400px] bg-white border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border-red-500">
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
                  <div className=" my-2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    More Details
                  </div>
                  <div className="my-2  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to cart
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Search;
