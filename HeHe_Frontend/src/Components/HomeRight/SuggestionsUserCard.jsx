import React from "react";
import { useNavigate } from "react-router-dom";

const SuggestionsUserCard = ({ image, username, description }) => {
  const navigate = useNavigate();
  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };
  return (
    <div className="flex justify-between items-center">
      <div
        className="flex items-center"
        onClick={() => handleNavigate(username)}
        style={{ cursor: "pointer" }}
      >
        <img
          className="w-9 h-9 rounded-full"
          src={image}
          alt=""
          style={{ objectFit: "cover" }}
        />
        <div className="ml-2">
          <p className="text-md font-semibold">{username}</p>
          <p className="text-md font-semibold opacity-70">{description}</p>
        </div>
        <p className="text-blue-700 text-md font-semibold mx-4">View Profile</p>
      </div>
    </div>
  );
};

export default SuggestionsUserCard;
