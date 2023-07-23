import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-gray-400 text-white p-3'>
        <h4 className='text-center'>All rights reserved &copy;NexEcom</h4>
        <p className='text-center mt-3'>
        <Link to="/" className="mx-2 hover:text-gray-900">Home</Link>|
        <Link to="/about" className="mx-2 hover:text-gray-900">Register</Link>|
      <Link to="/" className="mx-2 hover:text-gray-900">Logint</Link>|
      <Link to="/" className="mx-2 hover:text-gray-900">Cart(0)</Link>
        </p>
    </div>
  )
}

export default Footer
