import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { MdMoreVert } from "react-icons/md";
import { deleteChat } from "../../Redux/Message/Action";

function UserChatCard({ chat }) {
  const dispatch = useDispatch();
  const { user, message } = useSelector((state) => state);
  const chatUser = user.reqUser.id === chat.users[0].id ? chat.users[1] : chat.users[0];
  const [isOpen, setIsOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    if (message.deleteChatStatus === "success") {
      toast({
        title: "Chat Deleted",
        description: "Chat deleted successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else if (message.deleteChatStatus === "failure") {
      toast({
        title: "Error",
        description: "Failed to delete chat.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }, [message.deleteChatStatus, toast]);

  const handleDeleteChat = () => {
    const data = {
      chatId: chat.id,
      token: token,
    };
    dispatch(deleteChat({ data }));
  };

  return (
    <Box
      p={4}
      mb={4}
      borderRadius="lg"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      transition="box-shadow 0.2s"
      bg="white"
      w="full"
      maxW={{ base: "100%", md: "100%" }}
      mx="auto"
      style={{
        background: "linear-gradient(135deg, #8697C4, #EDE8F5)",
        borderRadius: "20px",
      }}
    >
      <Flex align="center" justify="space-between" cursor="pointer">
        <Flex align="center">
          <Avatar
            width={{ base: "2.5rem", md: "3.5rem" }}
            height={{ base: "2.5rem", md: "3.5rem" }}
            fontSize={{ base: "1rem", md: "1.5rem" }}
            bgColor="white"
            src={
              chatUser.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            mr={4}
          />
          <Box>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
              {chatUser.name}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
              Hey!!! Lets Giggle...
            </Text>
          </Box>
        </Flex>
        <Menu isOpen={isOpen}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<MdMoreVert size={30} />}
            variant="outline"
            onMouseEnter={() => setIsOpen(true)}
          />
          <MenuList
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <MenuItem onClick={() => handleDeleteChat()}>Delete Chat</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default UserChatCard;
