import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfilePostsPart from '../../Components/ProfilePageCard/ProfilePostsPart';
import UserDetailCard from '../../Components/ProfilePageCard/UserDetailCard';
import { isFollowing, isReqUser } from '../../Config/Logic';
import { findByUsernameAction, getUserProfileAction } from '../../Redux/User/Action';
import { Box, Flex } from '@chakra-ui/react';

const Profile = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { username } = useParams();
  const { user } = useSelector(store => store);

  const isRequser = isReqUser(user.reqUser?.id, user.findByUsername?.id);
  const isFollowed = isFollowing(user.reqUser, user.findByUsername);

  useEffect(() => {
    const data = {
      token,
      username
    };
    dispatch(getUserProfileAction(token));
    dispatch(findByUsernameAction(data));
  }, [username, user.follower, user.following]);

  return (
    <Box overflowY="auto" height="100%" sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
      <Flex mt={{ base: 10, md: 20 }} justify="center">
        <Box
          p={5}
          shadow="lg"
          borderRadius="20px"
          mx="auto"
          ml={{base:'12%', md:'21%'}}
          width={{base:'85%', md:'77%'}}
          mt={{base:'10%', md:'2%'}}
          mb={{base:'4%', md:'2%'}}
          bgGradient="linear(to-r, #8697C4, #EDE8F5)"
        >
          <UserDetailCard user={isRequser ? user.reqUser : user.findByUsername} isFollowing={isFollowed} isRequser={isRequser} />
          <ProfilePostsPart user={isRequser ? user.reqUser : user.findByUsername} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
