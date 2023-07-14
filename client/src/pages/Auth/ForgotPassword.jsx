import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link ,useNavigate,useLocation} from "react-router-dom"
import { GiShoppingCart } from "react-icons/gi"
import toast from "react-hot-toast"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer,setAnswer] = useState()

  const Navigate = useNavigate()

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
            answer
          }),

        }
      );
      const data = await res.json()
      if (res.status === 400 || !data) {
        toast.error(data.message)
      } else {
        toast.success("Password Updated Successfully!");
        Navigate("/login")
        setEmail("")
        setNewPassword("")
        setAnswer("")
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <Layout title="ForgotPassword | NexCom">
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <GiShoppingCart className="text-4xl" />
            <span className="ml-3 text-xl">Forgot Password</span>
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
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
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
               Enter New  Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full mt-1 p-2 bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Enter your new  password"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="answer"
                className="block text-sm font-medium text-gray-700 undefined"
              >
               Enter your answer
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="block w-full mt-1 p-2 bg-gray-200 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="What is your favourite sport?"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
            
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
    </Layout>
  );
};

export default ForgotPassword;
