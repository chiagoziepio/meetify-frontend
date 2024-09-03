import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar"
import RightPanel from './RightPanel'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
const Layout = () => {
  const User = useSelector((state) => state.UserReducers.user);
  const navigate = useNavigate()
  useEffect(()=>{
      if(User === null){
        navigate("/")
        return
      }
  },[])
  return (
    <main className='flex gap-x-3 w-full'>
        <Sidebar/>
        <Outlet/>
        <RightPanel/>
    </main>
  )
}

export default Layout