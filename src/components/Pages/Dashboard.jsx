import { Avatar, Upload } from "antd";
import React, { useState } from "react";
import {
  useUserProfilePicUploadMutation,
  useUserBackgroundPicUploadMutation,
} from "../../Redux/Api/UserApi/UserApi";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import LikedPost from "./ProfileComponents/LikedPost";
import PostMade from "./ProfileComponents/PostMade";
import { IoIosPeople } from "react-icons/io";
import { SiBuzzfeed } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoMailUnreadSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import UserEditDetail from "./Modal/UserEditDetail";

const Dashboard = () => {
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const User = useSelector((state) => state.UserReducers.user);
  const feeds = useSelector((state) => state.FeedReducers.feeds);

  const allFeeds = feeds.map((feed) => feed);
  const userPostLength = allFeeds.filter((feed) => feed.authorId === User._id);

  const [isEditing, setIsEditing] = useState(false);
  const [tab, setTab] = useState("tab1");

  const [userProfilePicUpload, { isLoading, isError, error }] =
    useUserProfilePicUploadMutation();
  const [userBackgroundPicUpload] = useUserBackgroundPicUploadMutation();

  const handleProfilePicChange = async (info) => {
    const formData = new FormData();
    formData.append(
      "image",
      info.fileList[info.fileList.length - 1].originFileObj
    );

    try {
      const res = await userProfilePicUpload(formData).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackgroundPicChange = async (info) => {
    const formData = new FormData();
    formData.append(
      "image",
      info.fileList[info.fileList.length - 1].originFileObj
    );

    try {
      const res = await userBackgroundPicUpload(formData).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-grow">
      <div>
        <div>
          {isEditing && (
            <UserEditDetail isEditing={isEditing} setIsEditing={setIsEditing} />
          )}
          <div className="h-[200px] relative ">
            <img
              src={
                User !== null
                  ? User.backgroundPic
                    ? User.backgroundPic
                    : "data:image/png;base64,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"
                  : ""
              }
              alt=""
              className="block h-full w-full"
            />
            <Upload
              showUploadList={false}
              name="image"
              onChange={handleBackgroundPicChange}
              beforeUpload={() => false}
              accept=".png,.jpg,.jpeg"
              className=" absolute bottom-[5%] right-[5%] "
            >
              <button className="bg-[#9ce0f0] text-[16px] p-[6px] rounded-[10px]">
                Change image
              </button>
            </Upload>
          </div>
          <div className="relative">
            <Avatar
              src={
                User !== null
                  ? User.profilePic
                    ? User.profilePic
                    : "data:image/png;base64,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"
                  : ""
              }
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
        <div className="ml-[20px]">
          <div>
            <span
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-x-[15px] roboto-medium text-[25px] mb-[10px] cursor-pointer w-fit"
            >
              Detail <CiEdit size={20} />
            </span>
            <h3 className=" roboto-bold text-[20px] flex gap-x-[13px] items-center">
              <FaUserAlt size={17} />
              {User ? User.fullname : ""}
            </h3>
            <p className=" roboto-thin-italic text-[18px] text-gray-300 flex gap-x-[13px] items-center">
              <FaRegUser size={15} />@{User ? User.username : ""}
            </p>
            <p className="flex gap-x-[13px] items-center">
              <IoMailUnreadSharp size={17} /> {User.email}
            </p>
          </div>
          <div className="flex gap-x-[12px] mt-[10px]">
            <span className="flex gap-x-[8px] items-center">
              {" "}
              <SiBuzzfeed size={15} />
              {userPostLength.length}{" "}
              {userPostLength.length > 1 ? "posts" : "post"}{" "}
            </span>
            <span className="flex gap-x-[8px] items-center">
              {" "}
              <IoIosPeople size={15} />
              {User.friends.length}{" "}
              {User.friends.length > 1 ? "followers" : "follower"}{" "}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-evenly mt-[15px]">
            <span
              onClick={() => setTab("tab1")}
              className={
                tab === "tab1"
                  ? screenMode === "white"
                    ? "w-[45%] bg-[#9ce0f0] h-[57px] text-white flex justify-center items-center"
                    : "w-[45%] bg-[#9ce0f0] h-[57px] flex justify-center items-center  cursor-pointer "
                  : "w-[45%] bg-[white] text-black h-[57px] flex justify-center items-center  cursor-pointer "
              }
            >
              <span className="text-[20px] roboto-medium">Posts</span>
            </span>
            <span
              className={
                tab === "tab2"
                  ? screenMode === "white"
                    ? "w-[45%] bg-[#9ce0f0] h-[57px] text-white flex justify-center items-center"
                    : "w-[45%] bg-[#9ce0f0] h-[57px] flex justify-center items-center  cursor-pointer "
                  : "w-[45%] bg-[white] text-black h-[57px] flex justify-center items-center  cursor-pointer "
              }
              onClick={() => setTab("tab2")}
            >
              <span className="text-[20px] roboto-medium">
                Posts that you liked
              </span>{" "}
            </span>
          </div>
          <div className="mt-[15px] px-[10px]">
            {tab === "tab1" && <PostMade />}
            {tab === "tab2" && <LikedPost />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
