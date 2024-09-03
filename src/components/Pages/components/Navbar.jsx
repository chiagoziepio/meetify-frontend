import React from "react";
import { SiBuzzfeed } from "react-icons/si";
import { RiMessage2Fill } from "react-icons/ri";
import { IoLogoWechat } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { NavLink } from "react-router-dom";
export const Links = [
  {
    label: "New Feeds",
    id: 1,
    icon: <SiBuzzfeed size={20} />,
    path: "/user/feeds",
  },
  {
    label: "Messages",
    id: 2,
    icon: <RiMessage2Fill size={20} />,
    path: "/user/messages",
  },
  {
    label: "Groups",
    id: 3,
    icon: <IoLogoWechat size={20} />,
    path: "/user/groups",
  },
  {
    label: "Friends",
    id: 4,
    icon: <IoIosPeople size={20} />,
    path: "/user/friendslist",
  },
  {
    label: "Media",
    id: 5,
    icon: <ImFilePicture size={20} />,
    path: "/user/media",
  },
  {
    label: "Setting",
    id: 6,
    icon: <IoSettings size={20} />,
    path: "/user/setting",
  },
];
const Navbar = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-[20px] items-center">
        {Links.map((link) => (
          <div key={link.id} className="w-[70%]">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "bg-black text-white roboto-medium text-[18px] flex gap-2 h-[44px] rounded-[20px] items-center p-[6px]" : " flex gap-2 roboto-medium text-[18px]"
              }
            >
              <span>{link.icon}</span>
              <p>{link.label}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
