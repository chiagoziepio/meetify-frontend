import { Avatar } from 'antd'
import React from 'react'

const SingleFriends = () => {
  return (
    <div className='flex-grow mt-[30px]'>
        <div>
            <div className='flex justify-center'>
                <div className='w-full flex justify-center h-[200px] md:h-[300px]'>
                <Avatar size={400}/>
                <Avatar size={150} className=' mt-[250px] ml-[-80px] z-[2]'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleFriends