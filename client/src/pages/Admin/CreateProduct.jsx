import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateProduct = () => {
  return (
    <Layout title="Admin Dashboard | Product">
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 ">
         <AdminMenu/>
        </div>
        <div class="col-span-2 "><h1 className="text-5xl">Product</h1></div>
        <div class="row-span-2 col-span-2 ...">
{/*  */}
        </div>
      </div>
      </Layout>
  )
}

export default CreateProduct
