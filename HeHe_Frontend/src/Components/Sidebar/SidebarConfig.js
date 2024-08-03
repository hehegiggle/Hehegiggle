import {
  AiOutlineHome,
  AiFillHome,
  AiFillMessage,
  AiOutlineMessage,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsPersonCircle, BsArrowLeftRight } from "react-icons/bs";

export const mainu = [
  // {
  //   title: "Collapse",
  //   icon: <BsArrowLeftRight className="text-2xl mr-5" />,
  //   activeIcon: <BsArrowLeftRight className="text-2xl mr-5" />,
  // },
  {
    title: "Home",
    icon: <AiOutlineHome className="text-2xl mr-5" />,
    activeIcon: <AiFillHome className="text-3xl mr-5" />,
  },
  {
    title: "Reels",
    icon: <RiVideoLine className="text-2xl mr-5" />,
    activeIcon: <RiVideoFill className="text-3xl mr-5" />,
  },
  {
    title: "Messages",
    icon: <AiOutlineMessage className="text-2xl mr-5" />,
    activeIcon: <AiFillMessage className="text-3xl mr-5" />,
  },
  {
    title: "Notifications",
    icon: <AiOutlineHeart className="text-2xl mr-5" />,
    activeIcon: <AiFillHeart className="text-3xl mr-5" />,
  },
  {
    title: "Profile",
    icon: <CgProfile className="text-2xl mr-5" />,
    activeIcon: <BsPersonCircle className="text-3xl mr-5" />,
  },
];
