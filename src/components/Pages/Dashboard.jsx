import { Avatar, Upload } from "antd";
import React from "react";

const Dashboard = () => {
  const handleProfilePicChange = async()=>{

  }
  const handleBackgroundPicChange = async()=>{

  }

  return (
    <div className="flex-grow">
      <div>
        <div>
          <div className="h-[330px] relative ">
            <img src="/img/paint-splash.jpg" alt="" className="block h-full w-full"  />
            <Upload name="image" onChange={handleBackgroundPicChange} className=" absolute bottom-[5%] right-[5%] "><button className="bg-[#9ce0f0] text-[16px] p-[6px] rounded-[10px]">Change image</button></Upload>
          </div>
          <div className="relative">
            <Avatar  src='/img/profilepic.jpg' size={130} className="mt-[-50px] ml-[10%]"/>
            <Upload name="image" onChange={handleProfilePicChange} className=" absolute bottom-[5%] left-[17%]  "><button className="bg-[#9ce0f0] text-[16px] p-[6px] rounded-[10px]">Change image</button></Upload>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
