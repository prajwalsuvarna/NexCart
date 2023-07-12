import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../contexts/search";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const Navigate = useNavigate();
  const test=()=>{
    console.log("searching", search);
  }

  const handleSubmit = async (e) => {
    console.log("searching", search);
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product/search-product/${search.keyword
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword: search.keyword }),
        }
      );
      const data = await res.json();
      console.log(data);
      setSearch({ ...search, results: data });
      Navigate("/dashboard/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-10">
      <form >
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 -mr-0.5 block w-[300px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
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
