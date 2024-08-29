import React, { useEffect, useState } from "react";
import { FaVideo, FaBookmark, FaThLarge } from "react-icons/fa";
import ReqUserPostCard from "./ReqUserPostCard";
import ReqUserReelCard from "./ReqUserReelCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";
import { getReelByUserId } from "../../Redux/Reel/Action";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

const ProfilePostsPart = ({ user, reqUserId}) => {
  const [activeTab, setActiveTab] = useState("Post");
  const { post } = useSelector((store) => store);
  const { reels } = useSelector((store) => store.reel);
  const token = sessionStorage.getItem("token");
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
    if (activeTab === "Post") {
      dispatch(reqUserPostAction(data));
    }
    if (activeTab === "Reels") {
      dispatch(getReelByUserId(data));
    }
  }, [user, activeTab]);

  const tabSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box>
      <Flex justify="space-between" borderTop="1px solid" borderColor="gray.300" position="relative">
        {tabs.map((item) => (
          <Flex
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            justify="center"
            align="center"
            cursor="pointer"
            w="33.33%"
            py={2}
            transition="transform 0.3s"
            transform={item.tab === activeTab ? "scale(1.1)" : "scale(1)"}
            color={item.tab === activeTab ? "blue.500" : "gray.500"}
            borderBottom={item.tab === activeTab ? "2px solid" : "none"}
            borderBottomColor={item.tab === activeTab ? "blue.500" : "none"}
          >
            <Text mr={2} fontSize={tabSize}>
              {item.icon}
            </Text>
            <Text fontSize={tabSize}>{item.tab}</Text>
          </Flex>
        ))}
      </Flex>
      <Box mt={4}>
        <Flex wrap="wrap" justify="flex-start">
          {activeTab === "Post" && post.reqUserPost?.length > 0 ? (
            post.reqUserPost.map((item, index) => (
              <ReqUserPostCard post={item} key={index} activeTab={activeTab} />
            ))
          ) : activeTab === "Post" && post.reqUserPost?.length === 0 ? (
            <Flex w="full" justify="center" align="center">
              <Text fontSize="xl">Nothing here yet, start sharing your Giggles!</Text>
            </Flex>
          ) : activeTab === "Saved" && user.id !== reqUserId ? (
            <Flex w="full" justify="center" align="center">
              <Text fontSize="xl">Saved content is hidden from other users</Text>
            </Flex>
          ) : activeTab === "Saved" && user?.savedPost?.length > 0 && user.id === reqUserId ? (
            user.savedPost.map((item, index) => (
              <ReqUserPostCard post={item} key={index} activeTab={activeTab} />
            ))
          ) : activeTab === "Saved" && user?.savedPost?.length === 0 && user.id === reqUserId ? (
            <Flex w="full" justify="center" align="center">
              <Text fontSize="xl">Nothing saved yet, bookmarking your favorite content!</Text>
            </Flex>
          ) : activeTab === "Reels" && reels?.length > 0 ? (
            reels.map((reelItem, index) => (
              <ReqUserReelCard key={index} reel={reelItem} />
            ))
          ) : activeTab === "Reels" && reels?.length === 0 ? (
            <Flex w="full" justify="center" align="center">
              <Text fontSize="xl">No reels yet, capture and share your adventures!</Text>
            </Flex>
          ) : (
            ""
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default ProfilePostsPart;
