import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Config/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard/PostCard";
import { suggetions, timeDifference } from "../../Config/Logic";
import {
  findByUserIdsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaRegLaughWink } from "react-icons/fa";

const HomePage = () => {
  const dispatch = useDispatch();
  const [userIds, setUserIds] = useState([]);
  const token = sessionStorage.getItem("token");
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
  }, [BASE_URL, token, post.createdPost, post.deletedPost, post.updatedPost]);

  useEffect(() => {
    const data = {
      userIds: [userIds].join(","),
      jwt: token,
    };

    if (userIds.length > 0) {
      dispatch(findByUserIdsAction(data));
    }
  }, [userIds, post.createdPost, post.deletedPost, post.updatedPost, dispatch]);

  useEffect(() => {
    setPosted(post.userPost);
  }, [post.userPost]);

  return (
    <Flex direction="column" height="100vh" overflow="hidden">
      <Flex mt={{ sm:"5.5%", md:"4.3%", lg:"6.5%", xl:'5.5%'}} flex="1" overflow="hidden">
        <Box
          width={{ base: "100%", lg: "80%" }}
          ml={{ base: '15%', lg: "18%" }}
          p={{ base: 2, md: 5 }}
          mt={{base:"4.5%", lg:"0%"}}
          overflowY="auto"
          height="calc(100vh - 70px)"
          sx={{
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Webkit browsers
            scrollbarWidth: "none", // Hide scrollbar
          }}
        >
          <Box className="space-y-10 postsBox" pt={2}>
            {posted.length === 0 ? (
              <Flex
                justifyContent="center"
                alignItems="flex-start"
                flexDirection="column"
                mt={{ base: 10, md: '10%' }}
                ml={{md:'22%'}}
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
          </Box>
        </Box>

        <Box
          display={{ base: "block", md: "block" }}
          width="24%"
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
    </Flex>
  );
};

export default HomePage;
