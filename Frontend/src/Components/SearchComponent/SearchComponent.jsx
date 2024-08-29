import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../Config/Debounce";
import { searchUserAction } from "../../Redux/User/Action";
import { Box } from "@chakra-ui/react";
import SearchUserCard from "./SearchUserCard";

const SearchComponent = ({ setIsSearchVisible, searchQuery }) => {
  const token = sessionStorage.getItem("token");
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearchUser = (query) => {
    const data = {
      jwt: token,
      query,
    };
    dispatch(searchUserAction(data));
  };
  const debouncedHandleSearchUser = debounce(handleSearchUser, 1000);

  useEffect(() => {
    if (searchQuery) {
      debouncedHandleSearchUser(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="search-container my-2">
      <div className="search-results">
        {user?.searchResult?.length ? (
          user?.searchResult?.map((item) => (
            <SearchUserCard
              setIsSearchVisible={setIsSearchVisible}
              key={item.id}
              fullname={item.name}
              username={item.username}
              image={item?.image}
            />
          ))
        ) : (
          <Box
            p="4"
            borderWidth="1px"
            borderRadius="2xl"
            overflow="hidden"
            backgroundColor="white"
            boxShadow="lg"
            className="pt-10 font-bold text-center"
          >
            No Users Found
          </Box>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
