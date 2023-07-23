import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/search";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const searchPromise = async () => {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/product/search-product/${inputValue}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ keyword: inputValue }),
          }
        );
        const data = await res.json();
        setSearch({ ...search, results: data });
        navigate("/search");
        return data;
      };

      // Show a loading toast notification
      const searchResults = await toast.promise(searchPromise(), {
        loading: "Searching...",
        success: (result) =>
          result.length > 0
            ? `Found ${result.length} result${result.length > 1 ? "s" : ""} for "${inputValue}"`
            : "No results found. :-/",
        error: "An error occurred during the search.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="">
      <form>
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 -mr-0.5 block w-[170px] sm:w-[200px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSubmit}
            className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            type="button"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
