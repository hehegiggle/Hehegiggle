import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import './ReqUserPostCard.css';
import { AiFillHeart } from 'react-icons/ai';
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { unSavePostAction } from '../../Redux/Post/Action';

const ReqUserPostCard = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isSaved, setIsSaved] = useState(true);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const data = {
    jwt: token,
    postId: post?.id,
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
    window.location.reload(); // Reload the page
  };

  return (
    <>
      <div className='p-2'>
        <div className='post w-80 h-80'>
          <div className='image-container'>
            <img
              className='image'
              src={post?.image}
              alt={`Post by ${post?.username}`}
              onClick={() => handleImageClick(post?.image)}
              style={{borderRadius:"20px"}}
            />
          </div>
          <div className='overlay' style={{borderRadius:"20px"}}>
            <div className='overlay-text flex justify-between '>
              <div className='flex items-center'><AiFillHeart className='icon mr-1' /> <span>{post?.likedByUsers?.length}</span></div>
              <div className='flex items-center'>{isSaved ? <BsBookmarkFill className='icon mr-1' style={{cursor:"pointer"}} onClick={handleUnSavePost}/> : <BsBookmark />}</div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setIsModalOpen(false)}>&times;</span>
            <img src={selectedImage} alt='Modal' className='modal-image' />
          </div>
        </div>
      )}
    </>
  );
};

export default ReqUserPostCard;
