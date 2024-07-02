import { Avatar, Box, Flex, Text, Icon } from '@chakra-ui/react';
import { CgMoreVertical } from 'react-icons/cg';
import React from 'react';
import { useSelector } from 'react-redux';

function UserChatCard({chat}) {

  const {message, user} = useSelector((state)=>state)

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
    >
      <Flex
        align="center"
        justify="space-between"
        cursor="pointer"
      >
        <Flex align="center">
          <Avatar
            width={{ base: "2.5rem", md: "3.5rem" }}
            height={{ base: "2.5rem", md: "3.5rem" }}
            fontSize={{ base: "1rem", md: "1.5rem" }}
            bgColor="white"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            mr={4}
          />
          <Box>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
              {user.reqUser.id === chat.users[0].id? chat.users[1].name: chat.users[0].name}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
              Hey!!! Lets Giggle...
            </Text>
          </Box>
        </Flex>
        <Icon as={CgMoreVertical} boxSize={{ base: 4, md: 6 }} />
      </Flex>
    </Box>
  );
}

export default UserChatCard;
