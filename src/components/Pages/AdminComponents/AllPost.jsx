import { Avatar, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import {
  useToggleLikeMutation,
  useAddcommentMutation,
} from "../../../Redux/Api/FeedApi/Feedapi";
import {addminUpdateFeed} from "../../../Redux/Features/FeedsSlice/FeedSlice"
import axios from "axios";
import Cookies from "js-cookie";

const AllPost = () => {
  const [inputValues, setInputValues] = useState({});
  const [isViewingComment, setIsViewingComment] = useState(false);
  const [thePost, setThePost] = useState(null);

  const feeds = useSelector((state) => state.FeedReducers.feeds);
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const User = useSelector((state) => state.UserReducers.user);

  const dispatch = useDispatch()
  const [toggleLike] = useToggleLikeMutation();
  const [addcomment] = useAddcommentMutation();

  const getToken = () => {
    const token = Cookies.get("token");
    return token ? JSON.parse(token) : null;
  };
  const deletePost = async (id) => {
    const token = getToken()
    if (!token) return message.error("no active token");
    try {
      const res = await axios.post(
        "https://meetify-backend.vercel.app/api/admin/deletepost",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data
      dispatch(addminUpdateFeed(data.feeds))
      message.success(data.msg)
    } catch (error) {
        message.error(error.response.data.msg)
    }
  };
  const handleToggleLike = async (id) => {
    try {
      const res = await toggleLike({ id }).unwrap();
    } catch (error) {
      message.error(error.data.msg);
      console.log(error);
    }
  };
  const handleInputChange = (postId, event) => {
    const { value } = event.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [postId]: value,
    }));
  };
  const handleAddComment = async (id, e) => {
    e.preventDefault();
    if (!inputValues || !id) return;
    const content = inputValues[id];
    const values = { id, content };
    try {
      const res = await addcomment(values).unwrap();
      const data = res;
    } catch (error) {
      message.error(error.data.msg);
    }
    setInputValues({});
  };
  return (
    <div>
      <div>
        {feeds.length ? (
          <div className="flex flex-col md:justify-center md:items-center gap-y-[20px]">
            {feeds.map((feed) => (
              <div
                key={feed._id}
                className=" w-full md:w-[500px] feed rounded-[20px] relative "
                style={{ background: screenMode }}
              >
                <div className="flex justify-between items-center mx-[15px] pt-[10px]">
                  <div className="flex gap-x-[15px]">
                    {feed.authorId !== User._id ? (
                      <Link to={`/user/${feed.authorId}`}>
                        {" "}
                        <Avatar
                          size={50}
                          src={
                            feed.authorProfilePic
                              ? feed.authorProfilePic
                              : "data:image/png;base64,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"
                          }
                        />{" "}
                      </Link>
                    ) : (
                      <Avatar
                        size={50}
                        src={
                          feed.authorProfilePic
                            ? feed.authorProfilePic
                            : "data:image/png;base64,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"
                        }
                      />
                    )}

                    <p className="roboto-bold text-[17px]">{feed.authorName}</p>
                  </div>
                  <MdDeleteForever
                    onClick={()=> deletePost(feed._id)}
                    size={25}
                    className="cursor-pointer hover:text-red-600"
                  />
                </div>
                <div className="p-[15px]">
                  {feed.content ? (
                    <div className="text-[17px] mb-[15px]">{feed.content}</div>
                  ) : (
                    ""
                  )}
                  {feed.postImage ? (
                    <div className="h-[300px]">
                      <img
                        src={feed.postImage}
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="mt-[10px] flex justify-between items-center">
                    <form
                      className="w-[85%]"
                      onSubmit={(e) => handleAddComment(feed._id, e)}
                    >
                      <div className="flex bg-[#f5f5f5] justify-between items-center p-[7px] rounded-[10px]">
                        <input
                          type="text"
                          id={feed._id}
                          value={inputValues[feed._id] || ""}
                          onChange={(event) =>
                            handleInputChange(feed._id, event)
                          }
                          placeholder="comment"
                          className="bg-transparent border-none outline-none text-black w-[90%]"
                        />
                        <button className="w-fit h-fit bg-transparent">
                          <BsFillSendArrowUpFill
                            size={20}
                            className={
                              screenMode === "white"
                                ? "text-black"
                                : "text-black"
                            }
                          />
                        </button>
                      </div>
                    </form>
                    <span
                      onClick={() => handleToggleLike(feed._id)}
                      className={
                        feed.likedBy.includes(User._id)
                        ? "text-red-600 flex gap-x-[6px] cursor-pointer" 
                        : screenMode === "white"
                        ? "text-[black] flex gap-x-[6px] cursor-pointer" 
                        : "text-white flex gap-x-[6px] cursor-pointer" 
                    }
                    >
                      <FaHeart size={20} />
                      <span
                        className={
                          screenMode === "white"
                            ? "text-black text-[13px]"
                            : "text-[13px] text-white"
                        }
                      >
                        {feed.likedBy.length ? feed.likedBy.length : ""}
                      </span>
                    </span>
                  </div>
                  <div className="mt-[8px]">
                    <div className="w-fit h-fit">
                      {isViewingComment && thePost === feed._id ? (
                        <IoCloseOutline
                          size={25}
                          onClick={() => {
                            setThePost(null), setIsViewingComment(false);
                          }}
                        />
                      ) : (
                        <div className="flex gap-x-[6px]">
                          <FaRegCommentDots
                            size={20}
                            onClick={() => {
                              setThePost(feed._id), setIsViewingComment(true);
                            }}
                          />
                          {feed.comment.length ? (
                            <span>{feed.comment.length}</span>
                          ) : (
                            ""
                          )}
                        </div>
                      )}
                    </div>
                    {thePost === feed._id && (
                      <div className=" bg-[rgba(0,0,0,0.53)] w-full max-h-[250px] overflow-y-auto mt-[9px] p-[10px] rounded-[10px]">
                        {feed.comment.length ? (
                          feed.comment.map((comment) => (
                            <div
                              key={comment._id}
                              className="m-[5px] flex gap-x-[10px]"
                            >
                              {comment.commentAuthorId !== User._id ? (
                                <Link to={`/user/${comment.commentAuthorId}`}>
                                  <Avatar
                                    src={
                                      comment.commentAuthorPic
                                        ? comment.commentAuthorPic
                                        : ""
                                    }
                                    size={30}
                                  />
                                </Link>
                              ) : (
                                <Avatar
                                  src={
                                    comment.commentAuthorPic
                                      ? comment.commentAuthorPic
                                      : ""
                                  }
                                  size={30}
                                />
                              )}

                              <div className="w-[90%]">
                                <h3 className="roboto-medium text-[17px]">
                                  {comment.commentedBy}
                                </h3>
                                <p className="mt-[-5px]">{comment.content}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No comment on this post yet</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="roboto-medium text-[20px]">No post made by any user</p>
        )}
      </div>
    </div>
  );
};

export default AllPost;
