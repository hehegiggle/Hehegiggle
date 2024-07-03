import React, { useEffect, useState } from "react";
import SuggestionsUserCard from "./SuggestionsUserCard";
import Confetti from "react-dom-confetti";

const HomeRight = ({ suggestedUser }) => {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    // Fetch jokes from JokeAPI
    fetch("https://v2.jokeapi.dev/joke/Any?amount=10")
      .then((response) => response.json())
      .then((data) => {
        setJokes(data.jokes);
        setCurrentJokeIndex(0);
      })
      .catch((error) => console.error("Error fetching jokes:", error));
  }, []);

  useEffect(() => {
    // Update the joke every 5 seconds
    const interval = setInterval(() => {
      setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [jokes]);

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
    setIsWin(false);
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
      setIsWin(true);
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
    <div className="w-full max-w-sm space-y-5">
      <div
        className="card bg-white shadow-md rounded-md p-5 w-full"
        style={{ borderRadius: 20 ,backgroundColor:"#ADBBDA"}}
        onClick={handleGameModalOpen}
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold opacity-70">Play Tic Tac Toe</p>
        </div>
        <div
          className="card bg-gray-100 shadow-sm rounded-md p-4 mt-4"
          style={{ borderRadius: 15 }}
        >
          <div className="text-center italic">
            <p>Click to play!</p>
          </div>
        </div>
      </div>
      <div
      className="card bg-white shadow-md rounded-md p-5 w-full"
      style={{ borderRadius: 20, backgroundColor:"#ADBBDA" }}
    >
      <div className="card rounded-md p-3 mb-5" style={{backgroundColor:"#8697C4",color:"black",borderRadius:"20px"}}>
        <p className="font-semibold opacity-70">Follow Back</p>
      </div>
      <div className="space-y-5">
        {suggestedUser.map((item, index) => (
          <SuggestionsUserCard
            key={index}
            image={
              item.userImage ||
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            username={item.username}
            description={'Follows you'}
          />
        ))}
      </div>
    </div>

      {isGameModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <div className="flex justify-end">
              <button onClick={handleGameModalClose} className="text-gray-700">
                &#10005;
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {board.map((value, index) => (
                <div
                  key={index}
                  className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md text-2xl cursor-pointer"
                  onClick={() => handleClick(index)}
                >
                  {value}
                </div>
              ))}
            </div>
            {winner && (
              <div className="text-center mt-4">
                <p className="font-semibold">Winner: {winner}</p>
                <Confetti active={isWin} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeRight;