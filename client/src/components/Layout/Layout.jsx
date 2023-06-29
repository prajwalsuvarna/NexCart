// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const Layout = ({children}) => {
  return (
    <>
    <Header />
     <main className='min-h-[90vh]'>
{children}
     </main>
    <Footer />
    </>
  )
}


export default Layout