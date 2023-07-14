import React from "react";
import {Badge,Avatar} from "antd"
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput.jsx";
import { useCategory } from "../../hooks/useCategory";
import { useCart } from "../../contexts/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    })
    localStorage.removeItem("auth")
    toast.success("Logout Successfull")
  }
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <GiShoppingCart className="text-4xl" />
            <span className="ml-3 text-xl">NexEcom</span>
            <SearchInput />
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to="/" className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link to={`/dashboard/${auth?.user?.role==1?"admin":"user"}`} className="mr-5 hover:text-gray-900">
              DashBoard
            </Link>
            <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdownId"
        className="text-black bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-white "
        type="button"
      >
       Categories{" "}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      <div
        id="dropdownId"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li className="hover:bg-gray-100"><Link to={`/categories`} 
          className="flex items-center px-3 py-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
              All Categories
            </Link>
            </li>

          {
            
            categories?.map((category, index) => (
              <li key={index} className="hover:bg-gray-100">
                <Link
                  to={`/category/${category.slug}`}
                  className="flex items-center px-3 py-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  <span>{category.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
            
            {!auth.user ? (
              <>
                <Link to="/register" className="mr-5 hover:text-gray-900">
                  Register
                </Link>
                <Link to="/login" className="mr-5 hover:text-gray-900">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={handleLogout}
                  to="/login"
                  className="mr-5 hover:text-gray-900"
                >
                  Logout
                </Link>
              </>
            )}
              <Badge count={cart?.length} showZero>
      <Avatar shape="square" size="large" >
      <Link to="/cart" className="mr-5 text-4xl hover:text-gray-900">
             <GiShoppingCart/>
            </Link>
        </Avatar>
    </Badge>
           
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Button
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
