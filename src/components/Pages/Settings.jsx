import React from 'react'
import {useUserLogoutMutation} from "../../Redux/Api/UserApi/UserApi"
import {useNavigate} from "react-router-dom"
import {message} from "antd"
const Settings = () => {
  const [userLogout] = useUserLogoutMutation()
  const navigate = useNavigate()
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
  return (
    <div className='flex-grow'>
      <div>
        <h3>Settings</h3>
        <div>
          <button className='border-none outline-none w-[120px] h-[50px] rounded-[10px] text-white cursor-pointer bg-[#9ce0f0]' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Settings