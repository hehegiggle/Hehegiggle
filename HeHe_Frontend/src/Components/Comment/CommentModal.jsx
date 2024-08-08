import {
  Box,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { timeDifference } from "../../Config/Logic";
import { createComment, getAllComments } from "../../Redux/Comment/Action";
import { findPostByIdAction } from "../../Redux/Post/Action";
import CommentCard from "./CommentCard";
import "./CommentModal.css";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";

const CommentModal = ({
  isOpen,
  onClose,
  handleLikePost,
  handleUnLikePost,
  handleSavePost,
  handleUnSavePost,
  isPostLiked,
  isSaved,
}) => {
  const dispatch = useDispatch();
  const jwt = sessionStorage.getItem("token");
  const { post, comments } = useSelector((store) => store);
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (postId) {
      dispatch(
        findPostByIdAction({
          jwt,
          postId,
        })
      );
      dispatch(getAllComments({ jwt, postId }));
    }
  }, [
    postId,
    comments?.createdComment,
    comments?.deletedComment,
    comments?.updatedComment,
  ]);

  const handleAddComment = () => {
    const data = {
      jwt,
      postId,
      data: {
        content: commentContent,
      },
    };
    dispatch(createComment(data));
    setCommentContent("");
    toast({
      title: "Commented successfully ✍🏼✍🏼✍🏼",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else return;
  };

  const handleClose = () => {
    onClose();
    navigate("/home");
  };

  const handleEmojiClick = (emojiObject) => {
    setCommentContent((prevInputValue) => prevInputValue + emojiObject.emoji);
  };

  return (
    <div>
      <Modal size={"4xl"} onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          borderRadius="3xl"
          style={{
            background: "linear-gradient(180deg, #8697C4, #EDE8F5)",
            borderRadius: "20px",
            color: "#283351",
          }}
        >
          <ModalBody>
            <div className="flex h-[75vh]">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="max-h-full max-w-full"
                  src={post.singlePost?.image}
                  alt=""
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="w-[55%] pl-10 relative">
                <div className="reqUser flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div className="">
                      <img
                        className="w-9 h-9 rounded-full"
                        src={
                          post.singlePost?.userImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt=""
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">
                        {post.singlePost?.userName}
                      </p>
                      <p>{post.singlePost?.userUsername}</p>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="comments mt-3">
                  {comments.comments?.length > 0 &&
                    comments.comments?.map((item) => (
                      <CommentCard comment={item} />
                    ))}
                </div>
                <div className=" absolute bottom-0 w-[90%]">
                  <div className="flex justify-between items-center w-full mt-5">
                    <div className="flex items-center space-x-2 ">
                      {isPostLiked ? (
                        <AiFillHeart
                          onClick={handleUnLikePost}
                          className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                        />
                      ) : (
                        <AiOutlineHeart
                          onClick={handleLikePost}
                          className="text-2xl hover:opacity-50 cursor-pointer "
                        />
                      )}
                    </div>
                    <div className="cursor-pointer">
                      {isSaved ? (
                        <BsBookmarkFill
                          onClick={() => handleUnSavePost(post.singlePost?.id)}
                          className="text-xl"
                        />
                      ) : (
                        <BsBookmark
                          onClick={() => handleSavePost(post.singlePost?.id)}
                          className="text-xl hover:opacity-50 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  {post.singlePost?.likedByUsers?.length > 0 && (
                    <p className="text-sm font-semibold py-2">
                      {post.singlePost?.likedByUsers?.length} likes{" "}
                    </p>
                  )}
                  <p className="opacity-70 pb-5">
                    {timeDifference(post?.singlePost?.createdAt)}
                  </p>
                  <div className="flex items-center ">
                    <input
                      className="commentInput w-[70%] mb-3"
                      placeholder="Add Comment..."
                      type="text"
                      borderRadius="30px"
                      onKeyPress={handleOnEnterPress}
                      onChange={handleCommnetInputChange}
                      value={commentContent}
                      style={{ borderRadius: "20px" }}
                    />
                    <Icon
                      mb="3"
                      as={GrEmoji}
                      boxSize={6}
                      ml="5%"
                      cursor="pointer"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                  </div>
                </div>
                {showEmojiPicker && (
                  <Box
                    position="absolute"
                    bottom="60px"
                    right="20px"
                    zIndex="1000"
                    boxShadow="md"
                    borderRadius="md"
                  >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </Box>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommentModal;
