import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SiBuzzfeed } from "react-icons/si";
import { RiMessage2Fill } from "react-icons/ri";
import { IoLogoWechat } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { useSelector } from "react-redux";
import { AiOutlineMenuFold } from "react-icons/ai";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { PiDoorOpenBold } from "react-icons/pi";

const Links = [
  {
    label: "New Feeds",
    id: 1,
    icon: <SiBuzzfeed size={30} />,
    path: "/user/feeds",
  },
  {
    label: "Messages",
    id: 2,
    icon: <RiMessage2Fill size={30} />,
    path: "/user/messages",
  },
  {
    label: "Groups",
    id: 3,
    icon: <IoLogoWechat size={30} />,
    path: "/user/groups",
  },
  {
    label: "Friends",
    id: 4,
    icon: <IoIosPeople size={30} />,
    path: "/user/friendslist",
  },
  {
    label: "Media",
    id: 5,
    icon: <ImFilePicture size={30} />,
    path: "/user/media",
  },
  {
    label: "Setting",
    id: 6,
    icon: <IoSettings size={30} />,
    path: "/user/setting",
  },
];

const IconNavbar = () => {
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const User = useSelector((state) => state.UserReducers.user);
  const [isIconShowong, setIsIconShowing] = useState(false);
  
  return (
    <div className=" fixed bottom-0 right-[10px] z-20 w-fit h-fit hidden iconnav mr-[10px] mb-[10px]">
      <div
        className={`flex gap-x-[16px] w-fit h-full p-[7px] rounded-[10px] ${
          screenMode === "white" ? "bg-[#9ce1f0]" : "bg-[#9ce1f0c8]"
        } `}
      >
        <div
          className={`flex gap-x-[15px] transition-all duration-500 h-full ${
            isIconShowong ? "w-full" : "w-0"
          } text-white`}
        >
          {isIconShowong && (
            <div className="flex gap-x-[15px] w-full h-full">
              {User.role === "admin"  || User.role === "super-admin" && (
                <NavLink
                  to={"/user/admin"}
                  onClick={() => setIsIconShowing(false)}
                >
                  <span>
                    <PiDoorOpenBold size={30} />
                  </span>
                </NavLink>
              )}
              {Links.map((link) => (
                <NavLink
                  to={link.path}
                  key={link.id}
                  onClick={() => setIsIconShowing(false)}
                >
                  <span> {link.icon}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <p
          className="cursor-pointer text-white"
          onClick={() => setIsIconShowing(!isIconShowong)}
        >
          {isIconShowong ? (
            <AiOutlineMenuFold size={30} />
          ) : (
            <RiMenuUnfoldLine size={30} />
          )}{" "}
        </p>
      </div>
    </div>
  );
};

export default IconNavbar;
