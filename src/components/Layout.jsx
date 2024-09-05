import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar"
import RightPanel from './RightPanel'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import {useGetActiveUserQuery} from "../Redux/Api/UserApi/UserApi"
const Layout = () => {
  const [fetch, setFetch] = useState(false)
  const {data,isLoading,isError} = useGetActiveUserQuery()
  
  const User = useSelector((state) => state.UserReducers.user);
  const navigate = useNavigate()
  useEffect(()=>{
    const intervalId = setInterval(() => {
      setFetch(true);
      setFetch(false);
    }, 10 * 60 * 1000); 

    
    return () => clearInterval(intervalId);
  },[])
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