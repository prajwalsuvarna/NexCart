import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateCategory = () => {
  return (
    <Layout title="Admin Dashboard | category">
    <div class="grid grid-rows-3 grid-flow-col gap-4">
      <div class="row-span-3 ">
       <AdminMenu/>
      </div>
      <div class="col-span-2 "><h1 className="text-5xl">Catgeory</h1></div>
      <div class="row-span-2 col-span-2 ...">
{/* fknkf */}
      </div>
    </div>
    </Layout>
  )
}

export default CreateCategory
