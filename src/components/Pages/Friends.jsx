import React from 'react'

const Friends = () => {
  return (
    <div className='flex-grow p-[30px]'>
        <div>
            <div className='flex justify-center gap-x-[30px]'>
                <input 
                    type="text"
                    placeholder='search friends'
                    className='w-[50%] h-[54px] outline-none bg-white border-none text-[15px] text-black rounded-[15px] pl-[7px]'
                    />
                <p className='h-[50px] bg-[#9ce0f0] w-fit p-[7px] rounded-[5px] cursor-pointer flex items-center justify-center text-white roboto-medium text-[17px]'><span>Add friends</span></p>
            </div>
        </div>
    </div>
  )
}

export default Friends