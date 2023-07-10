import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Orders = () => {
  return (
       <Layout title="User | Orders">
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 ">
         <UserMenu/>
        </div>
        <div class="col-span-2 "><h1 className="text-5xl">Orders</h1></div>
        <div class="row-span-2 col-span-2 ...">
orders
        </div>
      </div>
      </Layout>
  )
}

export default Orders
