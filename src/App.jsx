import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Feeds from "./components/Pages/Feeds"
import SignIn from './components/Pages/SignIn'
import SignUp from './components/Pages/SignUp'
import Dashboard from './components/Pages/Dashboard'
import Settings from './components/Pages/Settings'
import Friends from './components/Pages/Friends'
function App() {
  

  return (
    <div className='flex-grow flex'>
      <Routes>
        <Route index element = {<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/user' element = {<Layout/>}>
          <Route path='/user/feeds' element={<Feeds/>}/>
          <Route path='/user/setting' element ={<Settings/>}/>
          <Route index  element={<Dashboard/>}/>
          <Route path='/user/friendslist' element={<Friends/>}/>
        </Route>
      </Routes>
      
    </div>
  )
}

export default App
