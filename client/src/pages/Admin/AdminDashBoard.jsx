import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from "../../contexts/auth";

const AdminDashBoard = () => {
  const [auth,setAuth]=useAuth()
  return (
    <Layout title="Admin Dashboard">
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 ">
         <AdminMenu/>
        </div>
        <div class="col-span-2 "><h1 className="text-5xl">Admin Name :{auth?.user.name}</h1></div>
        <div class="row-span-2 col-span-2 ...">
<h3>Admin Name:{auth?.user?.name}</h3>
<h3>Admin Email:{auth?.user?.email}</h3>
<h3>Admin Phone:{auth?.user?.phone}</h3>
        </div>
      </div>
      </Layout>
  )
}

export default AdminDashBoard
