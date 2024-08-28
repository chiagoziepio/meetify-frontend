import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar"
import RightPanel from './RightPanel'

const Layout = () => {
  return (
    <main className='flex gap-x-3 w-full p-4'>
        <Sidebar/>
        <Outlet/>
        <RightPanel/>
    </main>
  )
}

export default Layout