import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { CgDanger } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

const SOCKET_SERVER_URL = "http://localhost:3000";
let socket;

const ChatPage = () => {
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const User = useSelector((state) => state.UserReducers.user);
  const allUsers = useSelector((state) => state.AllUserReducer.allUsers);

  const loggedInUserId = User._id;
  const { userId } = useParams();
  const findUser = allUsers.find((user) => user._id === userId);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isDeletingShowing, setIsDeletingShowing] = useState(false);


  // Function to fetch messages
const fetchMessages = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/message/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

// Inside your React component
/* useEffect(() => {
  fetchMessages(userId).then((data) => {
    setMessages(data);
    console.log(data);
    
  });
}, [userId]); */

  useEffect(() => {
    // Initialize socket connection when component mounts
    socket = io(SOCKET_SERVER_URL, {
      transports: ["polling", "websocket"],
      withCredentials: true,
    });

    // Join the chat room for the logged-in user
    socket.emit("join room", loggedInUserId);

    // Load existing messages from localStorage
    const loadChatFromLocalStorage = (fromUserId, toUserId) => {
      const chatKey = `${fromUserId}_${toUserId}`;
      return JSON.parse(localStorage.getItem(chatKey)) || [];
    };

    const initialMessages = loadChatFromLocalStorage(loggedInUserId, userId);
    setMessages(initialMessages);
    // Listen for new messages
    socket.on("chat message", (msg) => {
      // Check if msg is an object and has a content property
      if (typeof msg === "object" && msg.content) {
        // Save the message to localStorage
        saveChatToLocalStorage(msg.fromUserId, msg.toUserId, msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      } else {
        console.error("Received invalid message format:", msg);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("chat message");
      socket.disconnect(); // Disconnect socket when component unmounts
    };
  }, [userId, loggedInUserId]);

  const saveChatToLocalStorage = (fromUserId, toUserId, message) => {
    const chatKey1 = `${fromUserId}_${toUserId}`;
    const chatKey2 = `${toUserId}_${fromUserId}`;

    const existingChats1 = JSON.parse(localStorage.getItem(chatKey1)) || [];
    existingChats1.push(message);
    localStorage.setItem(chatKey1, JSON.stringify(existingChats1));

    const existingChats2 = JSON.parse(localStorage.getItem(chatKey2)) || [];
    existingChats2.push(message);
    localStorage.setItem(chatKey2, JSON.stringify(existingChats2));
  };

  const handleDeleteChat = () => {
    const chatKey = `${loggedInUserId}_${userId}`;
    localStorage.removeItem(chatKey);

    // Clear the chat messages from state
    setMessages([]);
    setIsDeletingShowing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        toUserId: userId,
        msg: input,
        fromUserId: loggedInUserId,
        content: input,
        timestamp: new Date().toISOString(), // Add a timestamp if needed
      };

      // Emit the message to the server
      socket.emit("chat message", newMessage);

      // Add the message to the local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Save the message to localStorage
      saveChatToLocalStorage(loggedInUserId, userId, newMessage);

      // Clear the input field
      setInput("");
    }
  };

  return (
    <div className="flex-grow h-full">
      <div className="h-full relative">
        {findUser && (
          <div className="h-[97vh] flex flex-col justify-between relative">
            {isDeletingShowing && (
              <div
                onClick={() => setIsDeletingShowing(false)}
                className=" bg-white w-fit h-fit p-[10px] flex rounded-[10px] flex-col absolute right-0 z-10 top-[50px] text-[13px] cursor-pointer"
              >
                <span onClick={handleDeleteChat} className="flex gap-x-[10px]">
                  <CgDanger className="text-red-600" size={20} />
                  clear Chat
                </span>
                <Link to={`/user/${userId}`} className="flex gap-x-[10px]">
                  <CgProfile size={20} />
                  See profile
                </Link>
              </div>
            )}
            <div className="bg-white h-[50px] mb-[10px] flex items-center justify-between px-[10px] rounded-[7px] relative">
              <div className="flex items-center w-[85%]">
                <div className="pr-[15px]">
                  <Avatar src={findUser.profilePic} size={40} />
                  {findUser.online && (
                    <span className="w-[20px] h-[20px] rounded-[50%] bg-green-600"></span>
                  )}
                </div>
                <h2 className="roboto-bold text-[20px]">{findUser.username}</h2>
              </div>
              {findUser.online ? (
                <span className="text-[17px] text-green-600">online</span>
              ) : (
                <span className="text-[17px] text-red-600">offline</span>
              )}
              <div className="  flex">
                <button
                  onClick={() => setIsDeletingShowing(!isDeletingShowing)}
                  className="w-fit h-fit"
                >
                  <CiMenuKebab size={30} />
                </button>
              </div>
            </div>

            <ul className="h-[600px] overflow-y-auto">
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className={
                    msg.fromUserId === loggedInUserId
                      ? "text-right"
                      : "text-left"
                  }
                >
                  <div className="p-2">
                    <strong>
                      {msg.fromUserId === loggedInUserId
                        ? "Me"
                        : findUser.username}
                      :
                    </strong>
                    <p>{msg.content}</p>
                  </div>
                </li>
              ))}
            </ul>
            <form
              onSubmit={handleSubmit}
              className="px-[15px] bg-white border-[#333] rounded-[15px] flex justify-between items-center"
            >
              <textarea
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-[90%] bg-transparent h-[44px] border-none outline-none"
              />
              <button type="submit">
                <BsFillSendArrowUpFill size={30}  className={screenMode === "white" ? "text-black" : "text-black"} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
