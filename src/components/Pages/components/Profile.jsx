import React from 'react'
import {Avatar} from "antd"
import { NavLink } from 'react-router-dom'
const Profile = () => {
  return (
    <div className='p-[20px]'>
        <div className='flex justify-center'>
            <Avatar src="/img/paint-splash.jpg" size={100}/>
            <Avatar src="/img/profilepic.jpg" size={120} className='ml-[-30px]'/>
        </div>
        <div className='mt-[10px]'>
            <h3 className='text-center roboto-bold text-[20px]'>Okoro Amara</h3>
            <p className='text-center roboto-thin-italic text-[15px] text-gray-300'>@ammybabay</p>
        </div>
        <NavLink className="roboto-thin-italic  " to={"/user/dashbord"}>
            <p className='text-center'>View profile</p>
        </NavLink>
    </div>
  )
}

export default Profile