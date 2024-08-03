import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAction, unFollowUserAction, followerList, followingList } from "../../Redux/User/Action";
import { useToast, Box, Image, Button, Text, Flex, Spacer } from "@chakra-ui/react";

const UserDetailCard = ({ user, isRequser, isFollowing }) => {
  const token = sessionStorage.getItem("token");
  const { post } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  
  // State variables for tracking follow status and follower/following counts
  const [isFollow, setIsFollow] = useState(isFollowing);
  const [followersCount, setFollowersCount] = useState(user?.follower?.length || 0);
  const [followingCount, setFollowingCount] = useState(user?.following?.length || 0);

  const goToAccountEdit = () => {
    navigate("/account/edit");
  };

  const data = {
    jwt: token,
    userId: user?.id,
  };

  const handleFollowUser = () => {
    dispatch(followUserAction(data));
    setIsFollow(true);
    setFollowersCount(prev => prev + 1); // Increment followers count
    toast({
      title: "Follow request sent successfully 🫠🫠🫠",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(data));
    setIsFollow(false);
    setFollowersCount(prev => prev - 1); // Decrement followers count
    toast({
      title: "Unfollowed user 😔😔😔",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  };

  // const handleFollowerClick = () => {
  //   dispatch(followerList(token));
  // }

  // const handleFollowingClick = () => {
  //   dispatch(followingList(token));
  // }

  useEffect(() => {
    setIsFollow(isFollowing);
    setFollowersCount(user?.follower?.length || 0);
    setFollowingCount(user?.following?.length || 0);
  }, [isFollowing, user]);

  return (
    <Box py={10} mb={5} bgGradient="linear(to-r, #8697C4, #EDE8F5)" borderRadius="20px">
      <Flex alignItems="center">
        <Box ml={6}>
          <Image
            boxSize={{ base: "120px", lg: "128px" }}
            borderRadius="full"
            src={
              user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
            objectFit="cover"
          />
        </Box>
        <Box ml={20} w={{ base: "50%", md: "60%", lg: "80%" }} textAlign={{ base: "center", md: "left" }}>
          <Flex alignItems="center" justifyContent={{ base: "center", md: "flex-start" }} mb={5}>
            <Text fontSize="xl">{user?.username}</Text>
            <Spacer mx={2} />
            <Button size="xl" mr={{ md: '66%' }} bg="white" onClick={isRequser ? goToAccountEdit : isFollow ? handleUnFollowUser : handleFollowUser}>
              {isRequser ? "Edit profile" : isFollow ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
          <Flex justifyContent={{ base: "center", md: "flex-start" }} mb={5}>
            <Box mr={10}>
              <Text as="span" fontWeight="semibold" mr={2}>
                {post?.reqUserPost?.length || 0}
              </Text>
              <Text as="span">Posts</Text>
            </Box>
            <Box mr={10}>
              <Text as="span" fontWeight="semibold" mr={2}>
                {followersCount}
              </Text>
              <Text as="span">Followers</Text>
            </Box>
            <Box>
              <Text as="span" fontWeight="semibold" mr={2}>
                {followingCount}
              </Text>
              <Text as="span">Following</Text>
            </Box>
          </Flex>
          <Box textAlign={{ base: "left", md: "left" }}>
            <Text fontWeight="semibold">{user?.name}</Text>
            <Text fontSize="sm" fontStyle="italic">{user?.bio}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserDetailCard;
