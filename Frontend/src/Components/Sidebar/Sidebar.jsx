import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDisclosure, Tooltip } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Badge,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { mainu } from "./SidebarConfig";
import { AiOutlinePlus } from "react-icons/ai";
import { FiVideo } from "react-icons/fi";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";
import { fetchNotifications } from "../../Redux/Notification/Action";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, notifications } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Home");
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true); // Initialize as expanded

  const showNotificationBadge = useBreakpointValue({ base: false, md: true });
  const showRedDot = useBreakpointValue({ lg: true, md: true, sm: true });
  const showButtonText = useBreakpointValue({ base: false, sm: false, md: true });

  useEffect(() => {
    if (location.pathname === "/Home") {
      setActiveTab("Home");
    } else if (location.pathname.includes(`/${user.reqUser?.username}`)) {
      setActiveTab("Profile");
    } else if (location.pathname.includes("/Reels")) {
      setActiveTab("Reels");
    } else if (location.pathname.includes("/Messages")) {
      setActiveTab("Messages");
    } else if (location.pathname.includes("/Notifications")) {
      setActiveTab("Notifications");
    }
  }, [location, user.reqUser?.username]);

  useEffect(() => {
    const fetchNotificationData = () => {
      dispatch(fetchNotifications());
    };
    fetchNotificationData();
    const intervalId = setInterval(fetchNotificationData, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleTabClick = (tab, icon) => {
    if (tab === "Collapse") {
      setIsExpanded((prev) => !prev); // Toggle the sidebar
    } else {
      setActiveTab(tab);
      if (tab === "Profile" || icon === "CgProfile") {
        navigate(`/${user.reqUser?.username}`);
      } else if (tab === "Home" || icon === "AiOutlineHome") {
        navigate("Home");
      } else if (tab === "Create" || icon === "") {
        onOpen();
      } else if (tab === "Reels" || icon === "RiVideoLine") {
        navigate("Reels");
      } else if (tab === "Create Reels" || icon === "") {
        handleOpenCreateReelModal();
      } else if (tab === "Messages" || icon === "AiOutlineMessage") {
        navigate("Messages");
      } else if (tab === "Notifications" || icon === "AiFillHeart") {
        navigate("Notifications");
      }
    }
  };

  const handleCloseCreateReelModal = () => {
    setIsCreateReelModalOpen(false);
  };

  const handleOpenCreateReelModal = () => {
    setIsCreateReelModalOpen(true);
  };

  return (
    <Box
      position="fixed"
      top={{ base: "44%", md: "45%" }}
      transform="translateY(-50%)"
      w={{ base: "90px", md: isExpanded ? "300px" : "90px" }} // Responsive width
      h="60%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      px="10"
      marginLeft={{ lg: '-3', md: '-3', sm: "-3" }}
    >
      <Box
        boxShadow="2xl"
        p="5"
        borderRadius="20px"
        color="#283351"
        bgGradient="linear(to-b, #8697C4, #EDE8F5)"
        flexGrow="1"
      >
        <Stack mt="8" ml={{ base: "-3", md: "-3" }}>
          {mainu.map((item) => (
            <Flex
              key={item.title}
              align="center"
              mb="5"
              cursor="pointer"
              fontSize="lg"
              onClick={() => handleTabClick(item.title, item.icon)}
              justifyContent="flex-start"
            >
              <Tooltip label={item.title} placement="right">
                <Box mb="1" fontSize="20px" position="relative">
                  {activeTab === item.title ? item.activeIcon : item.icon}
                  {item.title === "Notifications" && notifications.unreadCount > 0 && showRedDot && (
                    <Box
                      position="absolute"
                      top="-2px"
                      left="15%"
                      width="10px"
                      height="10px"
                      borderRadius="50%"
                      bg="red"
                    />
                  )}
                </Box>
              </Tooltip>
              {isExpanded && (
                <Text
                  ml="2"
                  fontWeight={activeTab === item.title ? "bold" : "normal"}
                  fontSize="xl"
                  display={showButtonText ? 'block' : 'none'} // Show text on medium screens
                >
                  {item.title}
                </Text>
              )}
              {item.title === "Notifications" &&
                notifications.unreadCount > 0 &&
                showNotificationBadge && isExpanded && (
                  <Badge
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "30%",
                      padding: "6px",
                      fontSize: "10px",
                      fontWeight: "bold",
                      marginLeft: "8px",
                    }}
                  >
                    {notifications.unreadCount}
                  </Badge>
                )}
            </Flex>
          ))}
        </Stack>
      </Box>

      <Flex
        flexDirection="column"
        mt="5"
        alignItems={{ base: "center", md: "flex-start" }}
      >
        {isExpanded ? (
          <>
            <Button
              onClick={onOpen}
              mb="4"
              borderRadius="20px"
              bg="#8697C4"
              width="100%"
              display={showButtonText ? 'block' : 'none'}
            >
              Create Post
            </Button>
            <Button
              onClick={handleOpenCreateReelModal}
              borderRadius="20px"
              bg="#8697C4"
              width="100%"
              display={showButtonText ? 'block' : 'none'}
            >
              Create Reel
            </Button>
          </>
        ) : (
          <>
            <Tooltip label="Create Post" placement="right">
              <IconButton
                marginLeft={{ lg: '0', md: '0', sm: "7" }}
                aria-label="Create Post"
                icon={<AiOutlinePlus />}
                onClick={onOpen}
                mb="4"
                borderRadius="20px"
                bg="#8697C4"
              />
            </Tooltip>
            <Tooltip label="Create Reel" placement="right">
              <IconButton
                marginLeft={{ lg: '0', md: '0', sm: "7" }}
                aria-label="Create Reel"
                icon={<FiVideo />}
                onClick={handleOpenCreateReelModal}
                borderRadius="20px"
                bg="#8697C4"
              />
            </Tooltip>
          </>
        )}
      </Flex>
      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      <CreateReelModal
        onClose={handleCloseCreateReelModal}
        isOpen={isCreateReelModalOpen}
        onOpen={handleOpenCreateReelModal}
      />
    </Box>
  );
};

export default Sidebar;
