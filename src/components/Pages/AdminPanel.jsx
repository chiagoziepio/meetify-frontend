import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WeeklySignUpsChart from "./AdminComponents/WeeklySignups";
import AllUsers from "./AdminComponents/AllUsers";
import AllPost from "./AdminComponents/AllPost";
import WeeklyPostUploadsChart from "./AdminComponents/WeeklyPost";

const AdminPanel = () => {
  const User = useSelector((state) => state.UserReducers.user);
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const [tab, setTab] = useState("tab1");
  const navigate = useNavigate();
  useEffect(() => {
    if (User.role !== "admin") {
      navigate("/");
      message.error("not authorized");
      return;
    }
  }, []);
  return (
    <div className="flex-grow">
      <div className="mt-[40px] px-[15px]">
        <h3 className="roboto-bold text-[20px]">Admin control room</h3>
        <div className="mt-[40px]">
          <div className="flex flex-wrap md:flex-nowrap ">
            <div className="w-[50%] min-w-[300px]">
              <h4 className="text-center">Weekly sign Chart</h4>
              <WeeklySignUpsChart />
            </div>
            <div  className="w-[50%] min-w-[300px]">
              <h4 className="text-center">Weekly Post</h4>
              <WeeklyPostUploadsChart />
            </div>
          </div>
        </div>
        <div className="flex justify-evenly mt-[15px] mb-[20px]">
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
            <span className="text-[20px] roboto-medium">Users</span>
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
            <span className="text-[20px] roboto-medium">Posts</span>{" "}
          </span>
        </div>
        {tab === "tab1" && <AllUsers />}
        {tab === "tab2" && <AllPost />}
      </div>
    </div>
  );
};

export default AdminPanel;
