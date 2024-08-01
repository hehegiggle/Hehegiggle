import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteMessageById } from "../../Redux/Message/Action";

function ChatMessage({ item }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const isReqUserMessage = user.reqUser?.id === item.user.id;
  const formattedTimestamp = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true });
  const token = sessionStorage.getItem("token");
  const [showIcon, setShowIcon] = useState(false);
  const messageRef = useRef();

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowIcon(true);
  };

  const handleDeleteClick = (messageId) => {
    const message = {
      messageId: messageId,
      jwt: token
    }
    dispatch(deleteMessageById(message));
  };

  const handleClickOutside = (e) => {
    if (messageRef.current && !messageRef.current.contains(e.target)) {
      setShowIcon(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Flex
      justify={!isReqUserMessage ? "flex-start" : "flex-end"}
      textColor="black"
      onContextMenu={handleRightClick}
      position="relative"
    >
      <Box
        ref={messageRef}
        p={2}
        borderRadius="15px"
        bg="linear-gradient(180deg, #8697C4, #EDE8F5)"
        maxW={["70%", "60%", "50%"]}
        mt={"2%"}
        position="relative"
      >
        {item.sentImage && (
          <Image
            src={item.sentImage}
            alt="Message"
            borderRadius="20px"
            mb={2}
            display="block"
            objectFit="cover"
            width="100%"
            maxHeight="250px"
          />
        )}
        {item.sentVideo && (
          <video
            src={item.sentVideo}
            alt="Video"
            style={{
              display: "block",
              borderRadius: "20px",
              marginBottom: "2px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "250px",
            }}
            controls
          />
        )}
        {item.sentGif && (
          <img
            src={item.sentGif}
            alt="GIF"
            style={{
              display: "block",
              borderRadius: "20px",
              marginBottom: "2px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "250px",
            }}
          />
        )}
        <Tooltip mt={"5%"} label={formattedTimestamp} aria-label="Timestamp">
          <Text py={2} fontSize="lg">
            {item.content}
          </Text>
        </Tooltip>
        {showIcon && (
            <TiDeleteOutline
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "red",
                fontSize: "24px",
              }}
              onClick={()=>handleDeleteClick(item.messageId)}
            />
        )}
      </Box>
    </Flex>
  );
}

export default ChatMessage;
