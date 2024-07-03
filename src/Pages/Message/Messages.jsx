import React, { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Text,
  Input,
  Spinner,
  Center,
  Image,
} from "@chakra-ui/react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlineAddLink } from "react-icons/md";
import SearchUser from "../../Components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessge";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/Action";
import { BsEmojiFrown } from "react-icons/bs";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Config/api";

function Messages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const token = localStorage.getItem("token");
  const { message, user } = useSelector((state) => state);
  const chatContainerRef = useRef(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    dispatch(getAllChats({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    if (currentChat) {
      const pollMessages = async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/messages/chat/${currentChat.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });

          if (!res.ok) {
            throw new Error(`Error fetching messages: ${res.statusText}`);
          }

          const data = await res.json();
          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      const interval = setInterval(pollMessages, 1000);

      return () => clearInterval(interval);
    }
  }, [currentChat, token]);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgurl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgurl);
    setLoading(false);
  };

  const handleClick = (id) => {
    // Implement user click handling if necessary
  };

  const handleCreateMessage = (value) => {
    const newMessage = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
      senderId: user.reqUser.id,
    };
    dispatch(createMessage({ message: newMessage, token }));
    setSelectedImage(null); // Reset selected image after sending message
    setInputValue(""); // Clear input field
  };

  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, message.message]);
  }, [message.message]);

  useEffect(() => {
    if (chatContainerRef.current) {
      if (isInitialLoad.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        isInitialLoad.current = false;
      } else {
        const isScrolledToBottom =
          chatContainerRef.current.scrollHeight - chatContainerRef.current.scrollTop ===
          chatContainerRef.current.clientHeight;
        if (isScrolledToBottom) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }
    }
  }, [messages]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <Box
      h="100vh"
      overflow="hidden"
      position="relative"
      style={{ background: "linear-gradient(180deg, #8697C4, #EDE8F5)" }}
    >
      {loading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="9999"
        >
          <Spinner size="xl" color="white" />
        </Box>
      )}
      <Grid templateColumns={{ base: "1fr", md: "1fr 3fr" }} h="full">
        <GridItem
          p={5}
          borderRight={{ base: "none", md: "1px solid" }}
          borderColor="gray.200"
        >
          <Flex direction="column" h="full" justify="space-between">
            <Box>
              <Flex
                align="center"
                mb={4}
                onClick={handleNavigateBack}
                style={{ cursor: "pointer" }}
              >
                <Icon as={RiArrowGoBackFill} boxSize={6} />
                <Text ml={2} fontSize="xl" fontWeight="bold">
                  Back
                </Text>
              </Flex>
              <Box mb={4}>
                <SearchUser handleClick={handleClick} />
              </Box>
              <Box
                h={{ base: "auto", md: "calc(100vh - 160px)" }}
                overflowY="scroll"
                css={{ scrollbarWidth: "none" }}
                className="hideScrollbar"
              >
                {message.chats.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentChat(item);
                      setMessages(item.messages);
                      isInitialLoad.current = true;
                    }}
                  >
                    <UserChatCard chat={item} />
                  </div>
                ))}
              </Box>
            </Box>
          </Flex>
        </GridItem>
        <GridItem
          display={{ base: currentChat ? "block" : "none", md: "block" }}
          borderLeft={{ base: "none", md: "1px solid" }}
          borderColor="gray.200"
        >
          {currentChat ? (
            <>
              <Box>
                <Flex
                  justify="space-between"
                  align="center"
                  p={5}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                >
                  <Flex align="center">
                    <Avatar
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      size="md"
                    />
                    <Text ml={3} fontSize="xl" fontWeight="bold">
                      {user.reqUser.id === currentChat.users[0].id
                        ? currentChat.users[1].name
                        : currentChat.users[0].name}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <Box
                p={5}
                ref={chatContainerRef}
                overflowY="scroll"
                css={{ scrollbarWidth: "none" }}
                className="hideScrollbar"
                h="calc(100vh - 160px)"
                display="flex"
                flexDirection="column-reverse"
              >
                {messages.map((item) => (
                  <ChatMessage key={item.id} item={item} />
                ))}
              </Box>
              <Box position="sticky" bottom={0} p={4}>
                {selectedImage && (
                  <Center mb={4}>
                    <Image
                      className="w-[10rem] h-[10rem] object-cover rounded-md"
                      src={selectedImage}
                      alt="Selected"
                    />
                  </Center>
                )}
                <Flex align="center" justify="space-between">
                  <Input
                    style={{ borderColor: "black" }}
                    className="text"
                    placeholder="Start messaging..."
                    borderRadius="full"
                    py={3}
                    px={5}
                    flex="1"
                    mr={4}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value.trim() !== "") {
                        handleCreateMessage(e.target.value);
                      }
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    hidden
                    onChange={handleSelectImage}
                  />
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    <MdOutlineAddLink size="24" />
                  </label>
                </Flex>
              </Box>
            </>
          ) : (
            <Center h="full">
              <Box textAlign="center">
              <Icon as={BsEmojiFrown} boxSize={"100%"} />
                <Text fontSize="2xl" mb={5}>
                  No chats selected
                </Text>
              </Box>
            </Center>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Messages;
