import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../contexts/auth";

const AdminDashBoard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title="Admin Dashboard">
      <div class="md:grid grid-cols-5 gap-4">
        <div class="md:col-span-2 p-3">
          <AdminMenu />
        </div>
        <div class="md:col-span-3 p-3 mt-4 shadow-md bg-white rounded-lg">
          <h1 className="text-4xl pt-4 font-bold mb-4">
            Welcome Back, Admin: {auth?.user.name}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold">Name:</h3>
              <p>{auth?.user?.name}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Email:</h3>
              <p>{auth?.user?.email}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Phone:</h3>
              <p>{auth?.user?.phone}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Address:</h3>
              <p>{auth?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashBoard;
