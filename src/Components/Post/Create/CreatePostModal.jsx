import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Box, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import SpinnerCard from "../../Spinner/Spinner";

const CreatePostModal = ({ onOpen, isOpen, onClose }) => {
  const finalRef = React.useRef(null);
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState("");
  const toast = useToast();

  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [postData, setPostData] = useState({
    image: "",
    caption: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {}, [file]);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile.type.startsWith("image/") ||
      droppedFile.type.startsWith("video/")
    ) {
      setFile(droppedFile);
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
    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setFile(file);
      setIsImageUploaded("uploading");
      const url = await uploadToCloudinary(file);
      setPostData((prevValues) => ({ ...prevValues, image: url }));
      setIsImageUploaded("uploaded");
    } else {
      setFile(null);
      alert("Please select an image/video file.");
    }
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
        title: "Posted successfully 🙂‍↕️🙂‍↕️🙂‍↕️",
        status: "success",
        duration: 1000,
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
  };

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
          <Flex justify="space-between" py={1} px={10} align="center" textColor="white">
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
            <Flex direction={{ base: "column", md: "row" }} h={{ base: "auto", md: "70vh" }} justify="space-between">
              <Flex
                w={{ base: "100%", md: "50%" }}
                direction="column"
                justify="center"
                align="center"
              >
                {isImageUploaded === "" && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`drag-drop h-full`}
                    style={{ borderRadius: "20px", backgroundColor: isDragOver ? "#f0f0f0" : "transparent" }}
                  >
                    <Flex justify="center" direction="column" align="center">
                      <FaPhotoVideo className={`text-3xl ${isDragOver ? "text-800" : ""}`} />
                      <p>Drag photos here</p>
                    </Flex>

                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload"
                      style={{ borderRadius: "20px", backgroundColor: "#8697C4" }}
                    >
                      Select Post
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      accept="image/*, video/*"
                      multiple
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                )}

                {isImageUploaded === "uploading" && <SpinnerCard />}

                {isImageUploaded === "uploaded" && (
                  <img
                    className=""
                    src={postData.image}
                    alt="dropped-img"
                    style={{ borderRadius: "20px", width: "100%", objectFit: "cover", marginRight:"5%"}}
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
                >
                  <textarea
                    style={{ background: "transparent", color: "black", width: "100%", borderRadius: "10px" }}
                    className="captionInput"
                    placeholder="Write a Caption..."
                    name="caption"
                    rows="10"
                    onChange={handleInputChange}
                  />
                  <Flex justify="space-between" px={2}>
                    <p className="opacity-70">{postData.caption?.length}/2,200</p>
                  </Flex>
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
