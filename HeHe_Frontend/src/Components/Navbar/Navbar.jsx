import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import img from "../../Album/Images/hehe bgr.png";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state);
  const dropdownRef = useRef(null);
  const toast = useToast();

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    toast({
      title: "Come Back Soon 🥹🥹🥹",
      status: "error",
      duration: 1000,
      isClosable: true,
    });
    sessionStorage.clear();
    navigate("/login");
  };

  const handleSearchFocus = () => {
    setIsSearchBoxVisible(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchBoxVisible(false), 200);
  };

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Box
        bg="#8697C4"
        p={{base:'4', md:'5'}}
        boxShadow="md"
        mb={5}
        position="fixed"
        top={0}
        left={0}
        width="100%"
        zIndex={1000}
      >
        <Flex align="center">
          <Box ml={{base:'2%', md:'3%'}}>
            <img src={img} alt="" width={"150px"} height={"100px"} />
          </Box>
          <Spacer />
          <Box
            style={{
              width: "40%",
              marginRight: "5%",
              position: "relative",
            }}
          >
            <InputGroup>
              <Input
                variant="filled"
                placeholder="Search for a User"
                borderRadius="20px"
                border="1px"
                borderColor="grey"
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onChange={handleSearchChange}
                value={searchQuery}
              />
              {searchQuery && (
                <InputRightElement>
                  <IconButton
                    size="sm"
                    icon={<CloseIcon />}
                    onClick={clearSearch}
                    aria-label="Clear search"
                    variant="ghost"
                  />
                </InputRightElement>
              )}
            </InputGroup>
            {isSearchBoxVisible && (
              <div
                style={{ position: "absolute", width: "100%", zIndex: 1000 }}
              >
                <SearchComponent
                  setIsSearchVisible={setIsSearchBoxVisible}
                  searchQuery={searchQuery}
                  clearSearch={clearSearch}
                />
              </div>
            )}
          </Box>
          <Spacer />
          <Box>
            <div className="flex justify-between items-center mr-10">
              <div className="flex items-center relative" ref={dropdownRef}>
                <img
                  className="w-12 h-12 rounded-full"
                  src={
                    user.reqUser?.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt=""
                  onClick={handleClick}
                  style={{ cursor: "pointer", objectFit: "cover" }}
                />
                {showDropdown && (
                  <div
                    className="absolute mt-2 w-60 border rounded shadow-md"
                    style={{
                      right: 20,
                      top: 60,
                      borderRadius: "10px",
                      zIndex: 1000,
                      backgroundColor:"#8697C4",
                      color:"#ffffff"
                    }}
                  >
                    <p
                      className="w-full py-2 text-base px-4 border-b cursor-pointer"
                      onClick={() => navigate(`/${user.reqUser?.username}`)}
                    >
                      Profile
                    </p>
                    <p
                      onClick={handleLogout}
                      className="w-full py-2 text-base px-4 cursor-pointer"
                    >
                      Log out
                    </p>
                  </div>
                )}
                <div className="ml-3">
                  <p className="font-semibold">{user.reqUser?.name}</p>
                  <p className="opacity-70">{user.reqUser?.username}</p>
                </div>
              </div>
            </div>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;
