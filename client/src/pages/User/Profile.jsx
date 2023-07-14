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
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-4 border-2 border-red-600">
          <UserMenu />
          <div className="mt-5">
            <h1 className="text-5xl">User Name: {auth?.user.name}</h1>
            <h3>User Name: {auth?.user?.name}</h3>
            <h3>User Email: {auth?.user?.email}</h3>
            <h3>User Phone: {auth?.user?.phone}</h3>
          </div>
        </div>
        <div className="col-span-6 border-2 border-red-600">
          <h1 className="text-3xl text-center">User Profile</h1>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full mt-1 p-2 bg-gray-200  border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your Name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full mt-1 p-2 bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your  email"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Phone
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full mt-1 p-2 bg-gray-200  border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Address
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full mt-1 p-2 bg-gray-200  border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mt-1 p-2 bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
