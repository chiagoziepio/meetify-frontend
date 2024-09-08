import React from 'react'
import Suggestions from './Pages/RightpanelComponent/Suggestions'
import ActiveUsers from './Pages/RightpanelComponent/ActiveUsers'

const RightPanel = () => {
  return (
    <div className='h-full w-[20%] bg-white p-[20px] relative'>
      <div className='flex flex-col items-center h-[100vh] sticky top-[40px] '>
        <div className='w-[80%] pt-[20px] h-[30%]'>
          <h3 className='text-[25px] roboto-bold'>Stories</h3>
          <div className=''>
            <div>

            </div>
          </div>
        </div>
        <div className='w-[80%] h-[40%]'>
         
          <Suggestions/>
        </div>
        <div className='w-[80%] h-[30%]'>
          
          <ActiveUsers/>
        </div>
      </div>
    </div>
  )
}

export default RightPanel