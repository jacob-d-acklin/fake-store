import React from 'react'
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';


const RootLayout = () => {
  const date = new Date()
  return (
    <div >
      <Nav/>

      <main className=''>
        <Outlet/>
      </main>

      <footer className=' border-t-2 border-black h-24'>
        <h1 className='text-md text-center mt-12'>
          ©{date.getFullYear()} fakestore
        </h1>
      </footer>
    </div>
  )
}

export default RootLayout