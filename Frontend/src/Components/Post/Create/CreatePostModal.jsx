import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Box, Flex, Icon, useToast } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import SpinnerCard from "../../Spinner/Spinner";
import EmojiPicker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";

const CreatePostModal = ({ onOpen, isOpen, onClose, capturedImage }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const toast = useToast();

  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [postData, setPostData] = useState({
    image: "",
    caption: "",
    location: "",
  });

  useEffect(() => {
    if (capturedImage) {
      setPostData((prevValues) => ({ ...prevValues, image: capturedImage }));
    }
  }, [capturedImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
    } else {
      toast({
        title: "Only images can be uploaded.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];

    const maxSize = 5 * 1024 * 1024; // Max size of image file is 5MB

    if (file.size > maxSize) {
      toast({
        title: "Image size exceeds the limit of 5 MB.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (file && file.type.startsWith("image/")) {
      setFile(file);
      setIsImageUploaded("uploading");
      const url = await uploadToCloudinary(file);
      setPostData((prevValues) => ({ ...prevValues, image: url }));
      setIsImageUploaded("uploaded");
    } else {
      setFile(null);
      toast({
        title: "Only images can be uploaded⚠️⚠️⚠️",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setPostData((prevValues) => ({
      ...prevValues,
      caption: prevValues.caption + emojiObject.emoji,
    }));
  };

  const handleSubmit = async () => {
    const data = {
      jwt: token,
      data: postData,
    };
    if (token && postData.image) {
      dispatch(createPost(data));
      handleClose();
      toast({
        title: "Posted successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: "No image or token available.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    onClose();
    setFile(null);
    setIsDragOver(false);
    setPostData({ image: "", caption: "", location: "" });
    setIsImageUploaded("");
    setShowEmojiPicker(false);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div>
      <Modal
        size={{ base: "sm", md: "md", lg: "4xl" }}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent
          fontSize={"sm"}
          borderRadius="20px"
          bgGradient="linear(to-b, #8697C4, #EDE8F5)"
        >
          <Flex
            justify="space-between"
            py={1}
            px={10}
            align="center"
            textColor="white"
          >
            <p>Create New Post</p>
            <Button
              onClick={handleSubmit}
              size="sm"
              variant="ghost"
              textColor="black"
            >
              Upload Post
            </Button>
          </Flex>

          <hr className="hrLine" />

          <ModalBody>
            <Flex
              direction={{ base: "column", md: "row" }}
              h={{ base: "auto", md: "70vh" }}
              justify="space-between"
            >
              <Flex
                w={{ base: "100%", md: "50%" }}
                direction="column"
                justify="center"
                align="center"
              >
                {isImageUploaded === "" && !capturedImage && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`drag-drop h-full`}
                    style={{
                      borderRadius: "20px",
                      backgroundColor: isDragOver ? "#f0f0f0" : "transparent",
                    }}
                  >
                    <Flex justify="center" direction="column" align="center">
                      <FaPhotoVideo
                        size={"4rem"}
                        className={`text-3xl ${isDragOver ? "text-800" : ""}`}
                      />
                    </Flex>

                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload"
                      style={{
                        borderRadius: "20px",
                        backgroundColor: "#8697C4",
                      }}
                    >
                      Select Post
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                )}

                {isImageUploaded === "uploading" && <SpinnerCard />}

                {(isImageUploaded === "uploaded" || capturedImage) && (
                  <img
                    className=""
                    src={capturedImage || postData.image}
                    alt="uploaded-img"
                    style={{
                      borderRadius: "20px",
                      width: "100%",
                      objectFit: "cover",
                      marginRight: "5%",
                    }}
                  />
                )}
              </Flex>
              <Flex w={{ base: "100%", md: "50%" }} direction="column" mt={{ base: 4, md: 0 }}>
                <Box
                  bgGradient="linear(to-r, #8697C4, #EDE8F5)"
                  borderRadius="20px"
                  p={4}
                  mb={4}
                  shadow="md"
                >
                  <Flex align="center">
                    <img
                      className="w-7 h-7 rounded-full"
                      src={
                        user?.reqUser?.image ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                    <p className="font-semibold ml-4">{user?.reqUser?.username}</p>
                  </Flex>
                </Box>

                <Box
                  bgGradient="linear(to-r, #8697C4, #EDE8F5)"
                  borderRadius="20px"
                  p={4}
                  mb={4}
                  shadow="md"
                  position="relative"
                >
                  <textarea
                    style={{ background: "transparent", color: "black", width: "100%", borderRadius: "10px" }}
                    className="captionInput"
                    placeholder="Write a Caption..."
                    name="caption"
                    rows="10"
                    onChange={handleInputChange}
                    value={postData.caption}
                  />
                  <Flex justify="space-between" px={2}>
                    <p className="opacity-70">{postData.caption?.length}/2,200</p>
                    <Icon
                      mb="3"
                      as={GrEmoji}
                      boxSize={6}
                      ml="5%"
                      cursor="pointer"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                  </Flex>
                  {showEmojiPicker && (
                    <Box
                      ref={emojiPickerRef}
                      position="absolute"
                      bottom="50px"
                      right="10px"
                      zIndex="999"
                    >
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </Box>
                  )}
                </Box>

                <Box
                  bgGradient="linear(to-r, #8697C4, #EDE8F5)"
                  borderRadius="20px"
                  p={4}
                  mb={2}
                  shadow="md"
                >
                  <Flex align="center">
                    <input
                      style={{ background: "transparent", borderRadius: "20px", width: "100%" }}
                      className="locationInput"
                      type="text"
                      placeholder="Add Location"
                      name="location"
                      onChange={handleInputChange}
                      value={postData.location}
                    />
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
