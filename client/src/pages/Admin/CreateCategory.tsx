import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import CategoryFrom from "../../components/Form/CategoryForm";
import { useAuth } from "../../contexts/auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [auth, setAuth] = useAuth();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle Form to create new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/create-category`,
        {
          method: "POST",
          headers: {
            Authorization: `${auth?.token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name }),
        }
      );
      const data = await res.json()
      if (res.ok) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategories();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in creating category");
    }
  };

  //handle update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/update-category/${
          selected._id
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `${auth?.token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name: updatedName }),
        }
      );
      const data = await res.json()
      if (res.ok) {
        toast.success(`Updated successfully`);
        setName("");
        setUpdatedName("");
        setSelected(null);
        getAllCategories();
      } else {
        toast.error(data.error);
      }

      setVisible(false);
    } catch (error) {
      console.log(error);
      toast.error("Error in updating category");
    }
  };

  //get all categories
  const getAllCategories = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/categories`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCategories(data["catgeory"]);
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all categories");
    }
  };

  //handle delete category
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category/delete-category/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${auth?.token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(`Deleted successfully`);
        getAllCategories();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title="Admin Dashboard | category">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 ">
          <AdminMenu />
        </div>
        <div className="col-span-2 ">
          <h1 className="text-5xl">Catgeory</h1>
          <CategoryFrom
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <div className="row-span-2 col-span-2 ">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((category, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {category.name}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="px-2 mx-2 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-700 rounded-md dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-500"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(category.name);
                            setSelected(category);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(category._id);
                          }}
                          className="px-2 mx-2 py-1 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-700 rounded-md dark:bg-red-600 hover:bg-red-500 dark:hover:bg-red-500 focus:outline-none focus:bg-red-500 dark:focus:bg-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <h1 className="text-2xl">Edit Category</h1>
            <CategoryFrom
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
