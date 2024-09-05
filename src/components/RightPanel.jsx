import React from 'react'
import Suggestions from './Pages/RightpanelComponent/Suggestions'
import ActiveUsers from './Pages/RightpanelComponent/ActiveUsers'

const RightPanel = () => {
  return (
    <div className='h-full w-[20%] bg-white p-[20px]'>
      <div className='flex flex-col items-center h-full'>
        <div className='w-[80%] pt-[20px] h-[30%]'>
          <h3 className='text-[25px] roboto-bold'>Stories</h3>
          <div className=''>
            <div>

            </div>
          </div>
        </div>
        <div className='w-[80%] h-[40%]'>
          <h4 className='text-[19px] roboto-bold'>Suggestions</h4>
          <Suggestions/>
        </div>
        <div className='w-[80%] h-[30%]'>
          <h3 className='text-[17px] roboto-medium'>Currently active Friends</h3>
          <ActiveUsers/>
        </div>
      </div>
    </div>
  )
}

export default RightPanel