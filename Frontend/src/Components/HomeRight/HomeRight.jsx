import React, { useEffect, useState } from "react";
import { Box, Flex, Button, Grid, Text } from "@chakra-ui/react";
import SuggestionsUserCard from "./SuggestionsUserCard";
import Confetti from "react-dom-confetti";
import axios from "axios";
import PopularUserCard from "./PopularUserCard";
import { BASE_URL } from "../../Config/api";

const HomeRight = ({ suggestedUser }) => {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isUserWin, setIsUserWin] = useState(false);
  const [popularUser, setPopularUser] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchPopularUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/populer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPopularUser(response.data);
      } catch (error) {
        console.error("Error fetching popular users:", error);
      }
    };
    fetchPopularUsers();
  }, [token]);

  useEffect(() => {
    if (!isXNext && !winner) {
      const emptySquares = board
        .map((value, index) => (value === null ? index : null))
        .filter((val) => val !== null);
      if (emptySquares.length > 0) {
        const randomIndex =
          emptySquares[Math.floor(Math.random() * emptySquares.length)];
        handleClick(randomIndex, false);
      }
    }
  }, [isXNext, winner, board]);

  const handleGameModalOpen = () => {
    setIsGameModalOpen(true);
  };

  const handleGameModalClose = () => {
    setIsGameModalOpen(false);
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsUserWin(false);
  };

  const handleClick = (index, isHuman = true) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      setIsUserWin(win === "X");
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  return (
    <Flex direction="column" w="100%" maxW="md" maxH="lg">
      <Box
        className="shadow-2xl card bg-white shadow-md rounded-md p-5 w-full mt-1"
        style={{ borderRadius: 20, backgroundColor: "#ADBBDA" }}
      >
        <Box
          className="card rounded-md p-3 mb-5"
          style={{
            backgroundColor: "#8697C4",
            color: "black",
            borderRadius: "20px",
          }}
        >
          <Box fontWeight="semibold" opacity={0.7}>
            Most Popular Users
          </Box>
        </Box>

        {/* Scrollable container for all popular users, showing only 2 at a time */}
        <Box
          overflowY="auto"
          maxHeight="115px" // Limit the height to fit only 2 users
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "20px",
            },
          }}
        >
          {popularUser.slice(0, 3).map((item, index) => (
            <Flex key={index} alignItems="center" mb={2}>
              <Box fontWeight="bold" color="grey" fontSize="lg" mr={5}>
                #{index + 1}
              </Box>
              <PopularUserCard
                image={
                  item.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                username={item.username}
                description={item.name || "Popular User"}
              />
            </Flex>
          ))}
        </Box>
      </Box>

      {/* Follow Back Requests Section */}
      <Box
        className="shadow-2xl card bg-white shadow-md rounded-md p-5 w-full mt-5"
        style={{ borderRadius: 20, backgroundColor: "#ADBBDA" }}
        maxHeight="25%"
      >
        <Box
          className="card rounded-md p-3 mb-5"
          style={{
            backgroundColor: "#8697C4",
            color: "black",
            borderRadius: "20px",
          }}
        >
          <Box fontWeight="semibold" opacity={0.7}>
            Follow Back Requests
          </Box>
        </Box>
        <Box
          overflowY={suggestedUser.length > 2 ? "auto" : "hidden"} // Make scrollable if more than 2 users
          maxHeight={suggestedUser.length > 2 ? "110px" : "auto"} // Limit height if more than 2 users
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: "20px",
            },
          }}
        >
          {suggestedUser.length > 0 ? (
            suggestedUser
              .slice(0, 5)
              .map((item, index) => (
                <SuggestionsUserCard
                  key={index}
                  image={
                    item.userImage ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  username={item.username}
                  description={item.name || "Follows You"}
                />
              ))
          ) : (
            <Text textAlign="center" fontSize="lg" color="gray.500">
              No New Follow Back Requests
            </Text>
          )}
        </Box>
      </Box>

      {/* Tic Tac Toe Game Section */}
      <Box
        mt={{ base: "", lg: "6%" }}
        className="shadow-2xl card bg-white shadow-md rounded-md p-5 w-full"
        style={{ borderRadius: 20, backgroundColor: "#ADBBDA" }}
        onClick={handleGameModalOpen}
      >
        <Flex justify="between" align="center">
          <Box
            className="card rounded-md p-3 mb-5"
            style={{
              backgroundColor: "#8697C4",
              color: "black",
              borderRadius: "20px",
            }}
            width="100%"
          >
            <Box fontWeight="semibold" opacity={0.7}>
              Play Tic Tac Toe
            </Box>
          </Box>
        </Flex>
        <Box
          className="card bg-gray-100 shadow-sm rounded-md p-4 mt-1"
          style={{ borderRadius: 15 }}
        >
          <Box textAlign="center" fontStyle="italic" cursor="pointer">
            Click to play!
          </Box>
        </Box>
      </Box>

      {/* Tic Tac Toe Modal */}
      {isGameModalOpen && (
        <Flex
          pos="fixed"
          inset="0"
          alignItems="center"
          justifyContent="center"
          bg="blackAlpha.500"
          zIndex="overlay"
        >
          <Box bg="white" rounded="lg" p={6} maxW="md" position="relative">
            <Confetti active={isUserWin} />
            <Flex justify="end">
              <Button
                onClick={handleGameModalClose}
                colorScheme="gray"
                size="sm"
              >
                &#10005;
              </Button>
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
              {board.map((value, index) => (
                <Box
                  key={index}
                  w="16"
                  h="16"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="gray.200"
                  rounded="md"
                  fontSize="2xl"
                  cursor="pointer"
                  onClick={() => handleClick(index)}
                >
                  {value}
                </Box>
              ))}
            </Grid>
            {winner && (
              <Box textAlign="center" mt={4}>
                {isUserWin ? (
                  <Box fontWeight="semibold">You won the game!</Box>
                ) : (
                  <Box fontWeight="semibold">Better luck next time</Box>
                )}
              </Box>
            )}
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default HomeRight;
