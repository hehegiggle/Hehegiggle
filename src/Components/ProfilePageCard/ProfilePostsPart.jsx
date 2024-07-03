import React, { useEffect, useState } from "react";
import { FaVideo, FaBookmark, FaThLarge } from "react-icons/fa";
import ReqUserPostCard from "./ReqUserPostCard";
import ReqUserReelCard from "./ReqUserReelCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";
import { getReelByUserId } from "../../Redux/Reel/Action";

const ProfilePostsPart = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Post");
  const { post } = useSelector((store) => store);
  const { reels } = useSelector((store) => store.reel); // Reels from Redux store
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const tabs = [
    { tab: "Post", icon: <FaThLarge className="text-2xl" />, activeTab: "" },
    { tab: "Reels", icon: <FaVideo className="text-2xl" />, activeTab: "" },
    { tab: "Saved", icon: <FaBookmark className="text-2xl" />, activeTab: "" },
  ];

  useEffect(() => {
    const data = {
      jwt: token,
      userId: user?.id,
    };
    dispatch(reqUserPostAction(data));
    if (activeTab === "Reels") {
      dispatch(getReelByUserId(data));
    }
  }, [user, activeTab]); // Fetch reels when user or activeTab changes

  return (
    <div className="">
      <div className="flex justify-between border-t relative">
        {tabs.map((item) => (
          <div
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`${
              item.tab === activeTab ? "border-t border-[#3a7ae3]" : "opacity-60"
            } flex justify-center items-center cursor-pointer w-1/3 text-lg py-2 transition duration-300 transform ${
              item.tab === activeTab ? "scale-110 text-[#3a7ae3]" : ""
            }`}
          >
            <p className="mr-2 transition duration-300 transform">
              {item.icon}
            </p>
            <p className="text-sm">{item.tab}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {activeTab === "Post" && post.reqUserPost?.length > 0 ? (
            post.reqUserPost.map((item, index) => (
              <ReqUserPostCard post={item} key={index} />
            ))
          ) : activeTab === "Post" && post.reqUserPost?.length === 0 ? (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-xl">Nothing here yet, start sharing your Giggles!</h1>
            </div>
          ) : activeTab === "Saved" && user?.savedPost?.length > 0 ? (
            user.savedPost.map((item, index) => (
              <ReqUserPostCard post={item} key={index} />
            ))
          ) : activeTab === "Saved" && user?.savedPost?.length === 0 ? (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-xl">Nothing saved yet, bookmarking your favorite content!</h1>
            </div>
          ) : activeTab === "Reels" && reels?.length > 0 ? (
            reels.map((reelItem, index) => {
              return <ReqUserReelCard key={index} reel={reelItem} />;
            })
          ) : activeTab === "Reels" && reels?.length === 0 ? (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-xl">No reels yet, capture and share your adventures!</h1>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePostsPart;
