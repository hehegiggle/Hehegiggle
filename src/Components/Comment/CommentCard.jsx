import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logic";
import {
  deleteComment,
  likeComment,
  editComment,
  unLikeComment,
} from "../../Redux/Comment/Action";
import { BsPencil } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const CommentCard = ({ comment }) => {
  const [isCommentLiked, setIsCommentLike] = useState(false);
  const { user } = useSelector((store) => store);
  const [commentLikes, setCommentLikes] = useState(0);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const [isEditCommentInputOpen, setIsEditCommentInputOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    setCommentContent(comment?.content);
  }, [comment]);

  const handleLikeComment = () => {
    dispatch(likeComment({ jwt, commentId: comment.commentId }));
    setIsCommentLike(true);
    setCommentLikes(commentLikes + 1);
  };

  const handleUnLikeComment = () => {
    dispatch(unLikeComment({ jwt, commentId: comment.commentId }));
    setIsCommentLike(false);
    setCommentLikes(commentLikes - 1);
  };

  useEffect(() => {
    setCommentLikes(comment?.likedByUsers?.length);
  }, [comment]);

  useEffect(() => {
    setIsCommentLike(isCommentLikedByUser(comment, user.reqUser?.id));
  }, [comment, user.reqUser]);

  const handleClickOnEditComment = () => {
    setIsEditCommentInputOpen(!isEditCommentInputOpen);
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment({ commentId: comment.commentId, jwt }));
  };

  const handleEditComment = (e) => {
    if (e.key === "Enter") {
      dispatch(
        editComment({
          data: { commentId: comment.commentId, content: commentContent },
          jwt,
          callback: () => {
            setIsEditCommentInputOpen(false);
            setCommentContent(commentContent); // Update local state immediately
          }
        })
      );
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md mb-4 flex items-start" style={{background: "linear-gradient(135deg, #8697C4, #EDE8F5)", borderRadius:"20px", color:"#283351"}}>
      <div className="w-10 h-10 flex-shrink-0">
        <img
          className="w-full h-full rounded-full"
          src={
            comment.userDto.userimage ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="ml-3 flex-1">
        <div className="reqUser flex justify-between items-center py-2">
          <div>
            <p>
              <span className="font-semibold">{comment.userDto.username}</span>
              <span className="ml-2">{commentContent}</span> {/* Use commentContent here */}
            </p>
            <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
              <span>{timeDifference(comment?.createdAt)}</span>
              {commentLikes > 0 && (
                <span>
                  {commentLikes} like{commentLikes > 0 ? "s" : ""}
                </span>
              )}
              {user?.reqUser?.id === comment?.userDto?.id && (
                <>
                  <BsPencil
                    className="cursor-pointer hover:text-blue-500 hover:scale-125 transition-transform"
                    onClick={handleClickOnEditComment}
                  />
                  <MdDelete
                    className="cursor-pointer hover:text-red-500 hover:scale-125 transition-transform"
                    onClick={handleDeleteComment}
                  />
                </>
              )}
            </div>
          </div>
          {isCommentLiked ? (
            <AiFillHeart
              onClick={handleUnLikeComment}
              className="text-lg text-red-600 cursor-pointer hover:opacity-80"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleLikeComment}
              className="text-lg cursor-pointer hover:opacity-80"
            />
          )}
        </div>
        {isEditCommentInputOpen && (
          <div className="mt-2">
            <input
              className="w-full outline-none border-b border-black text-sm p-1"
              placeholder="Edit Comment..."
              type="text"
              onKeyPress={handleEditComment}
              onChange={handleCommnetInputChange}
              value={commentContent}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;