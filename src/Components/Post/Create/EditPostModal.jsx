import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
  Button,
  Image,
  Textarea,
  Input,
  Flex,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { findPostByIdAction, editPOst } from "../../../Redux/Post/Action";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import "../../Post/Create/EditPostCard.css"; // Import CSS for additional styling

const EditPostModal = ({ isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const { postId } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { post, user } = useSelector((store) => store);

  const [postData, setPostData] = useState({
    image: "",
    caption: "",
    location: "",
    id: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    if (post.singlePost) {
      for (let key in post.singlePost) {
        setPostData((prevValues) => ({
          ...prevValues,
          [key]: post.singlePost[key],
        }));
      }
    }
  }, [post.singlePost]);

  const handleSubmit = async () => {
    const data = {
      jwt: token,
      data: postData,
    };
    if (token && postData.image) {
      await dispatch(editPOst(data)); // Dispatch editPOst action and wait for it to complete
      handleClose();
      toast({
        title: "Post updated successfully 🤗🤗🤗",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  function handleClose() {
    onClose(); // Close modal
    setFile(null); // Clear file state if needed
    setPostData({ image: "", caption: "", location: "" }); // Clear postData state
  }

  useEffect(() => {
    if (postId) {
      dispatch(
        findPostByIdAction({
          jwt: token,
          postId,
        })
      );
    }
  }, [postId]);

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent
        style={{
          marginTop: "20px",
          borderRadius: "20px",
          background: "linear-gradient(180deg, #8697C4, #EDE8F5)",
        }}
      >
        <ModalBody>
          <Box
            className="edit-post-card"
            padding="4"
            boxShadow="md"
            borderRadius="20px"
            style={{ background: "linear-gradient(180deg, #8697C4, #EDE8F5)" }}
          >
            <Flex justifyContent="space-between" alignItems="center" pb="4">
              <Text fontSize="lg">Edit Post</Text>
              <Flex>
                <Button onClick={handleSubmit} size="sm" mr="5">
                  Update
                </Button>
                <ModalCloseButton position="relative" size="sm" />
              </Flex>
            </Flex>

            <Box
              className="edit-post-image-card"
              borderWidth="1px"
              borderRadius="20px"
              overflow="hidden"
              mb="4"
            >
              <Image src={post.singlePost?.image} alt="Post image" />
            </Box>

            <Box
              className="edit-post-caption-card"
              borderWidth="1px"
              borderRadius="20px"
              overflow="hidden"
              mb="4"
              p="4"
            >
              <Flex alignItems="center" mb="2">
                <Avatar
                  size="sm"
                  src={
                    user?.reqUser?.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  mr="4"
                />
                <Text fontWeight="bold">{user?.reqUser?.username}</Text>
              </Flex>
              <Textarea
                placeholder="Write a caption..."
                name="caption"
                rows="4"
                value={postData.caption}
                onChange={handleInputChange}
              />
              <Flex justifyContent="space-between" mt="2">
                <Text>{postData.caption?.length}/2,200</Text>
              </Flex>
            </Box>

            <Box
              className="edit-post-location-card"
              borderWidth="1px"
              borderRadius="20px"
              overflow="hidden"
              p="4"
            >
              <Flex alignItems="center">
                <Input
                  placeholder="Add Location"
                  name="location"
                  onChange={handleInputChange}
                  value={postData.location}
                  mr="2"
                />
              </Flex>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
