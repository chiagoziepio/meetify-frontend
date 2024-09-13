import React from 'react'
import {useUserLogoutMutation} from "../../Redux/Api/UserApi/UserApi"
import {useNavigate} from "react-router-dom"
import {message} from "antd"
import { MdOutlineKey } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { FcDeleteDatabase } from "react-icons/fc";
import {changeToDark, changeToWhite} from "../../Redux/Features/UserSlice/UserSlice"
const Settings = () => {
  const [userLogout] = useUserLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const handleLogout = async ()=>{
      try {
        const res = await userLogout().unwrap()
        const data = res
        message.success(data.msg)
        navigate("/")
      } catch (error) {
        message.error(error.data.msg)
        if(error.data.msg === "access denied"){
          navigate("/")
        }
      }
  }
  const HandleScreenModeToBlack = ()=>{
    dispatch(changeToDark())
  }
  const HandleScreenModeToWhite = ()=>{
    dispatch(changeToWhite())
  }
  return (
    <div className='flex-grow'>
      <div className='mt-[40px]'>
        <h3 className='roboto-bold text-[25px] ml-[30px]'>Settings</h3>
        <div className='py-[20px] flex flex-col gap-y-[15px]'>
          <p className='flex gap-x-[10px] cursor-pointer'><MdOutlineKey size={25}/>Reset password</p>
          { screenMode === "white" ? <p onClick={HandleScreenModeToBlack} className='flex gap-x-[10px]  cursor-pointer'><IoMoonOutline size={25}/> dark mode</p> : <p className='flex gap-x-[10px]  cursor-pointer' onClick={HandleScreenModeToWhite}><MdOutlineWbSunny size={25}/> Light mode</p>}
          <p className=' flex gap-x-[10px] hover:text-red-600 transition duration-300 ease-in cursor-pointer' onClick={handleLogout}><LuLogOut size={25}/>Logout</p>
          <p className=' flex gap-x-[10px] hover:text-red-600 transition duration-300 ease-in cursor-pointer'><FcDeleteDatabase size={25}/> Delete your account</p>
        </div>
      </div>
    </div>
  )
}

export default Settings