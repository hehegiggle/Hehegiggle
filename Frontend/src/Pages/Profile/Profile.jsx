import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProfilePostsPart from '../../Components/ProfilePageCard/ProfilePostsPart'
import UserDetailCard from '../../Components/ProfilePageCard/UserDetailCard'
import { isFollowing, isReqUser } from '../../Config/Logic'
import { findByUsernameAction, getUserProfileAction } from '../../Redux/User/Action'

const Profile = () => {
  const dispatch=useDispatch();
  const token = localStorage.getItem("token");
  const {username} = useParams();
  const {user}=useSelector(store=>store);

  const isRequser=isReqUser(user.reqUser?.id,user.findByUsername?.id);
  const isFollowed=isFollowing(user.reqUser,user.findByUsername);

  useEffect(()=>{
    const data={
      token,
      username
    }
    dispatch(getUserProfileAction(token))
    dispatch(findByUsernameAction(data))
  },[username, user.follower, user.following])

  return (
    <div className='px-2' style={{ overflowY:"auto", height: "calc(107vh - 70px)", scrollbarWidth: "none" }} sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
      <div className="flex mt-20">
        <div className='card p-5 shadow-lg rounded-md' style={{borderRadius: 20, marginLeft: "23%", width:"75%", marginTop: "2%",  background: "linear-gradient(135deg, #8697C4, #EDE8F5)"}}>
          <div>
            <UserDetailCard user={isRequser?user.reqUser:user.findByUsername} isFollowing={isFollowed} isRequser={isRequser}/>
          </div>
          <div>
            <ProfilePostsPart user={isRequser?user.reqUser:user.findByUsername}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
