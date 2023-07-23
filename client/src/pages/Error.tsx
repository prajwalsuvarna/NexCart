import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout title='Error | NexCom'>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <p className='text-8xl font-serif font-extrabold mb-5'>404</p>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops, Page Not Found!</h1>
      <p className="text-lg text-gray-600 mb-8">The requested page could not be found.</p>
      <Link to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go back to Home
      </Link>
    </div>
      </Layout>
  )
}

export default PageNotFound 
