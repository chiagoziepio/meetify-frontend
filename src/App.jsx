import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Feeds from "./components/Pages/Feeds"
import SignIn from './components/Pages/SignIn'
import SignUp from './components/Pages/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex-grow flex'>
      <Routes>
        <Route index element = {<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/user' element = {<Layout/>}>
          <Route index element={<Feeds/>}/>
        </Route>
      </Routes>
      
    </div>
  )
}

export default App
