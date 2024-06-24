import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import "./ReqUserPostCard.css";

const ReqUserReelCard = ({ reel }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteUnmute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  useEffect(() => {
    console.log("Reel in ReqUserCard---------",reel);
    const video = videoRef.current;
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className='p-4'>
      <div className='post w-80 h-70 relative'>
        <video
          ref={videoRef}
          className='w-full h-full'
          src={reel?.video}
          alt=""
          controls={false}
          onClick={handlePlayPause}
          style={{borderRadius: "20px"}}
        />
        <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 flex justify-between items-center p-2' style={{borderRadius:"20px"}}>
          <button onClick={handlePlayPause} className='text-white'>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleMuteUnmute} className='text-white'>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <div className='flex-grow mx-2'>
            <div
              className='h-2 bg-gray-300'
              style={{ width: `${progress}%`}}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReqUserReelCard;
