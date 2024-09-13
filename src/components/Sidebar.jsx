import React from 'react'
import Profile from './Pages/components/Profile'
import Navbar from './Pages/components/Navbar'
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  return (
    <div className='h-full w-[20%]  p-[20px]' style={{backgroundColor: screenMode}}>
      <Profile/>
      <Navbar/>
    </div>
  )
}

export default Sidebar