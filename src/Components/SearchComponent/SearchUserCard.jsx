import React from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SearchUserCard = ({ fullname, username, image, setIsSearchVisible }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${username}`);
    setIsSearchVisible(false);
  };

  return (
    <Box
      onClick={handleNavigate}
      p="4"
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      cursor="pointer"
      backgroundColor="white"
      boxShadow="lg"
    >
      <Flex align="center">
        <Image
          boxSize="50px"
          borderRadius="full"
          src={image ? image : "https://via.placeholder.com/50"}
          alt="User Profile"
        />
        <Box ml="3">
          <Text fontWeight="semibold">{fullname}</Text>
          <Text fontSize="sm" color="gray.500">
            @{username}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SearchUserCard;
