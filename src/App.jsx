import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Feeds from "./components/Pages/Feeds"
import SignIn from './components/Pages/SignIn'
import SignUp from './components/Pages/SignUp'
import Dashboard from './components/Pages/Dashboard'
import Settings from './components/Pages/Settings'
import Friends from './components/Pages/Friends'
import Media from "./components/Pages/Media"
import Messages from './components/Pages/Messages'
import Groups from "./components/Pages/Groups"
import SingleFriends from './components/Pages/SingleFriends'
import {useGetAllUserQuery} from "./Redux/Api/UserApi/UserApi"
import ChatPage from './components/Pages/ChatPage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getAllUsersAtInterval } from"./Redux/Features/AllUserSlice/allUserSlice";
import AddFriends from './components/Pages/AddFriends'
import ForgotPwd from './components/Pages/ForgotPwd'
import OutsidePwdReset from './components/Pages/OutsidePwdReset'
import AdminPanel from './components/Pages/AdminPanel'

function App() {
  const {data} = useGetAllUserQuery()
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const dispatch = useDispatch();

  const fetchAllUsers = async () => {

      try {
        const res = await axios.get(
          "http://localhost:3000/api/user/getallUser"
        );
        const data = res;
        dispatch(getAllUsersAtInterval(data.data.msg));
        //console.log(data.data.feeds);
      } catch (error) {
        console.log(error);
      }
    
  };

  useEffect(() => {
    fetchAllUsers();
    const interval = setInterval(fetchAllUsers, 180000);
  
  }, []);
  
  return (
    <div className={screenMode === "white" ? "flex-grow flex text-black" : "flex-grow flex text-white bg-[#000000d5]"}>
      <Routes>
        <Route index element = {<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path = "/forgotpassword" element = {<ForgotPwd/>}/>
        <Route path = "/forgotpassword/:resetToken" element = {<OutsidePwdReset/>}/>
        <Route path='/user' element = {<Layout/>}>
          <Route path='/user/feeds' element={<Feeds/>}/>
          <Route path='/user/setting' element ={<Settings/>}/>
          <Route index  element={<Dashboard/>}/>
          <Route path='/user/friendslist' element={<Friends/>}/>
          <Route path='/user/groups' element={<Groups/>}/>
          <Route path='/user/media' element={<Media/>}/>
          <Route path='/user/messages' element={<Messages/>}/>
          <Route path='/user/:id' element={<SingleFriends/>}/>
          <Route path='/user/chat/:userId' element={<ChatPage/>}/>
          <Route path = "/user/addfriends" element= {<AddFriends/>}/>
          <Route path= "/user/admin" element = {<AdminPanel/>}/>
        </Route>
      </Routes>
      
    </div>
  )
}

export default App
