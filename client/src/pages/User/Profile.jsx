import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-hot-toast";


const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth?.token}`,
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            password,
          }),
        }
      );
      const data = await res.json()
      if (res.status === 400 || !data) {
        toast.error(data.message);
      } else {
        toast.success("Profile Updated Successfully");
        const updatedUser = data?.updatedUser;
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: updatedUser,
        }));

        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: updatedUser })
        );
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.user]);

  return (
    <Layout title="User | Profile">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      <div className="sm:col-span-1 bg-white shadow-md rounded-lg p-4">
        <UserMenu />
        <div className="mt-5">
          <h1 className="text-3xl font-semibold">User Info</h1>
          <h3 className="text-lg">Name: {auth?.user?.name}</h3>
          <h3 className="text-lg">Email: {auth?.user?.email}</h3>
          <h3 className="text-lg">Phone: {auth?.user?.phone}</h3>
        </div>
      </div>
      <div className="sm:col-span-1 bg-white shadow-md rounded-lg p-4">
        <h1 className="text-3xl font-semibold mb-4">User Profile</h1>
        <form onSubmit={handleSubmit}>
          {/* Form inputs */}
          {/* ... */}
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white uppercase bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
  );
};

export default Profile;
