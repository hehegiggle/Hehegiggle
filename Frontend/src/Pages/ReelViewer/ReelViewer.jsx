import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getAllReels } from "../../Redux/Reel/Action";
import { Box, Flex } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./ReelViewer.css"; 

const ReelViewer = ({ reels }) => {
  const [currentReel, setCurrentReel] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex mt={20} flex="1" overflow="hidden" ref={containerRef}>
        <Box
          bg="#fff"
          p={2}
          borderRadius="20px"
          boxShadow="2xl"
          style={{
            marginLeft: "23%",
            width: "74%",
            marginTop: "2%",
            marginBottom: "2%",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #8697C4, #EDE8F5)"
          }}
        >
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
          <div className="reel-viewer h-screen flex flex-col items-center">
            <div className="relative reel-player w-[30vw] lg:w-[20vw] ">
              {reels.map((reelItem, index) => (
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
              ))}
            </div>
          </div>
        </Box>
      </Flex>
    </div>
  );
};

ReelViewer.propTypes = {
  reels: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ReelViewer;
