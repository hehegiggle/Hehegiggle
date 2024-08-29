import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  followUserAction,
  unFollowUserAction,
  followerList,
  followingList,
} from "../../Redux/User/Action";
import {
  useToast,
  Box,
  Image,
  Button,
  Text,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../../Config/api";

const UserDetailCard = ({
  userData,
  isRequser,
  isFollowing,
  followerData,
  followingData,
}) => {
  const token = sessionStorage.getItem("token");
  const { post } = useSelector((store) => store);
  const { user } = useSelector((store) => store);
  const navigate = useNavigate();
  console.log("user===============", user);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isFollow, setIsFollow] = useState(isFollowing);
  const [followerOpen, setFollowerOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [popularUser, setPopularUser] = useState([]);
  const [followersCount, setFollowersCount] = useState(
    userData?.follower?.length || 0
  );
  const [followingCount, setFollowingCount] = useState(
    userData?.following?.length || 0
  );

  const goToAccountEdit = () => {
    navigate("/account/edit");
  };

  const data = {
    jwt: token,
    userId: userData?.id,
  };

  useEffect(() => {
    const fetchPopularUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/populer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPopularUser(response.data);
        console.log("POPULAR---------::::::::", response.data);
      } catch (error) {
        console.error("Error fetching popular users:", error);
      }
    };
    fetchPopularUsers();
  }, [token]);

  const handleFollowUser = () => {
    dispatch(followUserAction(data));
    setIsFollow(true);
    setFollowersCount((prev) => prev + 1);
    toast({
      title: "User followed successfully 🫠🫠🫠",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(data));
    setIsFollow(false);
    setFollowersCount((prev) => prev - 1);
    toast({
      title: "Unfollowed user 😔😔😔",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
  };

  const handleFollowerClick = (userId) => {
    const data = {
      userId: userId,
      token: token,
    };
    dispatch(followerList(data));
    setFollowerOpen(true);
  };

  const handleFollowingClick = (userId) => {
    const data = {
      userId: userId,
      token: token,
    };
    dispatch(followingList(data));
    setFollowingOpen(true);
  };

  const handleNavigation = (username) => {
    navigate(`/${username}`);
  };

  useEffect(() => {
    setIsFollow(isFollowing);
    setFollowersCount(userData?.follower?.length || 0);
    setFollowingCount(userData?.following?.length || 0);
  }, [isFollowing, userData]);

  return (
    <Box
      py={10}
      mb={5}
      bgGradient="linear(to-r, #8697C4, #EDE8F5)"
      borderRadius="20px"
    >
      <Flex alignItems="center">
        <Box ml={6}>
          <Image
            boxSize={{ base: "120px", lg: "128px" }}
            borderRadius="full"
            src={
              userData?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
            objectFit="cover"
          />
        </Box>
        <Box
          ml={20}
          w={{ base: "50%", md: "60%", lg: "80%" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Flex
            alignItems="center"
            justifyContent={{ base: "center", md: "flex-start" }}
            mb={5}
          >
            <Text fontSize="xl">{userData?.username}</Text>
            {popularUser[0]?.id === user.reqUser.id ? (
              <Tooltip
                label="You are Most Popular User"
                placement="top"
                hasArrow
              >
                <Badge
                  ml={2}
                  variant="solid"
                  colorScheme="yellow"
                  fontSize="md"
                  cursor="pointer"
                >
                  #1
                </Badge>
              </Tooltip>
            ) : popularUser[1]?.id === user.reqUser.id ? (
              <Tooltip
                label="You 2nd Most Popular User"
                placement="top"
                hasArrow
              >
                <Badge
                  ml={2}
                  variant="solid"
                  colorScheme="gray"
                  fontSize="md"
                  cursor="pointer"
                >
                  #2
                </Badge>
              </Tooltip>
            ) : popularUser[2]?.id === user.reqUser.id ? (
              <Tooltip
                label="You 3rd Most Popular User"
                placement="top"
                hasArrow
              >
                <Badge
                  ml={2}
                  variant="solid"
                  colorScheme="orange"
                  fontSize="md"
                  cursor="pointer"
                >
                  #3
                </Badge>
              </Tooltip>
            ) : (
              " "
            )}

            <Spacer mx={2} />
            <Button
              size="xl"
              mr={{ md: "66%" }}
              bg="white"
              onClick={
                isRequser
                  ? goToAccountEdit
                  : isFollow
                  ? handleUnFollowUser
                  : handleFollowUser
              }
            >
              {isRequser ? "Edit profile" : isFollow ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
          <Flex justifyContent={{ base: "center", md: "flex-start" }} mb={5}>
            <Box mr={10} cursor="pointer">
              <Text as="span" fontWeight="semibold" mr={2}>
                {post?.reqUserPost?.length || 0}
              </Text>
              <Text as="span">Posts</Text>
            </Box>
            <Box
              mr={10}
              onClick={() => handleFollowerClick(userData?.id)}
              cursor="pointer"
            >
              <Text as="span" fontWeight="semibold" mr={2}>
                {followersCount}
              </Text>
              <Text as="span">Followers</Text>
            </Box>
            <Box
              onClick={() => handleFollowingClick(userData?.id)}
              cursor="pointer"
            >
              <Text as="span" fontWeight="semibold" mr={2}>
                {followingCount}
              </Text>
              <Text as="span">Following</Text>
            </Box>
          </Flex>
          <Box textAlign={{ base: "left", md: "left" }}>
            <Text fontWeight="semibold">{userData?.name}</Text>
            <Text fontSize="sm" fontStyle="italic">
              {userData?.bio}
            </Text>
          </Box>
        </Box>
      </Flex>

      <Modal isOpen={followerOpen} onClose={() => setFollowerOpen(false)}>
        <ModalOverlay />
        <ModalContent
          maxW={"25%"}
          maxH={"100%"}
          mt={"15%"}
          borderRadius={"20px"}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #8697C4, #EDE8F5)",
          }}
        >
          <ModalHeader>Followers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {followerData.length === 0 ? (
              <Box textAlign="center">
                <Text className="text-xl">No Followers Found</Text>
              </Box>
            ) : (
              followerData.map((follower) => (
                <Flex key={follower.id} mb={4} alignItems="center">
                  <Image
                    className="w-12 h-12 rounded-full"
                    src={
                      follower.userImage ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt={follower.username}
                    style={{ objectFit: "cover" }}
                  />
                  <Flex
                    flexDirection="column"
                    ml={4}
                    cursor="pointer"
                    onClick={() => handleNavigation(follower.username)}
                  >
                    <Text className="text-lg">{follower.name}</Text>
                    <Text className="text-sm" color="gray.500">
                      @{follower.username}
                    </Text>
                  </Flex>
                </Flex>
              ))
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={followingOpen} onClose={() => setFollowingOpen(false)}>
        <ModalOverlay />
        <ModalContent
          maxW={"25%"}
          maxH={"100%"}
          mt={"15%"}
          borderRadius={"20px"}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #8697C4, #EDE8F5)",
          }}
        >
          <ModalHeader>Following</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {followingData.length === 0 ? (
              <Box textAlign="center">
                <Text className="text-xl">No Followings Found</Text>
              </Box>
            ) : (
              followingData.map((following) => (
                <Flex key={following.id} mb={4} alignItems="center">
                  <Image
                    className="w-12 h-12 rounded-full"
                    src={
                      following.userImage ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt={following.username}
                    style={{ objectFit: "cover" }}
                  />
                  <Flex
                    flexDirection="column"
                    ml={4}
                    cursor="pointer"
                    onClick={() => handleNavigation(following.username)}
                  >
                    <Text className="text-lg">{following.name}</Text>
                    <Text className="text-sm" color="gray.500">
                      @{following.username}
                    </Text>
                  </Flex>
                </Flex>
              ))
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserDetailCard;
