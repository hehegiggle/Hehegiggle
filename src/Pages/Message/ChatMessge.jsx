import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function ChatMessage({ item }) {
  const { user } = useSelector((state) => state);
  const isReqUserMessage = user.reqUser?.id === item.user.id;
  

  return (
    <Flex
      justify={!isReqUserMessage ? "flex-start" : "flex-end"}
      mb={4}
      textColor="black"
    >
      <Box p={2} borderRadius="20px" bg="white" maxW={["70%", "60%", "50%"]}>
        <Image
          src={item.sentImage}
          alt="Message"
          borderRadius="20px"
          mb={2}
          display={item.sentImage ? "block" : "none"}
          objectFit="cover"
          width="100%"
          maxHeight="250px"
        />
        <Text py={2} fontSize="lg">
          {item.content}
        </Text>
      </Box>
    </Flex>
  );
}

export default ChatMessage;
