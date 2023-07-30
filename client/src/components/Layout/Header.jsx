import React, { useState } from "react";
import { Badge} from "antd";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput.jsx";
import { useCategory } from "../../hooks/useCategory";
import { useCart } from "../../contexts/cart";
import DropDown from "../Form/CategoryDropDown";


export default function Header({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    })
    localStorage.removeItem("auth");
    toast.success("Logout Successfull");
  }
  

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-1 py-3 bg-white-500  border-2 shadow-md">
        <div className="container px-2 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm  flex font-bold leading-relaxed items-center  py-2 whitespace-nowrap uppercase text-black text-right"
              to="/"
            >
              <GiShoppingCart className="text-4xl" />
              NexCart
            </Link>
            <button
              className=" cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {!navbarOpen ? (
                <AiOutlineMenu className="text-4xl" />
              ) : (
                <AiOutlineClose className="text-4xl" />
              )}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col mt-2 lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <SearchInput />
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text hover:opacity-75 text-center md:text-left"
                >
                  <i className="fab fa-twitter text-lg leading-lg text opacity-75"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/dashboard/${
                    auth?.user?.role == 1 ? "admin" : "user"
                  }`}
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text hover:opacity-75 text-center md:text-left"
                >
                  <i className="fab fa-twitter text-lg leading-lg text opacity-75"></i>
                  <span>DashBoard</span>
                </Link>
              </li>

              <li className="nav-item">
                <DropDown items={categories} />
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/register"
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text hover:opacity-75 text-center md:text-left"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/login"
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text hover:opacity-75 text-center md:text-left"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    onClick={handleLogout}
                    to="/login"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text hover:opacity-75 text-center md:text-left"
                  >
                    Logout
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="px-3 relative mt-[6px] flex items-center text-xs uppercase font-bold leading-snug text hover:opacity-75 text-center md:text-left"
                >
                  CART
                  <Badge count={cart?.length} showZero className=""></Badge>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
