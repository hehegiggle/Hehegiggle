import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getAllReels } from "../../Redux/Reel/Action";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./ReelViewer.css";
import { TbMoodSadDizzy } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const ReelViewer = ({ reels }) => {
  const [currentReel, setCurrentReel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = sessionStorage.getItem("token");
    dispatch(getAllReels(jwt));
  }, [dispatch]);

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
    setCurrentReel((prevReel) =>
      prevReel === reels.length - 1 ? 0 : prevReel + 1
    );
  };

  const handlePrevReel = () => {
    setCurrentReel((prevReel) =>
      prevReel === 0 ? reels.length - 1 : prevReel - 1
    );
  };

  const handleUsernameClick = (username, event) =>{
    event.stopPropagation();
    navigate(`/${username}`);
  }

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
                        zIndex:'1'
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
                        <div style={{ fontSize: "0.8em", color: "lightgray", cursor:"pointer"}} onClick={(event)=>handleUsernameClick(reelItem.user.username, event)}>
                          @{reelItem.user.username}
                        </div>
                      </div>
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
                        zIndex: '1',
                        bottom: '10%',
                        left: '0',
                        textAlign: 'center',
                      }}
                    >
                      <Text fontSize="sm" fontFamily="semibold" style={{ color: 'white' }}>
                        {reelItem.user.username}: {reelItem.caption}
                      </Text>
                    </div>
                  </div>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
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