import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const AdminDashBoard = () => {
  return (
    <Layout title="Admin Dashboard | NexCom">
        <div className="flex flex-col  pt-6 sm:justify-center sm:pt-0 bg-gray-50">
            <div>
              <AdminMenu/>
            </div>
            </div>
        </Layout>
  )
}

export default AdminDashBoard
