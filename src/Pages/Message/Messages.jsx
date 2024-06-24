import React, { useEffect, useState } from "react";
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
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./Message.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6

function Messages() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const token = localStorage.getItem("token");
  const { message, user } = useSelector((state) => state);

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8087/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);

    stomp.connect(
      {},
      () => {
        console.log("Connected to WebSocket");
        if (user.reqUser) {
          const subscription = stomp.subscribe(
            `/user/${user.reqUser.id}/private`,
            onMessageReceive
          );
          return () => {
            subscription.unsubscribe();
            stomp.disconnect();
          };
        }
      },
      onError
    );
  }, [user.reqUser]); // Ensure this useEffect runs only once on mount

  const onError = (e) => {
    console.log("Error in WebSocket Connection: ", e);
  };

  const onMessageReceive = (newMessage) => {
    console.log("Message Received From WebSocket: ", newMessage);
    const parsedMessage = JSON.parse(newMessage.body);
    setMessages((prevMessages) => [...prevMessages, parsedMessage]);
  };

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const handleSelectImage = async (e) => {
    setLoading(true);
    console.log("Image Selected");
    const imgurl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgurl);
    setLoading(false);
  };

  const handleClick = (id) => {
    console.log("Selected User ID: ", id);
  };

  const handleCreateMessage = (value) => {
    const newMessage = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
      senderId: user.reqUser.id,
    };
    console.log("Message is--------", newMessage.content);
    dispatch(
      createMessage({ message: newMessage, token, sendMessageToServer })
    );
    sendMessageToServer(newMessage); // Ensure this sends the correct message
    setSelectedImage(null); // Reset selected image after sending message
    setInputValue(""); // Clear input field
  };

  useEffect(() => {
    dispatch(getAllChats({ token }));
  }, [dispatch, token]);
  console.log("Chats -----------", message.chats);

  useEffect(() => {
    setMessages([...messages, message.message]);
  }, [message.message]);

  // Function to handle navigation back
  const handleNavigateBack = () => {
    navigate(-1); // Navigate back to the previous page in history
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
                {message.chats.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  );
                })}
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
                overflowY="scroll"
                css={{ scrollbarWidth: "none" }}
                className="hideScrollbar"
                h="calc(100vh - 160px)"
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
                  style={{borderColor:"black"}}
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
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                      }
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSelectImage}
                    className="hidden"
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <Icon as={MdOutlineAddLink} boxSize={6} cursor="pointer" />
                  </label>
                </Flex>
              </Box>
            </>
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              h="full"
              textAlign="center"
            >
              <BsEmojiFrown size="15rem" />
              <Text fontSize="2xl" fontWeight="bold">
                No Chats Selected
              </Text>
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Messages;
