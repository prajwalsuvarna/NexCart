import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../contexts/auth'

const HomePage = () => {
  const [auth,setAuth] = useAuth()
  console.log(auth)
  return (
    <Layout title='Home | NexCom'>
        <h1>Home Page</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
     </Layout>
  )
}

export default HomePage
