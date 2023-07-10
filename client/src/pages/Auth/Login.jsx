import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link ,useNavigate,useLocation} from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth()

  const Navigate = useNavigate();
  const location = useLocation()

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),

        }
      );
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        toast.error(data.message);
      } else {
        toast.success("Login Successfull");
        setAuth({...auth,token:data.token,user:data.user})
        localStorage.setItem("auth",JSON.stringify(data))
        Navigate(location.state ||"/");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <Layout title="Login | NexCom">
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <GiShoppingCart className="text-4xl" />
            <span className="ml-3 text-xl">NexEcom</span>
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
