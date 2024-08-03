import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../Config/api";
import { markAllAsRead } from "../../Redux/Notification/Action";
import {
  Flex,
  Box,
  Badge,
  Text,
  Divider,
  Stack,
  Container,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dispatch = useDispatch();

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

  const handlemarkAllAsRead = () => {
    dispatch(markAllAsRead());
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const timeDifference = (timestamp) => {
    // Convert the timestamp to a Date object
    const date = new Date(timestamp);

    // Calculate the time difference in milliseconds
    const diff = Date.now() - date.getTime();

    // Convert the time difference to seconds, minutes, hours, and days
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Format the time difference as a string
    if (weeks > 0) {
      return weeks + " week" + (weeks === 1 ? "" : "s") + " ago";
    } else if (days > 0) {
      return days + " day" + (days === 1 ? "" : "s") + " ago";
    } else if (hours > 0) {
      return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    } else if (minutes > 0) {
      return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    } else {
      return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
    }
  };

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
                <Button
                  onClick={handlemarkAllAsRead}
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "#8697C4",
                    color: "white",
                  }}
                  size="sm"
                >
                  Mark All as Read
                </Button>
              </Flex>
              <Divider />
              <Box
                maxHeight="450px"
                overflowY="auto"
                css={{
                  "&::-webkit-scrollbar": { display: "none" },
                  msOverflowStyle: "none" /* IE and Edge */,
                  scrollbarWidth: "none" /* Firefox */,
                }}
              >
                {notifications.map((notification) => (
                  <Box
                    key={notification.notificationId}
                    p={6}
                    shadow="lg"
                    borderWidth="1px"
                    borderRadius="lg"
                    mb="3%"
                  >
                    <Text fontWeight="semibold" fontSize="lg">
                      {notification.message}
                    </Text>
                    <Flex justifyContent="space-between" alignItems="center">
                      {notification.read ? (
                        <Badge colorScheme="green">Read</Badge>
                      ) : (
                        <Badge colorScheme="red">Unread</Badge>
                      )}
                      <Text>{timeDifference(notification.notificationAt)}</Text>
                    </Flex>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Container>
        </Box>
      </Flex>
    </div>
  );
}

export default Notification;
