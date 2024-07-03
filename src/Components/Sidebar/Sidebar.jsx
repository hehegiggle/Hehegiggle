import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useDisclosure } from '@chakra-ui/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { mainu } from './SidebarConfig';
import './Sidebar.css';
import SearchComponent from '../../Components/SearchComponent/SearchComponent';
import CreatePostModal from '../Post/Create/CreatePostModal';
import CreateReelModal from '../Create/CreateReel';
import { fetchNotifications } from '../../Redux/Notification/Action';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, notifications } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Home');
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/Home') {
      setActiveTab('Home');
    } else if (location.pathname.includes(`/${user.reqUser?.username}`)) {
      setActiveTab('Profile');
    } else if (location.pathname.includes('/Reels')) {
      setActiveTab('Reels');
    } else if (location.pathname.includes('/Messages')) {
      setActiveTab('Messages');
    } else if(location.pathname.includes('/Notifications')){
      setActiveTab('Notifications');
    }
  }, [location, user.reqUser?.username]);

  useEffect(() => {
    const fetchNotificationData = () => {
      dispatch(fetchNotifications());
    };
    fetchNotificationData();
    const intervalId = setInterval(fetchNotificationData, 1000); 
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleTabClick = (tab, icon) => {
    setActiveTab(tab);
    if (tab === 'Profile' || icon === 'CgProfile') {
      navigate(`/${user.reqUser?.username}`);
    } else if (tab === 'Home' || icon === 'AiOutlineHome') {
      navigate('Home');
    } else if (tab === 'Create' || icon === '') {
      onOpen();
    } else if (tab === 'Reels' || icon === 'RiVideoLine') {
      navigate('Reels');
    } else if (tab === 'Create Reels' || icon === '') {
      handleOpenCreateReelModal();
    } else if (tab === 'Messages' || icon === 'AiOutlineMessage') {
      navigate('Messages');
    } else if(tab === 'Notifications' || icon === 'AiFillHeart') {
      navigate('Notifications');
    }

    if (tab === 'Search') {
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
    <div className="fixed top-1/2 left-4 transform -translate-y-1/2 w-[300px] h-[70%] flex flex-col justify-between px-5">
      <div
        className="card p-5 shadow-md rounded-md flex-grow w-full"
        style={{
          background: 'linear-gradient(180deg, #8697C4, #EDE8F5)',
          borderRadius: '20px',
          color: '#283351',
        }}
      >
        <div className="mt-12 ml-5">
          {mainu.map((item) => (
            <div
              onClick={() => handleTabClick(item.title, item.icon)}
              className="flex items-center mb-10 cursor-pointer text-lg"
              key={item.title}
            >
              <span className="mb-1 relative" style={{ fontSize: '20px' }}>
                {activeTab === item.title ? item.activeIcon : item.icon}
              </span>
              <p
                className={`ml-2 ${
                  activeTab === item.title ? 'font-bold text-xl' : 'text-xl'
                } ${isSearchBoxVisible ? 'hidden' : 'block'}`}
              >
                {item.title}
              </p>
              {item.title === 'Notifications' && notifications.unreadCount > 0 && (
                  <span className="notification-badge">{notifications.unreadCount}</span>
                )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <button
          className="text-white px-4 py-2.5 mb-4"
          onClick={onOpen}
          style={{ borderRadius: '20px', backgroundColor: '#8697C4' }}
        >
          Create Post
        </button>
        <button
          className="text-white px-4 py-2.5"
          onClick={handleOpenCreateReelModal}
          style={{ borderRadius: '20px', backgroundColor: '#8697C4' }}
        >
          Create Reel
        </button>
      </div>
      {isSearchBoxVisible && (
        <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
      )}

      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      <CreateReelModal
        onClose={handleCloseCreateReelModal}
        isOpen={isCreateReelModalOpen}
        onOpen={handleOpenCreateReelModal}
      />
    </div>
  );
};

export default Sidebar;
