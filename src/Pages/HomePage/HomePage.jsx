import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Config/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard/PostCard";
import { suggetions, timeDifference } from "../../Config/Logic";
import { findUserPost } from "../../Redux/Post/Action";
import {
  findByUserIdsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaRegLaughWink } from "react-icons/fa";

const HomePage = () => {
  const dispatch = useDispatch();
  const [userIds, setUserIds] = useState([]);
  const token = localStorage.getItem("token");
  const reqUser = useSelector((store) => store.user.reqUser);
  const { user, post } = useSelector((store) => store);
  const [suggestedUser, setSuggestedUser] = useState([]);
  const [posted, setPosted] = useState([]);

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (reqUser) {
      const newIds = reqUser?.following?.map((user) => user.id);
      setUserIds([reqUser?.id, ...newIds]);
      setSuggestedUser(suggetions(reqUser));
    }
  }, [reqUser]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/posts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPosted(res.data))
      .catch((err) => console.log(err.message));
  }, [BASE_URL, token]);

  useEffect(() => {
    const data = {
      userIds: [userIds].join(","),
      jwt: token,
    };

    if (userIds.length > 0) {
      dispatch(findUserPost(data));
      dispatch(findByUserIdsAction(data));
    }
  }, [userIds, post.createdPost, post.deletedPost, post.updatedPost, dispatch]);

  useEffect(() => {
    // Update posted state when userPost in Redux changes
    setPosted(post.userPost);
  }, [post.userPost]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex mt={20} flex="1" overflow="hidden">
        <Box
          width="80%"
          ml="22%"
          p={5}
          overflowY="auto"
          style={{ height: "calc(100vh - 70px)", scrollbarWidth: "none" }} // Hide scrollbar
          sx={{ "&::-webkit-scrollbar": { display: "none" } }} // For Webkit browsers
        >
          <div
            className="space-y-10 postsBox w-full"
            style={{ paddingTop: "10px" }}
          >
            {posted.length === 0 ? (
              <Flex
              justifyContent="center"
              alignItems="center"
              mr="32%"
              flexDirection="column"
            >
              <FaRegLaughWink size="15rem" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center" mt={4}>
                Be the first to create a post!
              </Text>
            </Flex>
            ) : (
              posted.map((post) => (
                <PostCard
                  key={post.id} // The key prop should be here
                  post={post}
                  postId={post.id}
                  username={post.userUsername}
                  caption={post.caption}
                  location={post.location}
                  postImage={post.image}
                  createdAt={timeDifference(post.createdAt)}
                  userImage={
                    user.userImage
                      ? user.userImage
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                />
              ))
            )}
          </div>
        </Box>

        <Box
          width="23%"
          p={7}
          position="fixed"
          top="80px"
          right={0}
          bottom={0}
          overflowY="auto"
        >
          <HomeRight suggestedUser={suggestedUser} />
        </Box>
      </Flex>
    </div>
  );
};

export default HomePage;
