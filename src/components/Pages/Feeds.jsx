import { Avatar, Button, Form, Input, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { FaMeetup } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { ImFilePicture } from "react-icons/im";
import { FaRegCommentDots } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import {
  useAddFeedMutation,
  useGetFeedsQuery,
  useToggleLikeMutation,
  useAddcommentMutation,
} from "../../Redux/Api/FeedApi/Feedapi";
import { updateFeeds } from "../../Redux/Features/FeedsSlice/FeedSlice";
import { ImSpinner3 } from "react-icons/im";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";

const Feeds = () => {
  const { TextArea } = Input;
  const [inputValues, setInputValues] = useState({});
  const [isViewingComment, setIsViewingComment] = useState(false);
  const [thePost, setThePost] = useState(null);

  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const User = useSelector((state) => state.UserReducers.user);
  const feeds = useSelector((state) => state.FeedReducers.feeds);
  const feedSize = useSelector((state) => state.FeedReducers.feedSize);
  const feedDiff = useSelector((state) => state.FeedReducers.feedDiff);
  const allUsers = useSelector((state) => state.AllUserReducer.allUsers);
  const [imgUrl, setImgUrl] = useState([]);

  const [form] = Form.useForm();
  const [addFeed, { isLoading }] = useAddFeedMutation();
  const [toggleLike] = useToggleLikeMutation();
  const { data } = useGetFeedsQuery();
  const [addcomment] = useAddcommentMutation();

  const dispatch = useDispatch();
  const getToken = () => {
    const token = Cookies.get("token");
    return token ? JSON.parse(token) : null;
  };

  const fetchAllfeeds = async () => {
    const token = getToken();
    if (token) {
      try {
        const res = await axios.get(
          "https://meetify-backend.vercel.app/api/feeds/getfeeds",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res;
        dispatch(updateFeeds(data.data.feeds));
        //console.log(data.data.feeds);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchAllfeeds();
    const interval = setInterval(fetchAllfeeds, 180000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAddPost = async (values) => {
    const formData = new FormData();
    const { content, image } = values;
    if (!content && imgUrl.length === 0) {
      return message.error("provide either text or image");
    }

    try {
      if (content) {
        formData.append("content", content);
      }
      if (image) {
        formData.append("image", imgUrl);
      }
      setImgUrl([]);
      const res = await addFeed(formData).unwrap();
      const data = res;
      message.success(data.msg);
    } catch (error) {
      message.error(error.data.msg);
    }

    form.resetFields();
  };
  const onChage = (info) => {
    setImgUrl(info.fileList[info.fileList.length - 1].originFileObj);
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

  let thePostToBeShown;
  let state = false;
  if (feeds.length && allUsers) {
    const friendsId = User.friends.map((id) => id);
    const AllUsers = allUsers.map((user) => user);
    const friends = AllUsers.filter((user) => friendsId.includes(user._id));
    const friendsEmail = friends.map((user) => user.email);
    const Allfeeds = feeds.map((feed) => feed);
    const postToShow = Allfeeds.filter(
      (feed) =>
        friendsEmail.includes(feed.authorEmail) ||
        feed.authorEmail === User.email
    );
    thePostToBeShown = postToShow.slice().reverse();
    state = true;
    if (feedDiff) {
      message.success(`${feedSize} new added`);
    }
  }
  
  return (
    <div className="flex-grow mt-[30px]">
      <div className="px-[10px]">
        <div className="flex gap-x-5 m-[10px] items-center">
          <FaMeetup size={60} />
          <p className="roboto-bold text-[29px]">Meetify</p>
        </div>
        <div>
          <div>
            <Link to={"/user"}>
              <Avatar
                src={
                  User !== null
                    ? User.profilePic
                      ? User.profilePic
                      : "data:image/png;base64,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"
                    : ""
                }
                size={70}
                className="mb-[10px]"
              />
            </Link>
            <div>
              <Form form={form} onFinish={handleAddPost}>
                <Form.Item name={"content"}>
                  <TextArea
                    rows={3}
                    placeholder="Whats on your mind today"
                    className="text-black text-[16px] placeholder:text-black"
                  />
                </Form.Item>
                <div className="flex justify-end gap-x-[15px]">
                  <Form.Item name={"image"}>
                    <Upload
                      name="image"
                      onChange={onChage}
                      beforeUpload={() => false}
                      listType="picture-card"
                      className="custom-upload"
                      showUploadList={{
                        showPreviewIcon: false,
                        showRemoveIcon: true,
                        showDownloadIcon: false,
                      }}
                    >
                      <ImFilePicture size={30} className="cursor-pointer" />
                    </Upload>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="w-[80px] h-[35px] font-semibold"
                    >
                      {isLoading ? <ImSpinner3 className="spinner" /> : "Done"}
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <div>
            <h3 className="roboto-bold text-[22px] ml-[20px]">Feeds</h3>
            <div className="mt-[10px] ">
              {state ? (
                <div className="flex flex-col md:justify-center md:items-center gap-y-[20px]">
                  {thePostToBeShown.map((feed) => (
                    <div
                      key={feed._id}
                      className=" w-full md:w-[500px] feed rounded-[20px] relative "
                      style={{ background: screenMode }}
                    >
                      <div className="flex gap-x-[15px] items-center ml-[5%] pt-[10px]">
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

                        <p className="roboto-bold text-[17px]">
                          {feed.authorName}
                        </p>
                      </div>
                      <div className="p-[15px]">
                        {feed.content ? (
                          <div className="text-[17px] mb-[15px]">
                            {feed.content}
                          </div>
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
                                ? screenMode === "white"
                                  ? "text-red-600 flex gap-x-[6px]"
                                  : "text-red-600 flex gap-x-[6px]"
                                : "text-white flex gap-x-[6px]"
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
                                    setThePost(feed._id),
                                      setIsViewingComment(true);
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
                                      <Link
                                        to={`/user/${comment.commentAuthorId}`}
                                      >
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
                                      <p className="mt-[-5px]">
                                        {comment.content}
                                      </p>
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
                <p className="roboto-medium text-[20px]">
                  No post made by you or your friends yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
