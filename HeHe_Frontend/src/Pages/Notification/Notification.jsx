import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../Config/api";
import {
  markAllAsRead,
  markIndividulaAsRead,
  deleteAllNotifications,
  deleteParticularNotification
} from "../../Redux/Notification/Action";
import {
  Flex,
  Box,
  Badge,
  Text,
  Divider,
  Stack,
  Container,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { TbMoodSadFilled } from "react-icons/tb";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { FcCheckmark } from "react-icons/fc";
import { TiDeleteOutline } from "react-icons/ti";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const jwt = sessionStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/realtime-notifications/user`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const notifications = response.data;
        setNotifications(notifications);
        const unreadCount = notifications.filter(
          (notification) => !notification.read
        ).length;
        setUnreadCount(unreadCount);
      } catch (error) {
        console.error("Notification fetching Response error:", error.response);
        console.error("Notification fetching Request error:", error.request);
        console.error("Notification fetching Error:", error.message);
      }
    };
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleMarkAllAsRead = () => {
    if (unreadCount > 0) {
      dispatch(markAllAsRead());
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    const data={
      token: token,
      notificationId: notificationId,
    }
    dispatch(markIndividulaAsRead(data));
  }

  const handleDeleteAllNotifications = () => {
    dispatch(deleteAllNotifications());
  }

  const handleDeleteNotification = (notificationId) =>{
    dispatch(deleteParticularNotification(notificationId));
  }

  const timeDifference = (timestamp) => {
    const date = new Date(timestamp);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
    } else if (days > 0) {
      return days + " day" + (days === 1 ? "" : "s") + " ago";
    } else if (hours > 0) {
      return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    } else if (minutes > 0) {
      return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    } else {
      return " less than a minute ago";
    }
  };

  const allNotificationsRead = unreadCount === 0 && notifications.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Flex mt={20} flex="1" overflow="hidden">
        <Box
          bg="#fff"
          p={2}
          borderRadius="20px"
          boxShadow="2xl"
          ml={{ base: "12%", md: "21%" }}
          width={{ base: "85%", md: "77%" }}
          mt={{ base: "5%", md: "2%" }}
          mb={{ md: "2%", base: "4%" }}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #8697C4, #EDE8F5)",
          }}
        >
          <Container maxW="2xl" mt={10}>
            <Stack spacing={6}>
              {notifications.length > 0 && (
                <>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Box>
                      <Badge
                        colorScheme="green"
                        variant="solid"
                        fontSize="md"
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#8697C4",
                          color: "white",
                        }}
                      >
                        Unread Notifications: {unreadCount}
                      </Badge>
                    </Box>
                    <Flex
                      justifyContent="flex-end"
                      alignItems="center"
                      gap={14}
                    >
                      <Tooltip label="Mark All as Read" placement="top">
                        <Box as="span">
                          <GiCheckMark
                            size={"22px"}
                            cursor={allNotificationsRead ? "not-allowed" : "pointer"}
                            onClick={handleMarkAllAsRead}
                            color={allNotificationsRead ? "gray" : "black"}
                          />
                        </Box>
                      </Tooltip>
                      <Tooltip label="Delete All Notifications" placement="top">
                        <Box as="span">
                          <MdOutlineDeleteSweep
                            size={"26px"}
                            cursor="pointer"
                            onClick={()=>handleDeleteAllNotifications()}
                          />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Flex>
                  <Divider />
                </>
              )}
              <Box
                maxHeight="450px"
                overflowY="auto"
                css={{
                  "&::-webkit-scrollbar": { display: "none" },
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
                {notifications.length === 0 ? (
                  <Flex direction="column" align="center" mt={20}>
                    <TbMoodSadFilled size="15rem" />
                    <Text mt={2} fontSize="2xl" fontWeight="semibold">
                      No recent notifications
                    </Text>
                  </Flex>
                ) : (
                  notifications.map((notification) => (
                    <Box
                      key={notification.notificationId}
                      p={6}
                      shadow="lg"
                      borderWidth="1px"
                      borderRadius="lg"
                      mb="3%"
                    >
                      <Flex justifyContent="space-between" alignItems="center">
                        <Text fontWeight="semibold" fontSize="lg">
                          {notification.message}
                        </Text>
                        <Flex alignItems="center" gap={6}>
                          <Tooltip label="Mark as Read" placement="top">
                            <Box as="span">
                              <FcCheckmark
                                size={"22px"}
                                cursor={notification.read ? "not-allowed" : "pointer"}
                                color={notification.read ? "gray" : "black"}
                                onClick={() => handleMarkAsRead(notification.notificationId)}
                              />
                            </Box>
                          </Tooltip>
                          <Tooltip label="Delete Notification" placement="top">
                            <Box as="span">
                              <TiDeleteOutline
                                color={"red"}
                                size={"22px"}
                                cursor="pointer"
                                onClick={() => handleDeleteNotification(notification.notificationId)}
                              />
                            </Box>
                          </Tooltip>
                        </Flex>
                      </Flex>
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mt={2}
                      >
                        {notification.read ? (
                          <Badge colorScheme="green">Read</Badge>
                        ) : (
                          <Badge colorScheme="red">Unread</Badge>
                        )}
                        <Text>
                          {timeDifference(notification.notificationAt)}
                        </Text>
                      </Flex>
                    </Box>
                  ))
                )}
              </Box>
            </Stack>
          </Container>
        </Box>
      </Flex>
    </div>
  );
}

export default Notification;
