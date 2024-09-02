import { Avatar, Upload } from "antd";
import React, { useState } from "react";
import { useUserProfilePicUploadMutation } from "../../Redux/Api/UserApi/UserApi";
import axios from "axios";
const Dashboard = () => {
  const [file, setFile] = useState([]);
  const [userProfilePicUpload, { isLoading, isError, error }] =
    useUserProfilePicUploadMutation();
  const handleProfilePicChange = async (info) => {
    const formData = new FormData();
    formData.append(
      "image",
      info.fileList[info.fileList.length - 1].originFileObj
    );
    console.log([...formData.entries()]);

    try {
      const res = await userProfilePicUpload(formData).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackgroundPicChange = async () => {};

  return (
    <div className="flex-grow">
      <div>
        <div>
          <div className="h-[330px] relative ">
            <img
              src="/img/paint-splash.jpg"
              alt=""
              className="block h-full w-full"
            />
            <Upload
              showUploadList={false}
              name="image"
              onChange={handleBackgroundPicChange}
              className=" absolute bottom-[5%] right-[5%] "
            >
              <button className="bg-[#9ce0f0] text-[16px] p-[6px] rounded-[10px]">
                Change image
              </button>
            </Upload>
          </div>
          <div className="relative">
            <Avatar
              src="/img/profilepic.jpg"
              size={130}
              className="mt-[-50px] ml-[10%]"
            />
            <Upload
              showUploadList={false}
              name="image"
              onChange={handleProfilePicChange}
              beforeUpload={() => false}
              accept=".png,.jpg,.jpeg"
              className=" absolute bottom-[5%] left-[17%]  "
            >
              <button className="bg-[#9ce0f0] text-[16px] p-[6px] rounded-[10px]">
                Change image
              </button>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
