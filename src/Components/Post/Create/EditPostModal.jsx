import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";

import React, { useEffect, useState } from "react";
import { Box, Button, Image, Textarea, Input, Flex, Avatar, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { findPostByIdAction, editPOst } from "../../../Redux/Post/Action";
import { useParams } from "react-router-dom";
import "../../Post/Create/EditPostCard.css"; // Create and import a CSS file for additional styling

const EditPostModal = ({ isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const { postId } = useParams();
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
        setPostData((prevValues) => ({ ...prevValues, [key]: post.singlePost[key] }));
      }
    }
  }, [post.singlePost]);

  const handleSubmit = async () => {
    const data = {
      jwt: token,
      data: postData,
    };
    if (token && postData.image) {
      dispatch(editPOst(data));
      handleClose();
    }
    window.location.reload();
    console.log("data --- ", data);
  };

  function handleClose() {
    onClose();
    setFile(null);
    setPostData({ image: "", caption: "", location: "" });
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
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody style={{ position: "fixed" }}>
          <Box
            className="edit-post-card"
            width="50%"
            padding="4"
            boxShadow="md"
            borderRadius="20px"
            backgroundColor="white"
            marginTop="-50px"
          >
            <Flex justifyContent="space-between" alignItems="center" pb="4">
              <Text fontSize="xl">Edit Post</Text>
              <Flex>
                <Button onClick={handleSubmit} colorScheme="blue" size="sm" mr="5">
                  Update
                </Button>
                <ModalCloseButton position="relative" size="sm" />
              </Flex>
            </Flex>

            <Box className="edit-post-image-card" borderWidth="1px" borderRadius="20px" overflow="hidden" mb="4">
              <Image src={post.singlePost?.image} alt="Post image" />
            </Box>

            <Box className="edit-post-caption-card" borderWidth="1px" borderRadius="20px" overflow="hidden" mb="4" p="4">
              <Flex alignItems="center" mb="2">
                <Avatar
                  size="sm"
                  src={
                    user?.reqUser?.image ||
                    "https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
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

            <Box className="edit-post-location-card" borderWidth="1px" borderRadius="20px" overflow="hidden" p="4">
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