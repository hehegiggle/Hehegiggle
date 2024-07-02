import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { mainu } from "./SidebarConfig";
import "./Sidebar.css";
import SearchComponent from "../../Components/SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Home");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);

  useEffect(() => {
    // Set the active tab based on the current URL
    if (location.pathname === "/Home") {
      setActiveTab("Home");
    } else if (location.pathname.includes(`/${user.reqUser?.username}`)) {
      setActiveTab("Profile");
    } else if (location.pathname.includes("/Reels")) {
      setActiveTab("Reels");
    } else if (location.pathname.includes("/Messages")) {
      setActiveTab("Messages");
    }
  }, [location, user.reqUser?.username]);

  const handleTabClick = (tab, icon) => {
    setActiveTab(tab);
    if (tab === "Profile" || icon === "CgProfile") {
      navigate(`/${user.reqUser?.username}`);
    } else if (tab === "Home" || icon === "AiOutlineHome") {
      navigate("Home");
    } else if (tab === "Create" || icon === "") {
      onOpen();
    } else if (tab === "Reels" || icon === "RiVideoLine") {
      navigate("Reels");
    } else if (tab === "Create Reels" || icon === "") {
      handleOpenCreateReelModal();
    } else if (tab === "Messages" || icon === "AiOutlineMessage") {
      navigate("Messages");
    }

    if (tab === "Search") {
      setIsSearchBoxVisible(true);
    } else setIsSearchBoxVisible(false);
  };

  const handleCloseCreateReelModal = () => {
    setIsCreateReelModalOpen(false);
  };

  const handleOpenCreateReelModal = () => {
    setIsCreateReelModalOpen(true);
  };

  return (
    <div className={`fixed top-1/2 left-4 transform -translate-y-1/2 w-[300px] h-[70%] flex flex-col justify-between px-5`}>
      <div className="card p-5 bg-white shadow-md rounded-md flex-grow w-full" style={{ borderRadius: 20 }}>
        <div className="mt-10 ml-5">
          {mainu.map((item) => (
            <div
              onClick={() => handleTabClick(item.title, item.icon)}
              className="flex items-center mb-10 cursor-pointer text-lg"
              key={item.title}
            >
              <span className="mb-1" style={{ fontSize: "20px" }}>
                {activeTab === item.title ? item.activeIcon : item.icon}
              </span>
              <p
                className={`ml-2 ${activeTab === item.title ? "font-bold text-xl" : "text-xl"} ${isSearchBoxVisible ? "hidden" : "block"}`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <button
          className="bg-blue-500 text-white px-4 py-2.5 mb-4"
          onClick={onOpen} style={{ borderRadius: "20px" }}
        >
          Create Post
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2.5"
          onClick={handleOpenCreateReelModal} style={{ borderRadius: "20px" }}
        >
          Create Reel
        </button>
      </div>
      {isSearchBoxVisible && <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />}

      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      <CreateReelModal onClose={handleCloseCreateReelModal} isOpen={isCreateReelModalOpen} onOpen={handleOpenCreateReelModal} />
    </div>
  );
};

export default Sidebar;
