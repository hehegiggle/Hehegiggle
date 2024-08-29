import React from "react";
import { useNavigate } from "react-router-dom";

const PopularUserCard = ({ image, username, description }) => {
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
          className="w-10 h-10 rounded-full my-2"
          src={image}
          alt=""
          style={{ objectFit: "cover" }}
        />
        <div className="ml-2">
          <p className="text-md font-semibold">{description}</p>
          <p className="text-md font-semibold opacity-70">@{username}</p>
        </div>
      </div>
    </div>
  );
};

export default PopularUserCard;
