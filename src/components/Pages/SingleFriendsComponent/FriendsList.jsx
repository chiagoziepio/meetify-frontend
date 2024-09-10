import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ImSpinner3 } from "react-icons/im";
import { Link } from "react-router-dom";
import { Avatar, message, Spin } from "antd";
import {
  useRemoveFriendMutation,
  useAddFriendMutation,
} from "../../../Redux/Api/UserApi/UserApi";

const FriendsList = ({ allUsers, theUser }) => {
  const [userTab, setUserTab] = useState(null);

  const AllUser = allUsers.map((user) => user);
  const User = useSelector((state) => state.UserReducers.user);

  const theUserFriends = theUser[0].friends;
  const theFriends = AllUser.filter(
    (user) => theUserFriends.includes(user._id) && user._id !== User._id
  );

  const [removeFriend, { isLoading }] = useRemoveFriendMutation();
  const [addFriend] = useAddFriendMutation();

  const handleRemoveFriend = async (id) => {
    try {
      const res = await removeFriend({ id }).unwrap();
      const data = res;
      message.success(data.msg);
    } catch (error) {
      message.error(error.data.msg);
    }
  };

  const handleAddFriend = async (id) => {
    try {
      const res = await addFriend({ id }).unwrap();
      const data = res;
      message.success(data.msg);
    } catch (error) {
      message.error(error.data.msg);
    }
  };

  return (
    <div>
      <div>
        {AllUser && theFriends.length ? (
          <div>
            {theFriends.map((user) => (
              <div
                key={user._id}
                className="cursor-pointer hover:bg-gray-300 hover:rounded-[10px] flex items-center p-[7px] "
              >
                <div className="flex justify-between w-full">
                  <div className="flex gap-x-[7px] items-center">
                    <Link to={`/user/${user._id}`}>
                      <Avatar
                        src={
                          user.profilePic
                            ? user.profilePic
                            : "data:image/png;base64,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"
                        }
                        size={50}
                        className={
                          user.online && "border-[5px] border-green-300"
                        }
                      />
                    </Link>
                    <p className="roboto-bold text-[20px] text-black">
                      {user.username}
                    </p>
                  </div>

                  <span className="bg-black w-fit p-[7px] rounded-[8px] h-[40px] cursor-pointer text-white text-[18px] roboto-medium">
                    {User.friends.includes(user._id) ? (
                      <span
                        onClick={() => {
                          handleRemoveFriend(user._id);
                          setUserTab(user._id);
                        }}
                      >
                        {" "}
                        {isLoading && userTab === user._id ? (
                          <Spin indicator={<ImSpinner3 />} spinning />
                        ) : (
                          "Unfollow"
                        )}
                      </span>
                    ) : (
                      <span onClick={() => handleAddFriend(user._id)}>
                        follow
                      </span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p> {theUser[0].username} has no friends </p>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
