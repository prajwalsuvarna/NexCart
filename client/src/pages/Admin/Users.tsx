import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout title="Admin Dashboard | All users">
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 ">
         <AdminMenu/>
        </div>
        <div class="col-span-2 "><h1 className="text-5xl">All Users</h1></div>
        <div class="row-span-2 col-span-2 ...">
{/* lflflf */}
        </div>
      </div>
      </Layout>
  )
}

export default Users
