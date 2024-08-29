import React from 'react'
import Profile from './Pages/components/Profile'
import Navbar from './Pages/components/Navbar'

const Sidebar = () => {
  return (
    <div className='h-full w-[20%] bg-white p-[20px]'>
      <Profile/>
      <Navbar/>
    </div>
  )
}

export default Sidebar