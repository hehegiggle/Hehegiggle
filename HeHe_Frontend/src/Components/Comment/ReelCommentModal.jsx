import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Flex,
  Divider,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReelComment,
  getAllCommentsOfReel,
} from "../../Redux/Comment/Action";
import ReelCommentCard from "./ReelCommentCard";

const ReelCommentModal = ({ isOpen, onClose, reel, onCommentSubmit }) => {
  const { comments } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = sessionStorage.getItem("token");
  const toast = useToast();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (reel.id) {
      const data = {
        token: jwt,
        reelId: reel.id,
      };
      dispatch(getAllCommentsOfReel(data));
    }
  }, [
    reel.id,
    comments?.reelCreatedComment,
    comments?.reelDeletedComment,
    comments?.reelUpdatedComment,
  ]);

  const handleEmojiClick = (emojiObject) => {
    setCommentContent((prevInputValue) => prevInputValue + emojiObject.emoji);
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    } else return;
    setCommentContent("");
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleAddComment = () => {
    const data = {
      content: commentContent,
      token: jwt,
      reelId: reel.id,
    };
    dispatch(createReelComment(data));
    toast({
      title: "Commented successfully ✍🏼✍🏼✍🏼",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
      <ModalOverlay />
      <ModalContent
        mt={"6%"}
        borderRadius="3xl"
        style={{
          background: "linear-gradient(180deg, #8697C4, #EDE8F5)",
          borderRadius: "20px",
          color: "#283351",
        }}
      >
        <ModalBody mt={"2%"} mb={"2%"}>
          <Flex>
            <Box flex="1">
              <video
                width="85%"
                src={reel.video}
                controls
                style={{ borderRadius: "20px" }}
              />
            </Box>
            <Box flex="1" ml={4} position="relative">
              <Flex alignItems="center">
                <img
                  className="w-11 h-11 rounded-full"
                  src={
                    reel.user.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="userimage"
                  style={{ objectFit: "cover", marginRight: "10px" }}
                />
                <Box>
                  <Text fontWeight="bold">{reel.user.name}</Text>
                  <Text>@{reel.user.username}</Text>
                </Box>
              </Flex>
              <Divider mt={3} />
              <Box className="reelcomments">
                {comments.comments?.length > 0 &&
                  comments.comments?.map((item) => (
                    <ReelCommentCard comment={item} />
                  ))}
              </Box>
              <Box position="absolute" bottom={2} width="100%">
                <Flex justifyContent="space-between" alignItems="center">
                  <input
                    className="commentInput w-[70%]"
                    value={commentContent}
                    placeholder="Add Comment..."
                    borderRadius="30px"
                    flex="1"
                    mr={2}
                    onKeyPress={handleOnEnterPress}
                    onChange={handleCommnetInputChange}
                    style={{ borderRadius: "20px" }}
                  />
                  <Icon
                    ml={3}
                    as={GrEmoji}
                    boxSize={6}
                    cursor="pointer"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                </Flex>
                {showEmojiPicker && (
                  <Box
                    position="absolute"
                    bottom="60px"
                    right="20px"
                    zIndex="1000"
                    boxShadow="md"
                    borderRadius="md"
                  >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </Box>
                )}
              </Box>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReelCommentModal;
