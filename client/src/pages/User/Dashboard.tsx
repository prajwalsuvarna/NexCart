import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import {useAuth} from '../../contexts/auth'

const Dashboard = () => {
  const [auth,setAuth]=useAuth()

  return (
       <Layout title="User | Dashboard">
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-3 ">
         <UserMenu/>
        </div>
        <div class="col-span-2 "><h1 className="text-5xl">User Name :{auth?.user.name}</h1></div>
        <div class="row-span-2 col-span-2 ...">
{/* dfff */}
        </div>
      </div>
      </Layout>
  )
}

export default Dashboard
