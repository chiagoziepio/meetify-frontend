import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar"
import RightPanel from './RightPanel'
import { useSelector,useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"
import {useGetActiveUserQuery} from "../Redux/Api/UserApi/UserApi"
import {updateUser} from "../Redux/Features/AllUserSlice/allUserSlice"
import axios from "axios"
import Cookies from "js-cookie"
import IconNavbar from './Pages/components/IconNavbar'
import { message } from 'antd'

const Layout = () => {
  
  const {data,isLoading,isError} = useGetActiveUserQuery()
  
  const User = useSelector((state) => state.UserReducers.user);
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const getToken = () => {
    const token = Cookies.get("token");
    return token ? JSON.parse(token) : null;
  };

  const fetchActiveUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const res = await axios.get(
          "https://meetify-backend.vercel.app/api/user/getactiveusers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res;
       dispatch(updateUser(data.data.msg))
      } catch (error) {
        console.log(error);
      }
    }
  };



  useEffect(()=>{
    fetchActiveUser()
    const intervalId = setInterval(fetchActiveUser, 10 * 60 * 1000); 

    
    return () => clearInterval(intervalId);
  },[])
  useEffect(()=>{
    const token = getToken()
    if(!token) {
      message.warning("your access token has expired")
    }
      if(User === null){
        navigate("/")
        return
      }
  },[])
  return (
    <main className='flex gap-x-3 w-full'>
      <IconNavbar/>
    <div className='flex gap-x-3 w-full'>
        <Sidebar/>
        <Outlet/>
        <RightPanel/>
    </div>

    </main>
  )
}

export default Layout