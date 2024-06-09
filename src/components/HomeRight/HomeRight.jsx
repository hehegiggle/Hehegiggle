import React, { useState } from "react";
import PopularUserCard from "./PopularUserCard";
import { Avatar, Card, CardHeader, CardContent, CardActions, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate, Link } from "react-router-dom";

const popularUser = [1, 1, 1, 1];
const HomeRight = () => {
  const navigate = useNavigate();
  
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="pr-5">
      <SearchUser handleClick={handleUserClick} />
      <div className="card p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70">Suggestions for you</p>
          <p className="text-xs font-semibold opacity-95">View All</p>
        </div>

        <div className="space-y-5">
          {popularUser.map((item, index) => (
            <Card key={index} className="space-y-5 p-5">
              <PopularUserCard
                image={item.userImage}
                username={"code with zosh"}
                description={"Follows you"}
              />
              <CardContent>
                <img src="https://via.placeholder.com/150" alt="Card Image" />
              </CardContent>
              <CardActions>
                <Link to={`/profile/${index}`} className="text-blue-500 hover:underline">
                  View Profile
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
