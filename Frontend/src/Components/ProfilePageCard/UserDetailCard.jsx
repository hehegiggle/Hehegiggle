import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAction, unFollowUserAction } from "../../Redux/User/Action";
import "./UserDetailCard.css"

const UserDetailCard = ({ user, isRequser, isFollowing }) => {
  const token = localStorage.getItem("token");
  const { post } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollow, setIsFollow] = useState(false);

  const goToAccountEdit = () => {
    navigate("/account/edit");
  };

  const data = {
    jwt: token,
    userId: user?.id,
  };

  const handleFollowUser = () => {
    dispatch(followUserAction(data));
    setIsFollow(true);
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(data));
  };

  useEffect(() => {
    setIsFollow(isFollowing);
  }, [isFollowing]);

  return (
    <div className="py-10 mb-5" style={{background: "linear-gradient(135deg, #8697C4, #EDE8F5)", borderRadius:"20px"}}>
      <div className="flex items-center">
        <div className="ml-6">
          <img
            className="h-20 w-20 lg:w-32 lg:h-32 rounded-full"
            src={
              user?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt=""
            style={{objectFit:"cover"}}
          />
        </div>
        <div className="ml-20 space-y-5 text-lg w-[50%] md:w-[60%] lg:w-[80%]">
          <div className="flex space-x-10 items-center">
            <p className="text-xl">{user?.username}</p>
            <button className="text-xs py-1 px-5 bg-slate-100 hover:bg-slate-300 rounded-md font-semibold">
              {isRequser ? (
                <span onClick={goToAccountEdit}>Edit profile</span>
              ) : isFollow ? (
                <span onClick={handleUnFollowUser}>Unfollow</span>
              ) : (
                <span onClick={handleFollowUser}>Follow</span>
              )}
            </button>
            </div>
          <div className="flex space-x-10">
            <div>
              <span className="font-semibold mr-2">
                {post?.reqUserPost?.length || 0}
              </span>
              <span>Posts</span>
            </div>

            <div>
              <span className="font-semibold mr-2">
                {user?.follower?.length}
              </span>
              <span>Followers</span>
            </div>
            <div>
              <span className="font-semibold mr-2">
                {user?.following?.length}
              </span>
              <span>Following</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="font-thin text-sm">{user?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
