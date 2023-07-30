import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log(`Clicked: ${item}`);
    setSelectedItem(item.key);
    toggleDropdown(); 
  };

  return (
    <div className="relative z-20 ">
      <button
        onClick={toggleDropdown}
        className="px-3 my-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
      >
        <span className="mr-2">Categories</span>
        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          } self-center `}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 11-1.414 1.414L10 5.414l-2.293 2.293a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute top-10 left-0 w-40 py-1 bg-white shadow rounded">
          <li className="px-4 font-bold  cursor-pointer transition-colors duration-150 hover:bg-gray-100 hover:text-gray-800 dark:hover:text-gray-200">
            <Link
              to={`/categories`}
              className="flex items-center px-3 py-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            >
              All Categories
            </Link>
          </li>
          {items?.map((item) => (
            <li
              key={item.key}
              onClick={() => window.location.reload()}
              className="px-4  cursor-pointer transition-colors duration-150 hover:bg-gray-100 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <Link
                to={`/category/${item.slug}`}
                className="flex items-center px-3 py-2 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <span className="mr-1">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
