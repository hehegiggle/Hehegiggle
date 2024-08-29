import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Stack,
  Center,
  Card,
  CardHeader,
  Flex,
} from "@chakra-ui/react";
import { searchUser } from "../../Redux/User/Action";
import { createChat } from "../../Redux/Message/Action";

const SearchUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [showResults, setShowResults] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-results")) {
      setShowResults(false);
    }
  };

  const handleSearchUser = (e) => {
    const loggedInuser = user.reqUser.id;
    const query = e.target.value;
    setUsername(query);
    dispatch(searchUser({ query, token, loggedInuser }));
    setShowResults(true);
  };

  const handleClick = (id) => {
    dispatch(createChat({ userId: id, token }));
    setUsername("");
    setShowResults(false);
  };

  return (
    <Center py={5} position="relative">
      <InputGroup
        w={{ base: "90%", sm: "80%", md: "70%", lg: "60%", xl: "100%" }}
      >
        <InputLeftElement
          pointerEvents="none"
          children={<i className="fas fa-search" />}
        />
        <Input
          type="text"
          placeholder="Search user..."
          value={username}
          onChange={handleSearchUser}
          bg="transparent"
          border="1px"
          borderColor="#3b4054"
          color="black"
          px={5}
          py={3}
          rounded="full"
          _placeholder={{
            color: "black",
          }}
        />
      </InputGroup>
      {username && showResults && (
        <Box
          position="absolute"
          w={{ base: "90%", sm: "80%", md: "70%", lg: "60%", xl: "100%" }}
          zIndex="10"
          top="4.5rem"
          rounded="md"
          shadow="md"
          className="search-results"
          maxH="50vh"
          overflowY="auto"
        >
          {user.searchUser?.data?.length > 0 ? (
            <Stack spacing={0}>
              {user.searchUser.data.map((item) => (
                <Box
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  cursor="pointer"
                >
                  <Card
                    bg="transparent"
                    border="none"
                    boxShadow="none"
                    className="mb-2"
                  >
                    <CardHeader
                      style={{
                        background: "linear-gradient(135deg, #8697C4, #EDE8F5)",
                        borderRadius: "20px",
                      }}
                    >
                      <Flex align="center">
                        <Avatar
                          src={
                            item.image ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                        />
                        <Box ml="3">
                          <Text fontWeight="bold">{item.name}</Text>
                          <Text fontSize="sm" color="gray.500">
                            @{item.username.toLowerCase()}
                          </Text>
                        </Box>
                      </Flex>
                    </CardHeader>
                  </Card>
                </Box>
              ))}
            </Stack>
          ) : (
            <Box p={4} textAlign="center">
              <Text color="black" fontSize="lg">
                {user.searchUser?.message || "No Users Found"}
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Center>
  );
};

export default SearchUser;
