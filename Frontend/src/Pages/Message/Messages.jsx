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
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdDeleteSweep, MdOutlineAddLink, MdSend } from "react-icons/md";
import SearchUser from "../../Components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  getAllChats,
  deleteAllChatMessages,
} from "../../Redux/Message/Action";
import { BsEmojiFrown } from "react-icons/bs";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Config/api";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";

function Messages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedGif, setSelectedGif] = useState();
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const token = sessionStorage.getItem("token");
  const { message, user } = useSelector((state) => state);
  const chatContainerRef = useRef(null);
  const toast = useToast();

  const MAX_GIF_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB
  
  useEffect(() => {
    dispatch(getAllChats({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    if (currentChat) {
      const pollMessages = async () => {
        try {
          const res = await fetch(
            `${BASE_URL}/api/messages/chat/${currentChat.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

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
    const file = e.target.files[0];
    const fileType = file.type.split("/")[0];

    if (fileType === "image" && file.size > MAX_IMAGE_SIZE) {
      toast({
        title: "Image size exceeds 5MB limit.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (fileType === "video" && file.size > MAX_VIDEO_SIZE) {
      toast({
        title: "Video size exceeds 20MB limit.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (file.type === "image/gif" && file.size > MAX_GIF_SIZE) {
      toast({
        title: "GIF size exceeds 2MB limit.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    if (fileType === "image") {
      const imgurl = await uploadToCloudinary(file, "image");
      setSelectedImage(imgurl);
      setSelectedVideo(null);
      setSelectedGif(null);
    } else if (fileType === "video") {
      const vidurl = await uploadToCloudinary(file, "video");
      setSelectedVideo(vidurl);
      setSelectedImage(null);
      setSelectedGif(null);
    } else if (fileType === "image/gif") {
      const gifurl = await uploadToCloudinary(file, "gif");
      setSelectedGif(gifurl);
      setSelectedImage(null);
      setSelectedVideo(null);
    }

    setLoading(false);
  };

  const handleClick = (id) => {
    // Handle user click
  };

  const handleCreateMessage = (value) => {
    const newMessage = {
      chatId: currentChat?.id,
      content: value.trim(),
      sentImage: selectedImage || null,
      sentVideo: selectedVideo || null,
      sentGif: selectedGif || null,
      senderId: user.reqUser.id,
    };

    if (
      newMessage.sentImage ||
      newMessage.sentVideo ||
      newMessage.sentGif ||
      newMessage.content
    ) {
      dispatch(createMessage({ message: newMessage, token }));
    }

    setSelectedImage(null);
    setSelectedVideo(null);
    setSelectedGif(null);
    setInputValue("");
  };

  const sendMessage = () => {
    if (inputValue.trim() || selectedImage || selectedVideo || selectedGif) {
      handleCreateMessage(inputValue);
    }
  };

  const handleAllMessageDelete = (chatId) => {
    const chat = {
      chatId: chatId,
      jwt: token,
    };
    dispatch(deleteAllChatMessages(chat));
  };

  useEffect(() => {
    if (message.message) {
      setMessages((prevMessages) => [...prevMessages, message.message]);
      if (chatContainerRef.current && !isUserScrolling) {
        scrollToBottom();
      }
    }
  }, [message.message, isUserScrolling]);

  useEffect(() => {
    if (chatContainerRef.current && !isUserScrolling) {
      scrollToBottom();
    }
  }, [messages, isUserScrolling]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const isAtBottom =
          chatContainerRef.current.scrollHeight -
            chatContainerRef.current.scrollTop ===
          chatContainerRef.current.clientHeight;
        setIsUserScrolling(!isAtBottom);
      }
    };

    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleUsernameClick = (username) => {
    navigate(`/${username}`);
  };

  const handleCloseChat = () => {
    setCurrentChat(null);
  };

  const handleEmojiClick = (emojiObject) => {
    setInputValue((prevInputValue) => prevInputValue + emojiObject.emoji);
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
                      src={
                        user.reqUser.id === currentChat.users[0].id
                          ? currentChat.users[1].image ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          : currentChat.users[0].image ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      size="md"
                    />
                    <Box
                      onClick={() =>
                        handleUsernameClick(
                          user.reqUser.id === currentChat.users[0].id
                            ? currentChat.users[1].username
                            : currentChat.users[0].username
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Text ml={3} fontSize="xl" fontWeight="bold">
                        {user.reqUser.id === currentChat.users[0].id
                          ? currentChat.users[1].name
                          : currentChat.users[0].name}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="center">
                    <Tooltip label="Delete All Messages" placement="left">
                      <Box style={{ cursor: "pointer" }} ml={4} mr={2}>
                        <MdDeleteSweep
                          size={"30px"}
                          onClick={() => handleAllMessageDelete(currentChat.id)}
                        />
                      </Box>
                    </Tooltip>
                    <Tooltip label="Close Chat" placement="left">
                      <Box style={{ cursor: "pointer" }} ml={2}>
                        <IoClose
                          size={"30px"}
                          onClick={() => handleCloseChat()}
                        />
                      </Box>
                    </Tooltip>
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
                {selectedVideo && (
                  <Center mb={4}>
                    <video
                      className="w-[10rem] h-[10rem] object-cover rounded-md"
                      controls
                    >
                      <source src={selectedVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Center>
                )}
                {selectedGif && (
                  <Center mb={4}>
                    <Image
                      className="w-[10rem] h-[10rem] object-cover rounded-md"
                      src={selectedGif}
                      alt="Selected GIF"
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
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreateMessage(inputValue);
                      }
                    }}
                  />
                  <Box mr="1.5%">
                    <MdSend
                      size="24"
                      style={{ cursor: "pointer" }}
                      onClick={sendMessage}
                    />
                  </Box>
                  <Icon
                  mr="2%"
                    as={GrEmoji}
                    boxSize={6}
                    ml={2}
                    cursor="pointer"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                  <input
                    type="file"
                    accept="image/*, video/*, image/gif"
                    id="mediaUpload"
                    hidden
                    onChange={handleSelectImage}
                  />

                  <label
                    htmlFor="mediaUpload"
                    style={{ cursor: "pointer", marginRight: "1%" }}
                  >
                    <MdOutlineAddLink size="28" />
                  </label>
                </Flex>
                {showEmojiPicker && (
                  <Box
                    position="absolute"
                    bottom="60px"
                    right="20px"
                    zIndex="1000"
                    boxShadow="md"
                    borderRadius="md"
                  >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </Box>
                )}
              </Box>
            </>
          ) : (
            <Center h="full">
              <Box textAlign="center">
                <BsEmojiFrown size="15rem" />
                <Text fontSize="3xl" mb={5}>
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
