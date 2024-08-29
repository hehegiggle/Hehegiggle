import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReels,
  deleteReelByReelId,
  likeReel,
  dislikeReel,
} from "../../Redux/Reel/Action";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaRegCommentDots } from "react-icons/fa";
import "./ReelViewer.css";
import { TbMoodSadDizzy } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CommentModal from "../../Components/Comment/CommentModal";
import ReelCommentModal from "../../Components/Comment/ReelCommentModal";

const ReelViewer = ({ reels }) => {
  const [currentReel, setCurrentReel] = useState(0);
  const { user } = useSelector((store) => store);
  const [transitioning, setTransitioning] = useState(false);
  const [likesData, setLikesData] = useState({});
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const currentVideoRef = useRef(null);
  const navigate = useNavigate();
  const jwt = sessionStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    dispatch(getAllReels(jwt));
  }, [dispatch]);

  useEffect(() => {
    const initialLikesData = {};
    reels.forEach((reel) => {
      initialLikesData[reel.id] = {
        isLiked: reel.likes.some((like) => like.user.id === user.reqUser.id),
        likeCount: reel.likes.length,
      };
    });
    setLikesData(initialLikesData);
  }, [reels, user.reqUser.id]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (!transitioning) {
        setTransitioning(true);
        setTimeout(() => {
          if (event.deltaY < 0) {
            handlePrevReel();
          } else if (event.deltaY > 0) {
            handleNextReel();
          }
          setTransitioning(false);
        }, 500);
      }
    };

    const container = containerRef.current;
    container.addEventListener("wheel", handleScroll);
    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, [currentReel, transitioning]);

  const handleNextReel = () => {
    pauseCurrentVideo(); // Pause the current video before moving to the next reel
    setCurrentReel((prevReel) =>
      prevReel === reels.length - 1 ? 0 : prevReel + 1
    );
  };

  const handlePrevReel = () => {
    pauseCurrentVideo(); // Pause the current video before moving to the previous reel
    setCurrentReel((prevReel) =>
      prevReel === 0 ? reels.length - 1 : prevReel - 1
    );
  };

  const pauseCurrentVideo = () => {
    if (currentVideoRef.current) {
      currentVideoRef.current.pause(); // Pause the video
    }
  };

  const handleUsernameClick = (username, event) => {
    event.stopPropagation();
    navigate(`/${username}`);
  };

  const handleReelDelete = (reelId) => {
    const data = {
      reelId: reelId,
      jwt: jwt,
    };
    dispatch(deleteReelByReelId(data));
    window.location.reload();
    toast({
      title: "Reel Deleted successfully 😔😔😔",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleLikeReel = (reelId) => {
    const data = {
      reelId: reelId,
      token: jwt,
    };
    dispatch(likeReel(data));
    setLikesData((prevLikesData) => ({
      ...prevLikesData,
      [reelId]: {
        ...prevLikesData[reelId],
        isLiked: true,
        likeCount: prevLikesData[reelId].likeCount + 1,
      },
    }));
    toast({
      title: "You have liked the Reel 💝💝💝",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleDislikeReel = (reelId) => {
    const data = {
      reelId: reelId,
      token: jwt,
    };
    dispatch(dislikeReel(data));
    setLikesData((prevLikesData) => ({
      ...prevLikesData,
      [reelId]: {
        ...prevLikesData[reelId],
        isLiked: false,
        likeCount: prevLikesData[reelId].likeCount - 1,
      },
    }));

    toast({
      title: "You have disliked the Reel 💔",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleCommentClick = (reelId) => {
    const selectedReel = reels.find((reel) => reel.id === reelId);
    setSelectedReel(selectedReel);
    setCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setCommentModalOpen(false);
    setSelectedReel(null);
  };

  const handleCommentSubmit = () => {
    // Add the logic to handle comment submission
    toast({
      title: "Comment submitted.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    closeCommentModal(); // Close the modal after submitting the comment
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex mt={20} flex="1" overflow="hidden" ref={containerRef}>
        <Box
          bg="#fff"
          p={2}
          borderRadius="20px"
          boxShadow="2xl"
          ml={{ base: "12%", md: "21%" }}
          width={{ base: "85%", md: "77%" }}
          mt={{ base: "5%", md: "2%" }}
          mb={{ base: "4%", md: "2%" }}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #8697C4, #EDE8F5)",
          }}
        >
          {reels.length > 1 && (
            <>
              {currentReel !== 0 && (
                <div
                  className="scroll-up"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "blue",
                    fontSize: "1.5rem",
                    animation: "scrollUpAnimation 2s infinite",
                  }}
                  onClick={handlePrevReel}
                >
                  <FaArrowUp />
                  <span>Scroll Up</span>
                </div>
              )}
              {currentReel !== reels.length - 1 && (
                <div
                  className="scroll-down"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    color: "blue",
                    fontSize: "1.5rem",
                    animation: "scrollDownAnimation 2s infinite",
                  }}
                  onClick={handleNextReel}
                >
                  <span>Scroll Down</span>
                  <FaArrowDown />
                </div>
              )}
            </>
          )}
          <Box
            className="reel-viewer h-screen flex flex-col items-center"
            width={{ md: "42vh", base: "40vh" }}
            ml={{ base: "27%", md: "35%" }}
            mt={{ base: "2%", md: "0%" }}
          >
            <Box className="relative reel-player">
              {reels.length === 0 ? (
                <Box textAlign="center" mt={"50%"}>
                  <TbMoodSadDizzy size={"90%"} />
                  <Text fontSize="3xl" ml={"-2%"}>
                    No Reels Found
                  </Text>
                </Box>
              ) : (
                reels.map((reelItem, index) => (
                  <div
                    key={index}
                    className="video-container"
                    style={{
                      display: index === currentReel ? "block" : "none",
                      position: "relative",
                    }}
                  >
                    <div
                      className="video-overlay"
                      style={{
                        position: "absolute",
                        color: "white",
                        width: "100%",
                        background: "rgba(0, 0, 0, 0.5)",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        zIndex: "1",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 1,
                        }}
                      >
                        <img
                          className="w-9 h-9 rounded-full"
                          src={
                            reelItem.user.image ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          alt="userimage"
                          style={{ objectFit: "cover", marginRight: "10px" }}
                        />
                        <div>
                          <div>{reelItem.user.name}</div>
                          <div
                            style={{
                              fontSize: "0.8em",
                              color: "lightgray",
                              cursor: "pointer",
                            }}
                            onClick={(event) => {
                              handleUsernameClick(
                                reelItem.user.username,
                                event
                              );
                            }}
                          >
                            @{reelItem.user.username}
                          </div>
                        </div>
                      </div>
                      {reelItem.user.id === user.reqUser.id ? (
                        <MdDeleteForever
                          size={"1.5em"}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleReelDelete(reelItem.id)}
                        />
                      ) : (
                        " "
                      )}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: "5%",
                        top: "72%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "25px",
                        zIndex: "1",
                      }}
                    >
                      {likesData[reelItem.id]?.isLiked ? (
                        <AiFillHeart
                          onClick={() => handleDislikeReel(reelItem.id)}
                          className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                        />
                      ) : (
                        <AiOutlineHeart
                          onClick={() => handleLikeReel(reelItem.id)}
                          className="text-2xl hover:opacity-50 cursor-pointer"
                        />
                      )}
                      {likesData[reelItem.id]?.likeCount > 0 && (
                        <p className="text-sm" style={{ marginTop: "-18px" }}>
                          {likesData[reelItem.id]?.likeCount} likes{" "}
                        </p>
                      )}
                      <FaRegCommentDots
                        className="text-xl ml-1 hover:opacity-50 cursor-pointer"
                        onClick={() => handleCommentClick(reelItem.id)}
                      />
                    </div>
                    <video
                      key={index}
                      width={"100%"}
                      height={"100%"}
                      src={reelItem.video}
                      className="reel-video mt-5 custom-controls"
                      style={{
                        display: index === currentReel ? "block" : "none",
                        transition: "opacity 0.5s ease-in-out",
                        borderRadius: "20px",
                      }}
                      controls
                      controlsList="nodownload nofullscreen noremoteplayback"
                      onClick={() => {
                        const video = document.querySelector(`#video-${index}`);
                        if (video.paused) {
                          video.play();
                        } else {
                          video.pause();
                        }
                      }}
                      onPlay={(e) => {
                        currentVideoRef.current = e.target; 
                      }}
                      id={`video-${index}`}
                    >
                      <source src={reelItem.video} type="video/mp4" />
                      Your browser does not support the videos.
                    </video>
                    <div
                      className="video-overlay"
                      style={{
                        position: "absolute",
                        color: "white",
                        width: "100%",
                        padding: "5px 20px",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        zIndex: "1",
                        bottom: "10%",
                        left: "0",
                        textAlign: "center",
                      }}
                    >
                      {reelItem.caption ? (
                        <Text fontSize="sm" style={{ color: "white" }}>
                          {reelItem.user.username}: {reelItem.caption}
                        </Text>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
      {selectedReel && (
        <ReelCommentModal
          isOpen={isCommentModalOpen}
          onClose={closeCommentModal}
          reel={selectedReel}
          onCommentSubmit={handleCommentSubmit}
        />
      )}
    </div>
  );
};

ReelViewer.propTypes = {
  reels: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.string.isRequired,
      caption: PropTypes.string,
    })
  ).isRequired,
};

export default ReelViewer;
