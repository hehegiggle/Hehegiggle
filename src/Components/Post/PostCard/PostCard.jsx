import { useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsDot, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
  timeDifference,
} from "../../../Config/Logic";

import { createComment } from "../../../Redux/Comment/Action";
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction,
} from "../../../Redux/Post/Action";
import CommentModal from "../../Comment/CommentModal";

import "./PostCard.css";
import EditPostModal from "../Create/EditPostModal";
import { CgMoreVertical } from "react-icons/cg";

const PostCard = ({ username, location, postImage, post }) => {
  const [commentContent, setCommentContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openEditPostModal, setOpenEditPostModal] = useState(false);
  const [numberOfLikes, setNumberOfLike] = useState(0);
  const toast = useToast();

  useEffect(() => {
    if (post && user.reqUser) {
      setIsSaved(isSavedPost(user.reqUser, post.id));
      setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
      setNumberOfLike(post.likedByUsers ? post.likedByUsers.length : 0);
    }
  }, [user.reqUser, post]);

  const data = {
    jwt: token,
    postId: post?.id,
  };

  const handleCommentInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleAddComment = () => {
    const data = {
      jwt: token,
      postId: post.id,
      data: {
        content: commentContent,
      },
    };
    console.log("comment content ", commentContent);
    dispatch(createComment(data));
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else return;
  };

  const handleLikePost = () => {
    dispatch(likePostAction(data));
    setIsPostLiked(true);
    setNumberOfLike(numberOfLikes + 1);
    toast({
      title: "You have liked the post.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleUnLikePost = () => {
    dispatch(unLikePostAction(data));
    setIsPostLiked(false);
    setNumberOfLike(numberOfLikes - 1);
    toast({
      title: "You have unliked the post.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSavePost = () => {
    dispatch(savePostAction(data));
    setIsSaved(true);
    toast({
      title: "You have saved the post.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
    toast({
      title: "You have unsaved the post.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  function handleClick() {
    console.log("3 Dots clicked");
    setShowDropdown(!showDropdown);
    console.log(setShowDropdown);
    console.log(showDropdown);
  }

  function handleWindowClick(event) {
    if (!event.target.matches(".dots")) {
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    const data = {
      jwt: token,
      postId,
    };
    dispatch(deletePostAction(data));
    window.location.reload();
  };
  const isOwnPost = user && user.reqUser && isReqUserPost(post, user.reqUser);

  const handleOpenCommentModal = () => {
    navigate(`/p/${post.id}`);
    onOpen();
  };

  const handleCloseEditPostModal = () => {
    setOpenEditPostModal(false);
  };

  const handleOpenEditPostModal = () => {
    navigate(`/p/${post.id}/edit`);
    setOpenEditPostModal(true);
  };

  if (!post) {
    return null; // Early return if post is undefined
  }

  return (
    <div className="w-full mb-6" style={{ maxWidth: "70%" }}>
      <div
        className="shadow-xl rounded-md overflow-hidden"
        style={{ borderRadius: 20, background: "linear-gradient(135deg, #8697C4, #EDE8F5)", color:"#000000"}}
      >
        <div className="flex justify-between items-center w-full py-4 px-10">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={
                post.userImage ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
              style={{ objectFit: "cover" }}
            />
            <div className="pl-2">
              <p className=" text-lg flex items-center">
                <span
                  onClick={() => handleNavigate(username)}
                  className="cursor-pointer"
                >
                  {username}
                </span>
                <span className="opacity-50 flex items-center">
                  {" "}
                  <BsDot />
                  {timeDifference(post?.createdAt)}
                </span>
              </p>
              <p className="font-thin text-sm">{location} </p>
            </div>
          </div>
          <div>
            <div className="dropdown">
              <CgMoreVertical
                size={25}
                onClick={handleClick}
                className="dots cursor-pointer"
              />
              {isOwnPost && (
                <div className="dropdown-content">
                  {showDropdown && (
                    <div
                      className="p-2 w-[15rem] shadow-xl"
                      style={{ borderRadius: "20px", backgroundColor:"#8697C4", fontSize:"20px" }}
                    >
                      <p
                        onClick={handleOpenEditPostModal}
                        className="py-2 px-4 cursor-pointer text-white"
                      >
                        Edit
                      </p>
                      <hr />
                      <p
                        onClick={() => handleDeletePost(post.id)}
                        className="px-4 py-2 cursor-pointer text-white"
                      >
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <img className="w-full" src={postImage} alt="" />
        </div>
        <div
          className="flex justify-between items-center w-full px-8 py-4"
          style={{ marginBottom: "-20px" }}
        >
          <div className="flex items-center space-x-8">
            {isPostLiked ? (
              <AiFillHeart
                onClick={handleUnLikePost}
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
              />
            ) : (
              <AiOutlineHeart
                onClick={handleLikePost}
                className="text-2xl hover:opacity-50 cursor-pointer"
              />
            )}
            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-xl hover:opacity-50 cursor-pointer"
            />
          </div>
          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill onClick={handleUnSavePost} className="text-xl" />
            ) : (
              <BsBookmark
                onClick={handleSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="w-full py-3 px-5">
          {numberOfLikes > 0 && (
            <p className="text-sm">{numberOfLikes} likes </p>
          )}
          {post.caption && (
            <p className="py-2">
              <span className="font-semibold mr-2" style={{fontSize:"15px", color:"#1E263D"}}>{username} </span>
              {post.caption}
            </p>
          )}
          {post?.comments?.length > 0 && (
            <p
              onClick={handleOpenCommentModal}
              className="opacity-50 text-sm py-2 cursor-pointer"
            >
              View all {post?.comments?.length} comments
            </p>
          )}
        </div>
      </div>

      <EditPostModal
        onClose={handleCloseEditPostModal}
        isOpen={openEditPostModal}
        onOpen={handleOpenEditPostModal}
      />

      <CommentModal
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleUnSavePost={handleUnSavePost}
        handleUnLikePost={handleUnLikePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default PostCard;
